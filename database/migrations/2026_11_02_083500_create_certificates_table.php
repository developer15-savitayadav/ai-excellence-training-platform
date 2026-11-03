<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('code', 32)->unique();      // display: AIEA-2026-XXXXXXXXXX
            $table->string('code_key', 32)->unique();  // normalised (no dashes), used for fast lookup

            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('issued_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('revoked_by')->nullable()->constrained('users')->nullOnDelete();

            // Snapshot at issue time
            $table->string('student_name');
            $table->string('student_email')->nullable()->index();
            $table->string('course_title');
            $table->string('course_slug')->nullable();
            $table->string('duration')->nullable();
            $table->unsignedTinyInteger('score')->nullable();
            $table->string('grade', 8)->nullable();
            $table->string('instructor_name')->nullable();

            $table->date('issued_at');
            $table->date('expires_at')->nullable();

            $table->string('status', 16)->default('active')->index(); // active | revoked
            $table->timestamp('revoked_at')->nullable();
            $table->string('revoked_reason')->nullable();

            $table->string('signature', 64);
            $table->timestamps();
        });

        Schema::create('certificate_verification_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('certificate_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('code_searched', 64);
            $table->boolean('found')->default(false);
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent', 255)->nullable();
            $table->timestamp('created_at')->useCurrent()->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificate_verification_logs');
        Schema::dropIfExists('certificates');
    }
};
