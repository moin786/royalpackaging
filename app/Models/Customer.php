<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'mobile',
        'login_pin',
        'customer_name',
        'address',
        'email'
    ];
}
