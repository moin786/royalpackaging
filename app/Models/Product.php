<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'unit_price',
        'unit_weight',
        'minimum_unit',
        'category_id',
        'user_id',
        'status',
        'product_image',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function deliveries()
    {
        return $this->hasMany(Delivery::class);
    }
}
