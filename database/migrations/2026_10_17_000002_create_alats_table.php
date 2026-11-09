<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Catatan Migrasi:
 * File migrasi buat bikin tabel 'alats' (katalog inventaris barang/alat lab RPL):
 * - 'name': nama barang/alat (contoh: 'Laptop Lenovo ThinkPad').
 * - 'category': kategori alat ('Laptop', 'Monitor', 'Peripheral', 'IoT', 'Tools').
 * - 'code': kode unik identifikasi fisik alat di lab (contoh: 'EL-001', 'PR-002').
 * - 'stock': jumlah stok alat yang saat ini siap dipinjam.
 * - 'total': total unit fisik lab yang dimiliki.
 * - 'description': keterangan/penjelasan fungsi alat.
 * - 'specs': spesifikasi teknis dalam format JSON (RAM, Processor, Layar, dll.).
 * - 'icon_type': nama ikon untuk tampilan frontend.
 * - 'is_visible_to_students': status apakah alat boleh dilihat/dipinjam siswa atau disembunyikan.
 */
return new class extends Migration
{
    /**
     * Menjalankan migrasi (membuat tabel alats).
     */
    public function up(): void
    {
        Schema::create('alats', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category');
            $table->string('code')->unique();
            $table->integer('stock')->default(0);
            $table->integer('total')->default(0);
            $table->text('description')->nullable();
            $table->json('specs')->nullable();
            $table->string('icon_type')->default('laptop');
            $table->boolean('is_visible_to_students')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Membatalkan migrasi (menghapus tabel alats).
     */
    public function down(): void
    {
        Schema::dropIfExists('alats');
    }
};
