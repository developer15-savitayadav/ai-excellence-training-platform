<?php

namespace App\Services;

use App\Models\Certificate;
use Barryvdh\DomPDF\Facade\Pdf;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Writer\PngWriter;
use Symfony\Component\HttpFoundation\Response;

class CertificatePdfService
{
    public function download(Certificate $certificate): Response
    {
        $url = route('certificate.verify', ['code' => $certificate->code]);

        $qr = (new Builder(
            writer: new PngWriter(),
            data: $url,
            size: 240,
            margin: 0,
        ))->build()->getDataUri();

        return Pdf::loadView('certificates.pdf', [
            'c' => $certificate,
            'qr' => $qr,
            'url' => $url,
            'issuer' => config('certificates.issuer_name'),
        ])->setPaper('a4', 'landscape')
          ->download("certificate-{$certificate->code}.pdf");
    }
}
