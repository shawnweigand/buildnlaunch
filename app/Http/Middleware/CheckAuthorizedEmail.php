<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckAuthorizedEmail
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $authorizedEmails = array_filter(
            explode(',', config('app.authorized_emails', ''))
        );

        if (empty($authorizedEmails) || !in_array($user->email, $authorizedEmails)) {
            abort(403, 'Unauthorized access to results page.');
        }

        return $next($request);
    }
}
