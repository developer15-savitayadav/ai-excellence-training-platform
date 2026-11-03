<?php

use App\Models\AppNotification;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Enquiry;
use App\Models\Instructor;
use App\Models\User;

function platformAdmin(): User
{
    $user = User::factory()->create(['role' => 'admin', 'is_admin' => true]);

    return $user;
}

function platformCourse(array $overrides = []): Course
{
    return Course::create(array_merge([
        'title' => 'Applied Generative AI',
        'slug' => 'applied-generative-ai-'.uniqid(),
        'tagline' => 'Build real AI workflows',
        'duration' => '8 weeks',
        'hours' => '48 hrs',
        'tier' => 'professional',
        'price' => 'Contact us',
        'status' => 'published',
        'learning' => ['Prompt fundamentals', 'Retrieval augmented generation', 'Deployment'],
    ], $overrides));
}

it('redirects guests away from the admin area', function () {
    $this->get('/admin/dashboard')->assertRedirect('/login');
});

it('blocks students from every admin screen', function () {
    $student = User::factory()->create(['role' => 'student']);

    $this->actingAs($student)->get('/admin/dashboard')->assertForbidden();
    $this->actingAs($student)->get('/admin/students')->assertForbidden();
    $this->actingAs($student)->get('/admin/reports')->assertForbidden();
});

it('shows the admin dashboard and reports from real records', function () {
    $admin = platformAdmin();
    platformCourse();

    $this->actingAs($admin)->get('/admin/dashboard')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Dashboard/Admin')
            ->has('dashboard.stats')
            ->has('dashboard.charts'));

    $this->actingAs($admin)->get('/admin/reports')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Admin/Reports/Index')
            ->has('stats')
            ->has('charts.months')
            ->has('courses'));
});

it('exports report data as csv', function () {
    $admin = platformAdmin();
    User::factory()->create(['role' => 'student', 'name' => 'Export Me']);

    $response = $this->actingAs($admin)->get('/admin/reports/export/students');

    $response->assertOk();
    expect($response->headers->get('content-type'))->toContain('text/csv');
});

it('lets an admin create, update, publish and delete a course', function () {
    $admin = platformAdmin();

    $this->actingAs($admin)->post('/admin/courses', [
        'title' => 'AI Product Management',
        'status' => 'draft',
        'tier' => 'short-term',
        'price' => 'Contact us',
        'tagline' => 'Ship AI products users trust',
        'duration' => '6 weeks',
        'hours' => '36 hrs',
        'learning' => ['Discovery', 'Evaluation', 'Launch'],
    ])->assertSessionHasNoErrors();

    $course = Course::where('title', 'AI Product Management')->firstOrFail();
    expect($course->slug)->toBe('ai-product-management');

    $this->actingAs($admin)->patch("/admin/courses/{$course->slug}", [
        'title' => 'AI Product Management Pro',
        'status' => 'draft',
        'tier' => 'short-term',
        'price' => 'Contact us',
    ])->assertSessionHasNoErrors();

    expect($course->fresh()->title)->toBe('AI Product Management Pro');

    $this->actingAs($admin)->patch("/admin/courses/{$course->slug}/status", ['status' => 'published'])
        ->assertSessionHasNoErrors();
    expect($course->fresh()->status)->toBe('published');

    $this->actingAs($admin)->delete("/admin/courses/{$course->slug}")->assertSessionHasNoErrors();
    expect(Course::whereKey($course->id)->exists())->toBeFalse();
});

it('serves a database course on the public course page', function () {
    $course = platformCourse(['title' => 'Database Course', 'slug' => 'database-course']);

    $this->get('/courses/database-course')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Courses/Show')
            ->where('dbCourse.title', $course->title)
            ->where('dbCourse.slug', 'database-course'));
});

it('lets an enrolled student open the learn player', function () {
    $student = User::factory()->create(['role' => 'student']);
    $course = platformCourse(['slug' => 'learn-player-course']);
    Enrollment::create([
        'user_id' => $student->id,
        'course_id' => $course->id,
        'status' => 'active',
        'progress' => 40,
        'enrolled_at' => now(),
    ]);

    $this->actingAs($student)->get('/learn/learn-player-course')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Learn/Player')
            ->where('course.slug', 'learn-player-course')
            ->has('sections')
            ->where('progress.percentage', 40));
});

it('blocks students who are not enrolled from the learn player', function () {
    $student = User::factory()->create(['role' => 'student']);
    platformCourse(['slug' => 'locked-course']);

    $this->actingAs($student)->get('/learn/locked-course')->assertForbidden();
});

it('lets an admin manage trainers', function () {
    $admin = platformAdmin();

    $this->actingAs($admin)->post('/admin/trainers', [
        'name' => 'Nadia Khan',
        'email' => 'nadia@example.com',
        'specialization' => 'MLOps, LLMs',
        'rating' => 4.7,
        'years_experience' => 8,
        'status' => 'active',
    ])->assertSessionHasNoErrors();

    $trainer = Instructor::where('name', 'Nadia Khan')->firstOrFail();

    $this->actingAs($admin)->patch("/admin/trainers/{$trainer->slug}", [
        'name' => 'Nadia Khan',
        'specialization' => 'MLOps, LLMs, Evaluation',
        'rating' => 4.9,
        'years_experience' => 9,
        'status' => 'active',
    ])->assertSessionHasNoErrors();

    expect((float) $trainer->fresh()->rating)->toBe(4.9);

    $this->actingAs($admin)->delete("/admin/trainers/{$trainer->slug}")->assertSessionHasNoErrors();
    expect(Instructor::whereKey($trainer->id)->exists())->toBeFalse();
});

it('lets an admin enrol a student and change their progress', function () {
    $admin = platformAdmin();
    $student = User::factory()->create(['role' => 'student']);
    $course = platformCourse();

    $this->actingAs($admin)->post('/admin/enrollments', [
        'user_id' => $student->id,
        'course_id' => $course->id,
        'status' => 'active',
    ])->assertSessionHasNoErrors();

    $enrollment = Enrollment::where('user_id', $student->id)->firstOrFail();
    expect(AppNotification::where('user_id', $student->id)->count())->toBe(1);

    $this->actingAs($admin)->patch("/admin/enrollments/{$enrollment->id}", [
        'progress' => 100,
        'status' => 'active',
    ])->assertSessionHasNoErrors();

    expect($enrollment->fresh())
        ->status->toBe('completed')
        ->progress->toBe(100);

    $this->actingAs($admin)->delete("/admin/enrollments/{$enrollment->id}")->assertSessionHasNoErrors();
    expect(Enrollment::whereKey($enrollment->id)->exists())->toBeFalse();
});

it('enrols a student and prevents duplicate enrolments', function () {
    $student = User::factory()->create(['role' => 'student']);
    $course = platformCourse();

    $this->actingAs($student)->post("/courses/{$course->slug}/enroll")->assertRedirect("/learn/{$course->slug}");
    expect(Enrollment::where('user_id', $student->id)->where('course_id', $course->id)->count())->toBe(1);

    $this->actingAs($student)->post("/courses/{$course->slug}/enroll")->assertRedirect("/learn/{$course->slug}");
    expect(Enrollment::where('user_id', $student->id)->where('course_id', $course->id)->count())->toBe(1);
});

it('completes a course and issues a certificate automatically', function () {
    $student = User::factory()->create(['role' => 'student']);
    $course = platformCourse();
    $enrollment = Enrollment::create([
        'user_id' => $student->id,
        'course_id' => $course->id,
        'progress' => 40,
        'status' => 'active',
        'enrolled_at' => now()->toDateString(),
    ]);

    $this->actingAs($student)->patch("/enrollments/{$enrollment->id}", ['progress' => 100])
        ->assertSessionHasNoErrors();

    expect($enrollment->fresh()->status)->toBe('completed');

    $certificate = Certificate::where('user_id', $student->id)->where('course_id', $course->id)->first();
    expect($certificate)->not->toBeNull()
        ->and($certificate->status)->toBe('active')
        ->and($certificate->course_title)->toBe($course->title);

    // Completing twice must not create a duplicate certificate.
    $this->actingAs($student)->patch("/enrollments/{$enrollment->id}", ['progress' => 100]);
    expect(Certificate::where('user_id', $student->id)->count())->toBe(1);
});

it('lets an admin issue a certificate for an eligible enrolment', function () {
    $admin = platformAdmin();
    $student = User::factory()->create(['role' => 'student']);
    $course = platformCourse();
    $enrollment = Enrollment::create([
        'user_id' => $student->id,
        'course_id' => $course->id,
        'progress' => 100,
        'status' => 'completed',
        'enrolled_at' => now()->toDateString(),
        'completed_at' => now(),
    ]);

    $this->actingAs($admin)->post('/admin/certificates', ['enrollment_id' => $enrollment->id])
        ->assertSessionHas('issued_code');

    expect(Certificate::where('user_id', $student->id)->where('course_id', $course->id)->count())->toBe(1);
});

it('lets a student manage their wishlist', function () {
    $student = User::factory()->create(['role' => 'student']);
    $course = platformCourse();

    $this->actingAs($student)->post("/wishlist/{$course->slug}")->assertSessionHasNoErrors();
    expect($student->wishlist()->whereKey($course->id)->exists())->toBeTrue();

    $this->actingAs($student)->get('/wishlist')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('Student/Wishlist')->has('courses', 1));

    $this->actingAs($student)->delete("/wishlist/{$course->slug}")->assertSessionHasNoErrors();
    expect($student->wishlist()->whereKey($course->id)->exists())->toBeFalse();
});

it('lets a student read and delete their notifications', function () {
    $student = User::factory()->create(['role' => 'student']);

    $notification = AppNotification::send(
        $student->id,
        'system',
        'Welcome',
        'Your account is ready.',
    );

    $this->actingAs($student)->get('/notifications')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('Student/Notifications')->where('unread', 1));

    $this->actingAs($student)->patch("/notifications/{$notification->id}/read")->assertRedirect();
    expect($notification->fresh()->read_at)->not->toBeNull();

    $this->actingAs($student)->delete("/notifications/{$notification->id}")->assertSessionHasNoErrors();
    expect(AppNotification::whereKey($notification->id)->exists())->toBeFalse();
});

it('lets an admin triage and delete enquiries', function () {
    $admin = platformAdmin();
    $enquiry = Enquiry::create([
        'name' => 'Sam Lee',
        'email' => 'sam@example.com',
        'phone' => '9999999999',
        'audience' => 'student',
        'program' => 'Applied Generative AI',
        'message' => 'I want to join the next batch.',
        'status' => 'new',
    ]);

    $this->actingAs($admin)->get('/admin/enquiries')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('Admin/Enquiries/Index')->has('enquiries.data', 1));

    $this->actingAs($admin)->patch("/admin/enquiries/{$enquiry->id}", ['status' => 'contacted'])
        ->assertSessionHasNoErrors();
    expect($enquiry->fresh()->status)->toBe('contacted');

    $this->actingAs($admin)->delete("/admin/enquiries/{$enquiry->id}")->assertSessionHasNoErrors();
    expect(Enquiry::whereKey($enquiry->id)->exists())->toBeFalse();
});

it('logs out suspended users on their next request', function () {
    $user = User::factory()->create(['role' => 'student', 'is_active' => false]);

    $this->actingAs($user)->get('/dashboard')
        ->assertRedirect('/login')
        ->assertSessionHasErrors('email');
});
