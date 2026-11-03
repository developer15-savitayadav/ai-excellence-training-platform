<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        return Inertia::render('Courses/Index', [
            'courses' => Course::query()
                ->published()
                ->with('instructor:id,name,slug,avatar,specialization')
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get()
                ->map(fn (Course $course) => $course->toCatalogueArray()),
        ]);
    }

    public function show($slug)
    {
        $course = Course::query()
            ->published()
            ->with('instructor:id,name,slug,avatar,specialization,bio')
            ->where('slug', $slug)
            ->first();

        return Inertia::render('Courses/Show', [
            'slug' => $slug,
            'dbCourse' => $course ? $this->present($course) : null,
        ]);
    }

    /**
     * Shape a database course like the static catalogue entries the page expects.
     *
     * @return array<string, mixed>
     */
    private function present(Course $course): array
    {
        $instructor = $course->instructor;

        return [
            'id' => $course->id,
            'title' => $course->title,
            'slug' => $course->slug,
            'subtitle' => $course->subtitle,
            'tagline' => $course->tagline ?: $course->subtitle,
            'description' => $course->description,
            'category' => $course->category,
            'duration' => $course->duration,
            'hours' => $course->hours,
            'classesPerWeek' => $course->schedule,
            'schedule' => $course->schedule,
            'price' => $course->price,
            'originalPrice' => $course->original_price,
            'level' => $course->level,
            'badge' => $course->badge,
            'rating' => (float) $course->rating,
            'reviewCount' => $course->review_count,
            'lessonCount' => $course->lesson_count,
            'image' => $course->image,
            'whoItsFor' => $course->for_whom,
            'prerequisite' => $course->prerequisite,
            'walkAwayWith' => $course->takeaway,
            'theDifference' => $course->difference,
            'careerServices' => $course->career_services ?? [],
            'included' => $course->included ?? [],
            'whatYouLearn' => $course->learning ?? [],
            'monthlyJourney' => $course->months ?? [],
            'cta' => $course->cta,
            'ctaNote' => $course->cta_note,
            'instructorProfile' => $instructor ? [
                'name' => $instructor->name,
                'tagline' => $instructor->specialization ?: 'AI Practitioner & Trainer',
                'bio' => $instructor->bio ?: 'Live, hands-on training from practitioners who build real AI systems.',
                'points' => array_values(array_filter(array_map(
                    'trim',
                    preg_split('/[,;]+/', (string) $instructor->specialization) ?: [],
                ))) ?: ['Live, project-based sessions', 'Feedback on your real work', 'Practical, career-focussed guidance'],
            ] : null,
        ];
    }
}
