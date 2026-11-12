<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AlatController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        $user = $request->user();
        if ($user && $user->role !== 'admin' && !str_starts_with($user->email, 'admin') && $user->username !== 'admin') {
            return redirect('/alat');
        }

        try {
            Alat::where('description', 'like', '%%')->get()->each(function ($a) {
                $a->description = trim(str_replace('', '', $a->description));
                $a->save();
            });

            $items = Alat::latest()->get();
        } catch (\Throwable) {
            $items = collect();
        }

        return Inertia::render('admin/alat/index', [
            'initialItems' => $items,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:50', 'unique:alats,code'],
            'category' => ['required', 'string', 'max:100'],
            'total' => ['required', 'integer', 'min:0'],
            'stock' => ['required', 'integer', 'min:0', 'lte:total'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,svg', 'max:2048'],
            'icon_type' => ['nullable', 'string'],
            'is_visible_to_students' => ['boolean'],
            'specs' => ['nullable', 'array'],
        ], [
            'stock.lte' => 'Stok siap pakai tidak boleh melebihi total unit fisik lab.',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('alats', 'public');
        }

        Alat::create([
            'name' => $validated['name'],
            'code' => $validated['code'],
            'category' => $validated['category'],
            'stock' => $validated['stock'],
            'total' => $validated['total'],
            'description' => $validated['description'] ?? '',
            'image' => $imagePath,
            'icon_type' => $validated['icon_type'] ?? 'laptop',
            'is_visible_to_students' => $validated['is_visible_to_students'] ?? true,
            'specs' => $validated['specs'] ?? [],
        ]);

        return redirect()->back()->with('success', 'Alat baru berhasil ditambahkan.');
    }

    public function update(Request $request, Alat $alat): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:50', 'unique:alats,code,' . $alat->id],
            'category' => ['required', 'string', 'max:100'],
            'total' => ['required', 'integer', 'min:0'],
            'stock' => ['required', 'integer', 'min:0', 'lte:total'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable'],
            'icon_type' => ['nullable', 'string'],
            'is_visible_to_students' => ['boolean'],
            'specs' => ['nullable', 'array'],
        ], [
            'stock.lte' => 'Stok siap pakai tidak boleh melebihi total unit fisik lab.',
        ]);

        if ($request->hasFile('image')) {
            $request->validate([
                'image' => ['image', 'mimes:jpeg,png,jpg,webp,svg', 'max:2048'],
            ]);

            if ($alat->image && Storage::disk('public')->exists($alat->image)) {
                Storage::disk('public')->delete($alat->image);
            }

            $validated['image'] = $request->file('image')->store('alats', 'public');
        } elseif ($request->input('remove_image')) {
            if ($alat->image && Storage::disk('public')->exists($alat->image)) {
                Storage::disk('public')->delete($alat->image);
            }
            $validated['image'] = null;
        } else {
            unset($validated['image']);
        }

        $alat->update($validated);

        return redirect()->back()->with('success', 'Alat berhasil diperbarui.');
    }

    public function destroy(Alat $alat): RedirectResponse
    {
        $activeLoans = $alat->peminjamans()->where('status', 'Sedang Dipinjam')->count();

        if ($activeLoans > 0) {
            return redirect()->back()->with('error', 'Alat sedang dipinjam dan tidak dapat dihapus.');
        }

        $alat->delete();

        return redirect()->back()->with('success', 'Alat berhasil dihapus dari inventaris.');
    }

    public function toggleVisibility(Alat $alat): RedirectResponse
    {
        $alat->update([
            'is_visible_to_students' => !$alat->is_visible_to_students,
        ]);

        return redirect()->back()->with('success', 'Status visibilitas alat berhasil diubah.');
    }
}
