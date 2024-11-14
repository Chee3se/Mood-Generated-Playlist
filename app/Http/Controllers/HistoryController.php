<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoryController
{

    public function index()
    {
        $histories = History::where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('History', [
            'histories' => $histories
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'emotion' => 'required|string',
            'album_link' => 'required|string',
            'album_name' => 'required|string',
            'img' => 'required|string',
        ]);

        $history = History::create([
            'user_id' => auth()->id(), // Assumes you're using authentication
            'emotion' => $validated['emotion'],
            'album_link' => $validated['album_link'],
            'album_name' => $validated['album_name'],
            'img' => $validated['img'],
        ]);

        return response()->json($history, 201);
    }

    public function toggleFavorite(History $history)
    {
        $history->is_favorite = !$history->is_favorite;
        $history->save();

        return back();
    }
}
