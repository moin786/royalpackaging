<?php

namespace App\Models;

//use App\Enums\OrderStatus;
use App\Observers\OrderObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy(OrderObserver::class)]
class Order extends Model
{
    protected $fillable = [
        'order_id',
        'order_date',
        'customer_id',
        'customer_mobile',
        'email',
        'order_amount',
        'description',
        'status'
    ];

    //Because we are using enum inside database

    //App\Enums\OrderStatus;

    /*protected $casts = [
        'status' => OrderStatus::class,
    ];

    Order::create([
        'order_number' => 'ORD-20251109-0001',
        'total' => 6100,
        'status' => OrderStatus::Pending,
    ]);
    */

    /*

    const STATUS_PENDING = 'pending';
    const STATUS_ONTRANSIT = 'ontransit';
    const STATUS_DELIVERY = 'delivery';

    public static function statuses(): array
    {
        return [
            self::STATUS_PENDING,
            self::STATUS_ONTRANSIT,
            self::STATUS_DELIVERY,
        ];
    }

    Order::create([
        'order_number' => 'ORD-20251109-0001',
        'total' => 6100,
        'status' => Order::STATUS_PENDING,
    ]);
    */

    public function items()
    {
        return $this->hasMany(OrderDetails::class);
    }

}
