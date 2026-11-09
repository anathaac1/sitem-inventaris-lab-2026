/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/profile/
 * Fungsi  : Kumpulan komponen antarmuka manajemen profil akun Administrator laboratorium.
 * File    : profile-action-card.tsx
 * Fungsi  : Kartu navigasi aksi cepat untuk profil admin: mengubah data diri,
 *           mengganti kata sandi, dan keluar dari sesi aplikasi laboratorium.
 * ============================================================================
 */

import { Lock, LogOut, ChevronRight, Edit3 } from 'lucide-react';

interface ProfileActionCardProps {
    onOpenEditModal: () => void;                               // Callback membuka modal formulir edit profil
    onOpenPasswordModal: () => void;                           // Callback membuka modal ganti kata sandi
    onLogout: () => void;                                      // Callback memproses aksi logout admin
}

export function ProfileActionCard({ onOpenEditModal, onOpenPasswordModal, onLogout }: ProfileActionCardProps) {
    return (
        <div className="bg-white border border-slate-200/90 rounded-xl divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {/* Opsi 1: Edit Data Profil */}
            <button
                type="button"
                onClick={onOpenEditModal}
                className="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors text-left group cursor-pointer"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0256D0] flex items-center justify-center shrink-0 group-hover:bg-[#0256D0] group-hover:text-white transition-colors">
                        <Edit3 className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-900 group-hover:text-[#0256D0] transition-colors">
                            Edit Profil Administrator
                        </p>
                        <p className="text-[11px] text-slate-500">
                            Perbarui nama lengkap, jabatan struktural, email, dan nomor kontak
                        </p>
                    </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            </button>

            {/* Opsi 2: Ganti Kata Sandi */}
            <button
                type="button"
                onClick={onOpenPasswordModal}
                className="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors text-left group cursor-pointer"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0256D0] flex items-center justify-center shrink-0 group-hover:bg-[#0256D0] group-hover:text-white transition-colors">
                        <Lock className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-900 group-hover:text-[#0256D0] transition-colors">
                            Ganti Kata Sandi Admin
                        </p>
                        <p className="text-[11px] text-slate-500">
                            Perbarui kata sandi akun kepala laboratorium
                        </p>
                    </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            </button>

            {/* Opsi 3: Keluar / Logout */}
            <button
                type="button"
                onClick={onLogout}
                className="w-full flex items-center justify-between p-3.5 hover:bg-rose-50 text-rose-600 transition-colors text-left group cursor-pointer"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-100 transition-colors">
                        <LogOut className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-rose-600">
                            Keluar
                        </p>
                        <p className="text-[11px] text-rose-400">
                            Akhiri sesi administrator dan kembali ke login
                        </p>
                    </div>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
        </div>
    );
}
