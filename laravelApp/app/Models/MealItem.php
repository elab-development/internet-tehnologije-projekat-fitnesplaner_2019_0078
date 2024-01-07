<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MealItem extends Model
{
    //ova klasa povezuje food item i meal, govori nam za neki odredjeni obrok koji sve sastojci idu u taj obrok po gramima

    use HasFactory;
    protected $fillable = [
        'meal_id',
        'food_item_id',
        'quantity',  //u gramima
    ];

    public function meal()
    {
        return $this->belongsTo(Meal::class);
    }

    public function foodItem()
    {
        return $this->belongsTo(FoodItem::class);
    }
}


