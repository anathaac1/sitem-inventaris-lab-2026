<?php

namespace App\Http\Requests\Settings;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Laravel\Fortify\InteractsWithTwoFactorState;

/**
 * Catatan:
 * Form Request ini dipakai untuk mengelola fitur Two-Factor Authentication (2FA) bawaan Laravel Fortify.
 * Menggunakan trait InteractsWithTwoFactorState untuk memeriksa dan memvalidasi status 2FA user,
 * seperti saat user ingin mengaktifkan, menonaktifkan, atau melihat kode pemulihan (recovery codes) 2FA.
 */
class TwoFactorAuthenticationRequest extends FormRequest
{
    use InteractsWithTwoFactorState;

    /**
     * Aturan validasi tambahan yang diterapkan pada request 2FA ini.
     * Secara default tidak memerlukan field form tambahan karena validasi ditangani oleh trait Fortify.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [];
    }
}
