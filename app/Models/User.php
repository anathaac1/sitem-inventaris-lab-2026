<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

/**
 * Catatan:
 * Model User mewakili tabel 'users' di database (akun pengguna aplikasi).
 * Mendukung autentikasi login (Authenticatable) dan notifikasi.
 * Menyimpan data akun pengguna baik yang ber-role 'admin' (pengelola lab)
 * maupun 'siswa' (peminjam alat), beserta profilnya (nama, username, kelas, NISN, no HP).
 */
#[Fillable(['name', 'username', 'email', 'password', 'role', 'class', 'nisn', 'phone'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Konversi tipe data otomatis (casting) untuk kolom tertentu.
     * Password otomatis di-hash saat disimpan.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relasi One-to-Many ke tabel peminjamans:
     * Satu user (siswa) dapat memiliki banyak catatan transaksi peminjaman alat lab.
     */
    public function peminjamans(): HasMany
    {
        return $this->hasMany(Peminjaman::class);
    }
}
