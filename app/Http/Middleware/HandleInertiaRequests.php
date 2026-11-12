<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'adminCounts' => fn () => $request->user() && ($request->user()->role === 'admin' || str_starts_with($request->user()->email, 'admin') || $request->user()->username === 'admin') ? [
                'items' => \App\Models\Alat::count(),
                'activeLoans' => \App\Models\Peminjaman::where('status', 'Sedang Dipinjam')->count(),
                'students' => \App\Models\User::where('role', 'siswa')->count(),
            ] : null,
        ];
    }
}
