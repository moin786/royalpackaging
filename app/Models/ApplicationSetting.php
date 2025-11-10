<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApplicationSetting extends Model
{
    protected $fillable = [
        'title',
        'site_logo',
        'api_key',
        'senderid'
    ];
}
