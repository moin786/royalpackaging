<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Delivery extends Model
{
    /** @use HasFactory<\Database\Factories\DeliveryFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'delivery_type',
        'delivery_charge',
        'over_weight_charge'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
