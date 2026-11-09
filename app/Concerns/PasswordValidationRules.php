<?php

namespace App\Concerns;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rules\Password;

/**
 * Catatan:
 * Trait ini berisi kumpulan aturan validasi kata sandi (password) yang dipakai ulang di berbagai tempat,
 * seperti saat registrasi, reset password, atau ganti password di pengaturan.
 * Memastikan password baru wajib diisi, terkonfirmasi (ada field password_confirmation),
 * dan memenuhi standar keamanan Password::default().
 */
trait PasswordValidationRules
{
    /**
     * Aturan validasi untuk password baru:
     * Wajib diisi, string, sesuai standar password default Laravel, dan harus ada konfirmasi password yang cocok.
     *
     * @return array<int, Password|ValidationRule|array<mixed>|string>
     */
    protected function passwordRules(): array
    {
        return ['required', 'string', Password::default(), 'confirmed'];
    }

    /**
     * Aturan validasi untuk password saat ini (current password):
     * Wajib diisi dan harus cocok dengan password yang sedang tersimpan di database.
     *
     * @return array<int, Password|ValidationRule|array<mixed>|string>
     */
    protected function currentPasswordRules(): array
    {
        return ['required', 'string', 'current_password'];
    }
}
