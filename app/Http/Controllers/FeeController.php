<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class FeeController extends Controller
{
    public function index()
    {
        return Inertia::render('Fee');
    }
}
