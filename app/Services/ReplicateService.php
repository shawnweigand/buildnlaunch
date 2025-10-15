<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Exception;
use Illuminate\Support\Facades\Log;

class ReplicateService
{
    private ?string $apiKey;
    private string $baseUrl = 'https://api.replicate.com/v1';

    public function __construct()
    {
        $this->apiKey = config('services.replicate.api_key');
    }

    private function ensureConfigured(): void
    {
        if (empty($this->apiKey)) {
            throw new Exception('Replicate API key is not configured. Please set REPLICATE_API_KEY in your environment.');
        }
    }

    private function getHeaders(): array
    {
        return [
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
            'Prefer' => 'wait',
        ];
    }

    public function postPrediction(string $version, array $input): array
    {
        $this->ensureConfigured();

        $uri = $this->baseUrl . '/predictions';
        $payload = [
            'version' => $version,
            'input' => $input,
        ];

        try {
            $response = Http::withHeaders($this->getHeaders())->post($uri, $payload);

            if ($response->successful()) {
                Log::info('Replicate prediction created successfully', [
                    'version' => $version,
                    'response' => $response->json()
                ]);

                return $response->json();
            }

            Log::error('Failed to create replicate prediction', [
                'version' => $version,
                'status' => $response->status(),
                'response' => $response->json()
            ]);

            throw new Exception('Failed to create replicate prediction: ' . $response->body());

        } catch (Exception $e) {
            Log::error('Error creating replicate prediction', [
                'version' => $version,
                'error' => $e->getMessage()
            ]);

            throw $e;
        }

    }
}
