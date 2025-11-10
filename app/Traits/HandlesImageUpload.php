<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;

trait HandlesImageUpload
{
    public function handleImageUpload(UploadedFile $file, string $directory = 'images/originals'): string
    {
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = "{$directory}/{$filename}";

        Storage::disk('public')->put($path, file_get_contents($file->getRealPath()));

        return $path;
    }
}
