import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { School, BookOpen, Edit3, Mail, Phone, Hash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProfileStudentCard } from './profile-student-card';
import { ProfilePasswordModal } from './profile-password-modal';
import { ProfileEditModal, type StudentProfileFormData } from './profile-edit-modal';
import { USER_PROFILE } from '@/data/inventory-data';
import { toast } from 'sonner';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    session?: any;
    user?: any;
    onLogout?: () => void;
}

export function ProfileModal({ isOpen, onClose, session, user }: ProfileModalProps) {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

    const studentName = user?.name || session?.name || USER_PROFILE.name;
    const studentClass = user?.class || session?.class || USER_PROFILE.class;
    const studentUsername = user?.username || session?.username || (user?.email ? user.email.split('@')[0] : 'siswa1');
    const studentEmail = user?.email || session?.email || `${studentUsername}@smkn1.sch.id`;
    const studentNisn = user?.nisn || session?.nisn || '0067829101';
    const studentPhone = user?.phone || session?.phone || '0812-9876-1101';

    const handleEditProfileSubmit = (formData: StudentProfileFormData) => {
        setIsSubmittingEdit(true);
        router.post('/profile', {
            _method: 'PUT',
            name: formData.name,
            username: formData.username,
            email: formData.email,
            class: formData.class,
            nisn: formData.nisn,
            phone: formData.phone,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Profil siswa berhasil diperbarui di database!');
                setEditModalOpen(false);
                setIsSubmittingEdit(false);
            },
            onError: (errors) => {
                setIsSubmittingEdit(false);
                toast.error(Object.values(errors)[0] as string || 'Gagal memperbarui profil.');
            }
        });
    };

    const handleChangePassword = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Konfirmasi kata sandi baru tidak cocok!');
            return;
        }

        if (newPassword.length < 4) {
            toast.error('Kata sandi minimal harus 4 karakter!');
            return;
        }

        router.post('/profile/password', {
            old_password: oldPassword,
            new_password: newPassword,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Kata sandi siswa berhasil diperbarui!');
                setPasswordModalOpen(false);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] as string || 'Gagal memperbarui kata sandi.');
            }
        });
    };

    const avatarInitials = studentName
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <DialogContent showCloseButton={false} className="max-w-lg w-full rounded-2xl bg-white p-5 sm:p-6 border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="pb-3 border-b border-slate-100">
                        <DialogTitle className="text-base font-bold text-slate-900 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span>Profil Siswa</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditModalOpen(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-xs transition-colors cursor-pointer"
                            >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit Profil</span>
                            </button>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 pt-3">
                        <ProfileStudentCard
                            studentName={studentName}
                            studentClass={studentClass}
                            studentUsername={studentUsername}
                            avatarInitials={avatarInitials}
                        />

                        <div className="bg-slate-50/80 rounded p-4 border border-slate-200/80 space-y-3">
                            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                Informasi Akademik & Akun
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="flex items-center gap-2.5 text-slate-600">
                                    <School className="w-4 h-4 text-blue-600 shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-medium">Sekolah</p>
                                        <p className="font-semibold text-slate-800">SMKN 1 Kota Bekasi</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 text-slate-600">
                                    <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-medium">Program Keahlian</p>
                                        <p className="font-semibold text-slate-800">Rekayasa Perangkat Lunak</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 text-slate-600">
                                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-medium">Email</p>
                                        <p className="font-semibold text-slate-800 truncate max-w-[160px]">{studentEmail}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 text-slate-600">
                                    <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-medium">Nomor Telepon</p>
                                        <p className="font-semibold text-slate-800">{studentPhone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 text-slate-600 sm:col-span-2">
                                    <Hash className="w-4 h-4 text-blue-600 shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-medium">NISN</p>
                                        <p className="font-semibold text-slate-800">{studentNisn}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <ProfileEditModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSubmit={handleEditProfileSubmit}
                isSubmitting={isSubmittingEdit}
                initialData={{
                    name: studentName,
                    username: studentUsername,
                    email: studentEmail,
                    class: studentClass,
                    nisn: studentNisn,
                    phone: studentPhone,
                }}
            />

            <ProfilePasswordModal
                isOpen={passwordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
                onSubmit={handleChangePassword}
                oldPassword={oldPassword}
                onOldPasswordChange={setOldPassword}
                newPassword={newPassword}
                onNewPasswordChange={setNewPassword}
                confirmPassword={confirmPassword}
                onConfirmPasswordChange={setConfirmPassword}
            />
        </>
    );
}
