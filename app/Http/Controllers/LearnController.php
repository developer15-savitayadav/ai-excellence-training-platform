<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LearnController extends Controller
{
    public function show(Request $request, string $slug)
    {
        $course = Course::query()
            ->with('instructor:id,name,slug,avatar,bio,title,specialization,rating,student_count')
            ->where('slug', $slug)
            ->first();

        abort_if(! $course, 404, 'Course not found.');

        $user = $request->user();
        $isOwnerInstructor = $user->isInstructor()
            && $course->instructor
            && $course->instructor->user_id === $user->id;

        $enrollment = Enrollment::query()
            ->where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if (! $user->isAdmin() && ! $isOwnerInstructor) {
            abort_unless($enrollment, 403, 'You must be enrolled in this course to view the lessons.');
        }

        if ($enrollment) {
            $enrollment->update(['last_accessed_at' => now()]);
        }

        $items = collect($course->learning ?? [])
            ->filter(fn ($item) => is_string($item) && trim($item) !== '')
            ->values();

        if ($items->isEmpty()) {
            $items = collect([
                "Orientation to {$course->title}",
                'Core concepts and guided practice',
                'Applied project work',
                'Assessment and next steps',
            ]);
        }

        $sections = $items
            ->chunk(4)
            ->values()
            ->map(function ($chunk, $sectionIndex) use ($course, $items) {
                $lessons = $chunk->values()->map(function ($item, $lessonIndex) use ($sectionIndex, $course) {
                    $html = '<p class="mb-4">'.e($item).'</p>'
                        .'<p class="mb-4">This lesson is part of <strong>'.e($course->title).'</strong>. '
                        .'Work through the material, take notes, and mark the lesson complete when you are confident.</p>';

                    if ($course->description) {
                        $html .= '<p class="mb-4">'.e($course->description).'</p>';
                    }

                    $html .= '<p>Need help? Contact your instructor'
                        .($course->instructor ? ' '.e($course->instructor->name) : '')
                        .' or revisit the course overview for learning outcomes and resources.</p>';

                    return [
                        'id' => 'sec'.($sectionIndex + 1).'-lesson'.($lessonIndex + 1),
                        'title' => Str::limit($item, 80),
                        'type' => 'article',
                        'duration' => 15 + ($lessonIndex * 5),
                        'isPreview' => $sectionIndex === 0 && $lessonIndex === 0,
                        'content' => $html,
                        'description' => $item,
                    ];
                })->all();

                return [
                    'id' => 'section-'.($sectionIndex + 1),
                    'title' => $items->count() > 4
                        ? 'Module '.($sectionIndex + 1)
                        : 'Course content',
                    'lessons' => $lessons,
                ];
            })
            ->all();

        $totalLessons = collect($sections)->sum(fn ($s) => count($s['lessons']));
        $completedLessons = (int) round(($enrollment?->progress ?? 0) / 100 * $totalLessons);

        $instructor = $course->instructor;

        return Inertia::render('Learn/Player', [
            'course' => [
                'id' => $course->id,
                'slug' => $course->slug,
                'title' => $course->title,
                'description' => $course->description ?? $course->tagline,
                'tagline' => $course->tagline,
                'instructor' => $instructor ? [
                    'name' => $instructor->name,
                    'avatar' => $instructor->avatar,
                    'bio' => $instructor->bio,
                    'rating' => (float) $instructor->rating,
                    'courseCount' => $instructor->courses()->count(),
                    'studentCount' => $instructor->student_count,
                    'specialties' => array_filter([$instructor->specialization]),
                ] : null,
                'category' => $course->category,
                'level' => $course->level,
                'image' => $course->image,
            ],
            'sections' => $sections,
            'currentLesson' => $sections[0]['lessons'][0] ?? null,
            'progress' => [
                'completedLessons' => $completedLessons,
                'totalLessons' => $totalLessons,
                'percentage' => $enrollment?->progress ?? 0,
            ],
            'enrollment' => $enrollment ? [
                'id' => $enrollment->id,
                'progress' => $enrollment->progress,
                'status' => $enrollment->status,
                'updateUrl' => route('student.enrollments.update', ['enrollment' => $enrollment->id], false),
            ] : null,
        ]);
    }
}
