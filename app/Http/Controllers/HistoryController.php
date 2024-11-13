<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HistoryController
{

    public function index()
    {
        return Inertia::render('History');
    }
}
