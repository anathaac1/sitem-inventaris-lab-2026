<?php

namespace App\Http\Controllers;

use App\Models\Alat;
use App\Models\Peminjaman;
use Database\Seeders\InventorySeeder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Catatan:
 * Controller ini ngatur halaman dashboard khusus buat siswa.
 * Isinya nampilin rangkuman alat lab yang siap dipinjam sama riwayat pinjaman aktif
 * yang lagi dibawa sama siswa yang bersangkutan.
 */
class DashboardController extends Controller
{
    /**
     * Nampilin halaman utama dashboard siswa.
     */
    public function index(Request $request): Response|\Illuminate\Http\RedirectResponse
    {
        // Proteksi role: kalau yang login ternyata admin, oper langsung ke dashboard admin (/admin)
        $user = $request->user();
        if ($user && ($user->role === 'admin' || str_starts_with($user->email, 'admin') || $user->username === 'admin')) {
            return redirect('/admin');
        }

        try {
            // Kalau database masih kosong (misal baru migrasi), jalanin seeder otomatis buat sampel data
            if (Alat::count() === 0) {
                (new InventorySeeder())->run();
            }

            // Bersihin sisa-sisa emoji sparkles (✨) di deskripsi biar teksnya rapi
            Alat::where('description', 'like', '%✨%')->get()->each(function ($a) {
                $a->description = trim(str_replace('✨', '', $a->description));
                $a->save();
            });

            // Ambil daftar alat yang diizinkan tampil buat siswa (is_visible_to_students = true)
            $items = Alat::where('is_visible_to_students', true)
                ->latest()
                ->get();

            // Siapin query buat ngambil pinjaman yang statusnya masih 'Sedang Dipinjam'
            $query = Peminjaman::with('alat')
                ->where('status', 'Sedang Dipinjam')
                ->latest();

            // Filter khusus: cuma ambil pinjaman milik siswa yang lagi login aja (berdasarkan user_id atau nama peminjam)
            if ($user = $request->user()) {
                $query->where(function ($q) use ($user) {
                    $q->where('user_id', $user->id)
                        ->orWhere('borrower_name', $user->name);
                });
            }

            $activeLoans = $query->get();
        } catch (\Throwable $e) {
            // Kalau database lagi error, fallback ke data kosong biar gak crash
            $items = collect();
            $activeLoans = collect();
        }

        // Render halaman Inertia siswa/dashboard/index
        return Inertia::render('siswa/dashboard/index', [
            'initialItems' => $items,
            'initialActiveLoans' => $activeLoans,
        ]);
    }
}
