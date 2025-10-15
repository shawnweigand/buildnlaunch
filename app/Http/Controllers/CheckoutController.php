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

        $stripeProductId = $request->stripeProductId;
        $stripePriceId   = $request->stripePriceId;

        // Get trial days from pricing config
        $trialDays = config('pricing.trial_days', 5);

        $checkoutSession = $request->user()
            ->newSubscription($stripeProductId, $stripePriceId)
            ->trialDays($trialDays)
            ->allowPromotionCodes()
            ->checkout([
                'success_url' => route('checkout-success'),
                'cancel_url' => route('checkout-cancel'),
            ]);

        // Use Inertia's external redirect to avoid CORS issues with Stripe
        return Inertia::location($checkoutSession->url);
    }

    /**
     * Swap Subscription
     */
    public function swap(Request $request)
    {
        // Validate required parameters
        $request->validate([
            'stripeProductId' => 'required|string',
            'stripePriceId' => 'required|string',
        ]);

        $stripeProductId = $request->stripeProductId;
        $stripePriceId   = $request->stripePriceId;

        $request->user()->subscription($stripeProductId)->swap($stripePriceId);

        return redirect()->route('home')->with('message', 'Subscription swapped successfully');
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
