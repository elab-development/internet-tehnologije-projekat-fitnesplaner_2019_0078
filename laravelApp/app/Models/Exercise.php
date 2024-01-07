<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'video_url',
        'average_calories_burned',
        'category',
    ];

    public function workouts()
    {
        return $this->belongsToMany(Workout::class)->withTimestamps();
    }
}
