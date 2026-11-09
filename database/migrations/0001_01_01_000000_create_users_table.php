<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Catatan Migrasi:
 * File migrasi dasar bawaan Laravel buat bikin 3 tabel inti sistem autentikasi:
 * 1. 'users': tabel akun pengguna (nama, email, hash password, timestamp).
 * 2. 'password_reset_tokens': tabel token keamanan buat fitur lupa password.
 * 3. 'sessions': tabel penyimpan sesi login user di browser (IP, user agent, payload).
 */
return new class extends Migration
{
    /**
     * Menjalankan migrasi (membuat tabel-tabel).
     */
    public function up(): void
    {
        // 1. Tabel users
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        // 2. Tabel password reset tokens
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // 3. Tabel sessions login
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Membatalkan migrasi (menghapus tabel-tabel).
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
