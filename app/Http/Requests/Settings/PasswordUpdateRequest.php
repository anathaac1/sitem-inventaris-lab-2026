<?php

namespace App\Http\Requests\Settings;

use App\Concerns\PasswordValidationRules;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Catatan:
 * Form Request ini fungsinya buat memvalidasi perubahan kata sandi (password) di menu pengaturan akun.
 * Memastikan dua hal:
 * 1. User wajib memasukkan kata sandi saat ini (current_password) dengan benar.
 * 2. Kata sandi baru (password) harus memenuhi standar keamanan yang ditentukan (panjang karakter, dsb.).
 */
class PasswordUpdateRequest extends FormRequest
{
    use PasswordValidationRules;

    /**
     * Aturan validasi yang diterapkan pada request ganti kata sandi ini.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Validasi kata sandi saat ini (harus cocok dengan password di database)
            'current_password' => $this->currentPasswordRules(),
            // Validasi kata sandi baru (harus memenuhi standar keamanan password)
            'password' => $this->passwordRules(),
        ];
    }
}
