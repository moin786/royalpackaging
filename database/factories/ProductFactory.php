<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'category_id' => \App\Models\Category::factory(),
            'status' => $this->faker->randomElement([0, 1]),
            'user_id' => \App\Models\User::factory(),
            'product_image' => $this->faker->imageUrl()
        ];
    }
}
