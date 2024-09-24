<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Equity;
use App\Models\Receivable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function adduser(Request $request) {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'phone' => 'required|string|min:10|max:16|unique:users',
                'password' => 'required|min:8|confirmed',
                'address' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'postcode' => 'required|string|max:6',
                'role' => 'required'
            ]);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors()->toArray();

            return response()->json([
                'message' => 'Invalid field',
                'error' => $errors
            ], 422);
        }

        DB::beginTransaction();

        try {
            User::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'password' => bcrypt($request->password),
                'address' => $request->address,
                'city' => $request->city,
                'postcode' => $request->postcode,
                'role' => $request->role
            ]);

            $prefix = $request->role === 'notmember' ? 'B-' : 'A-';
            $lastId = User::where('id', 'like', $prefix.'%')
                            ->orderBy('id', 'desc')
                            ->value('id');
            
            if ($lastId) {
                $number = (int)substr($lastId, -3);
            } else {
                $number = 1;
            }

            Receivable::create([
                'user_id' => $prefix . str_pad($number, 3, '0', STR_PAD_LEFT)
            ]);

            Equity::create([
                'user_id' => $prefix . str_pad($number, 3, '0', STR_PAD_LEFT)
            ]);

            DB::commit();

            return response()->json([
                'message' => "User berhasil ditambahkan"
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Error adding user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('phone', 'password');

        if (auth()->attempt($credentials)) {
            $user = User::where('phone', $request->phone)->first();
            
                if (! $user->status) {
                    return response()->json([
                        'error' => 'Unauthorized',
                        'message' => 'Akun anda dinonaktifkan, silakan hubungi admin'
                    ], 401);
                } else {
                    $user->update([
                        'last_login' => now(),
                        'last_login_ip' => $request->ip()
                    ]);

                    return response()->json([
                        'message' => "Selamat datang $user->name",
                        'access_token' => $user->createToken('auth_token')->plainTextToken,
                        'token_type' => 'Bearer',
                    ]);
                }
        } else {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Nomor telepon atau password salah',
            ], 401);
        }
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Berhasil logout'
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'token' => auth()->refresh()
        ]);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        $userId = auth()->user()->id;
        $user = User::find($userId);

        if (! Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Password lama salah',
            ], 422);
        } else {
            $user->update([
                'password' => bcrypt($request->password),
                'password_by_admin' => 0,
            ]);
            return response()->json([
                'message' => 'Password berhasil diubah',
            ]);
        }
    }
}
