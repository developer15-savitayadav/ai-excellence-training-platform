<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Programme extends Model
{
    protected $fillable = [
        'slug', 'tag', 'title', 'description', 'points',
        'cta_label', 'cta_href', 'accent', 'sort_order',
    ];

    protected $casts = [
        'points' => 'array',
    ];
}
