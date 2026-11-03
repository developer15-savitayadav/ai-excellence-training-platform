<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index(Request $request)
    {
        $certificates = Certificate::query()
            ->where('user_id', $request->user()->id)
            ->latest('issued_at')
            ->get()
            ->map(fn (Certificate $c) => [
                'uuid' => $c->uuid,
                'code' => $c->code,
                'courseTitle' => $c->course_title,
                'courseSlug' => $c->course_slug,
                'duration' => $c->duration,
                'score' => $c->score,
                'grade' => $c->grade,
                'instructorName' => $c->instructor_name,
                'issuedAt' => $c->issued_at?->toDateString(),
                'expiresAt' => $c->expires_at?->toDateString(),
                'status' => $c->isRevoked() ? 'revoked' : ($c->isExpired() ? 'expired' : 'active'),
                'revokedReason' => $c->revoked_reason,
                'downloadUrl' => route('certificates.download', ['certificate' => $c->uuid], false),
                'verifyUrl' => route('certificate.verify', ['code' => $c->code], false),
            ]);

        return Inertia::render('Student/Certificates', [
            'certificates' => $certificates,
            'stats' => [
                'total' => $certificates->count(),
                'active' => $certificates->where('status', 'active')->count(),
                'revoked' => $certificates->where('status', 'revoked')->count(),
            ],
        ]);
    }
}
