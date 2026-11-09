<?php

namespace App\Http\Requests\Settings;

use App\Concerns\PasswordValidationRules;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Catatan:
 * Form Request ini fungsinya buat validasi saat user mau menghapus akunnya sendiri secara permanen.
 * Tujuannya mastiin user memasukkan kata sandi mereka saat ini (current password) dengan benar
 * sebagai langkah konfirmasi keamanan sebelum akun dihapus.
 */
class ProfileDeleteRequest extends FormRequest
{
    use PasswordValidationRules;

    /**
     * Aturan validasi yang diterapkan pada request ini.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Memastikan password saat ini wajib diisi dan sesuai dengan akun user
            'password' => $this->currentPasswordRules(),
        ];
    }
}
