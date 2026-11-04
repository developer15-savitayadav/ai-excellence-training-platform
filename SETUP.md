# AI Execellence Training Platform — Setup & Deployment Guide

This document accompanies the Laravel 13 + Inertia/React training management platform. It
covers local setup, production deployment, and the test/verification coverage that ships with
the codebase.

## Stack

- PHP 8.3+, Laravel 13.39
- Node.js 20+ / npm 10+ (Vite 8)
- MySQL 8 (recommended) — SQLite is used automatically by the test suite
- Queue worker (database driver) for certificate verification logging
- Composer 2

## Local setup

1. Install PHP and Node dependencies:

   ```bash
   composer install
   npm install
   ```

2. Configure the environment:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

   Set at least these values in `.env`:

   ```env
   APP_ENV=local
   APP_URL=http://127.0.0.1:8000
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3307
   DB_DATABASE=ai-excellence-training-platform
   DB_USERNAME=root
   DB_PASSWORD=
   ADMIN_EMAIL=admin@cortexacademy.com
   ADMIN_PASSWORD=password
   QUEUE_CONNECTION=database
   ```

3. Create the database and run migrations + seeders:

   ```bash
   php artisan migrate --seed
   ```

   The seeder creates the admin account (`ADMIN_EMAIL` / `ADMIN_PASSWORD`), six instructors,
   published courses, and (in non-production only) sample enrolments.

4. Build the front-end:

   ```bash
   npm run build
   ```

   For development, use `npm run dev` instead and leave `public/hot` in place.

5. Start the application and queue worker:

   ```bash
   php artisan serve
   php artisan queue:work --tries=1
   ```

## Roles

- `admin` — full access to `/admin/*`, reports, certificate issuance/revocation.
- `instructor` — `/instructor/dashboard`, own courses.
- `student` — `/dashboard`, `/my-learning`, `/my-certificates`, `/wishlist`, `/notifications`.

Role is stored in `users.role` (with `is_admin` kept for backwards compatibility). New
registrations default to `student`.

## Certificate system

- Codes use the format `AIEA-YYYY-XXXXXXXXXX` and are unique (`code_key` indexed lookup).
- Every certificate is HMAC-signed over its immutable fields; `hasValidSignature()` detects
  tampering.
- Issuance is idempotent per enrolment (`CertificateService::issueForEnrollment()` will not
  create a second active certificate).
- Completed enrolments auto-issue a certificate when none exists.
- Manual issuance is available from `/admin/certificates` (eligible enrolments are listed).
- Revocation records `revoked_at`, `revoked_by`, `revoked_reason` and marks the certificate
  `revoked`; public verification reports the current status.
- PDFs are generated with DomPDF + an endroid QR code and downloaded from
  `/certificates/{uuid}/download`.
- Public verification: `/verify/{code}` returns `valid`, `revoked`, `expired`, `invalid`
  (tampered) or `not_found`. `/verify` (POST) normalises and redirects.

## Reports & analytics

- `/admin/reports` aggregates real records (students, enrolments, completions, certificates,
  enquiries, courses) with a 12-month series and CSV export at
  `/admin/reports/export/{students|enrollments|certificates|courses}`.

## Testing

Run the full suite (uses in-memory SQLite, no MySQL required):

```bash
php artisan test
```

Current result: **55 tests, 306 assertions, all passing**, including:

- Authentication, role-based access, suspended-user logout.
- Admin dashboard and reports from real records.
- Course CRUD (create/update/publish/delete).
- Trainer CRUD.
- Enrolment creation, progress updates, notifications.
- Auto-certificate issuance on completion (no duplicates).
- Manual certificate issuance from an enrolment.
- Student wishlist and notifications.
- Enquiry triage and deletion.
- Certificate PDF/QR generation and HMAC verification.
- Public course pages and the learn player (enrolled-only access).
- Certificate verification scenarios (valid, not found, revoked, tampered, expired).

Front-end build verification:

```bash
npm run build
```

Security audit:

```bash
composer audit
```

Result: no advisories (Laravel 13.39, league/commonmark 2.10.7, etc.).

## Deployment checklist

1. Set `APP_ENV=production`, `APP_DEBUG=false`, a strong `APP_KEY`, and real database
   credentials.
2. Set `ADMIN_EMAIL` / `ADMIN_PASSWORD` before seeding — production never receives a default
   password.
3. Run `composer install --no-dev --optimize-autoloader`.
4. Run `php artisan migrate --force` (do **not** run `--seed` in production unless you want
   demo data — the development-only enrolment seeding is gated on `! app()->isProduction()`).
5. Run `npm ci && npm run build`.
6. Remove `public/hot` if it exists (it forces Vite dev-server assets).
7. Configure a queue worker: `php artisan queue:work --tries=1` (or Supervisor/systemd).
8. Configure the scheduler: `* * * * * php artisan schedule:run`.
9. Set `SESSION_SECURE_COOKIE=true`, `SANCTUM_STATEFUL_DOMAINS`, and HTTPS at the proxy.
10. Cache config/routes/views:

    ```bash
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    ```

## Certificate verification scenarios (manual)

- Valid: `/verify/AIEA-2026-XXXXXXXXXX` for an active certificate.
- Not found: any code that does not exist (returns 404).
- Revoked: a revoked certificate code (shows reason).
- Tampered: alter a signed field in the database — signature check fails and the page shows
  "invalid" without leaking record details.
- Expired: a certificate with `expires_at` in the past.
- Missing code: submit an empty form on `/verify` (validation error).

## Notes

- The public course pages prefer database courses and fall back to the static catalogue for
  slugs not present in the database.
- The learn player persists progress via `PATCH /enrollments/{id}` (debounced) and keeps a
  per-course `localStorage` fallback.
- Public certificate verification logging runs after the response via a queued job.
- Dark mode was intentionally left out; the dashboard uses a light theme only.
