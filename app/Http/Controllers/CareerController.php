<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CareerController extends Controller
{
    public function index()
    {
        return Inertia::render('Career');
    }
}
