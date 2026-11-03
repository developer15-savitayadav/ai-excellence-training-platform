<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\Admin\CertificateAdminController;
use App\Http\Controllers\Admin\CourseAdminController;
use App\Http\Controllers\Admin\EnrollmentAdminController;
use App\Http\Controllers\Admin\EnquiryAdminController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\StudentAdminController;
use App\Http\Controllers\Admin\TrainerAdminController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\CertificatePdfController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FeeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\LearnController;
use App\Http\Controllers\OfflineCoursesController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgrammesController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\Student\CertificateController as StudentCertificateController;
use App\Http\Controllers\Student\EnrollmentController as StudentEnrollmentController;
use App\Http\Controllers\Student\NotificationController as StudentNotificationController;
use App\Http\Controllers\Student\WishlistController as StudentWishlistController;
use App\Http\Middleware\VerificationHeaders;
use Illuminate\Support\Facades\Route;

// ---------------------------------------------------------------------------
// Public routes
// ---------------------------------------------------------------------------
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{slug}', [CourseController::class, 'show'])->name('courses.show');
Route::get('/pricing', [PricingController::class, 'index'])->name('pricing');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/instructors', [InstructorController::class, 'index'])->name('instructors.index');
Route::get('/instructors/{slug}', [InstructorController::class, 'show'])->name('instructors.show');
Route::get('/resources', [ResourceController::class, 'index'])->name('resources.index');
Route::get('/resources/{slug}', [ResourceController::class, 'show'])->name('resources.show');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/fee', [FeeController::class, 'index'])->name('fee');
Route::get('/programmes', [ProgrammesController::class, 'index'])->name('programmes');
Route::get('/career', [CareerController::class, 'index'])->name('career');
Route::get('/offline-courses', [OfflineCoursesController::class, 'index'])->name('offline-courses');

// Public certificate verification
Route::middleware([VerificationHeaders::class, 'throttle:certificate-verify'])->group(function () {
    Route::get('/verify', [CertificateController::class, 'index'])->name('certificate.index');
    Route::post('/verify', [CertificateController::class, 'search'])->name('certificate.search');
    Route::get('/verify/{code}', [CertificateController::class, 'verify'])
        ->where('code', '[A-Za-z0-9\-\s]{6,40}')
        ->name('certificate.verify');
});
Route::get('/certificate/{code}', [CertificateController::class, 'legacy'])->name('certificate.show');

// ---------------------------------------------------------------------------
// Authenticated routes
// ---------------------------------------------------------------------------
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/certificates/{certificate:uuid}/download', CertificatePdfController::class)
        ->name('certificates.download');

    // Student area
    Route::get('/my-learning', [StudentEnrollmentController::class, 'index'])->name('student.my-learning.index');
    Route::post('/courses/{course}/enroll', [StudentEnrollmentController::class, 'store'])->name('student.enrollments.store');
    Route::patch('/enrollments/{enrollment}', [StudentEnrollmentController::class, 'update'])->name('student.enrollments.update');
    Route::delete('/enrollments/{enrollment}', [StudentEnrollmentController::class, 'destroy'])->name('student.enrollments.destroy');

    Route::get('/my-certificates', [StudentCertificateController::class, 'index'])->name('student.certificates.index');

    Route::get('/wishlist', [StudentWishlistController::class, 'index'])->name('student.wishlist.index');
    Route::post('/wishlist/{course}', [StudentWishlistController::class, 'store'])->name('student.wishlist.store');
    Route::delete('/wishlist/{course}', [StudentWishlistController::class, 'destroy'])->name('student.wishlist.destroy');

    Route::get('/notifications', [StudentNotificationController::class, 'index'])->name('student.notifications.index');
    Route::patch('/notifications/{notification}/read', [StudentNotificationController::class, 'read'])->name('student.notifications.read');
    Route::post('/notifications/read-all', [StudentNotificationController::class, 'readAll'])->name('student.notifications.read-all');
    Route::delete('/notifications/{notification}', [StudentNotificationController::class, 'destroy'])->name('student.notifications.destroy');

    Route::get('/learn/{slug}', [LearnController::class, 'show'])->name('learn.show');

    // Instructor area
    Route::middleware('instructor')->group(function () {
        Route::get('/instructor/dashboard', [DashboardController::class, 'instructor'])->name('instructor.dashboard');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // -----------------------------------------------------------------------
    // Admin area
    // -----------------------------------------------------------------------
    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'admin'])->name('dashboard');

        Route::get('/students', [StudentAdminController::class, 'index'])->name('students.index');
        Route::patch('/students/{student}', [StudentAdminController::class, 'update'])->name('students.update');
        Route::delete('/students/{student}', [StudentAdminController::class, 'destroy'])->name('students.destroy');

        Route::get('/trainers', [TrainerAdminController::class, 'index'])->name('trainers.index');
        Route::post('/trainers', [TrainerAdminController::class, 'store'])->name('trainers.store');
        Route::patch('/trainers/{trainer}', [TrainerAdminController::class, 'update'])->name('trainers.update');
        Route::delete('/trainers/{trainer}', [TrainerAdminController::class, 'destroy'])->name('trainers.destroy');

        Route::get('/courses', [CourseAdminController::class, 'index'])->name('courses.index');
        Route::post('/courses', [CourseAdminController::class, 'store'])->name('courses.store');
        Route::patch('/courses/{course}', [CourseAdminController::class, 'update'])->name('courses.update');
        Route::patch('/courses/{course}/status', [CourseAdminController::class, 'updateStatus'])->name('courses.status');
        Route::delete('/courses/{course}', [CourseAdminController::class, 'destroy'])->name('courses.destroy');

        Route::get('/enrollments', [EnrollmentAdminController::class, 'index'])->name('enrollments.index');
        Route::post('/enrollments', [EnrollmentAdminController::class, 'store'])->name('enrollments.store');
        Route::patch('/enrollments/{enrollment}', [EnrollmentAdminController::class, 'update'])->name('enrollments.update');
        Route::delete('/enrollments/{enrollment}', [EnrollmentAdminController::class, 'destroy'])->name('enrollments.destroy');

        Route::get('/enquiries', [EnquiryAdminController::class, 'index'])->name('enquiries.index');
        Route::patch('/enquiries/{enquiry}', [EnquiryAdminController::class, 'update'])->name('enquiries.update');
        Route::delete('/enquiries/{enquiry}', [EnquiryAdminController::class, 'destroy'])->name('enquiries.destroy');

        Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
        Route::get('/reports/export/{type}', [ReportController::class, 'export'])
            ->whereIn('type', ['students', 'enrollments', 'certificates', 'enquiries'])
            ->name('reports.export');

        Route::get('/certificates', [CertificateAdminController::class, 'index'])->name('certificates.index');
        Route::post('/certificates', [CertificateAdminController::class, 'store'])->name('certificates.store');
        Route::patch('/certificates/{certificate:uuid}/revoke', [CertificateAdminController::class, 'revoke'])->name('certificates.revoke');
    });
});

Route::get('/learn', function () {
    return redirect()->route('courses.index');
})->name('learn.index');

require __DIR__ . '/auth.php';
