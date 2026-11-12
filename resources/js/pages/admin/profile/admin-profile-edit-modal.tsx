import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface AdminProfileFormData {
    name: string;
    username: string;
    email: string;
    class: string;
    phone: string;
}

interface AdminProfileEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: AdminProfileFormData) => void;
    initialData: AdminProfileFormData;
    isSubmitting?: boolean;
}

export function AdminProfileEditModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isSubmitting = false
}: AdminProfileEditModalProps) {
    const [formData, setFormData] = useState<AdminProfileFormData>(initialData);

    React.useEffect(() => {
        if (isOpen) {
            setFormData(initialData);
        }
    }, [isOpen, initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md p-6 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
                <DialogHeader className="pb-3 border-b border-slate-100">
                    <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <span>Edit Profil Administrator</span>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Nama Lengkap & Gelar
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Contoh: Bambang Haryanto, S.T."
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                placeholder="admin"
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Jabatan / Posisi
                            </label>
                            <input
                                type="text"
                                value={formData.class}
                                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                placeholder="Kepala Lab RPL SMKN 1"
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Email Administrator
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="admin@smkn1.sch.id"
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Nomor Kontak / WhatsApp
                        </label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="0811-2233-4455"
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={isSubmitting}
                            onClick={onClose}
                            className="text-xs cursor-pointer"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            disabled={isSubmitting}
                            className="text-xs bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                        >
                            {isSubmitting ? 'Menyimpan...' : 'Simpan Profil'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
