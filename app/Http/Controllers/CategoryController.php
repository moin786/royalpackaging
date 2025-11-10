<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
{
    use HandlesImageUpload;
    
    public function index()
    {

        $query = Category::query();

        if ($search = request()->input('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        return Inertia::render('categories/index', ['categories' => $query->orderBy('created_at', 'desc')->paginate(5)]);
    }

    public function create()
    {
        return Inertia::render('categories/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_image' => 'nullable|image|max:700',
        ]);

        if ($request->file('category_image')) {

            $data = [
                'name' => $request->name,
                'description' => $request->description,
                'user_id' => Auth::user()->id,
                'category_image' => $this->handleImageUpload($request->file('category_image')),
            ];

            Category::create($data);

            return redirect()->back()->with('success', 'Category created successfully.');
        }

        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => Auth::user()->id
        ];

        Category::create($data);

        return redirect()->back()->with('success', 'Category created successfully.');
    }   

    public function show($id)
    {
        return Inertia::render('categories/show', ['id' => $id]);
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id)->refresh();
        return Inertia::render('categories/edit', ['category' => $category]);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_image' => 'nullable|image|max:700',
        ]);

        if ($request->file('category_image')) {

                $data = [
                    'name' => $request->name,
                    'description' => $request->description,
                    'user_id' => Auth::user()->id,
                    'category_image' => $this->handleImageUpload($request->file('category_image')),
                ];

                $category->update($data);

                return redirect()->back()->with('success', 'Category updated successfully.');
        }

        $data = [
            'name' => $request->name,
            'description' => $request->description
        ];

        $category->update($data);


        return redirect()->back()->with('success', 'Category updated successfully.');
    }

    public function destroy($id)
    {
        if (!$id) {
            return redirect()->back()->with('error', 'Invalid category ID.');
        }

        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->back()->with('success', 'Category deleted successfully.');
    }

}
