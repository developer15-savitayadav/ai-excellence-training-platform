<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact', [
            'office' => [
                'address' => '123 Innovation Drive, Suite 400',
                'city' => 'San Francisco, CA 94105',
                'country' => 'United States',
                'phone' => '+1 (415) 555-0192',
                'email' => 'hello@cortexacademy.ai',
            ],
            'socialLinks' => [
                ['platform' => 'Twitter', 'url' => 'https://twitter.com/cortexacademy', 'handle' => '@cortexacademy'],
                ['platform' => 'LinkedIn', 'url' => 'https://linkedin.com/company/cortex-academy', 'handle' => 'AI Excellence Academy'],
                ['platform' => 'GitHub', 'url' => 'https://github.com/cortex-academy', 'handle' => 'cortex-academy'],
                ['platform' => 'YouTube', 'url' => 'https://youtube.com/@cortexacademy', 'handle' => 'AI Excellence Academy'],
            ],
        ]);
    }
}
