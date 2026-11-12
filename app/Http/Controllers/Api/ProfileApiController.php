<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ProfileApiController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user && $request->has('username')) {
            $user = User::where('username', $request->input('username'))
                ->orWhere('email', $request->input('username'))
                ->first();
        }

        if (!$user) {
            $user = User::first();
        }

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found.',
            ], 404);
        }

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

    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user && $request->has('username')) {
            $user = User::where('username', $request->input('username'))
                ->orWhere('email', $request->input('username'))
                ->first();
        }

        if (!$user && $request->has('user_id')) {
            $user = User::find($request->input('user_id'));
        }

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found. Provide authenticated session or username/user_id.',
            ], 404);
        }

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

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

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
