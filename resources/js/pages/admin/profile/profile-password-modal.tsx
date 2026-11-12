import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ProfilePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    oldPassword: string;
    onOldPasswordChange: (val: string) => void;
    newPassword: string;
    onNewPasswordChange: (val: string) => void;
    confirmPassword: string;
    onConfirmPasswordChange: (val: string) => void;
    onSubmit: (e: React.SyntheticEvent) => void;
}

export function ProfilePasswordModal({
    isOpen,
    onClose,
    oldPassword,
    onOldPasswordChange,
    newPassword,
    onNewPasswordChange,
    confirmPassword,
    onConfirmPasswordChange,
    onSubmit
}: ProfilePasswordModalProps) {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-sm rounded-2xl bg-white p-5 border border-slate-200 shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span>Ganti Kata Sandi Admin</span>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-3 pt-2 text-xs">
                    <div className="space-y-1">
                        <label className="font-semibold text-slate-700">Kata Sandi Saat Ini</label>
                        <div className="relative">
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                required
                                value={oldPassword}
                                onChange={(e) => onOldPasswordChange(e.target.value)}
                                placeholder="Masukkan password lama"
                                className="w-full pl-3 pr-9 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:border-slate-800"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                tabIndex={-1}
                                title={showOldPassword ? 'Lihat password' : 'Sembunyikan password'}
                            >
                                {showOldPassword ? (
                                    <Eye className="w-4 h-4" />
                                ) : (
                                    <EyeOff className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="font-semibold text-slate-700">Kata Sandi Baru</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                required
                                value={newPassword}
                                onChange={(e) => onNewPasswordChange(e.target.value)}
                                placeholder="Masukkan password baru (min 4 karakter)"
                                className="w-full pl-3 pr-9 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:border-slate-800"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                tabIndex={-1}
                                title={showNewPassword ? 'Sembunyikan password' : 'Lihat password'}
                            >
                                {showNewPassword ? (
                                    <Eye className="w-4 h-4" />
                                ) : (
                                    <EyeOff className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="font-semibold text-slate-700">Konfirmasi Kata Sandi Baru</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                value={confirmPassword}
                                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                                placeholder="Ketik ulang password baru"
                                className="w-full pl-3 pr-9 py-2 rounded-lg border border-slate-200 text-xs text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:border-slate-800"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                tabIndex={-1}
                                title={showConfirmPassword ? 'Sembunyikan password' : 'Lihat password'}
                            >
                                {showConfirmPassword ? (
                                    <Eye className="w-4 h-4" />
                                ) : (
                                    <EyeOff className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="pt-2 flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 rounded-lg text-xs py-2 border-slate-200 font-semibold cursor-pointer"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 rounded-lg bg-[#0256D0] hover:bg-[#0243a4] text-white text-xs font-bold py-2 shadow-xs cursor-pointer"
                        >
                            Simpan Sandi
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
