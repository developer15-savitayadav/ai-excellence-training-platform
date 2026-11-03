<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use App\Services\CertificateService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CertificateAdminController extends Controller
{
    public function __construct(private CertificateService $service) {}

    public function index(Request $request)
    {
        $filters = [
            'q' => trim((string) $request->query('q', '')),
            'status' => (string) $request->query('status', 'all'),
            'course' => (string) $request->query('course', 'all'),
            'sort' => (string) $request->query('sort', 'issued_at'),
            'direction' => strtolower((string) $request->query('direction', 'desc')) === 'asc' ? 'asc' : 'desc',
        ];

        $sortable = ['issued_at', 'student_name', 'course_title', 'code', 'created_at'];
        if (! in_array($filters['sort'], $sortable, true)) {
            $filters['sort'] = 'issued_at';
        }

        $term = $filters['q'];
        $key = $this->service->normalizeCode($term);

        $certificates = Certificate::query()
            ->with('issuer:id,name')
            ->withCount(['logs as verifications_count' => fn ($q) => $q->where('found', true)])
            ->when($term !== '', function ($query) use ($term, $key) {
                $query->where(function ($w) use ($term, $key) {
                    $w->whereLike('student_name', "%{$term}%")
                        ->orWhereLike('student_email', "%{$term}%")
                        ->orWhereLike('course_title', "%{$term}%");
                    if ($key !== '') {
                        $w->orWhereLike('code_key', "{$key}%");
                    }
                });
            })
            ->when($filters['status'] === 'active', fn ($q) => $q->where('status', 'active')
                ->where(fn ($w) => $w->whereNull('expires_at')->orWhereDate('expires_at', '>=', now())))
            ->when($filters['status'] === 'revoked', fn ($q) => $q->where('status', 'revoked'))
            ->when($filters['status'] === 'expired', fn ($q) => $q->where('status', 'active')
                ->whereNotNull('expires_at')
                ->whereDate('expires_at', '<', now()))
            ->when($filters['course'] !== 'all', fn ($q) => $q->where('course_id', $filters['course']))
            ->orderBy($filters['sort'], $filters['direction'])
            ->paginate(15)
            ->withQueryString()
            ->through(fn (Certificate $c) => [
                'uuid' => $c->uuid,
                'code' => $c->code,
                'studentName' => $c->student_name,
                'studentEmail' => $c->student_email,
                'courseTitle' => $c->course_title,
                'courseSlug' => $c->course_slug,
                'issuedAt' => $c->issued_at->toDateString(),
                'expiresAt' => $c->expires_at?->toDateString(),
                'duration' => $c->duration,
                'score' => $c->score,
                'grade' => $c->grade,
                'status' => $c->isRevoked() ? 'revoked' : ($c->isExpired() ? 'expired' : 'active'),
                'revokedReason' => $c->revoked_reason,
                'issuedBy' => $c->issuer?->name,
                'verifications' => $c->verifications_count,
                'downloadUrl' => route('certificates.download', ['certificate' => $c->uuid], false),
                'verifyUrl' => route('certificate.verify', ['code' => $c->code], false),
            ]);

        $eligibleEnrollments = Enrollment::query()
            ->with(['user:id,name,email', 'course:id,title,slug,duration,instructor_id', 'course.instructor:id,name'])
            ->where(fn ($q) => $q->where('status', 'completed')->orWhere('progress', '>=', 100))
            ->whereNotExists(function ($q) {
                $q->selectRaw('1')
                    ->from('certificates')
                    ->whereColumn('certificates.user_id', 'enrollments.user_id')
                    ->whereColumn('certificates.course_id', 'enrollments.course_id')
                    ->where('certificates.status', 'active');
            })
            ->latest('completed_at')
            ->take(100)
            ->get()
            ->map(fn (Enrollment $e) => [
                'id' => $e->id,
                'studentName' => $e->user?->name ?? 'Deleted user',
                'studentEmail' => $e->user?->email,
                'courseTitle' => $e->course?->title ?? 'Deleted course',
                'duration' => $e->course?->duration,
                'instructorName' => $e->course?->instructor?->name,
                'completedAt' => $e->completed_at?->toDateString(),
                'progress' => $e->progress,
            ]);

        return Inertia::render('Admin/Certificates/Index', [
            'certificates' => $certificates,
            'filters' => $filters,
            'courses' => Course::orderBy('title')->get(['id', 'title', 'slug']),
            'students' => User::query()
                ->where('role', 'student')
                ->orderBy('name')
                ->get(['id', 'name', 'email']),
            'eligibleEnrollments' => $eligibleEnrollments,
            'stats' => [
                'total' => Certificate::count(),
                'active' => Certificate::where('status', 'active')
                    ->where(fn ($q) => $q->whereNull('expires_at')->orWhereDate('expires_at', '>=', now()))
                    ->count(),
                'revoked' => Certificate::where('status', 'revoked')->count(),
                'expired' => Certificate::where('status', 'active')
                    ->whereNotNull('expires_at')
                    ->whereDate('expires_at', '<', now())
                    ->count(),
                'eligible' => $eligibleEnrollments->count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        if ($request->filled('enrollment_id')) {
            $data = $request->validate([
                'enrollment_id' => ['required', 'integer', 'exists:enrollments,id'],
            ]);

            $enrollment = Enrollment::with(['user', 'course.instructor'])->findOrFail($data['enrollment_id']);
            $certificate = $this->service->issueForEnrollment($enrollment, $request->user()->id);

            Activity::log(
                $request->user()->id,
                'certificate.issued',
                "Issued certificate {$certificate->code} to {$certificate->student_name}",
                $certificate,
            );

            return back()
                ->with('success', 'Certificate issued.')
                ->with('issued_code', $certificate->code);
        }

        $data = $request->validate([
            'student_name' => ['required', 'string', 'max:120'],
            'student_email' => ['nullable', 'email', 'max:255'],
            'course_id' => ['nullable', 'integer', 'exists:courses,id'],
            'course_title' => ['required', 'string', 'max:160'],
            'duration' => ['nullable', 'string', 'max:60'],
            'score' => ['nullable', 'integer', 'between:0,100'],
            'grade' => ['nullable', 'string', 'max:8'],
            'instructor_name' => ['nullable', 'string', 'max:120'],
            'issued_at' => ['required', 'date', 'before_or_equal:today'],
            'expires_at' => ['nullable', 'date', 'after:issued_at'],
        ]);

        $email = $data['student_email'] ?? null;
        $course = ($data['course_id'] ?? null) ? Course::with('instructor:id,name')->find($data['course_id']) : null;

        if ($course && empty($data['instructor_name'])) {
            $data['instructor_name'] = $course->instructor?->name;
        }
        if ($course && empty($data['duration'])) {
            $data['duration'] = $course->duration;
        }

        $certificate = $this->service->issue([
            ...$data,
            'course_slug' => $course?->slug,
            'course_title' => $course?->title ?? $data['course_title'],
            'issued_by' => $request->user()->id,
            'user_id' => $email ? User::where('email', $email)->value('id') : null,
        ]);

        Activity::log(
            $request->user()->id,
            'certificate.issued',
            "Issued certificate {$certificate->code} to {$certificate->student_name}",
            $certificate,
        );

        return back()
            ->with('success', 'Certificate issued.')
            ->with('issued_code', $certificate->code);
    }

    public function revoke(Request $request, Certificate $certificate)
    {
        $data = $request->validate(['reason' => ['required', 'string', 'max:255']]);

        $this->service->revoke($certificate, $data['reason'], $request->user()->id);

        Activity::log(
            $request->user()->id,
            'certificate.revoked',
            "Revoked certificate {$certificate->code}",
            $certificate,
        );

        return back()->with('success', "Certificate {$certificate->code} revoked.");
    }
}
