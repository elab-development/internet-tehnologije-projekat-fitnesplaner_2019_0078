<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hydration extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'date',
        'amount', // kolicina unete tečnosti u mililitrima
        'time', 
    ];

    protected $casts = [
        'date' => 'datetime',
        'time' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }



}
