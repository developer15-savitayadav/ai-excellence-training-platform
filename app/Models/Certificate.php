<?php

namespace App\Models;

use App\Services\CertificateService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Certificate extends Model
{
    protected $fillable = [
        'uuid', 'code', 'code_key', 'user_id', 'course_id', 'issued_by', 'revoked_by',
        'student_name', 'student_email', 'course_title', 'course_slug',
        'duration', 'score', 'grade', 'instructor_name',
        'issued_at', 'expires_at', 'status', 'revoked_at', 'revoked_reason',
        'signature',
    ];

    protected $hidden = ['signature', 'student_email'];

    protected function casts(): array
    {
        return [
            'score' => 'integer',
            'issued_at' => 'date',
            'expires_at' => 'date',
            'revoked_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function issuer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'issued_by');
    }

    public function logs(): HasMany
    {
        return $this->hasMany(CertificateVerificationLog::class);
    }

    public function isRevoked(): bool
    {
        return $this->status === 'revoked';
    }

    public function isExpired(): bool
    {
        return $this->expires_at !== null && $this->expires_at->endOfDay()->isPast();
    }

    public function hasValidSignature(): bool
    {
        return app(CertificateService::class)->signatureIsValid($this);
    }
}
