<?php

use App\Http\Controllers\Admin\AlatController as AdminAlatController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\PeminjamanController as AdminPeminjamanController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\SiswaController as AdminSiswaController;
use App\Http\Controllers\AlatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes (Rute Web Aplikasi Inventaris Lab)
|--------------------------------------------------------------------------
|
| Catatan:
| File ini nentuin semua alamat URL (endpoint web) yang bisa diakses user di browser.
| Dibagi jadi 3 bagian utama:
| 1. Route Root ('/'): pengarah pintu masuk (redirect sesuai role user)
| 2. Route Siswa: halaman katalog alat, form pinjam barang, dashboard siswa, dan profil
| 3. Route Admin ('/admin/*'): panel kelola inventaris, konfirmasi pengembalian, manajemen siswa, dan profil admin
|
*/

// ==========================================
// 1. ROUTE PINTU MASUK UTAMA ('/')
// ==========================================
Route::get('/', function () {
    // Kalau user udah login:
    if (Auth::check()) {
        $user = Auth::user();
        // Cek rolenya: kalau admin, langsung lempar ke dashboard admin (/admin)
        if ($user && ($user->role === 'admin' || str_starts_with($user->email, 'admin') || $user->username === 'admin')) {
            return redirect('/admin');
        }
        // Kalau siswa, lempar ke dashboard siswa (/dashboard)
        return redirect('/dashboard');
    }
    // Kalau belum login sama sekali, suruh login dulu ke halaman login
    return redirect('/login');
})->name('home');

// ==========================================
// 2. ROUTE AREA SISWA (USER FACING)
// ==========================================

// Dashboard siswa (rangkuman pinjaman aktif & alat lab)
Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

// Katalog alat lab buat siswa (bisa search & filter kategori)
Route::get('alat', [AlatController::class, 'index'])->name('alat.index');

// Manajemen peminjaman alat di sisi siswa
Route::get('peminjaman', [PeminjamanController::class, 'index'])->name('peminjaman.index');
Route::post('peminjaman', [PeminjamanController::class, 'store'])->name('peminjaman.store');
Route::post('peminjaman/{peminjaman}/kembalikan', [PeminjamanController::class, 'returnItem'])->name('peminjaman.kembalikan');

// Halaman profil & pengaturan akun siswa
Route::get('profile', [ProfileController::class, 'index'])->name('profile.index');
Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
Route::post('profile', [ProfileController::class, 'update'])->name('profile.update_post');
Route::post('profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');

// ==========================================
// 3. ROUTE AREA ADMIN CMS (PANEL KELOLA LAB)
// ==========================================
Route::prefix('admin')->name('admin.')->group(function () {
    // Dashboard admin (statistik & rangkuman lab)
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    // CRUD Inventaris Alat Lab (tambah, edit, hapus, toggle visibilitas)
    Route::get('alat', [AdminAlatController::class, 'index'])->name('alat.index');
    Route::post('alat', [AdminAlatController::class, 'store'])->name('alat.store');
    Route::match(['put', 'post'], 'alat/{alat}', [AdminAlatController::class, 'update'])->name('alat.update');
    Route::delete('alat/{alat}', [AdminAlatController::class, 'destroy'])->name('alat.destroy');
    Route::patch('alat/{alat}/visibility', [AdminAlatController::class, 'toggleVisibility'])->name('alat.visibility');

    // Pemantauan & konfirmasi pengembalian alat lab
    Route::get('peminjaman', [AdminPeminjamanController::class, 'index'])->name('peminjaman.index');
    Route::post('peminjaman/{peminjaman}/kembalikan', [AdminPeminjamanController::class, 'returnItem'])->name('peminjaman.kembalikan');

    // Manajemen Akun Siswa (lihat list siswa, daftarin manual, reset password, hapus akun)
    Route::get('siswa', [AdminSiswaController::class, 'index'])->name('siswa.index');
    Route::post('siswa', [AdminSiswaController::class, 'store'])->name('siswa.store');
    Route::post('siswa/reset-password', [AdminSiswaController::class, 'resetPassword'])->name('siswa.reset_password');
    Route::delete('siswa/{user}', [AdminSiswaController::class, 'destroy'])->name('siswa.destroy');

    // Profil & ganti kata sandi admin
    Route::get('profile', [AdminProfileController::class, 'index'])->name('profile.index');
    Route::put('profile', [AdminProfileController::class, 'update'])->name('profile.update');
    Route::post('profile', [AdminProfileController::class, 'update'])->name('profile.update_post');
    Route::post('profile/password', [AdminProfileController::class, 'updatePassword'])->name('profile.password');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Authenticated settings bawaan
});
