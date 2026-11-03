<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ------------------------------------------------------------------
        // Users: roles, account state and profile data
        // ------------------------------------------------------------------
        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 20)->default('student')->after('is_admin')->index();
            $table->boolean('is_active')->default(true)->after('role')->index();
            $table->string('phone', 30)->nullable()->after('email');
            $table->string('avatar')->nullable()->after('phone');
            $table->text('bio')->nullable()->after('avatar');
            $table->timestamp('last_login_at')->nullable()->after('email_verified_at');
        });

        DB::table('users')->where('is_admin', true)->update(['role' => 'admin']);

        // ------------------------------------------------------------------
        // Trainers / instructors
        // ------------------------------------------------------------------
        Schema::create('instructors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->unique()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('email')->nullable();
            $table->string('specialization')->nullable();
            $table->string('title')->nullable();
            $table->text('bio')->nullable();
            $table->string('avatar')->nullable();
            $table->decimal('rating', 3, 2)->default(0);
            $table->unsignedInteger('student_count')->default(0);
            $table->unsignedInteger('years_experience')->default(0);
            $table->string('linkedin')->nullable();
            $table->string('twitter')->nullable();
            $table->string('github')->nullable();
            $table->string('status', 20)->default('active')->index();
            $table->timestamps();
        });

        // ------------------------------------------------------------------
        // Course metadata needed by the dashboard and catalogue
        // ------------------------------------------------------------------
        Schema::table('courses', function (Blueprint $table) {
            $table->foreignId('instructor_id')->nullable()->after('id')->constrained('instructors')->nullOnDelete();
            $table->string('category', 80)->nullable()->after('title')->index();
            $table->string('status', 20)->default('published')->after('tier')->index();
            $table->text('description')->nullable()->after('subtitle');
            $table->decimal('rating', 3, 2)->default(0)->after('status');
            $table->unsignedInteger('review_count')->default(0)->after('rating');
            $table->decimal('original_price', 10, 2)->nullable()->after('price');
            $table->unsignedInteger('lesson_count')->default(0)->after('hours');
        });

        // ------------------------------------------------------------------
        // Enrollments
        // ------------------------------------------------------------------
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('progress')->default(0);
            $table->unsignedInteger('hours_completed')->default(0);
            $table->string('status', 20)->default('active')->index(); // active | completed | dropped
            $table->date('enrolled_at');
            $table->timestamp('last_accessed_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'course_id']);
            $table->index(['course_id', 'status']);
        });

        // ------------------------------------------------------------------
        // Certificate -> course link (snapshot fields stay immutable)
        // ------------------------------------------------------------------
        Schema::table('certificates', function (Blueprint $table) {
            $table->foreignId('course_id')->nullable()->after('user_id')->constrained()->nullOnDelete();
            $table->index(['course_id', 'status']);
        });

        // ------------------------------------------------------------------
        // Wishlist
        // ------------------------------------------------------------------
        Schema::create('wishlists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['user_id', 'course_id']);
        });

        // ------------------------------------------------------------------
        // In-app notifications
        // ------------------------------------------------------------------
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('type', 40)->default('system');
            $table->string('title');
            $table->text('message');
            $table->string('action_url')->nullable();
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            $table->index(['user_id', 'read_at']);
        });

        // ------------------------------------------------------------------
        // Activity log (drives the "recent activity" feeds)
        // ------------------------------------------------------------------
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete(); // who did it
            $table->string('type', 40);
            $table->string('description');
            $table->nullableMorphs('subject');
            $table->timestamps();
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activities');
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('wishlists');

        Schema::table('certificates', function (Blueprint $table) {
            $table->dropForeign(['course_id']);
            $table->dropIndex(['course_id', 'status']);
            $table->dropColumn('course_id');
        });

        Schema::dropIfExists('enrollments');

        Schema::table('courses', function (Blueprint $table) {
            $table->dropForeign(['instructor_id']);
            $table->dropIndex(['category']);
            $table->dropIndex(['status']);
            $table->dropColumn([
                'instructor_id', 'category', 'status', 'description',
                'rating', 'review_count', 'original_price', 'lesson_count',
            ]);
        });

        Schema::dropIfExists('instructors');

        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role']);
            $table->dropIndex(['is_active']);
            $table->dropColumn(['role', 'is_active', 'phone', 'avatar', 'bio', 'last_login_at']);
        });
    }
};
