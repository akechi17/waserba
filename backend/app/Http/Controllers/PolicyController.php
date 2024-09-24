<?php

namespace App\Http\Controllers;

use App\Models\Policy;
use Illuminate\Http\Request;
ini_set('max_execution_time', 120);


class PolicyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $policy = Policy::first();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while getting policy',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'Policy retrieved successfully',
            'policy' => $policy
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Policy $policy)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Policy $policy)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Policy $policy)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Policy $policy)
    {
        //
    }
}
