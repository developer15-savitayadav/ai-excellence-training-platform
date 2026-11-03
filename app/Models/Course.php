<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    protected $fillable = [
        'instructor_id', 'category', 'status', 'description', 'rating', 'review_count',
        'title', 'slug', 'subtitle', 'tagline', 'duration', 'hours', 'lesson_count',
        'schedule', 'price', 'original_price', 'level', 'tier', 'badge', 'emi', 'flagship',
        'for_whom', 'image', 'prerequisite', 'takeaway', 'upgrade',
        'cta', 'cta_note', 'difference', 'why_it_matters', 'learning',
        'career_services', 'included', 'months', 'phases', 'tracks',
        'college_services', 'college_note', 'sort_order',
    ];

    protected $casts = [
        'emi' => 'boolean',
        'flagship' => 'boolean',
        'rating' => 'float',
        'original_price' => 'decimal:2',
        'review_count' => 'integer',
        'lesson_count' => 'integer',
        'sort_order' => 'integer',
        'learning' => 'array',
        'career_services' => 'array',
        'included' => 'array',
        'months' => 'array',
        'phases' => 'array',
        'tracks' => 'array',
        'college_services' => 'array',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class);
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class);
    }

    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /** Numeric hours parsed from strings such as "48 hrs" or "3 months". */
    public function hoursValue(): int
    {
        if (preg_match('/(\d+(?:\.\d+)?)\s*(hr|hour)/i', (string) $this->hours, $m)) {
            return (int) round((float) $m[1]);
        }

        if (preg_match('/(\d+(?:\.\d+)?)\s*(month|week|day)/i', (string) $this->duration, $m)) {
            $unit = strtolower($m[2]);
            $value = (float) $m[1];

            return (int) round(match ($unit) {
                'month' => $value * 40,
                'week' => $value * 10,
                default => $value * 2,
            });
        }

        return 0;
    }

    public function toCatalogueArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'subtitle' => $this->subtitle,
            'tagline' => $this->tagline,
            'description' => $this->description,
            'duration' => $this->duration,
            'hours' => $this->hours,
            'schedule' => $this->schedule,
            'price' => $this->price,
            'original_price' => $this->original_price,
            'level' => $this->level,
            'tier' => $this->tier,
            'badge' => $this->badge,
            'emi' => $this->emi,
            'flagship' => $this->flagship,
            'category' => $this->category,
            'status' => $this->status,
            'rating' => $this->rating,
            'review_count' => $this->review_count,
            'lesson_count' => $this->lesson_count,
            'image' => $this->image,
            'for_whom' => $this->for_whom,
            'prerequisite' => $this->prerequisite,
            'takeaway' => $this->takeaway,
            'learning' => $this->learning ?? [],
            'included' => $this->included ?? [],
            'months' => $this->months ?? [],
            'instructor' => $this->instructor ? [
                'id' => $this->instructor->id,
                'name' => $this->instructor->name,
                'slug' => $this->instructor->slug,
                'avatar' => $this->instructor->avatar,
                'specialization' => $this->instructor->specialization,
            ] : null,
        ];
    }
}
