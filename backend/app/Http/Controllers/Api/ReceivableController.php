<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Receivable;
use App\Models\User;
use Illuminate\Http\Request;

class ReceivableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = auth()->user();
            if ($user->role === 'admin') {
                $receivables = User::with('receivables')->get();
            } else {
                $receivables = User::where('id', $user->id)->with('receivables')->get();
            }

            return response()->json([
                'message' => 'Receivables retrieved successfully',
                'receivables' => $receivables
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while getting receivables',
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
    public function show(Receivable $receivable)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Receivable $receivable)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'musyarakah' => 'nullable|integer',
            'mudharabah' => 'nullable|integer',
            'murabahah' => 'nullable|integer',
        ]);

        try {
            $receivable = Receivable::findOrFail($id);

            $receivable->update($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Piutang awal berhasil diupdate',
                'receivable' => $receivable,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal mengupdate piutang awal',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Receivable $receivable)
    {
        //
    }
}
