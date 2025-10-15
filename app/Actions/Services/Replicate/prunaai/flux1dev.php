<?php

namespace App\Actions\Services\Replicate\prunnai;

use App\Services\ReplicateService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Lorisleiva\Actions\Concerns\AsAction;
use Illuminate\Support\Str;

class flux1dev
{
    use AsAction;

    public string $commandSignature = 'generate:image';

    private ReplicateService $replicateService;

    public function __construct()
    {
        $this->replicateService = new ReplicateService();
    }

    public function handle(string $prompt)
    {
        $version = 'b0306d92aa025bb747dc74162f3c27d6ed83798e08e5f8977adf3d859d0536a3';
        $input = [
            'prompt' => $prompt,
            'speed_mode' => "Extra Juiced 🔥 (more speed)",
            'num_inference_steps' => 28,
            'guidance' => 3.5,
            'seed' => -1,
            'aspect_ratio' => "4:3",
            'image_size' => 1024,
            'output_format' => "jpg",
            'output_quality' => 80
        ];
        $prediction = $this->replicateService->postPrediction($version, $input);
        Log::info('flux-1-dev completed successfully');

        return $prediction;
    }

    public function asCommand(Command $command)
    {
        $command->info('Generating image...');

        $dishName = "Creamy Garlic Chicken Pasta";
        $subtitle = "A cozy Italian-inspired dinner";
        $description = "Tender chicken breast and pasta tossed in a rich garlic cream sauce, finished with fresh parsley and parmesan cheese.";

        $ingredients = [
            "chicken breast",
            "olive oil",
            "garlic",
            "heavy cream",
            "parmesan cheese",
            "salt",
            "black pepper",
            "parsley"
        ];

        $prompt = view('RecipeV2.Image.CoverImagePrompt', [
            'dishName' => $dishName,
            'subtitle' => $subtitle,
            'description' => $description,
            'ingredients' => $ingredients,
        ])->render();

        $result = $this->handle($prompt);
        dd($result);
    }
}
