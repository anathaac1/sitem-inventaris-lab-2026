<?php

namespace App\Concerns;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;

/**
 * Catatan:
 * Trait ini berisi kumpulan aturan validasi profil yang sering dipakai ulang (reusable),
 * seperti aturan untuk field nama dan alamat email.
 * Dengan dibuat sebagai trait terpisah, jika aturan nama atau email mau diubah,
 * cukup ubah di satu file ini saja tanpa harus ubah di banyak controller / request class.
 */
trait ProfileValidationRules
{
    /**
     * Kumpulan aturan validasi gabungan untuk profil user (nama dan email).
     *
     * @return array<string, array<int, ValidationRule|array<mixed>|string>>
     */
    protected function profileRules(?int $userId = null): array
    {
        return [
            'name' => $this->nameRules(),
            'email' => $this->emailRules($userId),
        ];
    }

    /**
     * Aturan validasi untuk nama user: wajib diisi, string, maksimal 255 karakter.
     *
     * @return array<int, ValidationRule|array<mixed>|string>
     */
    protected function nameRules(): array
    {
        return ['required', 'string', 'max:255'];
    }

    /**
     * Aturan validasi untuk email user: wajib diisi, format email valid, maks 255 karakter,
     * dan harus unik di tabel users (dengan pengecualian ID user itu sendiri jika sedang update profil).
     *
     * @return array<int, ValidationRule|array<mixed>|string>
     */
    protected function emailRules(?int $userId = null): array
    {
        return [
            'required',
            'string',
            'email',
            'max:255',
            $userId === null
                ? Rule::unique(User::class)
                : Rule::unique(User::class)->ignore($userId),
        ];
    }
}
