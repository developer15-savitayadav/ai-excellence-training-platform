<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\AppNotification;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\Enrollment;
use App\Services\CertificateService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    public function index(Request $request)
    {
        $enrollments = Enrollment::query()
            ->where('user_id', $request->user()->id)
            ->with(['course.instructor:id,name,slug,avatar'])
            ->latest('enrolled_at')
            ->get();

        $completed = $enrollments->where('status', 'completed')->count();
        $active = $enrollments->where('status', 'active')->count();

        return Inertia::render('Student/MyLearning', [
            'enrollments' => $enrollments->map(fn (Enrollment $e) => [
                'id' => $e->id,
                'progress' => $e->progress,
                'hoursCompleted' => $e->hours_completed,
                'status' => $e->status,
                'enrolledAt' => $e->enrolled_at?->toDateString(),
                'completedAt' => $e->completed_at?->toDateString(),
                'lastAccessedAt' => $e->last_accessed_at?->diffForHumans(),
                'certificate' => Certificate::where('user_id', $e->user_id)
                    ->where('course_id', $e->course_id)
                    ->where('status', 'active')
                    ->first(['uuid', 'code']),
                'course' => $e->course ? [
                    'id' => $e->course->id,
                    'title' => $e->course->title,
                    'slug' => $e->course->slug,
                    'category' => $e->course->category,
                    'level' => $e->course->level,
                    'duration' => $e->course->duration,
                    'hours' => $e->course->hours,
                    'image' => $e->course->image,
                    'instructor' => $e->course->instructor?->name,
                    'instructorAvatar' => $e->course->instructor?->avatar,
                ] : null,
            ]),
            'stats' => [
                'total' => $enrollments->count(),
                'active' => $active,
                'completed' => $completed,
                'hours' => (int) $enrollments->sum('hours_completed'),
            ],
        ]);
    }

    public function store(Request $request, Course $course)
    {
        abort_unless($course->status === 'published', 404);

        $existing = Enrollment::where('user_id', $request->user()->id)
            ->where('course_id', $course->id)
            ->first();

        if ($existing) {
            return redirect()
                ->route('learn.show', ['slug' => $course->slug])
                ->with('success', 'You are already enrolled in this course.');
        }

        $enrollment = Enrollment::create([
            'user_id' => $request->user()->id,
            'course_id' => $course->id,
            'progress' => 0,
            'hours_completed' => 0,
            'status' => 'active',
            'enrolled_at' => now()->toDateString(),
        ]);

        Activity::log($request->user()->id, 'enrollment.created', "Enrolled in {$course->title}", $enrollment);

        AppNotification::send(
            $request->user()->id,
            'enrollment',
            'Course enrolment confirmed',
            "You are enrolled in {$course->title}. Start your first lesson now.",
            route('learn.show', ['slug' => $course->slug], false),
        );

        return redirect()
            ->route('learn.show', ['slug' => $course->slug])
            ->with('success', "You are enrolled in {$course->title}.");
    }

    public function update(Request $request, Enrollment $enrollment, CertificateService $certificates)
    {
        abort_unless(
            $request->user()->isAdmin() || $enrollment->user_id === $request->user()->id,
            403,
        );

        $data = $request->validate([
            'progress' => ['nullable', 'integer', 'between:0,100'],
            'status' => ['nullable', Rule::in(['active', 'completed', 'dropped'])],
        ]);

        $enrollment->loadMissing(['course:id,title,slug,hours,duration', 'user:id,name,email']);
        $progress = $data['progress'] ?? $enrollment->progress;
        $status = $data['status'] ?? $enrollment->status;

        if ($progress >= 100) {
            $status = 'completed';
            $progress = 100;
        } elseif ($status === 'completed') {
            $progress = 100;
        }

        $wasCompleted = $enrollment->status === 'completed';

        $enrollment->update([
            'progress' => $progress,
            'status' => $status,
            'hours_completed' => (int) round(($enrollment->course?->hoursValue() ?? 0) * ($progress / 100)),
            'completed_at' => $status === 'completed' ? ($enrollment->completed_at ?? now()) : null,
            'last_accessed_at' => now(),
        ]);

        if ($status === 'completed' && ! $wasCompleted) {
            Activity::log(
                $enrollment->user_id,
                'enrollment.completed',
                "Completed {$enrollment->course?->title}",
                $enrollment,
            );

            try {
                $certificate = $certificates->issueForEnrollment($enrollment, null);
                AppNotification::send(
                    $enrollment->user_id,
                    'certificate',
                    'Certificate ready',
                    "Your certificate for {$enrollment->course?->title} is ready to download.",
                    route('student.certificates.index', [], false),
                );
            } catch (ValidationException) {
                // An active certificate already exists for this student/course.
            }
        }

        return back()->with('success', 'Progress updated.');
    }

    public function destroy(Request $request, Enrollment $enrollment)
    {
        abort_unless(
            $request->user()->isAdmin() || $enrollment->user_id === $request->user()->id,
            403,
        );

        $course = $enrollment->course?->title ?? 'course';
        $enrollment->delete();

        return back()->with('success', "You have left {$course}.");
    }
}
