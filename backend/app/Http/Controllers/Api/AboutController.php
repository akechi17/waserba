<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $about = About::first();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while getting about',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'About retrieved successfully',
            'about' => $about,
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
    public function show(About $about)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(About $about)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'legal_entity_id' => 'required|integer',
            'legal_entity_date' => 'required',
            'president' => 'required|string|max:255',
            'vice_president' => 'required|string|max:255',
            'secretary' => 'required|string|max:255',
            'supervisor' => 'required|string|max:255',
            'supervisor2' => 'required|string|max:255',
            'supervisor3' => 'required|string|max:255',
            'treasurer' => 'required|string|max:255',
            'syariah_supervisor' => 'required|string|max:255',
            'syariah_supervisor2' => 'required|string|max:255',
            'syariah_supervisor3' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'accounting_period' => 'required|string|max:255',
            'accounting_year' => 'required|string|max:255',
            'first_accounting_date' => 'required|max:255',
            'last_accounting_date' => 'required|max:255'
        ]);

        try {
            $about = About::findOrFail($id);

            $about->update($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Identitas Koperasi berhasil diupdate',
                'about' => $about,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error while updating about',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function uploadPdf(Request $request)
    {
        $about = About::where('id', 1)->first();
        $file = $request->file('pdf');
        $filename = $file->getClientOriginalName();
        $path = $file->move(storage_path('app/public/pdf'), $filename);
        $about->pdf = 'storage/pdf/' . $filename;
        $about->save();
        return response()->json([
            'message' => 'PDF berhasil diunggah',
            'pdf' => $about->pdf
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(About $about)
    {
        //
    }
}
