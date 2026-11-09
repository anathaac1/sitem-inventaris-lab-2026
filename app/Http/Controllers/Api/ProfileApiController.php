<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

/**
 * Catatan:
 * Controller API ini fungsinya sebagai endpoint REST API (JSON) buat data profil user.
 * Dipake kalau frontend butuh ngambil atau ngubah data profil secara asynchronous (AJAX / fetch / API eksternal)
 * tanpa harus reload halaman atau lewat Inertia biasa.
 */
class ProfileApiController extends Controller
{
    /**
     * Mengambil detail profil user dalam format respons JSON.
     */
    public function show(Request $request): JsonResponse
    {
        // 1. Cek apakah ada user yang lagi login (dari session/auth bearer token)
        $user = $request->user();

        // 2. Kalau belum terautentikasi tapi ada kiriman parameter 'username' di request,
        // cari user berdasarkan username atau email tersebut
        if (!$user && $request->has('username')) {
            $user = User::where('username', $request->input('username'))
                ->orWhere('email', $request->input('username'))
                ->first();
        }

        // 3. Fallback terakhir buat kemudahan testing: ambil user pertama di database
        if (!$user) {
            $user = User::first();
        }

        // Kalau bener-bener gak ada user sama sekali di database, balikin respons 404
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found.',
            ], 404);
        }

        // Balikin data profil user lengkap dalam format JSON
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'class' => $user->class,
                'nisn' => $user->nisn,
                'phone' => $user->phone,
            ],
        ]);
    }

    /**
     * Memperbarui data profil user lewat panggilan REST API (JSON).
     */
    public function update(Request $request): JsonResponse
    {
        // Cari user yang mau diupdate (bisa lewat session login, query username, atau user_id)
        $user = $request->user();

        if (!$user && $request->has('username')) {
            $user = User::where('username', $request->input('username'))
                ->orWhere('email', $request->input('username'))
                ->first();
        }

        if (!$user && $request->has('user_id')) {
            $user = User::find($request->input('user_id'));
        }

        // Tolak kalau data user yang dimaksud tidak ketemu
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found. Provide authenticated session or username/user_id.',
            ], 404);
        }

        // Validasi payload JSON:
        // Pake aturan 'sometimes' biar field yang gak dikirim di JSON gak dipaksa harus ada (partial update)
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'username' => [
                'sometimes',
                'required',
                'string',
                'max:100',
                Rule::unique('users', 'username')->ignore($user->id),
            ],
            'email' => [
                'sometimes',
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'class' => ['nullable', 'string', 'max:100'],
            'nisn' => ['nullable', 'string', 'max:30'],
            'phone' => ['nullable', 'string', 'max:30'],
            'password' => ['nullable', 'string', 'min:4'],
        ]);

        // Kalau ada perubahan password yang dikirim, wajib di-hash terlebih dahulu
        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            // Kalau password kosong / tidak dikirim, jangan timpa password yang lama
            unset($validated['password']);
        }

        // Terapkan perubahan data user ke database
        $user->update($validated);

        // Balikkan respons sukses bersama data user yang sudah terupdate
        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui di database.',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'class' => $user->class,
                'nisn' => $user->nisn,
                'phone' => $user->phone,
            ],
        ]);
    }
}
