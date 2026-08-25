<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CertificateController extends Controller
{
    public function show($code)
    {
        return Inertia::render('Certificate/Show', [
            'certificate' => [
                'id' => 'cert_001',
                'code' => $code,
                'studentName' => 'Alex Chen',
                'courseName' => 'Deep Learning Fundamentals',
                'courseDescription' => 'Master neural networks, CNNs, RNNs, and transformers from scratch using TensorFlow and PyTorch.',
                'completionDate' => '2024-11-15',
                'duration' => '24 hours',
                'score' => 94,
                'grade' => 'A',
                'instructorName' => 'Dr. Sarah Mitchell',
                'instructorTitle' => 'AI Research Lead',
                'platformDirector' => 'Maya Rodriguez',
                'platformDirectorTitle' => 'Founder & CEO',
                'skills' => ['Neural Networks', 'TensorFlow', 'PyTorch', 'CNN', 'RNN', 'Transformers'],
                'verificationUrl' => 'https://cortexacademy.ai/verify/' . $code,
            ],
            'verified' => true,
        ]);
    }
}
