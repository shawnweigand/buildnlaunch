<?php

return [
    'questions' => [
        1 => [
            'type' => 'multiple_choice',
            'question' => 'Which best describes your current situation?',
            'options' => [
                'option_1' => 'Developer/Engineer',
                'option_2' => 'Product Manager',
                'option_3' => 'Designer',
                'option_4' => 'Founder/CEO',
            ],
        ],
        2 => [
            'type' => 'multiple_choice',
            'question' => 'Which best describes your desired outcome relating to this topic?',
            'options' => [
                'option_1' => '1-10 employees',
                'option_2' => '11-50 employees',
                'option_3' => '51-200 employees',
                'option_4' => '200+ employees',
            ],
        ],
        3 => [
            'type' => 'multiple_choice',
            'question' => 'What is the biggest frustration you\'ve experienced relating to this topic?',
            'options' => [
                'option_1' => 'Technology/Software',
                'option_2' => 'E-commerce/Retail',
                'option_3' => 'Healthcare',
                'option_4' => 'Other',
            ],
        ],
        4 => [
            'type' => 'multiple_choice',
            'question' => 'At which price point would you most easily allocate budget if there was a good solution available?',
            'options' => [
                'option_1' => 'Improving productivity',
                'option_2' => 'Cost reduction',
                'option_3' => 'Better user experience',
                'option_4' => 'Scalability',
            ],
        ],
        5 => [
            'type' => 'scale',
            'question' => 'On a scale from 1 to 10, how urgent is your need for this solution?',
            'min' => 1,
            'max' => 10,
            'low_label' => 'Just curious',
            'high_label' => 'ASAP',
        ],
    ],
];
