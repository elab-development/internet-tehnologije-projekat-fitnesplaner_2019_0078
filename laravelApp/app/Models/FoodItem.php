<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoodItem extends Model
{
    use HasFactory;
    //ova klasa predstavlja sastojke u sirovom obliku npr jedno jaje ima toliko i toliko kalorija, proteina.. 
    protected $fillable = [
        'name',
        'calories',
        'proteins',
        'carbohydrates',
        'fats',
        'serving_size',
        'category',
    ];



}
