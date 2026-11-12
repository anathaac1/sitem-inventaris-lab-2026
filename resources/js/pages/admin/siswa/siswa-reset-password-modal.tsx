import React from 'react';
import { Check } from 'lucide-react';
import type { UserAccount } from '@/data/auth-store';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SiswaResetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: UserAccount | null;
    newPassword: string;
    onNewPasswordChange: (val: string) => void;
    onGenerateRandom: () => void;
    onSubmit: (e: React.SyntheticEvent) => void;
    isSubmitting: boolean;
}

export function SiswaResetPasswordModal({
    isOpen,
    onClose,
    student,
    newPassword,
    onNewPasswordChange,
    onGenerateRandom,
    onSubmit,
    isSubmitting
}: SiswaResetPasswordModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent showCloseButton={false} className="max-w-md rounded-md bg-white p-6 border border-slate-300 shadow-xl">
                <DialogTitle className="sr-only">Reset Password Pengguna</DialogTitle>

                {student && (
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="p-3 rounded bg-slate-50 border border-slate-200 text-xs flex items-center gap-3">
                            <div className="w-9 h-9 rounded bg-slate-900 text-white font-bold flex items-center justify-center shrink-0">
                                {student.avatar}
                            </div>
                            <div className="min-w-0">
                                <p className="font-bold text-slate-900">{student.name}</p>
                                <p className="text-slate-500 font-mono text-[11px]">
                                    Username: <span className="font-bold text-blue-700">{student.username}</span> • {student.class}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-1.5 border border-slate-200 rounded p-3.5 bg-slate-50/50">
                            <label className="text-xs font-semibold text-slate-700 block">
                                Password Baru
                            </label>
                            <input
                                type="text"
                                required
                                autoFocus
                                value={newPassword}
                                onChange={(e) => onNewPasswordChange(e.target.value)}
                                placeholder="Contoh: rpl2024!"
                                className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                            />

                            <button
                                type="button"
                                onClick={onGenerateRandom}
                                className="w-full mt-2 py-1.5 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0256D0] font-medium text-xs flex items-center justify-center gap-1.5 border border-blue-200 transition-colors cursor-pointer"
                            >
                                <span>Generate Password Acak</span>
                            </button>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-1">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="h-9 px-4 rounded-md text-xs font-medium cursor-pointer border-slate-300"
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !newPassword.trim()}
                                className="h-9 px-4 rounded-md bg-[#0256D0] hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                            >
                                <Check className="w-3.5 h-3.5 mr-1.5" />
                                <span>Simpan & Terapkan</span>
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
