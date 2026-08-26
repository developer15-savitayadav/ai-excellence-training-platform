<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('subtitle')->nullable();
            $table->text('tagline');
            $table->string('duration');
            $table->string('hours');
            $table->string('schedule')->nullable();
            $table->string('price')->default('Contact us');
            $table->string('level')->nullable();
            $table->enum('tier', ['short-term', 'professional', 'career']);
            $table->string('badge')->nullable();
            $table->boolean('emi')->default(false);
            $table->boolean('flagship')->default(false);
            $table->text('for_whom')->nullable();
            $table->string('image')->nullable();
            $table->string('prerequisite')->nullable();
            $table->text('takeaway')->nullable();
            $table->text('upgrade')->nullable();
            $table->string('cta')->default('Enrol Now');
            $table->string('cta_note')->nullable();
            $table->text('difference')->nullable();
            $table->text('why_it_matters')->nullable();
            $table->json('learning')->nullable();
            $table->json('career_services')->nullable();
            $table->json('included')->nullable();
            $table->json('months')->nullable();
            $table->json('phases')->nullable();
            $table->json('tracks')->nullable();
            $table->json('college_services')->nullable();
            $table->string('college_note')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
