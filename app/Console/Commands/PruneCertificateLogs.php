<?php

namespace App\Console\Commands;

use App\Models\CertificateVerificationLog;
use Illuminate\Console\Command;

class PruneCertificateLogs extends Command
{
    protected $signature = 'certificate:prune-logs {--days=}';
    protected $description = 'Delete old verification logs';

    public function handle(): int
    {
        $days = (int) ($this->option('days') ?: config('certificates.log_retention_days'));

        $deleted = CertificateVerificationLog::where('created_at', '<', now()->subDays($days))->delete();

        $this->info("Deleted {$deleted} log rows older than {$days} days.");

        return self::SUCCESS;
    }
}
