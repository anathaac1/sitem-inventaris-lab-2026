<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

/**
 * Catatan:
 * Service Provider utama bawaan Laravel.
 * Fungsinya buat bootstrapping setelan global aplikasi saat pertama kali nyala,
 * seperti konfigurasi keamanan database, aturan default password, format tanggal (CarbonImmutable),
 * dan contekan data akun bawaan (admin & siswa 1 s/d 6).
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Tempat registrasi service atau dependency injection container (kalau ada).
     */
    public function register(): void
    {
    }

    /**
     * Dijalankan otomatis saat seluruh service provider selesai dimuat.
     */
    public function boot(): void
    {
        $this->configureDefaults();
    }

    /**
     * Method cadangan buat memastikan akun default siswa dan admin tersedia di database.
     * Sangat ngebantu kalau database baru di-reset dan butuh akun awal buat login.
     */
    protected function ensureDefaultAccounts(): void
    {
        try {
            // Cek dulu apakah tabel users udah kebentuk di database
            if (\Illuminate\Support\Facades\Schema::hasTable('users')) {
                // Akun Siswa 1 (Kelas XII RPL A)
                \App\Models\User::updateOrCreate(
                    ['email' => 'siswa1@smkn1.sch.id'],
                    [
                        'username' => 'siswa1',
                        'name' => 'Ahmad Rizky Pratama',
                        'role' => 'siswa',
                        'class' => 'XII RPL A',
                        'nisn' => '0067829101',
                        'phone' => '0812-9876-1101',
                        'password' => \Illuminate\Support\Facades\Hash::make('siswa123'),
                    ]
                );

                // Akun Siswa 2 (Kelas XII RPL B)
                \App\Models\User::updateOrCreate(
                    ['email' => 'siswa2@smkn1.sch.id'],
                    [
                        'username' => 'siswa2',
                        'name' => 'Nabila Putri Syahrani',
                        'role' => 'siswa',
                        'class' => 'XII RPL B',
                        'nisn' => '0067829102',
                        'phone' => '0813-4455-2202',
                        'password' => \Illuminate\Support\Facades\Hash::make('rpl2024!'),
                    ]
                );

                // Akun Siswa 3 (Kelas XI RPL A)
                \App\Models\User::updateOrCreate(
                    ['email' => 'siswa3@smkn1.sch.id'],
                    [
                        'username' => 'siswa3',
                        'name' => 'Muhammad Fajar Ramadhan',
                        'role' => 'siswa',
                        'class' => 'XI RPL A',
                        'nisn' => '0078912301',
                        'phone' => '0812-3344-5566',
                        'password' => \Illuminate\Support\Facades\Hash::make('rplfajar11'),
                    ]
                );

                // Akun Siswa 4 (Kelas XI RPL B)
                \App\Models\User::updateOrCreate(
                    ['email' => 'siswa4@smkn1.sch.id'],
                    [
                        'username' => 'siswa4',
                        'name' => 'Siti Aisyah Azzahra',
                        'role' => 'siswa',
                        'class' => 'XI RPL B',
                        'nisn' => '0078912302',
                        'phone' => '0813-9988-7766',
                        'password' => \Illuminate\Support\Facades\Hash::make('aisyah2024'),
                    ]
                );

                // Akun Siswa 5 (Kelas X RPL A)
                \App\Models\User::updateOrCreate(
                    ['email' => 'siswa5@smkn1.sch.id'],
                    [
                        'username' => 'siswa5',
                        'name' => 'Dimas Arya Saputra',
                        'role' => 'siswa',
                        'class' => 'X RPL A',
                        'nisn' => '0089123401',
                        'phone' => '0821-1122-3344',
                        'password' => \Illuminate\Support\Facades\Hash::make('dimasrpl10'),
                    ]
                );

                // Akun Siswa 6 (Kelas X RPL B)
                \App\Models\User::updateOrCreate(
                    ['email' => 'siswa6@smkn1.sch.id'],
                    [
                        'username' => 'siswa6',
                        'name' => 'Zahra Amelia Dewi',
                        'role' => 'siswa',
                        'class' => 'X RPL B',
                        'nisn' => '0089123402',
                        'phone' => '0822-4455-6677',
                        'password' => \Illuminate\Support\Facades\Hash::make('zahra10rpl'),
                    ]
                );

                // Akun Administrator (Kepala Lab RPL)
                \App\Models\User::updateOrCreate(
                    ['email' => 'admin@smkn1.sch.id'],
                    [
                        'username' => 'admin',
                        'name' => 'Bambang Haryanto, S.T.',
                        'role' => 'admin',
                        'class' => 'Kepala Lab RPL SMKN 1',
                        'phone' => '0811-2233-4455',
                        'password' => \Illuminate\Support\Facades\Hash::make('adminlab123'),
                    ]
                );
            }
        } catch (\Throwable) {
            // Diamkan kalau misal database/tabel belum siap migrasi
        }
    }

    /**
     * Konfigurasi standar keamanan dan konsistensi aplikasi.
     */
    protected function configureDefaults(): void
    {
        // Pakai CarbonImmutable biar manipulasi tanggal gak ngerusak objek tanggal aslinya
        Date::use(CarbonImmutable::class);

        // Larang perintah artisan yang berbahaya (seperti migrate:fresh) jalan di server production
        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        // Aturan password default: kalau lagi production dibikin ketat (min 12 huruf, campur angka, simbol)
        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
