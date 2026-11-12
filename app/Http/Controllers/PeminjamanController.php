<?php

namespace App\Http\Controllers;

use App\Models\Alat;
use App\Models\Peminjaman;
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
        if ($user && ($user->role === 'admin' || str_starts_with($user->email, 'admin') || $user->username === 'admin')) {
            return redirect('/admin/peminjaman');
        }

        try {
            $query = Peminjaman::with('alat')->latest();

            if ($user = $request->user()) {
                $query->where(function ($q) use ($user) {
                    $q->where('user_id', $user->id)
                        ->orWhere('borrower_name', $user->name);
                });
            }

            $loans = $query->get();

            $activeLoans = $loans->where('status', 'Sedang Dipinjam')->values();
            $loanHistory = $loans->where('status', 'Dikembalikan')->values();
        } catch (\Throwable) {
            $activeLoans = collect();
            $loanHistory = collect();
        }

        return Inertia::render('siswa/peminjaman/index', [
            'initialActiveLoans' => $activeLoans,
            'initialLoanHistory' => $loanHistory,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'alat_id' => ['required', 'exists:alats,id'],
            'borrower_name' => ['required', 'string', 'max:255'],
            'borrower_class' => ['required', 'string', 'max:100'],
            'borrow_date' => ['required', 'date'],
            'return_estimate' => ['required', 'date', 'after_or_equal:borrow_date'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        DB::transaction(function () use ($validated, $request) {
            $alat = Alat::where('id', $validated['alat_id'])->lockForUpdate()->firstOrFail();

            if ($alat->stock <= 0) {
                abort(422, 'Stok alat sudah habis, tidak dapat dipinjam.');
            }

            $alat->decrement('stock');

            $userId = $request->user()?->id ?? \App\Models\User::where('name', $validated['borrower_name'])->value('id');

            Peminjaman::create([
                'user_id' => $userId,
                'alat_id' => $alat->id,
                'borrower_name' => $validated['borrower_name'],
                'borrower_class' => $validated['borrower_class'],
                'borrow_date' => $validated['borrow_date'],
                'return_estimate' => $validated['return_estimate'],
                'status' => 'Sedang Dipinjam',
                'notes' => $validated['notes'] ?? null,
            ]);
        });

        return redirect()->back()->with('success', 'Peminjaman alat berhasil diajukan.');
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

        return redirect()->back()->with('success', 'Barang berhasil dikembalikan ke inventaris.');
    }
}
