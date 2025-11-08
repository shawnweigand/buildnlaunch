<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected away from the plans page', function () {
    $this->get('/plans')->assertRedirect('/login');
});

test('authenticated users can view plans with pricing data', function () {
    $this->actingAs(User::factory()->create());

    $this->get('/plans')->assertInertia(fn (Assert $page) => $page
        ->component('plans')
        ->has('pricing', fn (Assert $pricing) => $pricing
            ->where('currency', config('pricing.currency'))
            ->where('trial_days', config('pricing.trial_days'))
            ->where('plans.starter.name', config('pricing.plans.starter.name'))
            ->where('plans.professional.prices.monthly.price', config('pricing.plans.professional.prices.monthly.price'))
            ->where('plans.enterprise.prices.yearly.price', config('pricing.plans.enterprise.prices.yearly.price'))
        )
        ->where('stripe_product_id', null)
        ->where('trial_ends_at', null)
        ->where('ends_at', null)
    );
});
