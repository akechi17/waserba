<?php

namespace App\Http\Controllers;

use App\Models\Estimation;
use App\Models\Journal;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
ini_set('max_execution_time', 120);

class JournalController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        try {
            $estimations = Estimation::where('id', 'like', '1-%')
                ->orWhere('id', 'like', '2-%')
                ->orWhere('id', 'like', '3-%')->get();
            $journals = Journal::with('user', 'estimation')->get();

            return response()->json([
                'message' => 'Journals retrieved successfully',
                'estimations' => $estimations,
                'journals' => $journals
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while getting journals',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function filter($estimation)
    {
        try {
            $journals = Journal::with('user', 'estimation')
            ->where('estimation_id', $estimation)
            ->where('id', '>', 17)
            ->get();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Data jurnal tidak ditemukan',
                'journals' => [],
            ], 404);
        }

        return response()->json([
            'message' => 'Data jurnal ditemukan',
            'journals' => $journals,
        ], 200);
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
        try {
            $request->validate([
                'created_at' => 'nullable',
                'estimation_id' => 'required|string',
                'user_id' => 'nullable|string',
                'balance' => 'required',
                'initial_balance' => 'nullable|integer'
            ]);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors()->toArray();

            return response()->json([
                'message' => 'Invalid field',
                'error' => $errors
            ]);
        }

        Journal::create([
            'created_at' => $request->created_at,
            'estimation_id' => $request->estimation_id,
            'user_id' => $request->user_id,
            'balance' => $request->balance,
            'initial_balance' => $request->initial_balance
        ]);

        return response()->json([
            'message' => "Jurnal berhasil ditambahkan"
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Journal $journal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Journal $journal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'created_at' => 'required',
            'estimation_id' => 'required|string',
            'user_id' => 'nullable|string',
            'balance' => 'required',
            'initial_balance' => 'nullable|integer'
        ]);

        try {
            $journal = Journal::findOrFail($id);

            $journal->update($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Jurnal berhasil diupdate',
                'journal' => $journal,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error while updating journal',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $journal = Journal::findOrFail($id);

            $journal->delete();

            return response()->json([
                'status' => true,
                'message' => 'Jurnal berhasil dihapus',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus jurnal',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
