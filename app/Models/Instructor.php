<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Instructor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name', 'slug', 'email', 'specialization', 'title', 'bio',
        'avatar', 'rating', 'student_count', 'years_experience',
        'linkedin', 'twitter', 'github', 'status',
    ];

    protected $casts = [
        'rating' => 'float',
        'student_count' => 'integer',
        'years_experience' => 'integer',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
