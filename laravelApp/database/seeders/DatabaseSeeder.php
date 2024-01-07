<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Exercise;
use App\Models\Hydration;
use App\Models\User;
use App\Models\Workout;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Kreiranje korisnika
        User::factory(10)->create()->each(function ($user) {
            // Za svakog korisnika kreiramo workout
            Workout::factory(3)->create(['user_id' => $user->id]);
            // Za svakog korisnika kreiramo hydration record
            Hydration::factory(5)->create(['user_id' => $user->id]);
        });

      
        Exercise::factory(20)->create();
    }
}
