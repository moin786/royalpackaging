<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BannerController extends Controller
{
    use HandlesImageUpload; 

     public function index()
    {

        $query = Banner::query();

        if ($search = request()->input('search')) {
            $query->where('banner_title', 'like', "%{$search}%");
        }

        return Inertia::render('banners/index', ['banners' => $query->orderBy('created_at', 'desc')->paginate(5)]);
    }

    public function create()
    {
        return Inertia::render('banners/create');
    }

    public function show($id)
    {
        //
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'banner_title' => 'required|string|max:255',
            'banner_description' => 'nullable|string',
            'banner_image' => 'nullable|image|max:1024',
        ]);

        if ($request->file('banner_image')) {

            $data = [
                'banner_title' => $request->banner_title,
                'banner_description' => $request->banner_description,
                'banner_image' => $this->handleImageUpload($request->file('banner_image'), 'images/banners'),
            ];

            Banner::create($data);

            return redirect()->back()->with('success', 'Banner created successfully.');
        }

        $data = [
            'banner_title' => $request->banner_title,
            'banner_description' => $request->description
        ];

        Banner::create($data);

        return redirect()->back()->with('success', 'Banner created successfully.');
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }

}
