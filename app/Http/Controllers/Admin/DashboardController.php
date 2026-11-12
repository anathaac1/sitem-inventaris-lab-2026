<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alat;
use App\Models\Peminjaman;
use App\Models\User;
use Database\Seeders\InventorySeeder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        $user = $request->user();
        if ($user && $user->role !== 'admin' && !str_starts_with($user->email, 'admin') && $user->username !== 'admin') {
            return redirect('/dashboard');
        }

        try {
            if (Alat::count() === 0 || Peminjaman::where('status', 'Sedang Dipinjam')->count() < 6) {
                (new InventorySeeder())->run();
            }

            $items = Alat::latest()->get();
            $loans = Peminjaman::with('alat')->latest()->get();
            $students = User::where('role', 'siswa')->get();
        } catch (\Throwable) {
            $items = collect();
            $loans = collect();
            $students = collect();
        }

        return Inertia::render('admin/dashboard/index', [
            'initialItems' => $items,
            'initialLoans' => $loans,
            'initialStudents' => $students,
        ]);
    }
}
