<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Waitlist extends Model
{
    protected $table = 'waitlist';

    protected $fillable = [
        'first_name',
        'email',
        'question_1',
        'question_2',
        'question_3',
        'question_4',
        'question_5',
        'email_verified_at',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
        ];
    }

    /**
     * Check if the survey is complete
     */
    public function isSurveyComplete(): bool
    {
        return !is_null($this->question_1) &&
               !is_null($this->question_2) &&
               !is_null($this->question_3) &&
               !is_null($this->question_4) &&
               !is_null($this->question_5);
    }
}
