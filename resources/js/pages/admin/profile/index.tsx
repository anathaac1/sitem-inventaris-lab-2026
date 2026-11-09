/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/profile/
 * Fungsi  : Kumpulan komponen antarmuka manajemen profil akun Administrator laboratorium.
 * File    : index.tsx
 * Fungsi  : Halaman utama profil administrator. Menampilkan data identitas admin (nama, username,
 *           jabatan, NIP), pintasan ubah data diri, ganti kata sandi, serta keluar sistem (logout).
 * ============================================================================
 */

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
        name: string;                                          // Nama lengkap penanggung jawab lab
        username: string;                                      // Username autentikasi akun
        role: string;                                          // Peran akun dalam sistem (admin)
        email?: string;                                        // Alamat surel resmi
        class?: string;                                        // Jabatan atau unit kerja
        phone?: string;                                        // Nomor kontak atau WhatsApp
    } | null;
}

export default function AdminProfile({ initialAdmin }: AdminProfileProps) {
    // State kendali modal ubah profil dan modal ubah kata sandi
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);

    // State penampung masukan kata sandi
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Status pemuatan saat pengiriman data profil
    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

    // Data administrator dengan nilai fallback bawaan
    const adminName = initialAdmin?.name || 'Bambang Haryanto, S.T.';
    const adminUsername = initialAdmin?.username || 'admin';
    const adminEmail = initialAdmin?.email || 'admin@smkn1.sch.id';
    const adminClass = initialAdmin?.class || 'Kepala Lab RPL SMKN 1';
    const adminPhone = initialAdmin?.phone || '0811-2233-4455';

    // Menangani pembaruan identitas profil admin via Inertia PUT request
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

    // Menangani penggantian kata sandi admin dengan validasi kecocokan dan panjang karakter
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

    // Menangani proses keluar dari sesi aplikasi admin
    const handleLogout = () => {
        router.post('/logout', {}, {
            onFinish: () => {
                toast.info('Sesi administrator telah berakhir.');
                router.visit('/login');
            }
        });
    };

    // Ekstraksi 2 huruf inisial dari nama administrator untuk avatar
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
            {/* Metadata Judul Halaman Browser */}
            <Head title="Profil Administrator - Sistem Inventory Lab RPL" />

            <div className="max-w-4xl mx-auto space-y-4 pt-1 pb-8">
                {/* 1. Header Halaman dengan Tombol Kembali dan Tombol Edit Profil */}
                <ProfileHeader onOpenEditModal={() => setEditModalOpen(true)} />

                {/* 2. Banner Kartu Profil Gradien dengan Inisial dan Identitas Singkat */}
                <ProfileBanner
                    adminName={adminName}
                    adminUsername={adminUsername}
                    adminInitials={adminInitials}
                />

                {/* 3. Kartu Detail Informasi Penugasan dan Institusi */}
                <ProfileInfoCard adminUsername={adminUsername} />

                {/* 4. Kartu Pilihan Aksi Cepat (Edit Data, Ganti Sandi, Logout) */}
                <ProfileActionCard
                    onOpenEditModal={() => setEditModalOpen(true)}
                    onOpenPasswordModal={() => setPasswordModalOpen(true)}
                    onLogout={handleLogout}
                />
            </div>

            {/* Dialog Modal Ubah Informasi Profil Admin */}
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

            {/* Dialog Modal Penggantian Kata Sandi Akun */}
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
