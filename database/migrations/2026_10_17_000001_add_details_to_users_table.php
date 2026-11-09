<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Catatan Migrasi:
 * File migrasi penambahan kolom data khusus ke tabel 'users' untuk kebutuhan sistem lab:
 * - 'username': nama pengguna unik (bisa dipakai login selain email).
 * - 'role': peran pengguna ('admin' untuk pengelola lab, 'siswa' untuk siswa RPL).
 * - 'class': kelas siswa (contoh: 'XII RPL A') atau jabatan admin (contoh: 'Kepala Lab RPL').
 * - 'nisn': Nomor Induk Siswa Nasional untuk identifikasi siswa.
 * - 'phone': nomor telepon / WhatsApp yang bisa dihubungi saat peminjaman.
 */
return new class extends Migration
{
    /**
     * Menjalankan migrasi (menambahkan kolom baru ke tabel users).
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->nullable()->unique()->after('id');
            $table->string('role')->default('siswa')->after('email');
            $table->string('class')->nullable()->after('role');
            $table->string('nisn')->nullable()->after('class');
            $table->string('phone')->nullable()->after('nisn');
        });
    }

    /**
     * Membatalkan migrasi (menghapus kolom-kolom tambahan dari tabel users).
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['username', 'role', 'class', 'nisn', 'phone']);
        });
    }
};
