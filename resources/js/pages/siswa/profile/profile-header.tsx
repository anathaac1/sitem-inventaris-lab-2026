/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/profile/
 * Fungsi  : Kumpulan komponen antarmuka yang mengelola data profil, keamanan akun,
 *           dan preferensi siswa dalam aplikasi inventaris lab.
 * File    : profile-header.tsx
 * Fungsi  : Komponen header untuk halaman profil siswa, menyediakan tombol kembali
 *           ke beranda, judul halaman, dan tombol pemicu modal edit profil.
 * ============================================================================
 */

import { Link } from '@inertiajs/react';
import { ChevronLeft, Edit3 } from 'lucide-react';

interface ProfileHeaderProps {
    onOpenEditModal?: () => void;                              // Callback untuk membuka dialog edit profil
}

export function ProfileHeader({ onOpenEditModal }: ProfileHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            {/* Bagian Kiri: Tombol Back dan Judul Halaman */}
            <div className="flex items-center gap-3">
                <Link
                    href="/dashboard"
                    className="w-9 h-9 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-50 transition-colors"
                    title="Kembali ke Beranda"
                >
                    <ChevronLeft className="w-4 h-4" />
                </Link>
                <h1 className="text-xl font-bold tracking-tight text-zinc-900">
                    Profil Siswa
                </h1>
            </div>

            {/* Bagian Kanan: Tombol Edit Profil */}
            {onOpenEditModal && (
                <button
                    type="button"
                    onClick={onOpenEditModal}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-xs transition-colors cursor-pointer border border-blue-200/60 shadow-2xs"
                >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profil</span>
                </button>
            )}
        </div>
    );
}
