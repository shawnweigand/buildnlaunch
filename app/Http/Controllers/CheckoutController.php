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
        $stripeProductId = $request->stripeProductId;
        $stripePriceId   = $request->stripePriceId;

        return $request->user()
            ->newSubscription($stripeProductId, $stripePriceId) // Remove if not a subscription product
            // ->trialDays(5)
            // ->allowPromotionCodes()
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
        return Inertia::render('home');
    }
}
