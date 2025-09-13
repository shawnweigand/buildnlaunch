<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;
use Lorisleiva\Actions\Facades\Actions;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // If in production, force HTTPS
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }

        // Calculate taxes for Cashier
        // Cashier::calculateTaxes();

        // Register Actions commands
        Actions::registerCommands();
    }
}
