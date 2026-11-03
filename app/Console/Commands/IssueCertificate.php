<?php

namespace App\Console\Commands;

use App\Services\CertificateService;
use Illuminate\Console\Command;

class IssueCertificate extends Command
{
    protected $signature = 'certificate:issue
        {student_name}
        {course_title}
        {--email=}
        {--user=}
        {--duration=}
        {--score=}
        {--grade=}
        {--instructor=}
        {--date= : YYYY-MM-DD, default today}
        {--expires= : YYYY-MM-DD}';

    protected $description = 'Issue a new verifiable certificate';

    public function handle(CertificateService $service): int
    {
        $cert = $service->issue([
            'student_name' => $this->argument('student_name'),
            'course_title' => $this->argument('course_title'),
            'student_email' => $this->option('email') ?: null,
            'user_id' => $this->option('user') ?: null,
            'duration' => $this->option('duration') ?: null,
            'score' => $this->option('score') !== null ? (int) $this->option('score') : null,
            'grade' => $this->option('grade') ?: null,
            'instructor_name' => $this->option('instructor') ?: null,
            'issued_at' => $this->option('date') ?: now()->toDateString(),
            'expires_at' => $this->option('expires') ?: null,
        ]);

        $this->info("Issued: {$cert->code}");
        $this->line(route('certificate.verify', ['code' => $cert->code]));

        return self::SUCCESS;
    }
}
