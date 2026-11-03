<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => fn () => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'is_admin' => $user->isAdmin(),
                    'is_instructor' => $user->isInstructor(),
                    'is_active' => (bool) $user->is_active,
                    'avatar' => $user->avatar,
                    'profile_photo_url' => $user->avatar,
                    'phone' => $user->phone,
                    'bio' => $user->bio,
                    'email_verified_at' => $user->email_verified_at?->toIso8601String(),
                    'created_at' => $user->created_at?->toIso8601String(),
                ] : null,
            ],
            'notifications' => fn () => $user ? [
                'unread' => $user->notifications()->unread()->count(),
                'latest' => $user->notifications()
                    ->latest()
                    ->take(6)
                    ->get()
                    ->map(fn ($n) => [
                        'id' => $n->id,
                        'type' => $n->type,
                        'title' => $n->title,
                        'message' => $n->message,
                        'action_url' => $n->action_url,
                        'read' => $n->read_at !== null,
                        'created_at' => $n->created_at?->toIso8601String(),
                    ])
                    ->values()
                    ->all(),
            ] : ['unread' => 0, 'latest' => []],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'issued_code' => fn () => $request->session()->get('issued_code'),
            ],
        ];
    }
}
