<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

/**
 * Catatan:
 * Middleware ini adalah jembatan penghubung utama antara backend Laravel dan frontend Inertia (React).
 * Fungsinya penting banget:
 * 1. Nentuin template root HTML utama ('app.blade.php').
 * 2. Ngatur versioning asset (biar kalau ada update build JS/CSS, browser langsung refresh asset baru).
 * 3. Menyediakan "Shared Props" alias data global yang otomatis bisa diakses oleh SEMUA komponen React
 *    tanpa perlu dioper manual satu per satu dari setiap controller (contoh: data auth user, nama aplikasi,
 *    status sidebar terbuka/tertutup, dan counter statistik lab untuk admin).
 */
class HandleInertiaRequests extends Middleware
{
    /**
     * File template root Blade yang dimuat pertama kali saat membuka website.
     * Mengarah ke resources/views/app.blade.php
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Nentuin versi asset aplikasi saat ini buat ngecek apakah cache frontend perlu diperbarui.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Mendefinisikan shared props (data global) yang otomatis dikirim ke seluruh halaman Inertia.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            // Gabungin shared props bawaan dari Inertia parent
            ...parent::share($request),

            // Nama aplikasi dari config .env (APP_NAME)
            'name' => config('app.name'),

            // Data user yang lagi login (bisa dibaca di React via usePage().props.auth.user)
            'auth' => [
                'user' => $request->user(),
            ],

            // Status posisi sidebar (terbuka atau tertutup) yang dibaca dari cookie browser
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',

            // Data counter statistik khusus admin (dibuat closure/lazy-loaded biar cuma di-query kalau user beneran admin)
            'adminCounts' => fn () => $request->user() && ($request->user()->role === 'admin' || str_starts_with($request->user()->email, 'admin') || $request->user()->username === 'admin') ? [
                'items' => \App\Models\Alat::count(),
                'activeLoans' => \App\Models\Peminjaman::where('status', 'Sedang Dipinjam')->count(),
                'students' => \App\Models\User::where('role', 'siswa')->count(),
            ] : null,
        ];
    }
}
