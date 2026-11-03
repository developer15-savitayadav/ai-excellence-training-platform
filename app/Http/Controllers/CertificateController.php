<?php

namespace App\Http\Controllers;

use App\Jobs\RecordCertificateVerification;
use App\Services\CertificateService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function __construct(private CertificateService $service) {}

    public function index()
    {
        return Inertia::render('Certificate/Verify', [
            'issuer' => config('certificates.issuer_name'),
        ]);
    }

    public function search(Request $request)
    {
        $data = $request->validate(['code' => ['required', 'string', 'min:6', 'max:40']]);

        return redirect()->route('certificate.verify', [
            'code' => $this->service->normalizeCode($data['code']),
        ]);
    }

    public function verify(Request $request, string $code)
    {
        $normalized = $this->service->normalizeCode($code);
        $certificate = $this->service->findByCode($code);

        // Logged after the response is sent: no extra latency, no write on the hot path.
        RecordCertificateVerification::dispatchAfterResponse(
            $certificate?->id,
            $normalized,
            $request->ip(),
            $request->userAgent(),
        );

        if (! $certificate) {
            return Inertia::render('Certificate/Verify', [
                'issuer' => config('certificates.issuer_name'),
                'searched' => $normalized,
                'result' => ['state' => 'not_found'],
            ])->toResponse($request)->setStatusCode(404);
        }

        $state = match (true) {
            ! $certificate->hasValidSignature() => 'tampered',
            $certificate->isRevoked() => 'revoked',
            $certificate->isExpired() => 'expired',
            default => 'valid',
        };

        // Tampered records reveal nothing: just "invalid".
        $result = $state === 'tampered'
            ? ['state' => 'invalid']
            : [
                'state' => $state,
                'certificate' => [
                    'code' => $certificate->code,
                    'studentName' => $certificate->student_name,
                    'courseTitle' => $certificate->course_title,
                    'duration' => $certificate->duration,
                    'score' => $certificate->score,
                    'grade' => $certificate->grade,
                    'instructorName' => $certificate->instructor_name,
                    'issuedAt' => $certificate->issued_at->toDateString(),
                    'expiresAt' => $certificate->expires_at?->toDateString(),
                    'revokedReason' => $state === 'revoked' ? $certificate->revoked_reason : null,
                ],
            ];

        return Inertia::render('Certificate/Verify', [
            'issuer' => config('certificates.issuer_name'),
            'searched' => $certificate->code,
            'result' => $result,
        ]);
    }

    public function legacy(string $code)
    {
        return redirect()->route('certificate.verify', ['code' => $code], 301);
    }
}
