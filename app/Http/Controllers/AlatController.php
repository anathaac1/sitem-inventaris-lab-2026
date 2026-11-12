<?php

namespace App\Http\Controllers;

use App\Models\Alat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AlatController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        $user = $request->user();
        if ($user && ($user->role === 'admin' || str_starts_with($user->email, 'admin') || $user->username === 'admin')) {
            return redirect('/admin/alat');
        }

        try {
            $query = Alat::where('is_visible_to_students', true);

            if ($request->filled('search')) {
                $search = $request->input('search');
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%");
                });
            }

            if ($request->filled('category') && $request->input('category') !== 'Semua') {
                $query->where('category', $request->input('category'));
            }

            $items = $query->latest()->get();
        } catch (\Throwable) {
            $items = collect();
        }

        return Inertia::render('siswa/alat/index', [
            'initialItems' => $items,
            'filters' => $request->only(['search', 'category']),
        ]);
    }
}
