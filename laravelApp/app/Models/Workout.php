<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'date',
        'type',
        'duration',
        'intensity',
        'calories_burned',
        'notes',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class)->withPivot('repetitions', 'sets', 'weight', 'rest');
    }
}
