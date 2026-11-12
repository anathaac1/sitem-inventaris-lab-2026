import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export interface StudentProfileFormData {
    name: string;
    username: string;
    email: string;
    class: string;
    nisn: string;
    phone: string;
}

interface ProfileEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: StudentProfileFormData) => void;
    initialData: StudentProfileFormData;
    isSubmitting?: boolean;
}

export function ProfileEditModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isSubmitting = false
}: ProfileEditModalProps) {
    const [formData, setFormData] = useState<StudentProfileFormData>(initialData);

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
                        <User className="w-4 h-4 text-[#0256D0]" />
                        <span>Edit Profil Siswa</span>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Nama Lengkap
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Contoh: Ahmad Rizky Pratama"
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400"
                            />
                        </div>
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
                                placeholder="siswa1"
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Kelas
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.class}
                                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                placeholder="XII RPL A"
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Email Siswa
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="siswa1@smkn1.sch.id"
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                NISN
                            </label>
                            <input
                                type="text"
                                value={formData.nisn}
                                onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                                placeholder="0067829101"
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Nomor Telepon / WA
                            </label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="0812-9876-1101"
                                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-slate-900 placeholder:text-slate-400"
                            />
                        </div>
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
