<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteController extends Controller
{
    public function index()
    {
        $categories = Category::orderBy('created_at', 'desc')->get();
        $products = Product::with('deliveries')->orderBy('created_at')->get();
        return Inertia::render('site/index', [
            'categories' => $categories ?? [],
            'products' => $products ?? []
        ]);
    }

    
}
