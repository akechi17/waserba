<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
ini_set('max_execution_time', 120);

class MemberController extends Controller
{
    public function index()
    {
        try {
            $user = auth()->user();
            if ($user->role === 'admin') {
                $members = User::all();
            } else {
                $members = User::where('id', $user->id)->first();
            }

            return response()->json([
                'message' => 'Members retrieved successfully',
                'members' => $members
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while getting members',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateStatus($id)
    {
        try {
            $user = User::findOrFail($id);

            if ($user->status == 1) {
                $user->update([
                    'status' => 0,
                    'deleted_at' => now()
                ]);
                $state = 'dinonaktifkan';
            } else {
                $user->update([
                    'status' => 1,
                    'deleted_at' => null,
                ]);
                $state = 'diaktifkan';
            }

            return response()->json([
                'message' => "Member berhasil $state"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengubah status',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|min:10|max:16|unique:users,phone,' . $id,
            'password' => 'nullable|min:8|confirmed',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'postcode' => 'required|integer',
            'role' => 'required'
        ]);

        try {
            $member = User::findOrFail($id);
            $data = $request->except('password');

            if ($request->filled('password')) {
                $data['password'] = bcrypt($request->password);
            }
            $member->update($data);

            return response()->json([
                'status' => true,
                'message' => 'Member berhasil diupdate',
                'presence' => $member,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error mengupdate member',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function uploadAvatar(Request $request)
    {
        $userId = $request->user()->id;
        $user = User::find($userId);
        $file = $request->file('avatar');
        $filename = $file->getClientOriginalName();
        $path = $file->move(storage_path('app/public/avatars'), $filename);
        $user->avatar = 'storage/avatars/' . $filename;
        $user->save();
        return response()->json([
            'message' => 'Avatar berhasil diunggah',
            'avatar' => $user->avatar
        ]);
    }

}
