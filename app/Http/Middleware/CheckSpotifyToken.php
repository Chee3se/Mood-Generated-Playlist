<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class CheckSpotifyToken
{
    public function handle($request, Closure $next)
    {
        if (!Cache::has('spotify_access_token')) {
            $this->refreshToken();
        }

        return $next($request);
    }

    private function refreshToken()
    {
        $clientId = env('SPOTIFY_CLIENT_ID');
        $clientSecret = env('SPOTIFY_CLIENT_SECRET');
        $response = Http::asForm()->withOptions(['verify' => false])->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
            'client_id' => $clientId,
            'client_secret' => $clientSecret,
        ]);

        if ($response->successful()) {
            $token = $response->json()['access_token'];
            Cache::put('spotify_access_token', $token, 3600); // Cache for 1 hour
        } else {
            // Handle error
            abort(500, 'Unable to refresh Spotify token');
        }
    }
}
