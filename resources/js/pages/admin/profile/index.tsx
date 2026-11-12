import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/admin-layout';
import { toast } from 'sonner';
import { ProfileHeader } from './profile-header';
import { ProfileBanner } from './profile-banner';
import { ProfileInfoCard } from './profile-info-card';
import { ProfileActionCard } from './profile-action-card';
import { ProfilePasswordModal } from './profile-password-modal';
import { AdminProfileEditModal, type AdminProfileFormData } from './admin-profile-edit-modal';

interface AdminProfileProps {
    initialAdmin?: {
        id?: string;
        name: string;
        username: string;
        role: string;
        email?: string;
        class?: string;
        phone?: string;
    } | null;
}

export default function AdminProfile({ initialAdmin }: AdminProfileProps) {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

    const adminName = initialAdmin?.name || 'Bambang Haryanto, S.T.';
    const adminUsername = initialAdmin?.username || 'admin';
    const adminEmail = initialAdmin?.email || 'admin@smkn1.sch.id';
    const adminClass = initialAdmin?.class || 'Kepala Lab RPL SMKN 1';
    const adminPhone = initialAdmin?.phone || '0811-2233-4455';

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

    const handleLogout = () => {
        router.post('/logout', {}, {
            onFinish: () => {
                toast.info('Sesi administrator telah berakhir.');
                router.visit('/login');
            }
        });
    };

    const adminInitials = adminName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <AdminLayout
            currentTab="profile"
            title="Profil Administrator"
        >
            <Head title="Profil Administrator - Sistem Inventory Lab RPL" />

            <div className="max-w-4xl mx-auto space-y-4 pt-1 pb-8">
                <ProfileHeader onOpenEditModal={() => setEditModalOpen(true)} />

                <ProfileBanner
                    adminName={adminName}
                    adminUsername={adminUsername}
                    adminInitials={adminInitials}
                />

                <ProfileInfoCard adminUsername={adminUsername} />

                <ProfileActionCard
                    onOpenEditModal={() => setEditModalOpen(true)}
                    onOpenPasswordModal={() => setPasswordModalOpen(true)}
                    onLogout={handleLogout}
                />
            </div>

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
        </AdminLayout>
    );
}
