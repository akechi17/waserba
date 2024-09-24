<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Estimation;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EstimationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $estimations = Estimation::all();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while getting estimations',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'Estimations retrieved successfully',
            'estimations' => $estimations,
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
                'id' => 'required|string|max:7|unique:estimations',
                'name' => 'required|string|max:255',
                'group' => 'required',
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

        Estimation::create([
            'id' => $request->id,
            'name' => $request->name,
            'group' => $request->group,
            'balance' => $request->balance,
            'initial_balance' => $request->initial_balance
        ]);

        return response()->json([
            'message' => "Perkiraan berhasil ditambahkan"
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Estimation $estimation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Estimation $estimation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'id' => 'required|string|max:7|unique:estimations,id,' . $id,
            'name' => 'required|string|max:255',
            'group' => 'required',
            'balance' => 'required',
            'initial_balance' => 'nullable|integer'
        ]);

        try {
            $estimation = Estimation::findOrFail($id);

            $estimation->update($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Perkiraan berhasil diupdate',
                'estimation' => $estimation,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error while updating estimation',
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
            $estimation = Estimation::findOrFail($id);

            $estimation->delete();

            return response()->json([
                'status' => true,
                'message' => 'Perkiraan berhasil dihapus',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus perkiraan',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
