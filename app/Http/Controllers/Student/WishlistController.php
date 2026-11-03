<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $courses = $request->user()
            ->wishlist()
            ->with('instructor:id,name,slug,avatar')
            ->latest('wishlists.created_at')
            ->get()
            ->map(fn (Course $c) => [
                'id' => $c->id,
                'title' => $c->title,
                'slug' => $c->slug,
                'tagline' => $c->tagline,
                'category' => $c->category,
                'level' => $c->level,
                'duration' => $c->duration,
                'hours' => $c->hours,
                'price' => $c->price,
                'rating' => (float) $c->rating,
                'image' => $c->image,
                'instructor' => $c->instructor?->name,
                'enrolled' => $request->user()->enrollments()->where('course_id', $c->id)->exists(),
            ]);

        return Inertia::render('Student/Wishlist', [
            'courses' => $courses,
        ]);
    }

    public function store(Request $request, Course $course)
    {
        $request->user()->wishlist()->syncWithoutDetaching([$course->id]);

        return back()->with('success', "{$course->title} was added to your wishlist.");
    }

    public function destroy(Request $request, Course $course)
    {
        $request->user()->wishlist()->detach($course->id);

        return back()->with('success', "{$course->title} was removed from your wishlist.");
    }
}
