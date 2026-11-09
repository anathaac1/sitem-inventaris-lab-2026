<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Catatan:
 * Controller ini fungsinya buat ngatur profil akun admin yang lagi login.
 * Mulai dari nampilin informasi akun (nama, username, email, jabatan/kelas, no hp),
 * ngedit data profil pribadi admin, sampe urusan ganti kata sandi (password).
 */
class ProfileController extends Controller
{
    /**
     * Nampilin halaman profil administrator beserta data dirinya.
     */
    public function index(Request $request): Response
    {
        try {
            // Ambil user admin yang lagi login sekarang.
            // Kalau gak ada session aktif, fallback cari user pertama dengan role 'admin'.
            $admin = $request->user() ?? User::where('role', 'admin')->first();
        } catch (\Throwable) {
            $admin = null;
        }

        // Kirim data admin ke komponen halaman Inertia admin/profile/index
        // Disini kita format datanya dan kasih nilai default kalau ada kolom yang kosong
        return Inertia::render('admin/profile/index', [
            'initialAdmin' => $admin ? [
                'id' => (string) $admin->id,
                'name' => $admin->name,
                'username' => $admin->username ?? 'admin',
                'class' => $admin->class ?? 'Kepala Lab RPL SMKN 1',
                'email' => $admin->email,
                'phone' => $admin->phone ?? '0811-2233-4455',
                'role' => 'admin',
            ] : null,
        ]);
    }

    /**
     * Nyimpen perubahan info data diri admin (nama, username, email, kontak).
     */
    public function update(Request $request): RedirectResponse
    {
        // Cari akun admin yang lagi aktif
        $admin = $request->user() ?? User::where('role', 'admin')->first();

        // Kalau akunnya gak ketemu, tolak dan kasih pesan error
        if (!$admin) {
            return redirect()->back()->with('error', 'Akun administrator tidak ditemukan.');
        }

        // Validasi input:
        // Username & email harus unik di tabel users, tapi kecualikan id admin ini sendiri biar gak bentrok
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => [
                'required',
                'string',
                'max:100',
                Rule::unique('users', 'username')->ignore($admin->id),
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($admin->id),
            ],
            'class' => ['nullable', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:30'],
        ]);

        // Simpan pembaruan data admin ke database
        $admin->update($validated);

        return redirect()->back()->with('success', 'Profil administrator berhasil diperbarui!');
    }

    /**
     * Fitur khusus buat ganti kata sandi / password akun admin.
     */
    public function updatePassword(Request $request): RedirectResponse
    {
        // Validasi: password baru minimal 4 karakter
        $validated = $request->validate([
            'old_password' => ['nullable', 'string'],
            'new_password' => ['required', 'string', 'min:4'],
        ]);

        $admin = $request->user() ?? User::where('role', 'admin')->first();

        if (!$admin) {
            return redirect()->back()->with('error', 'Akun administrator tidak ditemukan.');
        }

        // Kalau admin ngisi password lama, cek dulu apakah cocok sama password yang ada di database
        if (!empty($validated['old_password'])) {
            if (!Hash::check($validated['old_password'], $admin->password)) {
                // Kalau password lama gak cocok, balikin pesan error ke form
                return redirect()->back()->withErrors([
                    'old_password' => 'Kata sandi saat ini tidak sesuai.',
                ]);
            }
        }

        // Kalau lolos, hash password baru terus simpan ke database
        $admin->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return redirect()->back()->with('success', 'Kata sandi administrator berhasil diperbarui di database!');
    }
}
