<?php

namespace App\Jobs;

use App\Models\CertificateVerificationLog;
use Illuminate\Foundation\Bus\Dispatchable;

class RecordCertificateVerification
{
    use Dispatchable;

    public function __construct(
        public ?int $certificateId,
        public string $code,
        public ?string $ip,
        public ?string $userAgent,
    ) {}

    public function handle(): void
    {
        CertificateVerificationLog::create([
            'certificate_id' => $this->certificateId,
            'code_searched' => substr($this->code, 0, 64),
            'found' => $this->certificateId !== null,
            'ip_address' => $this->ip,
            'user_agent' => $this->userAgent ? substr($this->userAgent, 0, 255) : null,
        ]);
    }
}
