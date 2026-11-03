<?php

namespace App\Console\Commands;

use App\Services\CertificateService;
use Illuminate\Console\Command;

class RevokeCertificate extends Command
{
    protected $signature = 'certificate:revoke {code} {--reason=}';
    protected $description = 'Revoke a certificate';

    public function handle(CertificateService $service): int
    {
        $cert = $service->findByCode($this->argument('code'));

        if (! $cert) {
            $this->error('Certificate not found.');
            return self::FAILURE;
        }

        $service->revoke($cert, $this->option('reason'));
        $this->info("Revoked {$cert->code}");

        return self::SUCCESS;
    }
}
