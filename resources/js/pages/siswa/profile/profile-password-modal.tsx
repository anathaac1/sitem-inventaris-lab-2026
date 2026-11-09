/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/profile/
 * Fungsi  : Kumpulan komponen antarmuka yang mengelola data profil, keamanan akun,
 *           dan preferensi siswa dalam aplikasi inventaris lab.
 * File    : profile-password-modal.tsx
 * Fungsi  : Dialog modal form untuk mengganti kata sandi akun siswa, memverifikasi kata sandi lama,
 *           kata sandi baru (minimal 4 karakter), dan konfirmasi kecocokan kata sandi.
 * ============================================================================
 */

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ProfilePasswordModalProps {
    isOpen: boolean;                                           // Penanda dialog modal terbuka/tertutup
    onClose: () => void;                                       // Callback menutup dialog modal
    onSubmit: (e: React.SyntheticEvent) => void;               // Callback aksi submit form ganti sandi
    oldPassword: string;                                       // Nilai input kata sandi lama
    onOldPasswordChange: (val: string) => void;                // Handler perubahan input kata sandi lama
    newPassword: string;                                       // Nilai input kata sandi baru
    onNewPasswordChange: (val: string) => void;                // Handler perubahan input kata sandi baru
    confirmPassword: string;                                   // Nilai input konfirmasi kata sandi baru
    onConfirmPasswordChange: (val: string) => void;            // Handler perubahan konfirmasi kata sandi
}

export function ProfilePasswordModal({
    isOpen,
    onClose,
    onSubmit,
    oldPassword,
    onOldPasswordChange,
    newPassword,
    onNewPasswordChange,
    confirmPassword,
    onConfirmPasswordChange
}: ProfilePasswordModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md p-6 bg-white rounded-2xl">
                {/* Header Judul Modal */}
                <DialogHeader>
                    <DialogTitle className="text-base font-bold text-zinc-900">
                        Ubah Kata Sandi Akun
                    </DialogTitle>
                </DialogHeader>

                {/* Formulir Penggantian Kata Sandi */}
                <form onSubmit={onSubmit} className="space-y-4 mt-2">
                    {/* Input Kata Sandi Lama */}
                    <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            Kata Sandi Lama
                        </label>
                        <input
                            type="password"
                            required
                            value={oldPassword}
                            onChange={(e) => onOldPasswordChange(e.target.value)}
                            placeholder="Masukkan kata sandi lama..."
                            className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Input Kata Sandi Baru */}
                    <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            Kata Sandi Baru
                        </label>
                        <input
                            type="password"
                            required
                            minLength={4}
                            value={newPassword}
                            onChange={(e) => onNewPasswordChange(e.target.value)}
                            placeholder="Minimal 4 karakter..."
                            className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Input Konfirmasi Kata Sandi Baru */}
                    <div>
                        <label className="block text-xs font-semibold text-zinc-700 mb-1">
                            Konfirmasi Kata Sandi Baru
                        </label>
                        <input
                            type="password"
                            required
                            minLength={4}
                            value={confirmPassword}
                            onChange={(e) => onConfirmPasswordChange(e.target.value)}
                            placeholder="Ulangi kata sandi baru..."
                            className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Tombol Aksi Batal dan Simpan */}
                    <div className="flex gap-2 justify-end pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onClose}
                            className="cursor-pointer"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                        >
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
