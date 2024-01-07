<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{ 

    //ovo ce biti obroci koje korisnici mogu da unesu u aplikaciju, za svaki obrok ce unositi jedan po jedan sastojak
    // za svaki sastojak ce birati gramazu, pa ce se prema tome obracunavati kalorije
    use HasFactory;
    protected $fillable = [
        'user_id',
        'date', //da bismo znali ko je uneo koliko kalorija kog dana
        'type', //dorucak rucak vecera
         
    ];

    protected $casts = [
        'date' => 'datetime',
        'food_items' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function items()
    {
        return $this->hasMany(FoodItem::class);
    }


}



