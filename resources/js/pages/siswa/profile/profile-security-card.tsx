/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/profile/
 * Fungsi  : Kumpulan komponen antarmuka yang mengelola data profil, keamanan akun,
 *           dan preferensi siswa dalam aplikasi inventaris lab.
 * File    : profile-security-card.tsx
 * Fungsi  : Kartu opsi pengaturan akun dan keamanan untuk siswa, mencakup tombol aksi
 *           untuk mengedit informasi profil, mengganti kata sandi akun, serta keluar dari aplikasi (logout).
 * ============================================================================
 */

import { Lock, LogOut, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileSecurityCardProps {
    onOpenEditModal: () => void;                               // Aksi membuka modal formulir edit profil siswa
    onOpenPasswordModal: () => void;                           // Aksi membuka modal ubah kata sandi
    onLogout: () => void;                                      // Aksi konfirmasi keluar dari aplikasi
}

export function ProfileSecurityCard({
    onOpenEditModal,
    onOpenPasswordModal,
    onLogout
}: ProfileSecurityCardProps) {
    return (
        <div className="bg-white rounded-xl border border-zinc-200 p-4 space-y-3 shadow-2xs">
            {/* Judul Seksi Pengaturan Akun */}
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider text-slate-400">
                Pengaturan Akun & Keamanan
            </h3>

            {/* Daftar Tombol Aksi Pengaturan */}
            <div className="space-y-2">
                {/* 1. Tombol Edit Informasi Profil */}
                <Button
                    variant="outline"
                    onClick={onOpenEditModal}
                    className="w-full justify-start text-xs h-10 border-zinc-200 text-zinc-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors cursor-pointer"
                >
                    <Edit3 className="w-4 h-4 mr-2 text-blue-500" />
                    Edit Informasi Profil
                </Button>

                {/* 2. Tombol Ubah Kata Sandi */}
                <Button
                    variant="outline"
                    onClick={onOpenPasswordModal}
                    className="w-full justify-start text-xs h-10 border-zinc-200 text-zinc-700 hover:bg-zinc-50 cursor-pointer"
                >
                    <Lock className="w-4 h-4 mr-2 text-zinc-500" />
                    Ubah Kata Sandi
                </Button>

                {/* 3. Tombol Logout Akun */}
                <Button
                    variant="outline"
                    onClick={onLogout}
                    className="w-full justify-start text-xs h-10 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                >
                    <LogOut className="w-4 h-4 mr-2 text-red-500" />
                    Keluar dari Aplikasi
                </Button>
            </div>
        </div>
    );
}
