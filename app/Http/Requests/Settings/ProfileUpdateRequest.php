<?php

namespace App\Http\Requests\Settings;

use App\Concerns\ProfileValidationRules;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Catatan:
 * Form Request ini fungsinya buat memvalidasi data saat user memperbarui informasi profil mereka
 * (seperti nama dan alamat email di menu pengaturan).
 * Aturan validasi diambil dari trait ProfileValidationRules dan secara otomatis mengabaikan
 * ID user yang sedang login agar alamat email mereka sendiri tidak dianggap duplikat.
 */
class ProfileUpdateRequest extends FormRequest
{
    use ProfileValidationRules;

    /**
     * Aturan validasi yang diterapkan pada request pembaruan profil ini.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Mengambil kumpulan aturan validasi profil untuk user yang sedang aktif
        return $this->profileRules($this->user()->id);
    }
}
