<?php

namespace App\Actions\Services\MailerLite;

use App\Services\MailerLiteService;
use Lorisleiva\Actions\Concerns\AsAction;

class CreateSubscriber
{
    use AsAction;

    private MailerLiteService $mailerLiteService;

    public function __construct()
    {
        $this->mailerLiteService = new MailerLiteService();
    }

    public function handle(string $email, array $fields, array $groups)
    {
        $result = $this->mailerLiteService->createSubscriber(
            email: $email,
            fields: $fields,
            groups: $groups
        );

        return $result;
    }
}
