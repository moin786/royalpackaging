<?php

namespace App\Services;

use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

class OrderNumberGenerator
{
    public static function generate(string $prefix = 'ORD'): string
    {
        $date = now()->format('Ymdi'); // 20251109
        $key = "{$date}";

        $seqPadded = str_pad((string)$key, 5, '0', STR_PAD_LEFT); // 00001
        return "{$prefix}-{$date}-{$seqPadded}";
    }
}
