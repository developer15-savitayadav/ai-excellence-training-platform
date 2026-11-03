<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Services\CertificatePdfService;
use Illuminate\Http\Request;

class CertificatePdfController extends Controller
{
    public function __invoke(Request $request, Certificate $certificate, CertificatePdfService $pdf)
    {
        $user = $request->user();

        // Admins can always download. Owners only while the certificate is not revoked.
        abort_unless(
            $user->is_admin || ($certificate->user_id === $user->id && ! $certificate->isRevoked()),
            403
        );

        return $pdf->download($certificate);
    }
}
