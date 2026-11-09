<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Catatan:
 * Controller ini fungsinya buat ngatur semua urusan inventaris alat lab di sisi admin.
 * Mulai dari nampilin daftar alat, nambah alat baru, ngedit detail/stok/gambar,
 * ngehapus alat, sampe ngatur apakah alatnya boleh kelihatan sama siswa atau nggak.
 */
class AlatController extends Controller
{
    /**
     * Nampilin halaman utama katalog inventaris alat buat admin.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        // Cek dulu hak aksesnya: kalau bukan admin, lempar aja ke katalog alat versi siswa (/alat)
        $user = $request->user();
        if ($user && $user->role !== 'admin' && !str_starts_with($user->email, 'admin') && $user->username !== 'admin') {
            return redirect('/alat');
        }

        try {
            // Bersihin deskripsi yang mungkin ada karakter aneh/spasi kosong berlebih
            Alat::where('description', 'like', '%%')->get()->each(function ($a) {
                $a->description = trim(str_replace('', '', $a->description));
                $a->save();
            });

            // Ambil semua daftar alat dari yang paling baru ditambahin
            $items = Alat::latest()->get();
        } catch (\Throwable) {
            // Kalau misal database lagi bermasalah, kita kasih list kosong biar halaman gak crash
            $items = collect();
        }

        // Lempar data alat ke komponen halaman Inertia di frontend (admin/alat/index)
        return Inertia::render('admin/alat/index', [
            'initialItems' => $items,
        ]);
    }

    /**
     * Nambahin alat baru ke dalam inventaris.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validasi input form: pastiin field wajib keisi, kode alat gak duplikat,
        // dan stok yang siap pakai gak boleh lebih banyak dari total unit fisik yang ada.
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

        // Cek apakah ada upload foto alat. Kalau ada, simpen filenya ke storage publik di folder 'alats'
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('alats', 'public');
        }

        // Bikin record alat baru di database
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

        // Balik lagi ke halaman sebelumnya sambil bawa pesan sukses
        return redirect()->back()->with('success', 'Alat baru berhasil ditambahkan.');
    }

    /**
     * Update/edit info alat yang udah tersimpan.
     */
    public function update(Request $request, Alat $alat): RedirectResponse
    {
        // Validasi data yang mau diubah:
        // Kode alat harus unik di tabel alats, KECUALI buat id alat ini sendiri (biar gak error pas gak ganti kode).
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

        // Pengelolaan file gambar alat:
        if ($request->hasFile('image')) {
            // Skenario 1: Admin upload gambar pengganti baru.
            $request->validate([
                'image' => ['image', 'mimes:jpeg,png,jpg,webp,svg', 'max:2048'],
            ]);

            // Hapus file gambar yang lama dari storage biar gak menuhi memori disk
            if ($alat->image && Storage::disk('public')->exists($alat->image)) {
                Storage::disk('public')->delete($alat->image);
            }

            // Simpan gambar baru
            $validated['image'] = $request->file('image')->store('alats', 'public');
        } elseif ($request->input('remove_image')) {
            // Skenario 2: Admin sengaja mau hapus gambar tanpa upload yang baru
            if ($alat->image && Storage::disk('public')->exists($alat->image)) {
                Storage::disk('public')->delete($alat->image);
            }
            $validated['image'] = null;
        } else {
            // Skenario 3: Gambar gak diapa-apain, jadi jangan timpa data gambar yang lama
            unset($validated['image']);
        }

        // Terapkan update data ke database
        $alat->update($validated);

        return redirect()->back()->with('success', 'Alat berhasil diperbarui.');
    }

    /**
     * Hapus alat dari inventaris lab.
     */
    public function destroy(Alat $alat): RedirectResponse
    {
        // Pengecekan penting: jangan sampe kita ngehapus alat yang statusnya lagi dipinjem siswa!
        // Kalau masih ada yang minjem, tolak proses hapus.
        $activeLoans = $alat->peminjamans()->where('status', 'Sedang Dipinjam')->count();

        if ($activeLoans > 0) {
            return redirect()->back()->with('error', 'Alat sedang dipinjam dan tidak dapat dihapus.');
        }

        // Kalau aman (gak ada pinjaman aktif), hapus alat dari database
        $alat->delete();

        return redirect()->back()->with('success', 'Alat berhasil dihapus dari inventaris.');
    }

    /**
     * Toggle / switch visibilitas alat (sembunyiin atau tampilin ke katalog siswa).
     * Berguna misal alat lagi rusak/maintenance dan pengen disembunyiin sementara waktu.
     */
    public function toggleVisibility(Alat $alat): RedirectResponse
    {
        // Balik nilainya (true jadi false, false jadi true)
        $alat->update([
            'is_visible_to_students' => !$alat->is_visible_to_students,
        ]);

        return redirect()->back()->with('success', 'Status visibilitas alat berhasil diubah.');
    }
}
