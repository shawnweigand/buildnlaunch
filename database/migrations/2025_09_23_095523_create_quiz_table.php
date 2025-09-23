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
        Schema::create('quiz', function (Blueprint $table) {
            $table->id();
            $table->string('question_1', 50)->nullable(); // Multiple choice
            $table->string('question_2', 50)->nullable(); // Multiple choice
            $table->string('question_3', 50)->nullable(); // Multiple choice
            $table->string('question_4', 50)->nullable(); // Multiple choice
            $table->string('question_5', 50)->nullable(); // Multiple choice
            $table->string('question_6', 50)->nullable(); // Multiple choice
            $table->string('question_7', 50)->nullable(); // Multiple choice
            $table->string('question_8', 50)->nullable(); // Multiple choice
            $table->string('question_9', 50)->nullable(); // Multiple choice
            $table->string('question_10', 50)->nullable(); // Multiple choice
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz');
    }
};
