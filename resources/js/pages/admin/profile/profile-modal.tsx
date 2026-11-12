import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Edit3 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProfileBanner } from './profile-banner';
import { ProfileInfoCard } from './profile-info-card';
import { ProfilePasswordModal } from './profile-password-modal';
import { AdminProfileEditModal, type AdminProfileFormData } from './admin-profile-edit-modal';
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

    const adminName = user?.name || session?.name || 'Bambang Haryanto, S.T.';
    const adminUsername = user?.username || session?.username || 'admin';
    const adminEmail = user?.email || session?.email || 'admin@smkn1.sch.id';
    const adminClass = user?.class || session?.class || 'Kepala Lab RPL SMKN 1';
    const adminPhone = user?.phone || session?.phone || '0811-2233-4455';

    const handleEditProfileSubmit = (formData: AdminProfileFormData) => {
        setIsSubmittingEdit(true);
        router.post('/admin/profile', {
            _method: 'PUT',
            name: formData.name,
            username: formData.username,
            email: formData.email,
            class: formData.class,
            phone: formData.phone,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Profil administrator berhasil diperbarui di database!');
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

        router.post('/admin/profile/password', {
            old_password: oldPassword,
            new_password: newPassword,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Kata sandi administrator berhasil diperbarui!');
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

    const adminInitials = adminName
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <DialogContent showCloseButton={false} className="max-w-lg w-full rounded-2xl bg-white p-5 sm:p-6 border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
                        <DialogTitle className="text-base font-bold text-slate-900 flex items-center justify-between w-full">
                            <span>Profil Administrator</span>
                            <button
                                type="button"
                                onClick={() => setEditModalOpen(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-xs transition-colors cursor-pointer border border-blue-200/60"
                            >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit Profil</span>
                            </button>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 pt-3">
                        <ProfileBanner
                            adminName={adminName}
                            adminUsername={adminUsername}
                            adminInitials={adminInitials}
                        />

                        <ProfileInfoCard adminUsername={adminUsername} />
                    </div>
                </DialogContent>
            </Dialog>

            <AdminProfileEditModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSubmit={handleEditProfileSubmit}
                isSubmitting={isSubmittingEdit}
                initialData={{
                    name: adminName,
                    username: adminUsername,
                    email: adminEmail,
                    class: adminClass,
                    phone: adminPhone,
                }}
            />

            <ProfilePasswordModal
                isOpen={passwordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
                oldPassword={oldPassword}
                onOldPasswordChange={setOldPassword}
                newPassword={newPassword}
                onNewPasswordChange={setNewPassword}
                confirmPassword={confirmPassword}
                onConfirmPasswordChange={setConfirmPassword}
                onSubmit={handleChangePassword}
            />
        </>
    );
}
