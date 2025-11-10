<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeliveryController extends Controller
{
   public function index()
    {
        $query = Delivery::query();

        $delivery = $query->orderBy('created_at', 'desc')->with('product')->paginate(5);
        return Inertia::render('delivery-prices/index', ['deliveries' => $delivery]);
    }

    public function create()
    {
        $products = Product::all();
        return Inertia::render('delivery-prices/create', ['products' => $products]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer',
            'delivery_type' => 'required|string',
            'delivery_charge' => 'required|numeric',
            'over_weight_charge' => 'required|numeric'
        ]);
        
        $data = [
            'product_id' => $request->product_id,
            'delivery_type' => $request->delivery_type,
            'delivery_charge' => $request->delivery_charge,
            'over_weight_charge' => $request->over_weight_charge
        ];

        Delivery::create($data);

        return redirect()->back()->with('success', 'Delivery created successfully.');
    }   

    public function show($id)
    {
        return Inertia::render('delivery-prices/show', ['id' => $id]);
    }

    public function edit($id)
    {
        $delivery = Delivery::with('product')->findOrFail($id)->refresh();
        $products = Product::all();

        return Inertia::render('delivery-prices/edit', ['products' => $products, 'delivery' => $delivery]);
    }

    public function update(Request $request, $id)
    {
        $category = Delivery::findOrFail($id);

        $validated = $request->validate([
            'product_id' => 'required|integer',
            'delivery_type' => 'required|string',
            'delivery_charge' => 'required|numeric',
            'over_weight_charge' => 'required|numeric'
        ]);


        $data = [
            'product_id' => $request->product_id,
            'delivery_type' => $request->delivery_type,
            'delivery_charge' => $request->delivery_charge,
            'over_weight_charge' => $request->over_weight_charge
        ];


        $category->update($data);


        return redirect()->back()->with('success', 'Delivery updated successfully.');
    }
    public function destroy($id)
    {
        if (!$id) {
            return redirect()->back()->with('error', 'Invalid delivery ID.');
        }

        $category = Delivery::findOrFail($id);
        $category->delete();

        return redirect()->back()->with('success', 'Delivery deleted successfully.');
    }
}
