<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use Illuminate\Http\Request;
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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'audience' => ['required', 'string', 'max:255'],
            'program' => ['required', 'string', 'max:255'],
            'batchTiming' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'min:10'],
        ]);

        Enquiry::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'audience' => $validated['audience'],
            'program' => $validated['program'],
            'batch_timing' => $validated['batchTiming'] ?? null,
            'message' => $validated['message'],
            'status' => 'new',
        ]);

        return back()->with('success', 'Your enquiry has been submitted successfully.');
    }
}
