<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

/**
 * Catatan:
 * Middleware ini fungsinya buat nanganin tema tampilan (appearance/theme) aplikasi,
 * seperti tema terang (light), gelap (dark), atau ngikutin setelan perangkat (system).
 * Cara kerjanya: ngebaca nilai cookie 'appearance' dari browser user,
 * terus di-share ke view blade utama biar tampilan langsung render tema yang sesuai sejak awal.
 */
class HandleAppearance
{
    /**
     * Memproses request yang masuk dan membagikan data tema ke tampilan.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Ambil preferensi tema dari cookie browser user, kalau belum pernah disetel default-nya 'system'
        View::share('appearance', $request->cookie('appearance') ?? 'system');

        // Lanjutin request ke proses berikutnya
        return $next($request);
    }
}
