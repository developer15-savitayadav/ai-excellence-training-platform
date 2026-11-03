<?php

namespace App\Services;

use App\Models\Certificate;
use Illuminate\Support\Str;

class CertificateService
{
    // No 0/O or 1/I/L: codes survive being read aloud or retyped.
    private const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

    public function issue(array $data): Certificate
    {
        $code = $this->generateUniqueCode();

        $certificate = new Certificate([
            'uuid' => (string) Str::uuid(),
            'code' => $code,
            'code_key' => $this->normalizeCode($code),
            'user_id' => $data['user_id'] ?? null,
            'course_id' => $data['course_id'] ?? null,
            'issued_by' => $data['issued_by'] ?? null,
            'student_name' => trim($data['student_name']),
            'student_email' => $data['student_email'] ?? null,
            'course_title' => trim($data['course_title']),
            'course_slug' => $data['course_slug'] ?? null,
            'duration' => $data['duration'] ?? null,
            'score' => $data['score'] ?? null,
            'grade' => $data['grade'] ?? null,
            'instructor_name' => $data['instructor_name'] ?? null,
            'issued_at' => $data['issued_at'] ?? now()->toDateString(),
            'expires_at' => $data['expires_at'] ?? null,
            'status' => 'active',
        ]);

        $certificate->signature = $this->sign($certificate);
        $certificate->save();

        return $certificate;
    }

    public function revoke(Certificate $certificate, ?string $reason = null, ?int $byUserId = null): Certificate
    {
        $certificate->update([
            'status' => 'revoked',
            'revoked_at' => now(),
            'revoked_reason' => $reason,
            'revoked_by' => $byUserId,
        ]);

        return $certificate;
    }

    public function issueForEnrollment(\App\Models\Enrollment $enrollment, ?int $issuedBy = null): Certificate
    {
        $enrollment->loadMissing(['user', 'course.instructor']);

        if ($enrollment->status !== 'completed' && $enrollment->progress < 100) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'enrollment' => 'Only completed enrollments are eligible for a certificate.',
            ]);
        }

        $existing = Certificate::where('user_id', $enrollment->user_id)
            ->where('course_id', $enrollment->course_id)
            ->where('status', 'active')
            ->first();

        if ($existing) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'enrollment' => "An active certificate ({$existing->code}) already exists for this student and course.",
            ]);
        }

        return $this->issue([
            'user_id' => $enrollment->user_id,
            'course_id' => $enrollment->course_id,
            'issued_by' => $issuedBy,
            'student_name' => $enrollment->user?->name ?? 'Student',
            'student_email' => $enrollment->user?->email,
            'course_title' => $enrollment->course?->title ?? 'Course',
            'course_slug' => $enrollment->course?->slug,
            'duration' => $enrollment->course?->duration,
            'instructor_name' => $enrollment->course?->instructor?->name,
            'issued_at' => now()->toDateString(),
        ]);
    }

    public function sign(Certificate $c): string
    {
        return hash_hmac('sha256', $this->canonicalPayload($c), $this->key());
    }

    public function signatureIsValid(Certificate $c): bool
    {
        return hash_equals((string) $c->signature, $this->sign($c));
    }

    public function normalizeCode(string $input): string
    {
        return strtoupper(preg_replace('/[^A-Za-z0-9]/', '', $input));
    }

    public function findByCode(string $input): ?Certificate
    {
        $key = $this->normalizeCode($input);

        if ($key === '' || strlen($key) > 32) {
            return null;
        }

        return Certificate::where('code_key', $key)->first(); // indexed lookup
    }

    private function generateUniqueCode(): string
    {
        do {
            $random = '';
            for ($i = 0; $i < 10; $i++) {
                $random .= self::ALPHABET[random_int(0, strlen(self::ALPHABET) - 1)];
            }
            $code = sprintf('AIEA-%s-%s', now()->format('Y'), $random);
        } while (Certificate::where('code_key', $this->normalizeCode($code))->exists());

        return $code;
    }

    /** Every immutable field is signed. JSON avoids delimiter-collision tricks. */
    private function canonicalPayload(Certificate $c): string
    {
        return json_encode([
            'v' => 1,
            'uuid' => (string) $c->uuid,
            'code' => (string) $c->code,
            'student_name' => (string) $c->student_name,
            'course_title' => (string) $c->course_title,
            'duration' => (string) ($c->duration ?? ''),
            'score' => $c->score === null ? null : (int) $c->score,
            'grade' => (string) ($c->grade ?? ''),
            'instructor_name' => (string) ($c->instructor_name ?? ''),
            'issued_at' => $c->issued_at?->format('Y-m-d'),
            'expires_at' => $c->expires_at?->format('Y-m-d'),
        ], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }

    private function key(): string
    {
        $key = config('certificates.signing_key') ?: config('app.key');

        return str_starts_with($key, 'base64:') ? base64_decode(substr($key, 7)) : $key;
    }
}
