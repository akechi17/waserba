<?php

namespace App\Http\Controllers;

use App\Models\PastProfit;
use Illuminate\Http\Request;

class PastProfitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $pastProfits = PastProfit::with('user')->get();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while getting pastProfits',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'Past profits retrieved successfully',
            'past_profits' => $pastProfits
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
    public function show(PastProfit $pastProfit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PastProfit $pastProfit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PastProfit $pastProfit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PastProfit $pastProfit)
    {
        //
    }
}
