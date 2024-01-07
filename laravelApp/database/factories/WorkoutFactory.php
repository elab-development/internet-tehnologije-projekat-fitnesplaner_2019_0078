<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Workout>
 */
class WorkoutFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'date' => $this->faker->date(),
            'type' => $this->faker->randomElement(['Cardio', 'Strength', 'Flexibility', 'Balance']),
            'duration' => $this->faker->numberBetween(15, 120),
            'intensity' => $this->faker->randomElement(['Low', 'Medium', 'High']),
            'calories_burned' => $this->faker->numberBetween(100, 1000),
            'notes' => $this->faker->sentence
        ];
    }
}
