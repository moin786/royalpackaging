<?php

namespace App\Http\Controllers;

use App\Models\ApplicationSetting;
use App\Models\Banner;
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
        $banner = Banner::first();
        

        if (ApplicationSetting::exists()) {
            $appSetting = ApplicationSetting::first();
            session()->put(['site_logo' => $appSetting->site_logo]);
        }
        return Inertia::render('site/index', [
            'categories' => $categories ?? [],
            'products' => $products ?? [],
            'banner' => $banner
        ]);
    }

    
}
