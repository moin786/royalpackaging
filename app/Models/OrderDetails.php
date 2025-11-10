<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{
    protected $fillable = [
        'order_id',
        'transaction_id',
        'transaction_date',
        'delivery_area',
        'delivery_charge',
        'product_id',
        'minimum_unit',
        'unit_price',
        'unit_weight',
        'qty',
        'total_pc',
        'total_price',
        'total_weight'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
