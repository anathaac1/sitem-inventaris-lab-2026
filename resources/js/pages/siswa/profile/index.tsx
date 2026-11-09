/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/profile/
 * Fungsi  : Kumpulan komponen antarmuka yang mengelola data profil, keamanan akun,
 *           dan preferensi siswa dalam aplikasi inventaris lab.
 * File    : index.tsx
 * Fungsi  : Halaman utama profil siswa. Menampilkan ringkasan identitas siswa (nama, kelas, username),
 *           tautan navigasi cepat ke fitur lain, aksi ubah profil dan kata sandi, serta tombol logout.
 * ============================================================================
 */

import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { MainLayout } from '@/components/inventory/main-layout';
import { USER_PROFILE } from '@/data/inventory-data';
import { toast } from 'sonner';

import { ProfileHeader } from './profile-header';
import { ProfileStudentCard } from './profile-student-card';
import { ProfileNavLinks } from './profile-nav-links';
import { ProfileSecurityCard } from './profile-security-card';
import { ProfilePasswordModal } from './profile-password-modal';
import { ProfileEditModal, type StudentProfileFormData } from './profile-edit-modal';

interface ProfileProps {
    initialUser?: {
        id: string;
        name: string;
        username: string;
        class?: string;
        email?: string;
        nisn?: string;
        phone?: string;
        role?: string;
    } | null;
}

export default function Profile({ initialUser }: ProfileProps) {
    // State kendali buka-tutup modal edit profil dan ubah kata sandi
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);

    // State field form perubahan kata sandi
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State status loading saat submit formulir edit profil
    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

    // Fallback data profil siswa jika properti initialUser belum terisi
    const studentName = initialUser?.name || USER_PROFILE.name;
    const studentClass = initialUser?.class || USER_PROFILE.class;
    const studentUsername = initialUser?.username || 'siswa1';
    const studentEmail = initialUser?.email || `${studentUsername}@smkn1.sch.id`;
    const studentNisn = initialUser?.nisn || '0067829101';
    const studentPhone = initialUser?.phone || '0812-9876-1101';

    // Menangani pengiriman data pembaruan profil siswa ke backend (Inertia PUT request)
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

    // Menangani validasi dan pengiriman formulir perubahan kata sandi akun siswa
    const handleChangePassword = (e: React.SyntheticEvent) => {
        e.preventDefault();

        // Validasi kesesuaian konfirmasi password
        if (newPassword !== confirmPassword) {
            toast.error('Konfirmasi kata sandi baru tidak cocok!');
            return;
        }

        // Validasi panjang minimal karakter password baru
        if (newPassword.length < 4) {
            toast.error('Kata sandi minimal harus 4 karakter!');
            return;
        }

        // Kirim permintaan ubah password ke endpoint backend
        router.post('/profile/password', {
            old_password: oldPassword,
            new_password: newPassword,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Kata sandi berhasil diperbarui!');
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

    // Menangani proses keluar sistem (logout) sesi akun siswa
    const handleLogout = () => {
        router.post('/logout', {}, {
            onFinish: () => {
                toast.info('Sesi Anda telah berakhir.');
                router.visit('/login');
            }
        });
    };

    // Membuat inisial 2 huruf kapital untuk foto/avatar profil siswa
    const avatarInitials = studentName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <MainLayout currentTab="profile">
            {/* Metadata judul tab peramban */}
            <Head title="Profil Siswa - Sistem Inventory Lab RPL" />

            <div className="max-w-xl mx-auto space-y-4">
                {/* 1. Header Halaman Profil */}
                <ProfileHeader onOpenEditModal={() => setEditModalOpen(true)} />

                {/* 2. Kartu Identitas Siswa (Banner Biru) */}
                <ProfileStudentCard
                    studentName={studentName}
                    studentClass={studentClass}
                    studentUsername={studentUsername}
                    avatarInitials={avatarInitials}
                />

                {/* 3. Tautan Navigasi Cepat (Peminjaman, Beranda, Katalog Alat) */}
                <ProfileNavLinks />

                {/* 4. Kartu Keamanan Akun (Tombol Edit Profil, Ubah Password, Logout) */}
                <ProfileSecurityCard
                    onOpenEditModal={() => setEditModalOpen(true)}
                    onOpenPasswordModal={() => setPasswordModalOpen(true)}
                    onLogout={handleLogout}
                />
            </div>

            {/* Modal Formulir Edit Profil Siswa */}
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

            {/* Modal Formulir Ubah Kata Sandi Akun Siswa */}
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
        </MainLayout>
    );
}
