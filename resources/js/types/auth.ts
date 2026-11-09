/**
 * ============================================================================
 * Folder  : resources/js/types/
 * Fungsi  : Direktori definisi tipe data TypeScript (interfaces & types) untuk memastikan integritas data aplikasi.
 * File    : auth.ts
 * Fungsi  : Mendefinisikan tipe data untuk entitas pengguna yang diautentikasi (User)
 *           dan struktur properti pembungkus autentikasi (Auth) dari backend Laravel.
 * ============================================================================
 */

/**
 * Tipe data pengguna (User) yang terdaftar di sistem
 */
export type User = {
    id: number;                               // ID unik pengguna di database
    name: string;                             // Nama lengkap pengguna
    email: string;                            // Alamat email pengguna
    avatar?: string;                          // Foto / gambar avatar profil (opsional)
    email_verified_at: string | null;         // Waktu verifikasi email jika ada
    created_at: string;                       // Waktu pembuatan akun
    updated_at: string;                       // Waktu pembaruan akun terakhir
    [key: string]: unknown;                   // Memungkinkan properti dinamis tambahan (seperti role, class, nisn)
};

/**
 * Tipe pembungkus autentikasi pada objek props Inertia
 */
export type Auth = {
    user: User;                               // Objek user yang sedang aktif login
};
