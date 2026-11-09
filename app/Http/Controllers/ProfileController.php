<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Catatan:
 * Controller ini tempat siswa mengelola data profil mereka sendiri.
 * Fungsinya buat nampilin biodata siswa (nama, kelas, NISN, email, no HP),
 * ngedit data diri tersebut kalau ada perubahan, serta fitur buat ganti kata sandi akun siswa.
 */
class ProfileController extends Controller
{
    /**
     * Nampilin halaman profil siswa beserta data diri lengkapnya.
     */
    public function index(Request $request): Response
    {
        try {
            // Ambil data siswa yang sedang login.
            // Kalau gak ada session aktif, ambil data siswa pertama di database sebagai fallback
            $user = $request->user() ?? User::where('role', 'siswa')->first();
        } catch (\Throwable) {
            $user = null;
        }

        // Format data siswa dan oper ke tampilan frontend Inertia siswa/profile/index
        return Inertia::render('siswa/profile/index', [
            'initialUser' => $user ? [
                'id' => (string) $user->id,
                'name' => $user->name,
                'username' => $user->username ?? explode('@', $user->email)[0],
                'class' => $user->class ?? 'XII RPL A',
                'email' => $user->email,
                'nisn' => $user->nisn ?? '0067829101',
                'phone' => $user->phone ?? '-',
                'role' => $user->role,
            ] : null,
        ]);
    }

    /**
     * Memproses pembaruan data diri / profil siswa.
     */
    public function update(Request $request): RedirectResponse
    {
        // Pastiin akun siswanya ada
        $user = $request->user() ?? User::where('role', 'siswa')->first();

        if (!$user) {
            return redirect()->back()->with('error', 'Akun siswa tidak ditemukan.');
        }

        // Validasi input:
        // Username & email harus unik di tabel users, tapi abaikan ID siswa ini sendiri biar gak error pas gak diubah
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => [
                'required',
                'string',
                'max:100',
                Rule::unique('users', 'username')->ignore($user->id),
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'class' => ['required', 'string', 'max:100'],
            'nisn' => ['nullable', 'string', 'max:30'],
            'phone' => ['nullable', 'string', 'max:30'],
        ]);

        // Simpan pembaruan data siswa ke database
        $user->update($validated);

        return redirect()->back()->with('success', 'Profil siswa berhasil diperbarui!');
    }

    /**
     * Fitur buat siswa mengganti kata sandi / password akunnya sendiri.
     */
    public function updatePassword(Request $request): RedirectResponse
    {
        // Validasi: password baru minimal 4 karakter
        $validated = $request->validate([
            'old_password' => ['nullable', 'string'],
            'new_password' => ['required', 'string', 'min:4'],
        ]);

        $user = $request->user() ?? User::where('role', 'siswa')->first();

        if (!$user) {
            return redirect()->back()->with('error', 'Akun siswa tidak ditemukan.');
        }

        // Kalau siswa mengisi password lama, cocokin dulu ke hash yang tersimpan di DB
        if (!empty($validated['old_password'])) {
            if (!Hash::check($validated['old_password'], $user->password)) {
                // Kalau gak cocok, lempar pesan error
                return redirect()->back()->withErrors([
                    'old_password' => 'Kata sandi saat ini tidak sesuai.',
                ]);
            }
        }

        // Kalau password lama bener (atau kosong jika bypass), simpan password baru yang sudah di-hash
        $user->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return redirect()->back()->with('success', 'Kata sandi berhasil diperbarui di database!');
    }
}
