<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

/**
 * Catatan:
 * Seeder utama aplikasi.
 * Waktu kita jalanin command `php artisan db:seed`, seeder ini yang pertama kali dipanggil
 * buat ngejalanin InventorySeeder agar database terisi data awal akun dan inventaris alat.
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Menjalankan proses seeding ke database.
     */
    public function run(): void
    {
        $this->call([
            InventorySeeder::class,
        ]);
    }
}
