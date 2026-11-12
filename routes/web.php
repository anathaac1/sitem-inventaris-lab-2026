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

Route::get('/', function () {
    if (Auth::check()) {
        $user = Auth::user();
        if ($user && ($user->role === 'admin' || str_starts_with($user->email, 'admin') || $user->username === 'admin')) {
            return redirect('/admin');
        }
        return redirect('/dashboard');
    }
    return redirect('/login');
})->name('home');

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('alat', [AlatController::class, 'index'])->name('alat.index');
Route::get('peminjaman', [PeminjamanController::class, 'index'])->name('peminjaman.index');
Route::post('peminjaman', [PeminjamanController::class, 'store'])->name('peminjaman.store');
Route::post('peminjaman/{peminjaman}/kembalikan', [PeminjamanController::class, 'returnItem'])->name('peminjaman.kembalikan');

Route::get('profile', [ProfileController::class, 'index'])->name('profile.index');
Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
Route::post('profile', [ProfileController::class, 'update'])->name('profile.update_post');
Route::post('profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::get('alat', [AdminAlatController::class, 'index'])->name('alat.index');
    Route::post('alat', [AdminAlatController::class, 'store'])->name('alat.store');
    Route::match(['put', 'post'], 'alat/{alat}', [AdminAlatController::class, 'update'])->name('alat.update');
    Route::delete('alat/{alat}', [AdminAlatController::class, 'destroy'])->name('alat.destroy');
    Route::patch('alat/{alat}/visibility', [AdminAlatController::class, 'toggleVisibility'])->name('alat.visibility');

    Route::get('peminjaman', [AdminPeminjamanController::class, 'index'])->name('peminjaman.index');
    Route::post('peminjaman/{peminjaman}/kembalikan', [AdminPeminjamanController::class, 'returnItem'])->name('peminjaman.kembalikan');

    Route::get('siswa', [AdminSiswaController::class, 'index'])->name('siswa.index');
    Route::post('siswa', [AdminSiswaController::class, 'store'])->name('siswa.store');
    Route::post('siswa/reset-password', [AdminSiswaController::class, 'resetPassword'])->name('siswa.reset_password');
    Route::delete('siswa/{user}', [AdminSiswaController::class, 'destroy'])->name('siswa.destroy');

    Route::get('profile', [AdminProfileController::class, 'index'])->name('profile.index');
    Route::put('profile', [AdminProfileController::class, 'update'])->name('profile.update');
    Route::post('profile', [AdminProfileController::class, 'update'])->name('profile.update_post');
    Route::post('profile/password', [AdminProfileController::class, 'updatePassword'])->name('profile.password');
});

Route::middleware(['auth', 'verified'])->group(function () {
});
