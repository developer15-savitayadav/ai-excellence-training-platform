<?php

namespace App\Console\Commands;

use App\Models\Certificate;
use App\Services\CertificateService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class AuditCertificates extends Command
{
    protected $signature = 'certificate:audit';
    protected $description = 'Verify the signature of every certificate and report tampering';

    public function handle(CertificateService $service): int
    {
        $total = 0;
        $bad = 0;

        Certificate::query()->chunkById(500, function ($chunk) use ($service, &$total, &$bad) {
            foreach ($chunk as $certificate) {
                $total++;
                if (! $service->signatureIsValid($certificate)) {
                    $bad++;
                    $this->error("INVALID SIGNATURE: {$certificate->code}");
                    Log::critical('Certificate integrity failure', ['code' => $certificate->code]);
                }
            }
        });

        $this->info("Audited {$total} certificates, {$bad} invalid.");

        return $bad === 0 ? self::SUCCESS : self::FAILURE;
    }
}
