<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => bcrypt('password'),  
            'remember_token' => Str::random(10),
            'height' => $this->faker->numberBetween(150, 200),  
            'weight' => $this->faker->numberBetween(50, 100), 
            'gender' => $this->faker->randomElement(['male', 'female', 'other']),  
            'date_of_birth' => $this->faker->date(),
            'fitness_goals' => $this->faker->sentence,
            'notes' => $this->faker->paragraph
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
