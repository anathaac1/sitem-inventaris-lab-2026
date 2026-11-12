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

class ProfileController extends Controller
{
    public function index(Request $request): Response
    {
        try {
            $admin = $request->user() ?? User::where('role', 'admin')->first();
        } catch (\Throwable) {
            $admin = null;
        }

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

    public function update(Request $request): RedirectResponse
    {
        $admin = $request->user() ?? User::where('role', 'admin')->first();

        if (!$admin) {
            return redirect()->back()->with('error', 'Akun administrator tidak ditemukan.');
        }

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

        $admin->update($validated);

        return redirect()->back()->with('success', 'Profil administrator berhasil diperbarui!');
    }

    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'old_password' => ['nullable', 'string'],
            'new_password' => ['required', 'string', 'min:4'],
        ]);

        $admin = $request->user() ?? User::where('role', 'admin')->first();

        if (!$admin) {
            return redirect()->back()->with('error', 'Akun administrator tidak ditemukan.');
        }

        if (!empty($validated['old_password'])) {
            if (!Hash::check($validated['old_password'], $admin->password)) {
                return redirect()->back()->withErrors([
                    'old_password' => 'Kata sandi saat ini tidak sesuai.',
                ]);
            }
        }

        $admin->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return redirect()->back()->with('success', 'Kata sandi administrator berhasil diperbarui di database!');
    }
}
