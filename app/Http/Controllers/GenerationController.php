<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use function Pest\Laravel\post;

class GenerationController extends Controller
{
    public function index()
    {
        $spotifyAccessToken = Cache::get('spotify_access_token');
        return Inertia::render('Generate', [
            'spotify_access_token' => $spotifyAccessToken,
        ]);
    }

    public function analyzeImage(Request $request) {
        $request->validate([
            'image' => 'required|image',
        ]);

        $response = Http::asMultipart()->post('localhost:5002/analyze', [
            'image' => fopen($request->file('image')->getPathname(), 'r'),
        ]);

        return $response->json('emotion');
    }
}
