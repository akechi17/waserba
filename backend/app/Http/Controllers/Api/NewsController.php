<?php

namespace App\Http\Controllers\Api;

use App\Models\News;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $news = News::all();

        if ($news->count() > 0) {
            $context = [
                'status' => true,
                'message' => 'Data berita ditemukan',
                'news' => $news,
            ];

            return response()->json($context, 200);
        } else {
            $context = [
                'status' => false,
                'message' => 'Data berita tidak ditemukan',
                'news' => [],
            ];

            return response()->json($context, 204);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'content' => 'required|string',
            'newsable_type' => 'required|string',
            'newsable_id' => 'required|integer',
        ]);

        $news = News::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => auth()->user()->id,
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(storage_path('app/public/news'), $imageName);
            $news->update(['image' => 'storage/news/' . $imageName]);
        }

        return response()->json([
            'message' => 'Berita berhasil diunggah!',
            'pdf' => $news
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $news = News::findOrFail($id);

            $context = [
                'status' => true,
                'message' => 'Data berita ditemukan',
                'news' => $news,
            ];

            return response()->json($context, 200);
        } catch (\Exception $e) {
            $context = [
                'status' => false,
                'message' => 'Data berita tidak ditemukan',
                'news' => [],
            ];

            return response()->json($context, 204);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $news = News::findOrFail($id);

            $news->delete();

            return response()->json([
                'status' => true,
                'message' => 'Kegiatan berhasil dihapus',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal menghapus kegiatan',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
