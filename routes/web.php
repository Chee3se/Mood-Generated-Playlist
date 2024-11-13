<?php

use App\Http\Controllers\GenerationController;
use App\Http\Controllers\HistoryController;
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
    Route::get('/history', [HistoryController::class, 'index'])->name('history');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware('auth')->group(function () {
    Route::post('/analyze/image', [GenerationController::class, 'analyzeImage'])->name('analyze.image');
});

Route::post('/emotion', [GenerationController::class, 'store'])->name('emotion.store');

require __DIR__.'/auth.php';
