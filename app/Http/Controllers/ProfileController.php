<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(Request $request): Response
    {
        try {
            $user = $request->user() ?? User::where('role', 'siswa')->first();
        } catch (\Throwable) {
            $user = null;
        }

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

    public function update(Request $request): RedirectResponse
    {
        $user = $request->user() ?? User::where('role', 'siswa')->first();

        if (!$user) {
            return redirect()->back()->with('error', 'Akun siswa tidak ditemukan.');
        }

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

        $user->update($validated);

        return redirect()->back()->with('success', 'Profil siswa berhasil diperbarui!');
    }

    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'old_password' => ['nullable', 'string'],
            'new_password' => ['required', 'string', 'min:4'],
        ]);

        $user = $request->user() ?? User::where('role', 'siswa')->first();

        if (!$user) {
            return redirect()->back()->with('error', 'Akun siswa tidak ditemukan.');
        }

        if (!empty($validated['old_password'])) {
            if (!Hash::check($validated['old_password'], $user->password)) {
                return redirect()->back()->withErrors([
                    'old_password' => 'Kata sandi saat ini tidak sesuai.',
                ]);
            }
        }

        $user->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return redirect()->back()->with('success', 'Kata sandi berhasil diperbarui di database!');
    }
}
