<?php

namespace App\Http\Controllers;

use App\Models\Alat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Catatan:
 * Controller ini bertugas nampilin katalog alat lab buat siswa.
 * Di sini siswa bisa browsing alat apa aja yang ada di lab RPL,
 * nyari alat pake keyword search, dan ngefilter berdasarkan kategori alat.
 */
class AlatController extends Controller
{
    /**
     * Nampilin halaman katalog alat untuk siswa.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        // Pengecekan role: kalau yang buka adalah admin, lempar ke katalog alat versi admin (/admin/alat)
        $user = $request->user();
        if ($user && ($user->role === 'admin' || str_starts_with($user->email, 'admin') || $user->username === 'admin')) {
            return redirect('/admin/alat');
        }

        try {
            // Ambil hanya alat-alat yang visibilitasnya diizinkan untuk siswa (is_visible_to_students = true)
            $query = Alat::where('is_visible_to_students', true);

            // Fitur Pencarian: kalau siswa ngetik kata kunci di kotak search,
            // cocokkan dengan nama alat, kode alat, atau kategori alat
            if ($request->filled('search')) {
                $search = $request->input('search');
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%");
                });
            }

            // Fitur Filter Kategori: kalau siswa milih kategori tertentu (bukan 'Semua')
            if ($request->filled('category') && $request->input('category') !== 'Semua') {
                $query->where('category', $request->input('category'));
            }

            // Urutkan dari alat yang paling baru ditambahkan
            $items = $query->latest()->get();
        } catch (\Throwable) {
            // Fallback collection kosong biar gak error kalau ada gangguan koneksi db
            $items = collect();
        }

        // Render halaman inertia siswa/alat/index dan kirim juga filter aktifnya
        // biar input search & dropdown kategori di frontend tetep sinkron
        return Inertia::render('siswa/alat/index', [
            'initialItems' => $items,
            'filters' => $request->only(['search', 'category']),
        ]);
    }
}
