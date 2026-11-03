<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\AppNotification;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EnrollmentAdminController extends Controller
{
    public function index(Request $request)
    {
        $filters = [
            'q' => trim((string) $request->query('q', '')),
            'status' => (string) $request->query('status', 'all'),
            'course' => (string) $request->query('course', 'all'),
            'sort' => (string) $request->query('sort', 'created_at'),
            'direction' => strtolower((string) $request->query('direction', 'desc')) === 'asc' ? 'asc' : 'desc',
        ];

        $sortable = ['created_at', 'progress', 'enrolled_at', 'status'];
        if (! in_array($filters['sort'], $sortable, true)) {
            $filters['sort'] = 'created_at';
        }

        $enrollments = Enrollment::query()
            ->with(['user:id,name,email,avatar', 'course:id,title,slug,hours,duration'])
            ->when($filters['q'] !== '', function ($query) use ($filters) {
                $term = $filters['q'];
                $query->where(function ($w) use ($term) {
                    $w->whereHas('user', fn ($u) => $u
                        ->whereLike('name', "%{$term}%")
                        ->orWhereLike('email', "%{$term}%"))
                        ->orWhereHas('course', fn ($c) => $c->whereLike('title', "%{$term}%"));
                });
            })
            ->when($filters['status'] !== 'all', fn ($q) => $q->where('status', $filters['status']))
            ->when($filters['course'] !== 'all', fn ($q) => $q->where('course_id', $filters['course']))
            ->orderBy($filters['sort'], $filters['direction'])
            ->paginate(15)
            ->withQueryString()
            ->through(fn (Enrollment $e) => [
                'id' => $e->id,
                'studentId' => $e->user_id,
                'student' => $e->user?->name ?? 'Deleted user',
                'email' => $e->user?->email,
                'avatar' => $e->user?->avatar,
                'courseId' => $e->course_id,
                'course' => $e->course?->title ?? 'Deleted course',
                'courseSlug' => $e->course?->slug,
                'progress' => $e->progress,
                'hoursCompleted' => $e->hours_completed,
                'status' => $e->status,
                'enrolledAt' => $e->enrolled_at?->toDateString(),
                'completedAt' => $e->completed_at?->toDateString(),
                'lastAccessedAt' => $e->last_accessed_at?->diffForHumans(),
            ]);

        return Inertia::render('Admin/Enrollments/Index', [
            'enrollments' => $enrollments,
            'filters' => $filters,
            'courses' => Course::orderBy('title')->get(['id', 'title', 'slug']),
            'students' => User::query()
                ->where('role', 'student')
                ->orderBy('name')
                ->get(['id', 'name', 'email']),
            'stats' => [
                'total' => Enrollment::count(),
                'active' => Enrollment::where('status', 'active')->count(),
                'completed' => Enrollment::where('status', 'completed')->count(),
                'dropped' => Enrollment::where('status', 'dropped')->count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'course_id' => ['required', 'integer', 'exists:courses,id'],
            'status' => ['nullable', Rule::in(['active', 'completed', 'dropped'])],
        ]);

        $exists = Enrollment::where('user_id', $data['user_id'])
            ->where('course_id', $data['course_id'])
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'course_id' => 'This student is already enrolled in the selected course.',
            ]);
        }

        $course = Course::findOrFail($data['course_id']);
        $student = User::findOrFail($data['user_id']);
        $status = $data['status'] ?? 'active';

        $enrollment = Enrollment::create([
            'user_id' => $student->id,
            'course_id' => $course->id,
            'progress' => $status === 'completed' ? 100 : 0,
            'hours_completed' => $status === 'completed' ? $course->hoursValue() : 0,
            'status' => $status,
            'enrolled_at' => now()->toDateString(),
            'completed_at' => $status === 'completed' ? now() : null,
        ]);

        Activity::log($request->user()->id, 'enrollment.created', "Enrolled {$student->name} in {$course->title}", $enrollment);

        AppNotification::send(
            $student->id,
            'enrollment',
            'New course enrolment',
            "You are now enrolled in {$course->title}.",
            route('learn.show', ['slug' => $course->slug], false),
        );

        return back()->with('success', "{$student->name} was enrolled in {$course->title}.");
    }

    public function update(Request $request, Enrollment $enrollment)
    {
        $data = $request->validate([
            'progress' => ['required', 'integer', 'between:0,100'],
            'status' => ['required', Rule::in(['active', 'completed', 'dropped'])],
        ]);

        $enrollment->loadMissing(['user:id,name', 'course:id,title,hours,duration']);

        $progress = (int) $data['progress'];
        $status = $data['status'];

        if ($status === 'completed') {
            $progress = 100;
        } elseif (! in_array($status, ['completed'], true) && $progress >= 100) {
            $status = 'completed';
        }

        $enrollment->update([
            'progress' => $progress,
            'status' => $status,
            'hours_completed' => (int) round($enrollment->course?->hoursValue() * ($progress / 100)),
            'completed_at' => $status === 'completed'
                ? ($enrollment->completed_at ?? now())
                : null,
            'last_accessed_at' => now(),
        ]);

        Activity::log(
            $request->user()->id,
            'enrollment.updated',
            "Updated {$enrollment->user?->name}'s progress in {$enrollment->course?->title} to {$progress}%",
            $enrollment,
        );

        if ($status === 'completed' && $enrollment->wasChanged('status')) {
            AppNotification::send(
                $enrollment->user_id,
                'completion',
                'Course completed',
                "You completed {$enrollment->course?->title}. Your certificate is now available.",
                route('student.certificates.index', [], false),
            );
        }

        return back()->with('success', 'Enrolment updated.');
    }

    public function destroy(Request $request, Enrollment $enrollment)
    {
        $enrollment->loadMissing(['user:id,name', 'course:id,title']);
        $name = $enrollment->user?->name ?? 'Student';
        $course = $enrollment->course?->title ?? 'course';

        $enrollment->delete();

        Activity::log($request->user()->id, 'enrollment.deleted', "Removed {$name} from {$course}");

        return back()->with('success', "{$name} was removed from {$course}.");
    }
}
