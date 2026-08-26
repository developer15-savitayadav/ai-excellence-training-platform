<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProgrammesController extends Controller
{
    public function index()
    {
        return Inertia::render('Programmes');
    }
}
