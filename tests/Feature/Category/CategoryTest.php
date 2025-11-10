<?php

namespace Tests\Feature\Category;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function test_index_displays_categories_list()
    {
        Category::factory()->count(3)->create();

        $response = $this->actingAs($this->user)->get(route('categories.index'));

        $response->assertStatus(200);

        $response->assertInertia(fn (Assert $page) =>
            $page->component('categories/index')
                ->has('categories.data', 3)
        );
    }

    public function test_create_displays_create_page()
    {
        $response = $this->actingAs($this->user)->get(route('categories.create'));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) =>
            $page->component('categories/create')
        );
    }

    public function test_store_creates_new_category_with_image()
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('test.jpg');

        $response = $this->actingAs($this->user)->post(route('categories.store'), [
            'name' => 'Test Category',
            'user_id' => $this->user->id,
            'description' => 'Sample description',
            'category_image' => $file,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Category created successfully.');

        $this->assertDatabaseHas('categories', [
            'name' => 'Test Category',
        ]);

        $category = Category::first();

        Storage::disk('public')->assertExists($category->category_image);
    }

    public function test_show_displays_category_page()
    {
        $category = Category::factory()->create();

        $response = $this->actingAs($this->user)->get(route('categories.show', $category->id));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) =>
            $page->component('categories/show')
                ->where('id', (string) $category->id)
        );
    }

    public function test_edit_displays_edit_page_with_category_data()
    {
        $category = Category::factory()->create();
        $response = $this->actingAs($this->user)->get(route('categories.edit', $category->id));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) =>
            $page->component('categories/edit')
                ->where('category.id', $category->id)
                ->where('category.name', $category->name)
                ->where('category.description', $category->description)
        );
    }

    public function test_update_modifies_category_without_image()
    {
        $category = Category::factory()->create();

        $response = $this->actingAs($this->user)->put(route('categories.update', $category->id), [
            'name' => 'Updated Category',
            'description' => 'Updated description',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Category updated successfully.');

        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'name' => 'Updated Category',
        ]);
    }

    public function test_update_replaces_category_image_when_provided()
    {
        Storage::fake('public');
        $category = Category::factory()->create();

        $file = UploadedFile::fake()->image('new-image.png');

        $response = $this->actingAs($this->user)->put(route('categories.update', $category->id), [
            'name' => 'Category With Image',
            'description' => 'Image updated',
            'category_image' => $file,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Category updated successfully.');
        $category = Category::first();
        Storage::disk('public')->assertExists($category->category_image);
    }

    public function test_destroy_deletes_category()
    {
        $category = Category::factory()->create();

        $response = $this->actingAs($this->user)->delete(route('categories.destroy', $category->id));

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Category deleted successfully.');

        $this->assertSoftDeleted('categories', [
            'id' => $category->id,
        ]);
    }
}
