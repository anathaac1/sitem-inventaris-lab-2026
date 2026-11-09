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

/**
 * Catatan:
 * Controller ini khusus buat ngurusin data peminjaman alat lab di sisi admin.
 * Fungsinya buat mantau siapa aja siswa yang lagi minjem alat, riwayat pinjamannya,
 * dan ngasih tombol aksi buat admin konfirmasi kalau barang yang dipinjam udah dibalikin (sekaligus balikin stok alatnya otomatis).
 */
class PeminjamanController extends Controller
{
    /**
     * Nampilin daftar semua transaksi peminjaman alat buat admin.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        // Proteksi akses: kalau bukan admin, lempar ke halaman peminjaman versi siswa (/peminjaman)
        $user = $request->user();
        if ($user && $user->role !== 'admin' && !str_starts_with($user->email, 'admin') && $user->username !== 'admin') {
            return redirect('/peminjaman');
        }

        try {
            // Kalau data pinjaman yang aktif kurang dari 6 (misal database habis di-reset),
            // seeder dijalankan otomatis biar ada data contoh buat ditampilin di tabel
            if (Peminjaman::where('status', 'Sedang Dipinjam')->count() < 6) {
                (new InventorySeeder())->run();
            }

            // Ambil semua data peminjaman beserta detail alatnya (relasi 'alat'), urut dari yang paling baru
            $loans = Peminjaman::with('alat')->latest()->get();
        } catch (\Throwable) {
            // Fallback collection kosong biar gak bikin layar error kalau koneksi db keganggu
            $loans = collect();
        }

        // Render halaman inertia admin/peminjaman/index
        return Inertia::render('admin/peminjaman/index', [
            'initialLoans' => $loans,
        ]);
    }

    /**
     * Fitur aksi buat admin untuk konfirmasi barang yang dikembalikan oleh siswa.
     */
    public function returnItem(Peminjaman $peminjaman): RedirectResponse
    {
        // Cek dulu: kalau barangnya emang udah berstatus 'Dikembalikan', gak perlu diproses ulang
        if ($peminjaman->status === 'Dikembalikan') {
            return redirect()->back()->with('info', 'Barang ini sudah dikembalikan.');
        }

        // Pakai DB Transaction biar dua proses di bawah ini (update status pinjam & update stok alat)
        // bener-bener berhasil barengan. Kalau salah satu gagal, semuanya bakal dibatalkan (rollback).
        DB::transaction(function () use ($peminjaman) {
            // 1. Ubah status transaksi peminjaman jadi 'Dikembalikan' dan catet tanggal baliknya hari ini
            $peminjaman->update([
                'status' => 'Dikembalikan',
                'return_date' => now()->toDateString(),
            ]);

            // 2. Kunci baris data alat di database (lockForUpdate) biar gak ada tabrakan request (race condition)
            $alat = Alat::where('id', $peminjaman->alat_id)->lockForUpdate()->first();
            if ($alat) {
                // Tambahin stok siap pakai (+1), tapi dijaga jangan sampe melebihi total fisik alat yang ada
                $alat->update([
                    'stock' => min($alat->total, $alat->stock + 1),
                ]);
            }
        });

        // Kasih notifikasi sukses ke admin bahwa barang berhasil dikonfirmasi kembali
        return redirect()->back()->with('success', 'Barang telah dikonfirmasi kembali oleh admin.');
    }
}
