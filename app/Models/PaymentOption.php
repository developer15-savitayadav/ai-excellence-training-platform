<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentOption extends Model
{
    protected $fillable = ['title', 'description', 'accent', 'sort_order'];
}
