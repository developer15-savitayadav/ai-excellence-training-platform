<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        return Inertia::render('Courses/Index');
    }

    public function show($slug)
    {
        return Inertia::render('Courses/Show', [
            'slug' => $slug,
        ]);
    }
}
