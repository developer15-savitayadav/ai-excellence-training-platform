<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programmes', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('tag');
            $table->string('title');
            $table->text('description');
            $table->json('points')->nullable();
            $table->string('cta_label');
            $table->string('cta_href')->default('/contact');
            $table->enum('accent', ['lime', 'violet'])->default('lime');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programmes');
    }
};
