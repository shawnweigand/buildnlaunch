<?php

namespace App\AiAgents;

use LarAgent\Agent;

class ExampleAgent extends Agent
{
    protected $model = 'gemini-2.5-flash-lite';

    protected $history = 'in_memory';

    protected $provider = 'gemini';

    protected $tools = [];

    public function instructions()
    {
        return <<<EOT
        Define your agent's instructions here.
        EOT;
    }

    public function prompt($message)
    {
        return $message;
    }

    public function structuredOutput()
    {
        return [
            'name' => 'response',
            'schema' => [
                'type' => 'string',
            ],
        ];
    }
}
