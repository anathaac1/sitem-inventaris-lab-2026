<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/**
 * Catatan Rute Console / Artisan:
 * File ini tempat mendefinisikan command Artisan kustom berbasis closure.
 * Contoh command bawaan di bawah ini bisa dipanggil di terminal lewat:
 * `php artisan inspire` buat nampilin kutipan motivasi.
 */
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
