<?php

namespace App\Observers;

use App\Models\ApplicationSetting;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Services\OrderNumberGenerator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        DB::transaction(function () use($order) {
            $orderItems = collect([]);
            $invoiceDetails = json_decode(request()->invoice_items, true);
           
            $totalAmount = collect($invoiceDetails)->sum('totalPrice');

            $order->order_amount = $totalAmount;
            $order->save();

            foreach($invoiceDetails as $item) {
                $orderItems->push([
                    'order_id' => $order->id,
                    'transaction_id' => OrderNumberGenerator::generate('TRAN'),
                    'transaction_date' => Carbon::now('Asia/Dhaka'),
                    'delivery_area' => $item['deliveryArea'],
                    'delivery_charge' => $item['deliveryCharge'],
                    'product_id' => $item['filterProduct']['id'],
                    'minimum_unit' => $item['filterProduct']['minimum_unit'],
                    'unit_price' => $item['filterProduct']['unit_price'],
                    'unit_weight' => $item['filterProduct']['unit_weight'],
                    'qty' => $item['qty'],
                    'total_pc' => $item['totalPc'],
                    'total_price' => $item['totalPrice'],
                    'total_weight' => $item['totalWeight']
                ]);
            }

            OrderDetails::insert([...$orderItems]);


            $message = "Dear Valued Client,
Your order sucessfully submited to royalpack.com
Order ID: {$order->order_id}
Ordered Amount: {$order->order_amount} TK
Order Date:{$order->order_date}
                                                    
ROYALPACK Team
Call us: 01946270230";

            if ($order) {
                session()->put(['order_id' => $order->order_id]);
                session()->put(['order_amount' => $order->order_amount]);
                session()->put(['order_date' => $order->order_date]);
                
                $appSettings = ApplicationSetting::first();

                $response = Http::asForm()->post('http://bulksmsbd.net/api/smsapi', [
                    'api_key'   => $appSettings->sms_api_key,//'rd4i8INpjWCqgKPImdHW', //env('RECAPTCHA_SECRET_KEY'),
                    'senderid' => $appSettings->sms_senderid,//'8809617628902',
                    'number' => session()->get('customer_mobile'),
                    'message' => $message
                ]);
            }
        });
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        //
    }
}
