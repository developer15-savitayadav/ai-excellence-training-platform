<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class OfflineCoursesController extends Controller
{
    public function index()
    {
        return Inertia::render('OfflineCourses', []);
    }
}
