<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    protected $table = 'quiz';

    protected $fillable = [
        'question_1',
        'question_2',
        'question_3',
        'question_4',
        'question_5',
        'question_6',
        'question_7',
        'question_8',
        'question_9',
        'question_10',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'completed_at' => 'datetime',
        ];
    }

    /**
     * Get the emails associated with this quiz.
     */
    public function emails(): HasMany
    {
        return $this->hasMany(Email::class);
    }

    /**
     * Check if the quiz is complete
     */
    public function isQuizComplete(): bool
    {
        return ! is_null($this->question_1) &&
               ! is_null($this->question_2) &&
               ! is_null($this->question_3) &&
               ! is_null($this->question_4) &&
               ! is_null($this->question_5) &&
               ! is_null($this->question_6) &&
               ! is_null($this->question_7) &&
               ! is_null($this->question_8) &&
               ! is_null($this->question_9) &&
               ! is_null($this->question_10);
    }
}
