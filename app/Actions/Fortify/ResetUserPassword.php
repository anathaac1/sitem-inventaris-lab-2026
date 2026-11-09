<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\ResetsUserPasswords;

/**
 * Catatan:
 * Action class bawaan Fortify buat memproses reset kata sandi user yang lupa password.
 * Alurnya:
 * 1. Validasi password baru yang dimasukkan (panjang karakter, konfirmasi, dsb.).
 * 2. Simpan password baru ke akun user terkait di database menggunakan forceFill().
 */
class ResetUserPassword implements ResetsUserPasswords
{
    use PasswordValidationRules;

    /**
     * Memvalidasi dan mereset kata sandi user yang lupa.
     *
     * @param  array<string, string>  $input
     */
    public function reset(User $user, array $input): void
    {
        // Validasi input password baru menggunakan aturan standar dari PasswordValidationRules
        Validator::make($input, [
            'password' => $this->passwordRules(),
        ])->validate();

        // Terapkan kata sandi baru ke user (password otomatis di-hash oleh model User)
        $user->forceFill([
            'password' => $input['password'],
        ])->save();
    }
}
