<?php

use App\Providers\AppServiceProvider;
use App\Providers\FortifyServiceProvider;

/**
 * Catatan:
 * File registrasi service provider yang aktif di aplikasi (Laravel 11+).
 * Di sini kita mendaftarkan:
 * 1. AppServiceProvider (pengaturan dasar aplikasi, database, dan akun bawaan)
 * 2. FortifyServiceProvider (sistem login, redirect dashboard/admin, dan autentikasi)
 */
return [
    AppServiceProvider::class,
    FortifyServiceProvider::class,
];
