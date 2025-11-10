<?php

namespace Tests\Feature\Delivery;

use App\Models\Delivery;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeliveryChargeTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_index_displays_deliveries_list()
    {
        Delivery::factory()->count(3)->create();

        $response = $this->actingAs($this->user)->get(route('delivery-prices.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('delivery-prices/index')
                ->has('deliveries.data', 3)
        );
    }

    public function test_create_displays_products_list()
    {
        Product::factory()->count(2)->create();

        $response = $this->actingAs($this->user)->get(route('delivery-prices.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('delivery-prices/create')
                ->has('products', 2)
        );
    }

    public function test_store_creates_new_delivery()
    {
        $product = Product::factory()->create();

        $data = [
            'product_id' => $product->id,
            'delivery_type' => 'Inside Dhaka',
            'delivery_charge' => 120,
            'over_weight_charge' => 25,
        ];

        $response = $this->actingAs($this->user)->post(route('delivery-prices.store'), $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('deliveries', [
            'product_id' => $product->id,
            'delivery_type' => 'Inside Dhaka',
        ]);
    }

    public function test_show_displays_specific_delivery()
    {
        $delivery = Delivery::factory()->create();
        $response = $this->actingAs($this->user)->get(route('delivery-prices.show', $delivery->id));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('delivery-prices/show')
                ->where('id', (string) $delivery->id)
        );
    }

    public function test_edit_displays_delivery_and_products()
    {
        $delivery = Delivery::factory()->create();
        Product::factory()->count(3)->create();

        $response = $this->actingAs($this->user)->get(route('delivery-prices.edit', $delivery->id));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('delivery-prices/edit')
                ->has('products')
                ->has('delivery')
                ->where('delivery.id', $delivery->id)
        );
    }

    public function test_update_modifies_existing_delivery()
    {
        $delivery = Delivery::factory()->create();
        $product = Product::factory()->create();

        $data = [
            'product_id' => $product->id,
            'delivery_type' => 'Outside Dhaka',
            'delivery_charge' => 100,
            'over_weight_charge' => 15,
        ];

        $response = $this->actingAs($this->user)->put(route('delivery-prices.update', $delivery->id), $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('deliveries', [
            'id' => $delivery->id,
            'delivery_type' => 'Outside Dhaka',
            'delivery_charge' => 100,
        ]);
    }

    public function test_destroy_soft_deletes_delivery()
    {
        $delivery = Delivery::factory()->create();

        $response = $this->actingAs($this->user)->delete(route('delivery-prices.destroy', $delivery->id));

        $response->assertRedirect();
        $this->assertSoftDeleted('deliveries', ['id' => $delivery->id]);
    }
}
