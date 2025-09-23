<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Checkout
     */
    public function checkout(Request $request)
    {
        // Validate required parameters
        $request->validate([
            'stripeProductId' => 'required|string',
            'stripePriceId' => 'required|string',
        ]);

        $stripeProductId = $request->input('stripeProductId');
        $stripePriceId   = $request->input('stripePriceId');

        // Get trial days from pricing config
        $trialDays = config('pricing.trial_days', 5);

        return $request->user()
            ->newSubscription($stripeProductId, $stripePriceId) // Remove if not a subscription product
            ->trialDays($trialDays)
            ->allowPromotionCodes()
            ->checkout([
                'success_url' => route('checkout-success'),
                'cancel_url' => route('checkout-cancel'),
            ]);
    }

    /**
     * Success
     */
    public function success()
    {
        return Inertia::render('checkout/success');
    }

    /**
     * Cancel
     */
    public function cancel()
    {
        return redirect()->route('home');
    }
}
