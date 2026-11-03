<?php

use App\Models\Certificate;
use App\Models\CertificateVerificationLog;
use App\Models\User;
use App\Services\CertificateService;
use Illuminate\Support\Facades\DB;

function makeCert(array $over = []): Certificate
{
    return app(CertificateService::class)->issue(array_merge([
        'student_name' => 'Asha Patel',
        'course_title' => 'Generative AI Professional',
        'score' => '92',
        'grade' => 'A',
        'instructor_name' => 'Dr. Sharma',
        'duration' => '3 months',
    ], $over));
}

function adminUser(): User
{
    $u = User::factory()->create(['email_verified_at' => now()]);
    $u->forceFill(['is_admin' => true])->save();

    return $u;
}

it('issues a unique, signed certificate', function () {
    $c = makeCert();
    expect($c->code)->toMatch('/^AIEA-\d{4}-[A-Z2-9]{10}$/')
        ->and($c->fresh()->hasValidSignature())->toBeTrue();
});

it('verifies a valid certificate and logs it', function () {
    $c = makeCert();
    $this->get("/verify/{$c->code}")
        ->assertOk()
        ->assertHeader('X-Robots-Tag')
        ->assertInertia(fn ($p) => $p->where('result.state', 'valid')
            ->where('result.certificate.studentName', 'Asha Patel'));

    expect(CertificateVerificationLog::where('certificate_id', $c->id)->count())->toBe(1);
});

it('accepts lower case and codes without dashes', function () {
    $c = makeCert();
    $loose = strtolower(str_replace('-', '', $c->code));
    $this->get("/verify/{$loose}")->assertInertia(fn ($p) => $p->where('result.state', 'valid'));
});

it('returns 404 for unknown codes', function () {
    $this->get('/verify/AIEA-2026-ZZZZZZZZZZ')->assertNotFound();
});

it('shows revoked and expired states', function () {
    $r = makeCert();
    app(CertificateService::class)->revoke($r, 'Issued in error');
    $this->get("/verify/{$r->code}")->assertInertia(fn ($p) => $p->where('result.state', 'revoked'));

    $e = makeCert(['expires_at' => now()->subDays(2)->toDateString()]);
    $this->get("/verify/{$e->code}")->assertInertia(fn ($p) => $p->where('result.state', 'expired'));
});

it('detects tampering in any signed field', function () {
    foreach (['student_name' => 'Someone Else', 'instructor_name' => 'Fake', 'duration' => '10 years'] as $col => $val) {
        $c = makeCert();
        Certificate::whereKey($c->id)->update([$col => $val]);
        $this->get("/verify/{$c->code}")
            ->assertInertia(fn ($p) => $p->where('result.state', 'invalid')->missing('result.certificate'));
    }
});

it('rate limits lookups', function () {
    config(['certificates.rate_limit' => 3]);
    foreach (range(1, 3) as $_) {
        $this->get('/verify/AIEA-2026-ZZZZZZZZZZ');
    }
    $this->get('/verify/AIEA-2026-ZZZZZZZZZZ')->assertStatus(429);
});

it('keeps legacy urls working', function () {
    $c = makeCert();
    $this->get("/certificate/{$c->code}")->assertRedirect("/verify/{$c->code}");
});

it('blocks non-admins from the admin screen', function () {
    $user = User::factory()->create(['email_verified_at' => now()]);
    $this->actingAs($user)->get('/admin/certificates')->assertForbidden();
});

it('lets an admin issue and revoke', function () {
    $admin = adminUser();

    $this->actingAs($admin)->post('/admin/certificates', [
        'student_name' => 'Ravi Shah',
        'course_title' => 'AI Tools Mastery',
        'issued_at' => now()->toDateString(),
    ])->assertSessionHas('issued_code');

    $c = Certificate::firstOrFail();
    expect($c->issued_by)->toBe($admin->id);

    $this->actingAs($admin)->patch("/admin/certificates/{$c->uuid}/revoke", ['reason' => 'Test'])
        ->assertSessionHasNoErrors();
    expect($c->fresh()->isRevoked())->toBeTrue()->and($c->fresh()->revoked_by)->toBe($admin->id);
});

it('lets only the owner or an admin download the pdf', function () {
    $owner = User::factory()->create(['email_verified_at' => now()]);
    $other = User::factory()->create(['email_verified_at' => now()]);
    $c = makeCert(['user_id' => $owner->id]);

    $this->actingAs($owner)->get("/certificates/{$c->uuid}/download")->assertOk();
    $this->actingAs($other)->get("/certificates/{$c->uuid}/download")->assertForbidden();
    $this->actingAs(adminUser())->get("/certificates/{$c->uuid}/download")->assertOk();
});

it('prunes old logs only', function () {
    DB::table('certificate_verification_logs')->insert([
        ['code_searched' => 'OLD', 'found' => false, 'created_at' => now()->subDays(120)],
        ['code_searched' => 'NEW', 'found' => false, 'created_at' => now()],
    ]);

    $this->artisan('certificate:prune-logs')->assertSuccessful();

    expect(CertificateVerificationLog::pluck('code_searched')->all())->toBe(['NEW']);
});

it('audit command flags tampered rows', function () {
    $c = makeCert();
    $this->artisan('certificate:audit')->assertSuccessful();

    Certificate::whereKey($c->id)->update(['course_title' => 'Hacked']);
    $this->artisan('certificate:audit')->assertFailed();
});
