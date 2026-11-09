<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;

/**
 * Catatan:
 * File bootstrap utama aplikasi (Laravel 11+).
 * Di sini seluruh fondasi aplikasi dikonfigurasi:
 * 1. Routing: Mendaftarkan file rute web, api, console, dan endpoint health check ('/up').
 * 2. Middleware: Mendaftarkan middleware global & grup web (HandleAppearance, HandleInertiaRequests),
 *    serta mengecualikan cookie tertentu ('appearance', 'sidebar_state') dari enkripsi agar bisa dibaca langsung oleh JS frontend.
 * 3. Exceptions: Mengatur penanganan error agar otomatis merespons dalam format JSON jika request berasal dari endpoint '/api/*'.
 */
return Application::configure(basePath: dirname(__DIR__))
    // 1. Konfigurasi File Rute (Routing)
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    // 2. Konfigurasi Middleware Global & Web
    ->withMiddleware(function (Middleware $middleware): void {
        // Jangan enkripsi cookie ini biar JavaScript di browser bisa langsung baca status tema & sidebar
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        // Middleware khusus grup rute 'web'
        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    // 3. Konfigurasi Penanganan Error (Exception Handling)
    ->withExceptions(function (Exceptions $exceptions): void {
        // Kalau URL diawali 'api/*' atau header request minta JSON, paksa respons error dalam format JSON
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();
