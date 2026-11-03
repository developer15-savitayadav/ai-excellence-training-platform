<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    // ->withMiddleware(function (Middleware $middleware): void {
    //     $middleware->trustProxies(at: '*');

    //     $middleware->web(append: [
    //         \App\Http\Middleware\HandleInertiaRequests::class,
    //         \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
    //     ]);

    //     //
    // })
    ->withMiddleware(function (Middleware $middleware): void {
        // Set TRUSTED_PROXIES (comma separated IPs/CIDRs) when you know your proxy range.
        $proxies = env('TRUSTED_PROXIES');
        $middleware->trustProxies(at: $proxies ? array_map('trim', explode(',', $proxies)) : '*');

        $middleware->alias([
            'admin' => \App\Http\Middleware\EnsureAdmin::class,
            'instructor' => \App\Http\Middleware\EnsureInstructor::class,
            'active' => \App\Http\Middleware\EnsureActiveUser::class,
        ]);

        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\EnsureActiveUser::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn(Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();
