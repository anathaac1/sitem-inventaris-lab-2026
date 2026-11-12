<?php

namespace App\Http\Controllers;

use App\Models\Alat;
use App\Models\Peminjaman;
use Database\Seeders\InventorySeeder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response|\Illuminate\Http\RedirectResponse
    {
        $user = $request->user();
        if ($user && ($user->role === 'admin' || str_starts_with($user->email, 'admin') || $user->username === 'admin')) {
            return redirect('/admin');
        }

        try {
            if (Alat::count() === 0) {
                (new InventorySeeder())->run();
            }

            Alat::where('description', 'like', '%✨%')->get()->each(function ($a) {
                $a->description = trim(str_replace('✨', '', $a->description));
                $a->save();
            });

            $items = Alat::where('is_visible_to_students', true)
                ->latest()
                ->get();

            $query = Peminjaman::with('alat')
                ->where('status', 'Sedang Dipinjam')
                ->latest();

            if ($user = $request->user()) {
                $query->where(function ($q) use ($user) {
                    $q->where('user_id', $user->id)
                        ->orWhere('borrower_name', $user->name);
                });
            }

            $activeLoans = $query->get();
        } catch (\Throwable $e) {
            $items = collect();
            $activeLoans = collect();
        }

        return Inertia::render('siswa/dashboard/index', [
            'initialItems' => $items,
            'initialActiveLoans' => $activeLoans,
        ]);
    }
}
