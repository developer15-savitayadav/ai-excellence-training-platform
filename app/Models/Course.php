<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title', 'slug', 'subtitle', 'tagline', 'duration', 'hours',
        'schedule', 'price', 'level', 'tier', 'badge', 'emi', 'flagship',
        'for_whom', 'image', 'prerequisite', 'takeaway', 'upgrade',
        'cta', 'cta_note', 'difference', 'why_it_matters', 'learning',
        'career_services', 'included', 'months', 'phases', 'tracks',
        'college_services', 'college_note', 'sort_order',
    ];

    protected $casts = [
        'emi' => 'boolean',
        'flagship' => 'boolean',
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
}
