<?php

use App\Http\Controllers\CheckoutController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

// Use to only access when subscribed -> Route::get('/example', function () {...})->middleware([Subscribed::class]);

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

// WorkOS
Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


// Cashier [https://laravel.com/docs/12.x/billing#quickstart-selling-products] -> for quantity products
Route::get('/checkout', [CheckoutController::class, 'checkout'])->name('checkout');
Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout-success');
Route::get('/checkout/cancel', [CheckoutController::class, 'cancel'])->name('checkout-cancel');

// Socialite [https://laravel.com/docs/12.x/socialite#routing]
// Other providers: https://socialiteproviders.com/
// Route::get('/auth/redirect', function () {
//     return Socialite::driver('github')->redirect();
// });

// Route::get('/auth/callback', function () {
//     // replace socialite with driver
//     $socialiteUser = Socialite::driver('github')->user();
//
//     $user = User::updateOrCreate([
//         'socialite_id' => $socialiteUser->id,
//     ], [
//         'name' => $socialiteUser->name,
//         'email' => $socialiteUser->email,
//         'token' => $socialiteUser->token,
//         'refresh_token' => $socialiteUser->refreshToken,
//         'expires_in' => $socialiteUser->expiresIn,
//         // 'avatar' => $socialiteUser->getAvatar(),
//     ]);

//     Auth::login($user);

//     return redirect('/dashboard');
// });

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
