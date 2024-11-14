<?php

namespace App\Http\Controllers;

use App\Events\EmotionDetected;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
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

        $response = Http::asMultipart()->withOptions(['verify'=>false])->post('http://localhost:6000', [
            'image' => fopen($request->file('image')->getPathname(), 'r'),
        ]);

        return $response->json('emotion');
    }

    public function store(Request $request)
    {
        $emotion = $request->input('emotion');
        event(new EmotionDetected($emotion));
        return response()->json(['status' => 'success']);
    }
}
