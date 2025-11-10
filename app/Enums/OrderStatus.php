<?php

namespace App\Enums;

enum OrderStatus: string
{
    case Pending = 'pending';
    case OnTransit = 'ontransit';
    case Delivery = 'delivery';
}