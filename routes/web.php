<?php

use App\Http\Controllers\GenerationController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\CheckSpotifyToken;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::middleware(['auth', CheckSpotifyToken::class])->group(function () {
    Route::get('/generate', [GenerationController::class, 'index'])->name('generate');
});

Route::middleware('auth')->group(function () {
    Route::post('/analyze/image', [GenerationController::class, 'analyzeImage'])->name('analyze.image');
});

require __DIR__.'/auth.php';
