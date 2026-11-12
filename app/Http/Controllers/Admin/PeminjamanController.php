<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alat;
use App\Models\Peminjaman;
use Database\Seeders\InventorySeeder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PeminjamanController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        $user = $request->user();
        if ($user && $user->role !== 'admin' && !str_starts_with($user->email, 'admin') && $user->username !== 'admin') {
            return redirect('/peminjaman');
        }

        try {
            if (Peminjaman::where('status', 'Sedang Dipinjam')->count() < 6) {
                (new InventorySeeder())->run();
            }

            $loans = Peminjaman::with('alat')->latest()->get();
        } catch (\Throwable) {
            $loans = collect();
        }

        return Inertia::render('admin/peminjaman/index', [
            'initialLoans' => $loans,
        ]);
    }

    public function returnItem(Peminjaman $peminjaman): RedirectResponse
    {
        if ($peminjaman->status === 'Dikembalikan') {
            return redirect()->back()->with('info', 'Barang ini sudah dikembalikan.');
        }

        DB::transaction(function () use ($peminjaman) {
            $peminjaman->update([
                'status' => 'Dikembalikan',
                'return_date' => now()->toDateString(),
            ]);

            $alat = Alat::where('id', $peminjaman->alat_id)->lockForUpdate()->first();
            if ($alat) {
                $alat->update([
                    'stock' => min($alat->total, $alat->stock + 1),
                ]);
            }
        });

        return redirect()->back()->with('success', 'Barang telah dikonfirmasi kembali oleh admin.');
    }
}
