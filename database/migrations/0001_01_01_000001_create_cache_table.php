<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Catatan Migrasi:
 * File migrasi buat bikin tabel penyimpanan cache di database:
 * 1. 'cache': nyimpen data cache sementara biar aplikasi gak perlu query berulang ke database.
 * 2. 'cache_locks': mekanisme penguncian atomik (atomic lock) buat mencegah race condition saat ada proses bersamaan.
 */
return new class extends Migration
{
    /**
     * Menjalankan migrasi (membuat tabel cache & cache_locks).
     */
    public function up(): void
    {
        Schema::create('cache', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->mediumText('value');
            $table->bigInteger('expiration')->index();
        });

        Schema::create('cache_locks', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->string('owner');
            $table->bigInteger('expiration')->index();
        });
    }

    /**
     * Membatalkan migrasi (menghapus tabel cache & cache_locks).
     */
    public function down(): void
    {
        Schema::dropIfExists('cache');
        Schema::dropIfExists('cache_locks');
    }
};
