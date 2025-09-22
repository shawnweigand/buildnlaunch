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
        Schema::create('waitlist', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('email')->unique();
            $table->string('question_1', 50)->nullable(); // Multiple choice
            $table->string('question_2', 50)->nullable(); // Multiple choice
            $table->string('question_3', 50)->nullable(); // Multiple choice
            $table->string('question_4', 50)->nullable(); // Multiple choice
            $table->integer('question_5')->nullable(); // Scale
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamps();

            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('waitlist');
    }
};
