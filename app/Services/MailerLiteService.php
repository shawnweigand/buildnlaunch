<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class MailerLiteService
{
    private ?string $apiKey;
    private string $baseUrl = 'https://connect.mailerlite.com/api';

    public function __construct()
    {
        $this->apiKey = config('services.mailerlite.api_key');
    }

    private function ensureConfigured(): void
    {
        if (empty($this->apiKey)) {
            throw new Exception('MailerLite API key is not configured. Please set MAILERLITE_API_KEY in your environment.');
        }
    }

    /**
     * Create a new subscriber in MailerLite
     *
     * @param string $email
     * @param array $fields Additional subscriber fields (name, country, etc.)
     * @param array $groups Group IDs to add the subscriber to
     * @param bool $status Subscribe status (true for subscribed, false for unsubscribed)
     * @return array
     * @throws Exception
     */
    public function createSubscriber(
        string $email,
        array $fields = [],
        array $groups = [],
        bool $status = true
    ): array {
        $this->ensureConfigured();

        try {
            $payload = [
                'email' => $email,
                'status' => $status ? 'active' : 'unsubscribed',
            ];

            if (!empty($fields)) {
                $payload['fields'] = $fields;
            }

            if (!empty($groups)) {
                $payload['groups'] = $groups;
            }

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($this->baseUrl . '/subscribers', $payload);

            if ($response->successful()) {
                Log::info('Subscriber created successfully', [
                    'email' => $email,
                    'response' => $response->json()
                ]);

                return $response->json();
            }

            Log::error('Failed to create subscriber', [
                'email' => $email,
                'status' => $response->status(),
                'response' => $response->json()
            ]);

            throw new Exception('Failed to create subscriber: ' . $response->body());

        } catch (Exception $e) {
            Log::error('Error creating subscriber in MailerLite', [
                'email' => $email,
                'error' => $e->getMessage()
            ]);

            throw $e;
        }
    }

    /**
     * Get subscriber by email
     *
     * @param string $email
     * @return array|null
     * @throws Exception
     */
    public function getSubscriber(string $email): ?array
    {
        $this->ensureConfigured();

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->get($this->baseUrl . '/subscribers', [
                'filter' => [
                    'email' => $email
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return $data['data'][0] ?? null;
            }

            throw new Exception('Failed to get subscriber: ' . $response->body());

        } catch (Exception $e) {
            Log::error('Error getting subscriber from MailerLite', [
                'email' => $email,
                'error' => $e->getMessage()
            ]);

            throw $e;
        }
    }

    /**
     * Update subscriber
     *
     * @param string $subscriberId
     * @param array $data
     * @return array
     * @throws Exception
     */
    public function updateSubscriber(string $subscriberId, array $data): array
    {
        $this->ensureConfigured();

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->put($this->baseUrl . '/subscribers/' . $subscriberId, $data);

            if ($response->successful()) {
                Log::info('Subscriber updated successfully', [
                    'subscriber_id' => $subscriberId,
                    'response' => $response->json()
                ]);

                return $response->json();
            }

            throw new Exception('Failed to update subscriber: ' . $response->body());

        } catch (Exception $e) {
            Log::error('Error updating subscriber in MailerLite', [
                'subscriber_id' => $subscriberId,
                'error' => $e->getMessage()
            ]);

            throw $e;
        }
    }

    /**
     * Delete subscriber
     *
     * @param string $subscriberId
     * @return bool
     * @throws Exception
     */
    public function deleteSubscriber(string $subscriberId): bool
    {
        $this->ensureConfigured();

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->delete($this->baseUrl . '/subscribers/' . $subscriberId);

            if ($response->successful()) {
                Log::info('Subscriber deleted successfully', [
                    'subscriber_id' => $subscriberId
                ]);

                return true;
            }

            throw new Exception('Failed to delete subscriber: ' . $response->body());

        } catch (Exception $e) {
            Log::error('Error deleting subscriber from MailerLite', [
                'subscriber_id' => $subscriberId,
                'error' => $e->getMessage()
            ]);

            throw $e;
        }
    }
}
