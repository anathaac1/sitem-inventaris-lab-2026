<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Catatan Migrasi:
 * File migrasi buat bikin tabel 'peminjamans' (pencatatan transaksi peminjaman alat lab):
 * - 'user_id': relasi foreign key ke tabel users (siapa siswa yang mengajukan pinjaman).
 * - 'alat_id': relasi foreign key ke tabel alats (barang lab apa yang dipinjam).
 * - 'borrower_name' & 'borrower_class': salinan nama dan kelas peminjam saat transaksi dibuat.
 * - 'borrow_date': tanggal awal barang dipinjam.
 * - 'return_estimate': tenggat waktu / tanggal perkiraan barang harus dikembalikan.
 * - 'return_date': tanggal aktual saat barang fisik beneran dikembalikan ke lab.
 * - 'status': enum status transaksi ('Sedang Dipinjam' / 'Dikembalikan').
 * - 'notes': keterangan keperluan pinjam (contoh: 'Praktikum Basis Data').
 */
return new class extends Migration
{
    /**
     * Menjalankan migrasi (membuat tabel peminjamans).
     */
    public function up(): void
    {
        Schema::create('peminjamans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('alat_id')->constrained('alats')->cascadeOnDelete();
            $table->string('borrower_name');
            $table->string('borrower_class');
            $table->date('borrow_date');
            $table->date('return_estimate');
            $table->date('return_date')->nullable();
            $table->enum('status', ['Sedang Dipinjam', 'Dikembalikan'])->default('Sedang Dipinjam');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Membatalkan migrasi (menghapus tabel peminjamans).
     */
    public function down(): void
    {
        Schema::dropIfExists('peminjamans');
    }
};
