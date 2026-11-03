<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Enquiry;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportController extends Controller
{
    private const TYPES = ['students', 'enrollments', 'certificates', 'enquiries'];

    public function index(Request $request)
    {
        [$from, $to] = $this->range($request);

        $enrollments = Enrollment::query()
            ->with(['user:id,name,email', 'course:id,title,slug,category'])
            ->whereBetween('enrolled_at', [$from->toDateString(), $to->toDateString()])
            ->get();

        $certificates = Certificate::query()
            ->whereBetween('issued_at', [$from->toDateString(), $to->toDateString()])
            ->get();

        $students = User::query()
            ->where('role', 'student')
            ->whereBetween('created_at', [$from->copy()->startOfDay(), $to->copy()->endOfDay()])
            ->get();

        $enquiries = Enquiry::query()
            ->whereBetween('created_at', [$from->copy()->startOfDay(), $to->copy()->endOfDay()])
            ->get();

        $months = collect();
        $cursor = $from->copy()->startOfMonth();
        while ($cursor->lessThanOrEqualTo($to)) {
            $months->push([
                'key' => $cursor->format('Y-m'),
                'label' => $cursor->format('M Y'),
            ]);
            $cursor->addMonth();
        }

        $perMonth = fn (Collection $rows, string $column) => $months->map(function (array $m) use ($rows, $column) {
            return $rows->filter(function ($row) use ($m, $column) {
                $value = $row->{$column};

                return $value && Carbon::parse($value)->format('Y-m') === $m['key'];
            })->count();
        })->all();

        $courseRows = Course::query()
            ->withCount(['enrollments' => fn ($q) => $q->whereBetween('enrolled_at', [
                $from->toDateString(), $to->toDateString(),
            ])])
            ->withCount(['certificates' => fn ($q) => $q->whereBetween('issued_at', [
                $from->toDateString(), $to->toDateString(),
            ])])
            ->withAvg('enrollments as avg_progress', 'progress')
            ->orderByDesc('enrollments_count')
            ->take(10)
            ->get()
            ->map(fn (Course $c) => [
                'id' => $c->id,
                'title' => $c->title,
                'category' => $c->category,
                'enrollments' => $c->enrollments_count,
                'certificates' => $c->certificates_count,
                'avgProgress' => round((float) ($c->avg_progress ?? 0), 1),
            ]);

        return Inertia::render('Admin/Reports/Index', [
            'range' => ['from' => $from->toDateString(), 'to' => $to->toDateString()],
            'stats' => [
                'students' => $students->count(),
                'enrollments' => $enrollments->count(),
                'completions' => $enrollments->where('status', 'completed')->count(),
                'certificates' => $certificates->count(),
                'activeCertificates' => $certificates->where('status', 'active')->count(),
                'revokedCertificates' => $certificates->where('status', 'revoked')->count(),
                'enquiries' => $enquiries->count(),
                'completionRate' => $enrollments->count()
                    ? round(($enrollments->where('status', 'completed')->count() / $enrollments->count()) * 100, 1)
                    : 0,
            ],
            'charts' => [
                'months' => $months->pluck('label')->all(),
                'enrollments' => $perMonth($enrollments, 'enrolled_at'),
                'completions' => $perMonth($enrollments->where('status', 'completed'), 'enrolled_at'),
                'certificates' => $perMonth($certificates, 'issued_at'),
                'students' => $perMonth($students, 'created_at'),
                'statuses' => [
                    ['label' => 'Active', 'value' => $enrollments->where('status', 'active')->count(), 'color' => '#34d399'],
                    ['label' => 'Completed', 'value' => $enrollments->where('status', 'completed')->count(), 'color' => '#982cdc'],
                    ['label' => 'Dropped', 'value' => $enrollments->where('status', 'dropped')->count(), 'color' => '#ff5a5a'],
                ],
                'enquiryStatuses' => collect(['new', 'contacted', 'enrolled', 'closed'])
                    ->map(fn ($status) => [
                        'label' => ucfirst($status),
                        'value' => $enquiries->where('status', $status)->count(),
                    ])->all(),
            ],
            'courses' => $courseRows,
            'recentEnrollments' => $enrollments->sortByDesc('enrolled_at')->take(10)->map(fn (Enrollment $e) => [
                'id' => $e->id,
                'student' => $e->user?->name ?? 'Deleted user',
                'course' => $e->course?->title ?? 'Deleted course',
                'status' => $e->status,
                'progress' => $e->progress,
                'enrolledAt' => $e->enrolled_at?->toDateString(),
            ])->values(),
        ]);
    }

    public function export(Request $request, string $type): StreamedResponse
    {
        abort_unless(in_array($type, self::TYPES, true), 404);

        [$from, $to] = $this->range($request);
        $fromDate = $from->toDateString();
        $toDate = $to->toDateString();

        [$filename, $headers, $rows] = match ($type) {
            'students' => [
                'students',
                ['ID', 'Name', 'Email', 'Phone', 'Status', 'Enrollments', 'Certificates', 'Joined'],
                User::query()
                    ->where('role', 'student')
                    ->withCount(['enrollments', 'certificates'])
                    ->whereDate('created_at', '>=', $fromDate)
                    ->whereDate('created_at', '<=', $toDate)
                    ->orderBy('name')
                    ->lazy()
                    ->map(fn (User $u) => [
                        $u->id,
                        $u->name,
                        $u->email,
                        $u->phone,
                        $u->is_active ? 'Active' : 'Inactive',
                        $u->enrollments_count,
                        $u->certificates_count,
                        $u->created_at?->toDateString(),
                    ]),
            ],
            'enrollments' => [
                'enrollments',
                ['ID', 'Student', 'Email', 'Course', 'Progress', 'Hours', 'Status', 'Enrolled', 'Completed'],
                Enrollment::query()
                    ->with(['user:id,name,email', 'course:id,title'])
                    ->whereBetween('enrolled_at', [$fromDate, $toDate])
                    ->orderBy('enrolled_at')
                    ->lazy()
                    ->map(fn (Enrollment $e) => [
                        $e->id,
                        $e->user?->name,
                        $e->user?->email,
                        $e->course?->title,
                        $e->progress.'%',
                        $e->hours_completed,
                        $e->status,
                        $e->enrolled_at?->toDateString(),
                        $e->completed_at?->toDateString(),
                    ]),
            ],
            'certificates' => [
                'certificates',
                ['Code', 'Student', 'Email', 'Course', 'Status', 'Score', 'Grade', 'Issued', 'Expires', 'Revoked reason'],
                Certificate::query()
                    ->whereBetween('issued_at', [$fromDate, $toDate])
                    ->orderBy('issued_at')
                    ->lazy()
                    ->map(fn (Certificate $c) => [
                        $c->code,
                        $c->student_name,
                        $c->student_email,
                        $c->course_title,
                        $c->status,
                        $c->score,
                        $c->grade,
                        $c->issued_at?->toDateString(),
                        $c->expires_at?->toDateString(),
                        $c->revoked_reason,
                    ]),
            ],
            'enquiries' => [
                'enquiries',
                ['ID', 'Name', 'Email', 'Phone', 'Audience', 'Program', 'Batch', 'Status', 'Received'],
                Enquiry::query()
                    ->whereDate('created_at', '>=', $fromDate)
                    ->whereDate('created_at', '<=', $toDate)
                    ->orderBy('created_at')
                    ->lazy()
                    ->map(fn (Enquiry $e) => [
                        $e->id,
                        $e->name,
                        $e->email,
                        $e->phone,
                        $e->audience,
                        $e->program,
                        $e->batch_timing,
                        $e->status,
                        $e->created_at?->toDateString(),
                    ]),
            ],
        };

        return response()->streamDownload(function () use ($headers, $rows) {
            $out = fopen('php://output', 'w');
            fputcsv($out, $headers);

            foreach ($rows as $row) {
                fputcsv($out, array_map(
                    fn ($value) => is_string($value) ? mb_convert_encoding($value, 'UTF-8') : $value,
                    $row,
                ));
            }

            fclose($out);
        }, "{$filename}-{$fromDate}-to-{$toDate}.csv", [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    /** @return array{0: Carbon, 1: Carbon} */
    private function range(Request $request): array
    {
        $fallbackFrom = now()->subMonths(11)->startOfMonth();
        $fallbackTo = now();

        try {
            $from = $request->query('from')
                ? Carbon::parse($request->query('from'))->startOfDay()
                : $fallbackFrom;
        } catch (\Throwable) {
            $from = $fallbackFrom;
        }

        try {
            $to = $request->query('to')
                ? Carbon::parse($request->query('to'))->endOfDay()
                : $fallbackTo;
        } catch (\Throwable) {
            $to = $fallbackTo;
        }

        if ($from->greaterThan($to)) {
            [$from, $to] = [$to->copy()->startOfDay(), $from->copy()->endOfDay()];
        }

        return [$from, $to];
    }
}
