<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Delivery>
 */
class DeliveryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'delivery_type' => $this->faker->word(),
            'delivery_charge' =>$this->faker->randomElement([80, 120]),
            'over_weight_charge' =>$this->faker->randomElement([20, 20])
        ];
    }
}
