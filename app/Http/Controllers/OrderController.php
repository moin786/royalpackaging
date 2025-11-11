<?php

namespace App\Http\Controllers;

use App\Models\ApplicationSetting;
use App\Models\Banner;
use App\Models\Customer;
use App\Models\Order;
use App\Services\OrderNumberGenerator;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $query = Order::query();

        if ($search = request()->input('search')) {
            $query->where('order_id', 'like', "%{$search}%");
        }

        return Inertia::render('order/index', ['orders' => $query->with('items.product')->where('status', 'pending')->orderBy('created_at', 'desc')->paginate(5)]);


    }

    public function create()
    {
        $banner = Banner::first();
        return Inertia::render('site/checkout', ['banner' => $banner]);
    }

    public function userOrderList($search) {
        $query = Order::query();

        if (isset($search)) {
            $query->where('status', $search);
        }

        $banner = Banner::first();
        return Inertia::render('site/user-order-list', ['orders' => $query->with('items.product')->where('customer_mobile', session()->get('login_mobile'))->orderBy('created_at', 'desc')->paginate(5), 'banner' => $banner]);

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'mobile' => 'required|string|max:30',
            'email' => 'nullable|email',
            'description' => 'nullable|string'
        ]);

        DB::transaction(function() use($request) {
            $orderNumber = OrderNumberGenerator::generate('ORD');
            $customer = Customer::where('mobile', $request->mobile)->first();

            $order = Order::create([
                'order_id' => $orderNumber,
                'order_date' => Carbon::now('Asia/Dhaka'),
                'customer_id' => $customer->id,
                'customer_mobile' => $customer->mobile,
                'order_amount' => 0.00,
                'email' => $request->email ?? null,
                'description' => $request->description ?? null,
                'status' => 'pending',
            ]);
        });

        return redirect()->back()->with('success', 'Order successfully submitted');

    }



    public function showConfirmedOrder()
    {
        $query = Order::query();

        if ($search = request()->input('search')) {
            $query->where('order_id', 'like', "%{$search}%");
        }

        return Inertia::render('order/confirmorder', ['orders' => $query->with('items.product')->where('status', 'confirm')->orderBy('created_at', 'desc')->paginate(5)]);
    }

    public function showOnTransitOrder()
    {
        $query = Order::query();

        if ($search = request()->input('search')) {
            $query->where('order_id', 'like', "%{$search}%");
        }

        return Inertia::render('order/ontransit-order', ['orders' => $query->with('items.product')->where('status', 'ontransit')->orderBy('created_at', 'desc')->paginate(5)]);
    }

    public function showDeliveredOrder()
    {
        $query = Order::query();

        if ($search = request()->input('search')) {
            $query->where('order_id', 'like', "%{$search}%");
        }

        return Inertia::render('order/delivered-order', ['orders' => $query->with('items.product')->where('status', 'delivery')->orderBy('created_at', 'desc')->paginate(5)]);

    }



    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $order->status = $request->status;
        $order->save();

        return redirect()->back()->with('success', 'Order successfully updated');
    }

    public function destroy($id)
    {
        if (!$id) {
            return redirect()->back()->with('error', 'Invalid order ID.');
        }

        $order = Order::findOrFail($id);
        if ($order->delete()) {
            return redirect()->back()->with('success', 'Order deleted successfully.');
        }

    }
}
