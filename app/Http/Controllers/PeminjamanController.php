<?php

namespace App\Http\Controllers;

use App\Models\Alat;
use App\Models\Peminjaman;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Catatan:
 * Controller ini tempat ngurusin alur peminjaman alat lab di sisi siswa.
 * Fungsinya mulai dari nampilin daftar pinjaman aktif siswa beserta riwayat pinjamannya,
 * memproses pengajuan pinjam alat baru (sekaligus ngurangin stok alat otomatis),
 * sampe fitur buat siswa mengembalikan barang yang dipinjam.
 */
class PeminjamanController extends Controller
{
    /**
     * Nampilin halaman peminjaman siswa (pinjaman yang sedang berjalan & riwayat pengembalian).
     */
    public function index(Request $request): Response|RedirectResponse
    {
        // Proteksi role: kalau yang akses ternyata admin, arahin ke halaman peminjaman admin (/admin/peminjaman)
        $user = $request->user();
        if ($user && ($user->role === 'admin' || str_starts_with($user->email, 'admin') || $user->username === 'admin')) {
            return redirect('/admin/peminjaman');
        }

        try {
            // Siapin query peminjaman yang diurutkan dari yang paling baru
            $query = Peminjaman::with('alat')->latest();

            // Filter data: siswa cuma boleh liat catatan peminjaman miliknya sendiri
            // (dicocokkan lewat user_id atau nama peminjam)
            if ($user = $request->user()) {
                $query->where(function ($q) use ($user) {
                    $q->where('user_id', $user->id)
                        ->orWhere('borrower_name', $user->name);
                });
            }

            $loans = $query->get();

            // Pisahkan jadi dua kelompok data:
            // 1. Yang statusnya masih 'Sedang Dipinjam' (pinjaman aktif)
            $activeLoans = $loans->where('status', 'Sedang Dipinjam')->values();
            // 2. Yang statusnya udah 'Dikembalikan' (riwayat masa lalu)
            $loanHistory = $loans->where('status', 'Dikembalikan')->values();
        } catch (\Throwable) {
            // Kalau database bermasalah, siapin collection kosong biar halaman gak jebol
            $activeLoans = collect();
            $loanHistory = collect();
        }

        // Lempar datanya ke Inertia view siswa/peminjaman/index
        return Inertia::render('siswa/peminjaman/index', [
            'initialActiveLoans' => $activeLoans,
            'initialLoanHistory' => $loanHistory,
        ]);
    }

    /**
     * Memproses formulir pengajuan peminjaman alat baru dari siswa.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validasi input form pengajuan pinjaman:
        // Pastiin ID alat valid, nama & kelas terisi, tanggal pinjam valid,
        // serta perkiraan tanggal kembali gak boleh lebih lampau dari tanggal pinjam.
        $validated = $request->validate([
            'alat_id' => ['required', 'exists:alats,id'],
            'borrower_name' => ['required', 'string', 'max:255'],
            'borrower_class' => ['required', 'string', 'max:100'],
            'borrow_date' => ['required', 'date'],
            'return_estimate' => ['required', 'date', 'after_or_equal:borrow_date'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        // Pakai database transaction biar proses pemotongan stok & pembuatan data pinjaman
        // berjalan aman tanpa ada data yang menggantung di tengah jalan
        DB::transaction(function () use ($validated, $request) {
            // Kunci baris data alat (lockForUpdate) buat mencegah perebutan stok kalau ada yang pinjam barengan
            $alat = Alat::where('id', $validated['alat_id'])->lockForUpdate()->firstOrFail();

            // Kalau stok siap pakainya sudah 0, tolak pinjaman langsung
            if ($alat->stock <= 0) {
                abort(422, 'Stok alat sudah habis, tidak dapat dipinjam.');
            }

            // Kurangi 1 dari stok alat yang siap pakai
            $alat->decrement('stock');

            // Cari ID akun siswa yang mengajukan pinjaman
            $userId = $request->user()?->id ?? \App\Models\User::where('name', $validated['borrower_name'])->value('id');

            // Simpan transaksi peminjaman baru ke tabel peminjamans dengan status 'Sedang Dipinjam'
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

    /**
     * Memproses pengembalian barang yang dipinjam oleh siswa.
     */
    public function returnItem(Peminjaman $peminjaman): RedirectResponse
    {
        // Cek dulu: kalau barangnya sudah pernah dikembalikan sebelumnya, abaikan
        if ($peminjaman->status === 'Dikembalikan') {
            return redirect()->back()->with('info', 'Barang ini sudah dikembalikan.');
        }

        // Eksekusi transaksi pengembalian barang ke inventaris
        DB::transaction(function () use ($peminjaman) {
            // 1. Ubah status jadi 'Dikembalikan' dan set tanggal kembalinya per hari ini
            $peminjaman->update([
                'status' => 'Dikembalikan',
                'return_date' => now()->toDateString(),
            ]);

            // 2. Kunci data alat dan balikin stoknya (+1), dengan batas maksimal total unit alat di lab
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
