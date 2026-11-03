<?php

namespace App\Services;

use App\Models\Activity;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Enquiry;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class DashboardService
{
    /** @return array<string, mixed> */
    public function admin(): array
    {
        $students = User::query()->where('role', 'student');
        $totalStudents = (clone $students)->count();
        $activeStudents = (clone $students)->where('is_active', true)->count();
        $inactiveStudents = $totalStudents - $activeStudents;
        $totalCourses = Course::count();
        $publishedCourses = Course::published()->count();
        $totalTrainers = Instructor::count();
        $activeTrainers = Instructor::active()->count();
        $totalCertificates = Certificate::count();
        $activeCertificates = Certificate::where('status', 'active')->count();
        $revokedCertificates = Certificate::where('status', 'revoked')->count();
        $totalEnrollments = Enrollment::count();
        $completedEnrollments = Enrollment::where('status', 'completed')->count();
        $newEnquiries = Enquiry::where('status', 'new')->count();
        $monthlyEnrollments = Enrollment::where('enrolled_at', '>=', now()->startOfMonth())->count();
        $monthlyStudents = User::where('role', 'student')->where('created_at', '>=', now()->startOfMonth())->count();
        $monthlyCertificates = Certificate::where('created_at', '>=', now()->startOfMonth())->count();
        $completionRate = $totalEnrollments > 0
            ? round(($completedEnrollments / $totalEnrollments) * 100, 1)
            : 0;

        $coursePerformance = Course::query()
            ->withCount(['enrollments', 'certificates'])
            ->withAvg('enrollments as avg_progress', 'progress')
            ->with(['instructor:id,name'])
            ->orderByDesc('enrollments_count')
            ->take(8)
            ->get()
            ->map(fn (Course $c) => [
                'id' => $c->id,
                'title' => $c->title,
                'slug' => $c->slug,
                'category' => $c->category,
                'instructor' => $c->instructor?->name,
                'enrollments' => $c->enrollments_count,
                'certificates' => $c->certificates_count,
                'avgProgress' => round((float) ($c->avg_progress ?? 0), 1),
                'rating' => (float) $c->rating,
            ])->values();

        $latestEnrollments = Enrollment::query()
            ->with(['user:id,name,email,avatar', 'course:id,title,slug'])
            ->latest()
            ->take(6)
            ->get()
            ->map(fn (Enrollment $e) => [
                'id' => $e->id,
                'student' => $e->user?->name ?? 'Deleted user',
                'email' => $e->user?->email,
                'course' => $e->course?->title ?? 'Deleted course',
                'progress' => $e->progress,
                'status' => $e->status,
                'createdAt' => $e->created_at?->toIso8601String(),
            ]);

        $latestEnquiries = Enquiry::query()->latest()->take(5)->get()->map(fn (Enquiry $e) => [
            'id' => $e->id,
            'name' => $e->name,
            'program' => $e->program,
            'status' => $e->status,
            'createdAt' => $e->created_at?->toIso8601String(),
        ]);

        $months = $this->lastMonths(12);
        $enrollmentRows = Enrollment::query()
            ->where('enrolled_at', '>=', $months->first()['start'])
            ->get(['enrolled_at', 'status']);
        $certificateRows = Certificate::query()
            ->where('created_at', '>=', $months->first()['start'])
            ->get(['created_at', 'status']);
        $studentRows = User::query()
            ->where('role', 'student')
            ->where('created_at', '>=', $months->first()['start'])
            ->get(['created_at']);

        $enrollmentSeries = $this->monthlySeries($months, $enrollmentRows, 'enrolled_at');
        $completionSeries = $this->monthlySeries(
            $months,
            $enrollmentRows->where('status', 'completed'),
            'enrolled_at',
        );
        $certificateSeries = $this->monthlySeries($months, $certificateRows, 'created_at');
        $studentSeries = $this->monthlySeries($months, $studentRows, 'created_at');

        return [
            'stats' => [
                ['id' => 'students', 'label' => 'Total Students', 'value' => $totalStudents, 'icon' => 'users', 'accent' => 'violet', 'hint' => "{$activeStudents} active · {$inactiveStudents} inactive", 'trend' => $monthlyStudents, 'trendLabel' => 'new this month'],
                ['id' => 'courses', 'label' => 'Total Courses', 'value' => $totalCourses, 'icon' => 'book', 'accent' => 'lime', 'hint' => "{$publishedCourses} published", 'trend' => null, 'trendLabel' => null],
                ['id' => 'trainers', 'label' => 'Total Trainers', 'value' => $totalTrainers, 'icon' => 'graduation', 'accent' => 'sky', 'hint' => "{$activeTrainers} active", 'trend' => null, 'trendLabel' => null],
                ['id' => 'certificates', 'label' => 'Certificates', 'value' => $totalCertificates, 'icon' => 'award', 'accent' => 'gold', 'hint' => "{$activeCertificates} valid · {$revokedCertificates} revoked", 'trend' => $monthlyCertificates, 'trendLabel' => 'issued this month'],
            ],
            'secondary' => [
                ['label' => 'Active Students', 'value' => $activeStudents, 'icon' => 'activity', 'accent' => 'emerald'],
                ['label' => 'Inactive Students', 'value' => $inactiveStudents, 'icon' => 'userX', 'accent' => 'rose'],
                ['label' => 'Enrollments', 'value' => $totalEnrollments, 'icon' => 'layers', 'accent' => 'violet', 'sub' => "{$monthlyEnrollments} this month"],
                ['label' => 'Completion Rate', 'value' => $completionRate, 'suffix' => '%', 'icon' => 'target', 'accent' => 'lime', 'sub' => "{$completedEnrollments} completed"],
                ['label' => 'New Enquiries', 'value' => $newEnquiries, 'icon' => 'message', 'accent' => 'amber', 'sub' => 'awaiting response'],
                ['label' => 'Certificates Issued', 'value' => $activeCertificates, 'icon' => 'award', 'accent' => 'sky', 'sub' => 'currently valid'],
            ],
            'charts' => [
                'months' => $months->pluck('label')->all(),
                'enrollments' => $enrollmentSeries,
                'completions' => $completionSeries,
                'certificates' => $certificateSeries,
                'students' => $studentSeries,
                'courseDistribution' => Course::query()
                    ->withCount('enrollments')
                    ->has('enrollments')
                    ->orderByDesc('enrollments_count')
                    ->take(6)
                    ->get(['id', 'title'])
                    ->map(fn (Course $c) => ['label' => $c->title, 'value' => $c->enrollments_count])
                    ->values()
                    ->all(),
                'certificateStatus' => [
                    ['label' => 'Active', 'value' => $activeCertificates, 'color' => '#34d399'],
                    ['label' => 'Revoked', 'value' => $revokedCertificates, 'color' => '#ff5a5a'],
                    ['label' => 'Expired', 'value' => Certificate::whereNotNull('expires_at')->whereDate('expires_at', '<', now())->count(), 'color' => '#eec369'],
                ],
                'tiers' => Course::query()
                    ->selectRaw('tier, count(*) as total')
                    ->groupBy('tier')
                    ->pluck('total', 'tier')
                    ->map(fn ($v, $k) => ['label' => ucfirst(str_replace('-', ' ', (string) $k)), 'value' => (int) $v])
                    ->values()
                    ->all(),
            ],
            'coursePerformance' => $coursePerformance,
            'latestEnrollments' => $latestEnrollments,
            'latestEnquiries' => $latestEnquiries,
            'recentActivity' => $this->recentActivity(),
        ];
    }

    /** @return array<string, mixed> */
    public function student(User $user): array
    {
        $enrollments = Enrollment::query()
            ->where('user_id', $user->id)
            ->with(['course.instructor:id,name,slug,avatar'])
            ->latest('enrolled_at')
            ->get();

        $courseIds = $enrollments->pluck('course_id');
        $certificates = Certificate::query()
            ->where('user_id', $user->id)
            ->latest('issued_at')
            ->get()
            ->map(fn (Certificate $c) => [
                'id' => $c->id,
                'uuid' => $c->uuid,
                'code' => $c->code,
                'courseName' => $c->course_title,
                'courseSlug' => $c->course_slug,
                'issuedAt' => $c->issued_at?->toDateString(),
                'expiresAt' => $c->expires_at?->toDateString(),
                'grade' => $c->grade,
                'score' => $c->score,
                'instructorName' => $c->instructor_name,
                'status' => $c->isRevoked() ? 'revoked' : ($c->isExpired() ? 'expired' : 'active'),
                'downloadUrl' => route('certificates.download', ['certificate' => $c->uuid], false),
                'verifyUrl' => route('certificate.verify', ['code' => $c->code], false),
            ]);

        $notifications = $user->notifications()
            ->latest()
            ->take(30)
            ->get()
            ->map(fn ($n) => [
                'id' => $n->id,
                'type' => $n->type,
                'title' => $n->title,
                'message' => $n->message,
                'actionUrl' => $n->action_url,
                'read' => $n->read_at !== null,
                'createdAt' => $n->created_at?->toIso8601String(),
            ]);

        $recommendations = Course::query()
            ->published()
            ->whereNotIn('id', $courseIds)
            ->with('instructor:id,name,slug,avatar')
            ->orderByDesc('rating')
            ->take(4)
            ->get()
            ->map(fn (Course $c) => $this->courseCard($c));

        $wishlist = $user->wishlist()
            ->with('instructor:id,name,slug,avatar')
            ->get()
            ->map(fn (Course $c) => $this->courseCard($c));

        $hoursLearned = (int) $enrollments->sum('hours_completed');
        $completed = $enrollments->where('status', 'completed')->count();
        $inProgress = $enrollments->where('status', 'active')->count();

        return [
            'stats' => [
                ['id' => 'enrolled', 'label' => 'Enrolled Courses', 'value' => $enrollments->count(), 'icon' => 'book', 'accent' => 'violet', 'hint' => "{$inProgress} in progress"],
                ['id' => 'completed', 'label' => 'Completed', 'value' => $completed, 'icon' => 'check', 'accent' => 'emerald', 'hint' => $enrollments->count() ? round(($completed / $enrollments->count()) * 100).'% completion rate' : 'Start learning'],
                ['id' => 'hours', 'label' => 'Hours Learned', 'value' => $hoursLearned, 'icon' => 'clock', 'accent' => 'sky', 'hint' => 'tracked across courses'],
                ['id' => 'certificates', 'label' => 'Certificates', 'value' => $certificates->where('status', 'active')->count(), 'icon' => 'award', 'accent' => 'gold', 'hint' => $certificates->count().' total issued'],
            ],
            'enrollments' => $enrollments->map(fn (Enrollment $e) => [
                'id' => $e->id,
                'progress' => $e->progress,
                'hoursCompleted' => $e->hours_completed,
                'status' => $e->status,
                'enrolledAt' => $e->enrolled_at?->toDateString(),
                'lastAccessedAt' => $e->last_accessed_at?->toIso8601String(),
                'completedAt' => $e->completed_at?->toDateString(),
                'course' => $e->course ? [
                    'id' => $e->course->id,
                    'title' => $e->course->title,
                    'slug' => $e->course->slug,
                    'duration' => $e->course->duration,
                    'hours' => $e->course->hours,
                    'level' => $e->course->level,
                    'image' => $e->course->image,
                    'category' => $e->course->category,
                    'instructor' => $e->course->instructor?->name,
                    'instructorAvatar' => $e->course->instructor?->avatar,
                    'learnUrl' => route('learn.show', ['slug' => $e->course->slug], false),
                    'courseUrl' => route('courses.show', ['slug' => $e->course->slug], false),
                ] : null,
            ]),
            'certificates' => $certificates,
            'notifications' => $notifications,
            'recommendations' => $recommendations,
            'wishlist' => $wishlist,
            'recentActivity' => $this->studentActivity($enrollments, $certificates),
        ];
    }

    /** @return array<string, mixed> */
    public function instructor(Instructor $instructor): array
    {
        $courseIds = $instructor->courses()->pluck('id');
        $courses = $instructor->courses()->withCount('enrollments')->orderByDesc('enrollments_count')->get();
        $enrollments = Enrollment::whereIn('course_id', $courseIds)->get();
        $certificates = Certificate::whereIn('course_id', $courseIds)->get();

        $months = $this->lastMonths(12);
        $rows = Enrollment::whereIn('course_id', $courseIds)
            ->where('enrolled_at', '>=', $months->first()['start'])
            ->get(['enrolled_at', 'status']);

        $totalStudents = $enrollments->unique('user_id')->count();
        $completed = $enrollments->where('status', 'completed')->count();
        $avgProgress = $enrollments->count() ? round($enrollments->avg('progress'), 1) : 0;

        return [
            'instructor' => [
                'id' => $instructor->id,
                'name' => $instructor->name,
                'slug' => $instructor->slug,
                'title' => $instructor->title,
                'specialization' => $instructor->specialization,
                'avatar' => $instructor->avatar,
                'rating' => (float) $instructor->rating,
            ],
            'stats' => [
                ['id' => 'students', 'label' => 'My Students', 'value' => $totalStudents, 'icon' => 'users', 'accent' => 'violet', 'hint' => 'unique learners'],
                ['id' => 'courses', 'label' => 'My Courses', 'value' => $courses->count(), 'icon' => 'book', 'accent' => 'lime', 'hint' => $courses->where('status', 'published')->count().' published'],
                ['id' => 'certificates', 'label' => 'Certificates', 'value' => $certificates->where('status', 'active')->count(), 'icon' => 'award', 'accent' => 'gold', 'hint' => 'issued to my students'],
                ['id' => 'completion', 'label' => 'Avg. Completion', 'value' => $avgProgress, 'suffix' => '%', 'icon' => 'target', 'accent' => 'emerald', 'hint' => "{$completed} completed enrollments"],
            ],
            'charts' => [
                'months' => $months->pluck('label')->all(),
                'enrollments' => $this->monthlySeries($months, $rows, 'enrolled_at'),
                'completions' => $this->monthlySeries($months, $rows->where('status', 'completed'), 'enrolled_at'),
                'courseDistribution' => $courses->map(fn (Course $c) => ['label' => $c->title, 'value' => $c->enrollments_count])->values()->all(),
            ],
            'courses' => $courses->map(fn (Course $c) => [
                'id' => $c->id,
                'title' => $c->title,
                'slug' => $c->slug,
                'category' => $c->category,
                'status' => $c->status,
                'level' => $c->level,
                'rating' => (float) $c->rating,
                'enrollments' => $c->enrollments_count,
                'image' => $c->image,
            ]),
            'recentEnrollments' => Enrollment::whereIn('course_id', $courseIds)
                ->with(['user:id,name,email', 'course:id,title,slug'])
                ->latest()
                ->take(8)
                ->get()
                ->map(fn (Enrollment $e) => [
                    'id' => $e->id,
                    'student' => $e->user?->name ?? 'Deleted user',
                    'email' => $e->user?->email,
                    'course' => $e->course?->title,
                    'progress' => $e->progress,
                    'status' => $e->status,
                    'createdAt' => $e->created_at?->toIso8601String(),
                ]),
        ];
    }

    private function courseCard(Course $c): array
    {
        return [
            'id' => $c->id,
            'title' => $c->title,
            'slug' => $c->slug,
            'tagline' => $c->tagline,
            'price' => $c->price,
            'duration' => $c->duration,
            'hours' => $c->hours,
            'level' => $c->level,
            'category' => $c->category,
            'rating' => (float) $c->rating,
            'image' => $c->image,
            'instructor' => $c->instructor?->name,
            'instructorAvatar' => $c->instructor?->avatar,
        ];
    }

    /** @return Collection<int, array{start: Carbon, label: string, key: string}> */
    private function lastMonths(int $count): Collection
    {
        return collect(range($count - 1, 0))->map(function (int $back) {
            $date = now()->startOfMonth()->subMonths($back);

            return [
                'start' => $date->copy(),
                'label' => $date->format('M'),
                'key' => $date->format('Y-m'),
            ];
        })->values();
    }

    /** @return list<int> */
    private function monthlySeries(Collection $months, Collection $rows, string $column): array
    {
        $counts = $rows->groupBy(function ($row) use ($column) {
            $value = $row->{$column};

            return $value instanceof \DateTimeInterface
                ? $value->format('Y-m')
                : Carbon::parse($value)->format('Y-m');
        })->map->count();

        return $months->map(fn (array $m) => (int) ($counts[$m['key']] ?? 0))->all();
    }

    /** @return list<array<string, mixed>> */
    private function recentActivity(): array
    {
        $entries = collect();

        Activity::with('user:id,name')->latest()->take(8)->get()->each(function (Activity $a) use (&$entries) {
            $entries->push([
                'id' => 'activity-'.$a->id,
                'type' => $a->type,
                'description' => $a->description,
                'actor' => $a->user?->name,
                'createdAt' => $a->created_at?->toIso8601String(),
            ]);
        });

        Enrollment::with(['user:id,name', 'course:id,title'])->latest()->take(6)->get()
            ->each(function (Enrollment $e) use (&$entries) {
                $entries->push([
                    'id' => 'enrollment-'.$e->id,
                    'type' => 'enrollment',
                    'description' => ($e->user?->name ?? 'A student').' enrolled in '.($e->course?->title ?? 'a course'),
                    'actor' => $e->user?->name,
                    'createdAt' => $e->created_at?->toIso8601String(),
                ]);
            });

        Certificate::with('user:id,name')->latest()->take(5)->get()->each(function (Certificate $c) use (&$entries) {
            $entries->push([
                'id' => 'certificate-'.$c->id,
                'type' => 'certificate',
                'description' => "Certificate {$c->code} issued to {$c->student_name}",
                'actor' => $c->user?->name,
                'createdAt' => $c->created_at?->toIso8601String(),
            ]);
        });

        Enquiry::latest()->take(4)->get()->each(function (Enquiry $e) use (&$entries) {
            $entries->push([
                'id' => 'enquiry-'.$e->id,
                'type' => 'enquiry',
                'description' => "New enquiry from {$e->name} about {$e->program}",
                'actor' => $e->name,
                'createdAt' => $e->created_at?->toIso8601String(),
            ]);
        });

        User::where('role', 'student')->latest()->take(4)->get()->each(function (User $u) use (&$entries) {
            $entries->push([
                'id' => 'user-'.$u->id,
                'type' => 'student',
                'description' => "{$u->name} joined the platform",
                'actor' => $u->name,
                'createdAt' => $u->created_at?->toIso8601String(),
            ]);
        });

        return $entries
            ->filter(fn ($e) => $e['createdAt'] !== null)
            ->sortByDesc('createdAt')
            ->take(12)
            ->values()
            ->all();
    }

    /** @return list<array<string, mixed>> */
    private function studentActivity(Collection $enrollments, Collection $certificates): array
    {
        $entries = collect();

        $enrollments->each(function (Enrollment $e) use (&$entries) {
            $entries->push([
                'id' => 'enrollment-'.$e->id,
                'type' => 'enrollment',
                'description' => 'Enrolled in '.($e->course?->title ?? 'a course'),
                'createdAt' => $e->created_at?->toIso8601String(),
            ]);
            if ($e->completed_at) {
                $entries->push([
                    'id' => 'completion-'.$e->id,
                    'type' => 'completion',
                    'description' => 'Completed '.($e->course?->title ?? 'a course'),
                    'createdAt' => $e->completed_at->toIso8601String(),
                ]);
            }
        });

        $certificates->each(function (array $c) use (&$entries) {
            $entries->push([
                'id' => 'certificate-'.$c['id'],
                'type' => 'certificate',
                'description' => "Earned a certificate for {$c['courseName']}",
                'createdAt' => Carbon::parse($c['issuedAt'])->toIso8601String(),
            ]);
        });

        return $entries->sortByDesc('createdAt')->take(10)->values()->all();
    }
}
