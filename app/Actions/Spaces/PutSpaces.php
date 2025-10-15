<?php

namespace App\Actions\Spaces;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Lorisleiva\Actions\Concerns\AsAction;

class PutSpaces
{
    use AsAction;

    public function handle($path, $imageUrl)
    {
        $imageFile = Http::get($imageUrl);
        Storage::disk('spaces')->put($path, $imageFile->body());
        $url = 'https://' . config('filesystems.disks.spaces.bucket') . '.' . str_replace('https://', '', config('filesystems.disks.spaces.url')) . '/' . $path;
        return $url;
    }
}
