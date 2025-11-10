<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Traits\HandlesImageUpload;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    use HandlesImageUpload;

    public function index()
    {

        $query = Product::query();

        if ($search = request()->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        return Inertia::render('products/index', ['products' => $query->orderBy('created_at', 'desc')->paginate(5)]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('products/create', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'unit_price' => 'required|numeric|min:0',
            'unit_weight' => 'required|numeric|min:0',
            'minimum_unit' => 'required|integer|min:0',
            'product_image' => 'nullable|image|max:1024',
            'category_id' => 'required|exists:categories,id',
            'status' => 'nullable|in:1,0',
        ]);

        if ($request->file('product_image')) {
            $data = [
                'name' => $request->name,
                'description' => $request->description,
                'unit_price' => $request->unit_price,
                'unit_weight' => $request->unit_weight,
                'minimum_unit' => $request->minimum_unit,
                'product_image' => $this->handleImageUpload($request->file('product_image'), 'images/originals_products'),
                'category_id' => $request->category_id,
                'user_id' => $request->user()->id,
                'status' => $request->status ? 1 : 0,
            ];

            Product::create($data);

            return redirect()->back()->with('success', 'Product created successfully.');
        }

        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'unit_price' => $request->unit_price,
            'unit_weight' => $request->unit_weight,
            'minimum_unit' => $request->minimum_unit,
            'category_id' => $request->category_id,
            'user_id' => $request->user()->id,
            'status' => $request->status ? 1 : 0,
        ];

        Product::create($data);

        return redirect()->back()->with('success', 'Product created successfully.');
    }   

    public function show($id)
    {
        return Inertia::render('products/show', ['id' => $id]);
    }

    public function edit($id)
    {
        $categories = Category::all();
        $product = Product::with('category')->findOrFail($id);

        $customProduct = [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'minimumUnit' => $product->minimum_unit,
            'unitPrice' => $product->unit_price,
            'unitWeight' => $product->unit_weight,
            'categoryId' => $product->category_id,
            'productImage' => $product->product_image,
            'status' => $product->status,
            'category' => $product->category
        ];

        return Inertia::render('products/edit', ['product' => $customProduct, 'categories' => $categories]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'unit_price' => 'required|numeric|min:0',
            'unit_weight' => 'required|numeric|min:0',
            'minimum_unit' => 'required|integer|min:0',
            'product_image' => 'nullable|image|max:1024',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:1,0',
        ]);

        if ($request->file('product_image')) {

                $data = [
                    'name' => $request->name,
                    'description' => $request->description,
                    'unit_price' => $request->unit_price,
                    'unit_weight' => $request->unit_weight,
                    'minimum_unit' => $request->minimum_unit,
                    'product_image' => $this->handleImageUpload($request->file('product_image'), 'images/originals_products'),
                    'category_id' => $request->category_id,
                    'status' => $request->status ? 1 : 0,
                ];

                $product->update($data);

                return redirect()->back()->with('success', 'Product updated successfully.');
        }

        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'unit_price' => $request->unit_price,
            'unit_weight' => $request->unit_weight,
            'minimum_unit' => $request->minimum_unit,
            'category_id' => $request->category_id,
            'status' => $request->status ? 1 : 0,
        ];

        $product->update($data);


        return redirect()->back()->with('success', 'Product updated successfully.');
    }
    public function destroy($id)
    {
        if (!$id) {
            return redirect()->back()->with('error', 'Invalid product ID.');
        }

        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully.');
    }

}
