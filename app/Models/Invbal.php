<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invbal extends Model
{
    protected $table = 'ds_invbal';
    public $timestamps = true;
    protected $fillable = [
        'istore',
        'invbal',
    ];

    protected $casts = [
        'invbal' => 'json',
    ];
}
