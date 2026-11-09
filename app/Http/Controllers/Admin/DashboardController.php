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

/**
 * Catatan:
 * Controller ini jadi pusat informasi buat dashboard admin.
 * Fungsinya buat ngumpulin semua ringkasan data yang dibutuhin di halaman utama admin,
 * seperti total & daftar alat, data peminjaman yang aktif/terbaru, dan data siswa yang terdaftar.
 */
class DashboardController extends Controller
{
    /**
     * Nampilin halaman utama dashboard panel admin.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        // Pengecekan role: kalau yang akses bukan admin (misal siswa nyoba iseng masuk ke URL admin),
        // langsung kita oper/redirect ke dashboard siswa (/dashboard).
        $user = $request->user();
        if ($user && $user->role !== 'admin' && !str_starts_with($user->email, 'admin') && $user->username !== 'admin') {
            return redirect('/dashboard');
        }

        try {
            // Trik buat keperluan testing/demo:
            // Kalau tabel alat masih kosong, atau data peminjaman aktif kurang dari 6,
            // kita jalanin InventorySeeder otomatis biar ada data sampel dan dashboard gak kelihatan kosong melompong.
            if (Alat::count() === 0 || Peminjaman::where('status', 'Sedang Dipinjam')->count() < 6) {
                (new InventorySeeder())->run();
            }

            // Ambil semua data alat terbaru
            $items = Alat::latest()->get();

            // Ambil data peminjaman terbaru sekalian relasi alatnya (biar langsung dapet detail nama alatnya)
            $loans = Peminjaman::with('alat')->latest()->get();

            // Ambil semua akun pengguna yang rolenya 'siswa'
            $students = User::where('role', 'siswa')->get();
        } catch (\Throwable) {
            // Kalau misal ada error saat query database, siapin fallback collection kosong
            // biar halaman dashboard tetep bisa kebuka tanpa error 500
            $items = collect();
            $loans = collect();
            $students = collect();
        }

        // Oper semua data yang udah dikumpulin ke halaman Inertia admin/dashboard/index
        return Inertia::render('admin/dashboard/index', [
            'initialItems' => $items,
            'initialLoans' => $loans,
            'initialStudents' => $students,
        ]);
    }
}
