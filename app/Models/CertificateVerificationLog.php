<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CertificateVerificationLog extends Model
{
    public $timestamps = false;

    protected $fillable = ['certificate_id', 'code_searched', 'found', 'ip_address', 'user_agent'];

    protected function casts(): array
    {
        return ['found' => 'boolean', 'created_at' => 'datetime'];
    }
}
