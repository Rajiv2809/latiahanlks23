<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->input('token');
        $user = User::where('remember_token', $token)->first();

        if(!$user || !$token ){
            return response()->json([
                'message' => 'unatorizhed'
            ], 401);
        };

        Auth::login($user);

        return $next($request);
    }
}
