import React, { useState } from 'react';
import { RPL_CLASSES } from '@/data/auth-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface NewUserFormData {
    name: string;
    username: string;
    role: 'siswa' | 'admin';
    class: string;
    email: string;
    password: string;
    nisn: string;
    phone: string;
}

interface SiswaCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: NewUserFormData) => void;
    isSubmitting: boolean;
}

const INITIAL_FORM_STATE: NewUserFormData = {
    name: '',
    username: '',
    role: 'siswa',
    class: 'X RPL A',
    email: '',
    password: '',
    nisn: '',
    phone: ''
};

export function SiswaCreateModal({
    isOpen,
    onClose,
    onSubmit,
    isSubmitting
}: SiswaCreateModalProps) {
    const [formData, setFormData] = useState<NewUserFormData>(INITIAL_FORM_STATE);

    const handleFieldChange = (field: keyof NewUserFormData, value: string) => {
        setFormData((prev) => {
            const next = { ...prev, [field]: value };
            if (field === 'username') {
                const clean = value.trim().toLowerCase().replace(/\s+/g, '');
                next.username = clean;
                if (!prev.email || prev.email === `${prev.username}@smkn1.sch.id`) {
                    next.email = clean ? `${clean}@smkn1.sch.id` : '';
                }
            }
            return next;
        });
    };

    const generateRandomPassword = () => {
        const rand = Math.floor(1000 + Math.random() * 9000);
        handleFieldChange('password', `rpl${rand}!`);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleClose = () => {
        setFormData(INITIAL_FORM_STATE);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-xl rounded-md bg-white p-6 border border-slate-300 shadow-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="border-b border-slate-200 pb-3">
                    <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                        <span>Tambah Akun Pengguna Baru</span>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleFormSubmit} className="space-y-4 pt-3">
                    <div className="border border-slate-200 rounded p-3.5 bg-slate-50/50 space-y-3.5">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                            1. Peran & Akses Akun
                        </span>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    handleFieldChange('role', 'siswa');
                                    handleFieldChange('class', 'X RPL A');
                                }}
                                className={`py-2 px-3 rounded-md text-xs font-bold border transition-all cursor-pointer ${
                                    formData.role === 'siswa'
                                        ? 'bg-[#0256D0] text-white border-[#0256D0] shadow-xs'
                                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                                }`}
                            >
                                Siswa RPL
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    handleFieldChange('role', 'admin');
                                    handleFieldChange('class', 'Staf / Guru Lab RPL');
                                }}
                                className={`py-2 px-3 rounded-md text-xs font-bold border transition-all cursor-pointer ${
                                    formData.role === 'admin'
                                        ? 'bg-[#0256D0] text-white border-[#0256D0] shadow-xs'
                                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                                }`}
                            >
                                Administrator Lab
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-700 block">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleFieldChange('name', e.target.value)}
                                    placeholder="Contoh: Muhammad Farhan"
                                    className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-700 block">
                                        Username Login <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.username}
                                        onChange={(e) => handleFieldChange('username', e.target.value)}
                                        placeholder="Contoh: farhan12"
                                        className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                                    />
                                </div>

                                {formData.role === 'siswa' ? (
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-700 block">
                                            Kelas RPL <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={formData.class}
                                            onChange={(e) => handleFieldChange('class', e.target.value)}
                                            className="w-full px-3 py-2 rounded-md border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                                        >
                                            {RPL_CLASSES.map((cls) => (
                                                <option key={cls} value={cls}>
                                                    {cls}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-700 block">
                                            Jabatan / Penugasan Lab
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.class}
                                            onChange={(e) => handleFieldChange('class', e.target.value)}
                                            placeholder="Contoh: Kepala Lab / Teknisi"
                                            className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="border border-slate-200 rounded p-3.5 bg-slate-50/50 space-y-3">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                            2. Kontak & Identitas
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {formData.role === 'siswa' && (
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-700 block">
                                        NISN (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.nisn}
                                        onChange={(e) => handleFieldChange('nisn', e.target.value)}
                                        placeholder="Contoh: 0089123403"
                                        className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                                    />
                                </div>
                            )}
                            <div className={`space-y-1 ${formData.role === 'admin' ? 'sm:col-span-2' : ''}`}>
                                <label className="text-xs font-semibold text-slate-700 block">
                                    No. Telepon / WhatsApp
                                </label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                                    placeholder="Contoh: 0812-3456-7890"
                                    className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-700 block">
                                Email Akun
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleFieldChange('email', e.target.value)}
                                placeholder="username@smkn1.sch.id"
                                className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                            />
                        </div>
                    </div>

                    <div className="border border-slate-200 rounded p-3.5 bg-slate-50/50 space-y-2.5">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                                3. Password Akun <span className="text-red-500">*</span>
                            </span>
                            <button
                                type="button"
                                onClick={generateRandomPassword}
                                className="text-[11px] font-semibold text-[#0256D0] hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                            >
                                <span>Buat Password Acak</span>
                            </button>
                        </div>
                        <input
                            type="text"
                            required
                            value={formData.password}
                            onChange={(e) => handleFieldChange('password', e.target.value)}
                            placeholder="Minimal 4 karakter (contoh: rpl2024!)"
                            className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className="h-9 px-4 rounded-md text-xs font-medium cursor-pointer border-slate-300"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !formData.name || !formData.username || !formData.password}
                            className="h-9 px-4 rounded-md bg-[#0256D0] hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                        >
                            <span>{isSubmitting ? 'Menyimpan...' : 'Simpan User Baru'}</span>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
