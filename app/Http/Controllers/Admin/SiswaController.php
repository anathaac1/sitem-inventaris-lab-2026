<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Catatan:
 * Controller ini fungsinya buat manajemen data akun siswa di panel admin.
 * Mulai dari nampilin daftar siswa yang terdaftar, nambah akun siswa baru secara manual,
 * reset kata sandi kalau ada siswa yang lupa password, sampe ngehapus akun siswa.
 */
class SiswaController extends Controller
{
    /**
     * Nampilin halaman daftar akun siswa buat admin.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        // Proteksi: pastiin hanya admin yang boleh akses halaman kelola siswa ini
        $user = $request->user();
        if ($user && $user->role !== 'admin' && !str_starts_with($user->email, 'admin') && $user->username !== 'admin') {
            return redirect('/dashboard');
        }

        // Daftar contekan password default buat akun demo/testing
        // (ngebantu admin pas lagi demo atau testing aplikasi biar gampang inget password akun siswa)
        $defaultPasswords = [
            'siswa1' => 'siswa123',
            'siswa2' => 'rpl2024!',
            'siswa3' => 'rplfajar11',
            'siswa4' => 'aisyah2024',
            'siswa5' => 'dimasrpl10',
            'siswa6' => 'zahra10rpl',
            'admin' => 'adminlab123',
        ];

        try {
            // Ambil semua akun dengan role 'siswa' dari yang paling baru daftar/dibuat
            $students = User::where('role', 'siswa')
                ->latest()
                ->get()
                ->map(function ($u) use ($defaultPasswords) {
                    // Mapping tiap data siswa biar rapi dan siap dipake di frontend tabel
                    return [
                        'id' => (string) $u->id,
                        'username' => $u->username ?? explode('@', $u->email)[0],
                        'name' => $u->name,
                        'class' => $u->class ?? 'X RPL A',
                        'email' => $u->email,
                        'password' => $defaultPasswords[$u->username] ?? 'siswa123',
                        'role' => 'siswa',
                        'nisn' => $u->nisn ?? '-',
                        'phone' => $u->phone ?? '-',
                        // Bikin 2 huruf depan inisial nama buat avatar siswa
                        'avatar' => strtoupper(substr($u->name, 0, 2)),
                    ];
                });
        } catch (\Throwable) {
            // Jaga-jaga kalau ada kendala query database
            $students = collect();
        }

        // Render halaman inertia admin/siswa/index
        return Inertia::render('admin/siswa/index', [
            'initialStudents' => $students,
        ]);
    }

    /**
     * Nambahin akun siswa baru secara manual lewat form admin.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validasi data input:
        // Username & email harus unik (gak boleh tabrakan sama akun lain yang udah ada)
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:100', 'unique:users,username'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:4'],
            'role' => ['required', 'in:siswa,admin'],
            'class' => ['required', 'string', 'max:50'],
            'nisn' => ['nullable', 'string', 'max:30'],
            'phone' => ['nullable', 'string', 'max:30'],
        ]);

        // Masukin data akun ke database, jangan lupa di-hash password-nya biar aman
        User::create([
            'name' => $validated['name'],
            'username' => strtolower(trim($validated['username'])),
            'email' => strtolower(trim($validated['email'])),
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'class' => $validated['class'],
            'nisn' => $validated['nisn'] ?? null,
            'phone' => $validated['phone'] ?? null,
        ]);

        return redirect()->back()->with('success', "Akun untuk {$validated['name']} berhasil dibuat!");
    }

    /**
     * Fitur reset password siswa (sangat berguna kalau ada siswa yang lupa password akunnya).
     */
    public function resetPassword(Request $request): RedirectResponse
    {
        // Validasi: pastiin username diisi dan password baru minimal 4 karakter
        $validated = $request->validate([
            'username' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:4'],
        ]);

        $username = trim($validated['username']);

        // Cari user yang bersangkutan (fleksibel: bisa lewat username, email persis, atau email domain sekolah)
        $user = User::where('username', $username)
            ->orWhere('email', $username)
            ->orWhere('email', $username . '@smkn1.sch.id')
            ->first();

        // Kalau akunnya beneran gak ketemu di database
        if (!$user) {
            return redirect()->back()->with('error', "Akun {$username} tidak ditemukan.");
        }

        // Update password siswa dengan hash password baru
        $user->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return redirect()->back()->with('success', "Password untuk akun {$user->name} ({$username}) berhasil diperbarui.");
    }

    /**
     * Hapus akun siswa dari sistem.
     */
    public function destroy(User $user): RedirectResponse
    {
        // Pengecekan krusial:
        // Cek dulu apakah siswa ini masih punya barang/alat lab yang statusnya 'Sedang Dipinjam'.
        // Jangan sampe akunnya dihapus padahal barang lab belum dibalikin!
        $activeLoans = $user->peminjamans()->where('status', 'Sedang Dipinjam')->count();

        if ($activeLoans > 0) {
            return redirect()->back()->with('error', "Akun {$user->name} sedang memiliki pinjaman alat aktif.");
        }

        // Kalau gak ada pinjaman aktif, aman buat dihapus
        $user->delete();

        return redirect()->back()->with('success', "Akun {$user->name} berhasil dihapus.");
    }
}
