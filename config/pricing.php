<?php

return [
    'plans' => [
        'starter' => [
            'name' => 'STARTER',
            'period' => 'per month',
            'features' => [
                'Up to 10 projects',
                'Basic analytics',
                '48-hour support response time',
                'Limited API access',
                'Community support',
            ],
            'description' => 'Perfect for individuals and small projects',
            'button_text' => 'Start Free Trial',
            'is_popular' => false,
            'stripe_product_id' => 'prod_T6KUObTNjWYYhX',
            'prices' => [
                'monthly' => [
                    'price' => '50',
                    'stripe_price_id' => 'price_1SA7peIAGnedkOn90ZEYVIoD',
                ],
                'yearly' => [
                    'price' => '40',
                    'stripe_price_id' => 'price_1SA7qGIAGnedkOn9ZarjIkxF',
                ],
            ],
        ],
        'professional' => [
            'name' => 'PROFESSIONAL',
            'period' => 'per month',
            'features' => [
                'Unlimited projects',
                'Advanced analytics',
                '24-hour support response time',
                'Full API access',
                'Priority support',
                'Team collaboration',
                'Custom integrations',
            ],
            'description' => 'Ideal for growing teams and businesses',
            'button_text' => 'Get Started',
            'is_popular' => true,
            'stripe_product_id' => 'prod_T6Kb8bhjrA8Dji',
            'prices' => [
                'monthly' => [
                    'price' => '99',
                    'stripe_price_id' => 'price_1SA7wOIAGnedkOn9i2JKMzKr',
                ],
                'yearly' => [
                    'price' => '79',
                    'stripe_price_id' => 'price_1SA7wnIAGnedkOn9MKcZfQwT',
                ],
            ],
        ],
        'enterprise' => [
            'name' => 'ENTERPRISE',
            'period' => 'per month',
            'features' => [
                'Everything in Professional',
                'Custom solutions',
                'Dedicated account manager',
                '1-hour support response time',
                'SSO Authentication',
                'Advanced security',
                'Custom contracts',
                'SLA agreement',
            ],
            'description' => 'For large organizations with specific needs',
            'button_text' => 'Contact Sales',
            'is_popular' => false,
            'stripe_product_id' => 'prod_T6KcysX2oxIUoN',
            'prices' => [
                'monthly' => [
                    'price' => '299',
                    'stripe_price_id' => 'price_1SA7xQIAGnedkOn9Mcke4M9x',
                ],
                'yearly' => [
                    'price' => '239',
                    'stripe_price_id' => 'price_1SA7yKIAGnedkOn97ME0RRXv',
                ],
            ],
        ],
    ],

    'currency' => 'USD',
    'trial_days' => 5,
];
