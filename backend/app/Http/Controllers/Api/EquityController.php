<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equity;
use App\Models\User;
use Illuminate\Http\Request;
ini_set('max_execution_time', 120);

class EquityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = auth()->user();
            if ($user->role === 'admin') {
                $equities = User::with('equities')->get();
            } else {
                $equities = User::where('id', $user->id)->with('equities')->get();
            }

            return response()->json([
                'message' => 'Equities retrieved successfully',
                'equities' => $equities
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while getting equities',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Equity $equity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Equity $equity)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'pokok' => 'nullable|integer',
            'wajib' => 'nullable|integer',
            'modal_penyertaan' => 'nullable|integer',
            'sukarela' => 'nullable|integer',
            'qard_rahn' => 'nullable|integer',
            'wadiah' => 'nullable|integer',
        ]);

        try {
            $equity = Equity::findOrFail($id);

            $equity->update($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Ekuitas berhasil diupdate',
                'equity' => $equity,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal mengupdate ekuitas',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equity $equity)
    {
        //
    }
}
