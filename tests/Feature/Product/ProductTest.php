<?php

namespace Tests\Feature\Product;

use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function test_index_displays_products()
    {
        $product = Product::factory()->create();

        $this->get(route('products.index'))
            ->assertInertia(fn(Assert $page) => 
                $page->component('products/index')
                     ->has('products.data', 1)
                     ->where('products.data.0.id', $product->id)
            );
    }

    public function test_create_displays_categories()
    {
        $category = Category::factory()->create();

        $this->get(route('products.create'))
            ->assertInertia(fn(Assert $page) =>
                $page->component('products/create')
                     ->has('categories', 1)
                     ->where('categories.0.id', $category->id)
            );
    }

    public function test_store_creates_product_without_image()
    {
        $category = Category::factory()->create();

        $data = [
            'name' => 'Test Product',
            'description' => 'Description here',
            'unit_price' => 10,
            'unit_weight' => 5,
            'minimum_unit' => 1,
            'category_id' => $category->id,
            'status' => 1,
        ];

        $response = $this->post(route('products.store'), $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('products', ['name' => 'Test Product']);
    }

    public function test_store_creates_product_with_image()
    {
        Storage::fake('public');
        $category = Category::factory()->create();
        $file = UploadedFile::fake()->image('product.jpg');

        $data = [
            'name' => 'Test Product Image',
            'description' => 'Description with image',
            'unit_price' => 15,
            'unit_weight' => 3,
            'minimum_unit' => 2,
            'category_id' => $category->id,
            'status' => 1,
            'product_image' => $file,
        ];

        $response = $this->post(route('products.store'), $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('products', ['name' => 'Test Product Image']);
        $product = Product::first();
        Storage::disk('public')->assertExists($product->product_image);
    }

    public function test_show_displays_product_page()
    {
        $product = Product::factory()->create();

        $this->get(route('products.show', $product->id))
            ->assertInertia(fn(Assert $page) =>
                $page->component('products/show')
                     ->where('id', (string) $product->id)
            );
    }

    public function test_edit_displays_product_with_categories()
    {
        $product = Product::factory()->create();
        $category = Category::factory()->create();

        $this->get(route('products.edit', $product->id))
            ->assertInertia(fn(Assert $page) =>
                $page->component('products/edit')
                     ->has('product')
                     ->has('categories')
            );
    }

    public function test_update_product_without_image()
    {
        $product = Product::factory()->create();
        $category = Category::factory()->create();

        $data = [
            'name' => 'Updated Product',
            'description' => 'Updated Description',
            'unit_price' => 20,
            'unit_weight' => 6,
            'minimum_unit' => 2,
            'category_id' => $category->id,
            'status' => 1,
        ];

        $response = $this->put(route('products.update', $product->id), $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('products', ['name' => 'Updated Product']);
    }

    public function test_update_product_with_image()
    {
        Storage::fake('public');
        $product = Product::factory()->create();
        $category = Category::factory()->create();
        $file = UploadedFile::fake()->image('update.jpg');

        $data = [
            'name' => 'Updated With Image',
            'description' => 'Updated Description',
            'unit_price' => 25,
            'unit_weight' => 7,
            'minimum_unit' => 3,
            'category_id' => $category->id,
            'status' => 1,
            'product_image' => $file,
        ];

        $response = $this->put(route('products.update', $product->id), $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('products', ['name' => 'Updated With Image']);
        $product = Product::first();
        Storage::disk('public')->assertExists($product->product_image);
    }

    public function test_destroy_deletes_product()
    {
        $product = Product::factory()->create();

        $response = $this->delete(route('products.destroy', $product->id));

        $response->assertRedirect();
        $this->assertSoftDeleted('products', ['id' => $product->id]);
    }
}
