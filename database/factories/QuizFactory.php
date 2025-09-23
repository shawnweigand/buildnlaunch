<?php

namespace Database\Factories;

use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quiz>
 */
class QuizFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Quiz::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'question_1' => null,
            'question_2' => null,
            'question_3' => null,
            'question_4' => null,
            'question_5' => null,
            'question_6' => null,
            'question_7' => null,
            'question_8' => null,
            'question_9' => null,
            'question_10' => null,
            'completed_at' => null,
        ];
    }

    /**
     * Indicate that the quiz is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'question_1' => 'option_1',
            'question_2' => 'option_2',
            'question_3' => 'option_3',
            'question_4' => 'option_4',
            'question_5' => 'option_5',
            'question_6' => 'option_6',
            'question_7' => 'option_7',
            'question_8' => 'option_8',
            'question_9' => 'option_9',
            'question_10' => 'option_10',
            'completed_at' => now(),
        ]);
    }
}
