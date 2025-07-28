<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('thumbnail')->nullable();
            $table->string('category');
            $table->string('instructor'); // <-- Tambahkan ini
            $table->string('duration'); // <-- Tambahkan ini
            $table->integer('students')->default(0); // <-- Tambahkan ini
            $table->decimal('rating', 2, 1)->default(0.0); // <-- Tambahkan ini
            $table->string('price'); // <-- Tambahkan ini
            $table->string('level'); // <-- Tambahkan ini
            $table->boolean('isPremium')->default(false); // <-- Tambahkan ini
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
