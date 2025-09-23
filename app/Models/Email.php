<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Email extends Model
{
    protected $fillable = [
        'name',
        'email',
        'waitlist_id',
        'quiz_id',
        'email_verified_at',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
        ];
    }

    /**
     * Get the waitlist entry associated with this email.
     */
    public function waitlist(): BelongsTo
    {
        return $this->belongsTo(Waitlist::class);
    }

    /**
     * Get the quiz entry associated with this email.
     */
    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }
}
