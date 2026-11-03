<?php

return [
    // Dedicated secret. Set once, back it up, never change it.
    'signing_key' => env('CERTIFICATE_SIGNING_KEY'),

    'rate_limit' => (int) env('CERTIFICATE_VERIFY_RATE_LIMIT', 20),          // per IP / minute
    'rate_limit_hourly' => (int) env('CERTIFICATE_VERIFY_HOURLY_LIMIT', 200), // per IP / hour
    'rate_limit_global' => (int) env('CERTIFICATE_VERIFY_GLOBAL_LIMIT', 300), // all visitors / minute

    'log_retention_days' => (int) env('CERTIFICATE_LOG_RETENTION_DAYS', 90),

    'issuer_name' => env('CERTIFICATE_ISSUER_NAME', 'AI Excellence Academy'),
];
