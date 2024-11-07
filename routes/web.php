<?php

use App\Http\Controllers\GenerationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/generate', [GenerationController::class, 'index'])->name('generate');
});

require __DIR__.'/auth.php';
