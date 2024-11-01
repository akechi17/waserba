<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Information;
use Illuminate\Http\Request;

class InformationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $information = Information::all();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error while getting information',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'Information retrieved successfully',
            'information' => $information,
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
                'pdf' => 'required',
            ]);
        } catch (ValidationException $e) {
            $errors = $e->validator->errors()->toArray();

            return response()->json([
                'message' => 'Invalid field',
                'error' => $errors
            ]);
        }

        $file = $request->file('pdf');
        $filename = $file->getClientOriginalName();
        $path = $file->move(storage_path('app/public/pdf'), $filename);
        Information::create([
            'pdf' => 'storage/pdf/' . $filename
        ]);

        return response()->json([
            'message' => 'File berhasil diunggah'
        ], 201);
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

    /**
    * Remove the specified resource from storage.
    */
    public function destroy($id)
    {
        try {
            $information = Information::findOrFail($id);

            $information->delete();

            return response()->json([
                'status' => true,
                'message' => 'File berhasil dihapus',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus File',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
