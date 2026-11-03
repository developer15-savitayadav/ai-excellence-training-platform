<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        RateLimiter::for('certificate-verify', fn(Request $request) => [
            Limit::perMinute(config('certificates.rate_limit'))->by($request->ip()),
            Limit::perHour(config('certificates.rate_limit_hourly'))->by($request->ip()),
            // Safety net: even if IPs are spoofed, the endpoint as a whole cannot be hammered.
            Limit::perMinute(config('certificates.rate_limit_global'))->by('certificate-verify-global'),
        ]);
    }
}
