<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Catatan Migrasi:
 * File migrasi penambahan kolom 'image' ke tabel 'alats'.
 * Kolom ini menyimpan path file foto/gambar alat yang diupload admin
 * (disimpan di folder public storage: 'storage/alats/nama_file.jpg').
 */
return new class extends Migration
{
    /**
     * Menjalankan migrasi (menambahkan kolom image).
     */
    public function up(): void
    {
        Schema::table('alats', function (Blueprint $table) {
            $table->string('image')->nullable()->after('description');
        });
    }

    /**
     * Membatalkan migrasi (menghapus kolom image).
     */
    public function down(): void
    {
        Schema::table('alats', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }
};
