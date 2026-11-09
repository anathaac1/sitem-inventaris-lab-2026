/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/siswa/
 * Fungsi  : Kumpulan komponen antarmuka manajemen akun pengguna lab (Siswa & Administrator) untuk Administrator.
 * File    : index.tsx
 * Fungsi  : Halaman utama kelola pengguna dan kredensial. Menyediakan filter nama/username/peran/kelas/NISN,
 *           pembuatan akun pengguna baru, fitur reset/buat kata sandi acak, serta paginasi daftar akun.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/admin-layout';
import {
    type UserAccount
} from '@/data/auth-store';
import { toast } from 'sonner';
import { AdminPagination } from '@/components/inventory/admin-pagination';
import { SiswaFilterBar, type SiswaFilterValues } from './siswa-filter-bar';
import { SiswaTable } from './siswa-table';
import { SiswaResetPasswordModal } from './siswa-reset-password-modal';
import { SiswaCreateModal, type NewUserFormData } from './siswa-create-modal';

interface AdminSiswaProps {
    initialStudents?: UserAccount[];                           // Daftar akun pengguna dari controller
}

// Nilai bawaan untuk formulir filter akun pengguna
const DEFAULT_SISWA_FILTERS: SiswaFilterValues = {
    name: '',
    username: '',
    role: 'all',
    studentClass: 'all',
    nisn: ''
};

export default function AdminSiswa({ initialStudents = [] }: AdminSiswaProps) {
    // State lokal daftar akun pengguna
    const [accounts, setAccounts] = useState<UserAccount[]>(initialStudents);

    useEffect(() => {
        if (initialStudents) {
            setAccounts(initialStudents);
        }
    }, [initialStudents]);

    // State filter input dan filter yang diterapkan
    const [filterForm, setFilterForm] = useState<SiswaFilterValues>(DEFAULT_SISWA_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState<SiswaFilterValues>(DEFAULT_SISWA_FILTERS);

    // State untuk melihat/sembunyikan password teks biasa per username
    const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});

    // State paginasi tabel pengguna
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // State modal tambah akun pengguna baru
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isCreatingUser, setIsCreatingUser] = useState(false);

    // State modal reset kata sandi pengguna
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<UserAccount | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Memfilter data akun berdasarkan peran, kelas, nama, username, dan NISN
    const filteredAccounts = accounts.filter((acc) => {
        const matchesRole =
            appliedFilters.role === 'all' || acc.role === appliedFilters.role;

        const matchesClass =
            appliedFilters.studentClass === 'all' ||
            acc.class.trim().toLowerCase() === appliedFilters.studentClass.trim().toLowerCase();

        const nameQuery = appliedFilters.name.toLowerCase().trim();
        const matchesName = !nameQuery || acc.name.toLowerCase().includes(nameQuery);

        const usernameQuery = appliedFilters.username.toLowerCase().trim();
        const matchesUsername = !usernameQuery || acc.username.toLowerCase().includes(usernameQuery);

        const nisnQuery = appliedFilters.nisn.toLowerCase().trim();
        const matchesNisn = !nisnQuery || (acc.nisn && acc.nisn.toLowerCase().includes(nisnQuery));

        return matchesRole && matchesClass && matchesName && matchesUsername && matchesNisn;
    });

    // Menerapkan parameter filter pencarian
    const handleApplyFilter = () => {
        setAppliedFilters({ ...filterForm });
        setCurrentPage(1);
    };

    // Mengosongkan filter kembali ke bawaan
    const handleResetFilter = () => {
        setFilterForm(DEFAULT_SISWA_FILTERS);
        setAppliedFilters(DEFAULT_SISWA_FILTERS);
        setCurrentPage(1);
    };

    // Kalkulasi data halaman aktif
    const totalPages = Math.max(1, Math.ceil(filteredAccounts.length / itemsPerPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedAccounts = filteredAccounts.slice(
        (safeCurrentPage - 1) * itemsPerPage,
        safeCurrentPage * itemsPerPage
    );

    // Beralih visibilitas password (lihat / sembunyikan)
    const togglePasswordReveal = (username: string) => {
        setRevealedPasswords((prev) => ({
            ...prev,
            [username]: !prev[username]
        }));
    };

    // Membuka modal reset password untuk siswa yang dipilih
    const openResetModal = (student: UserAccount) => {
        setSelectedStudent(student);
        setNewPassword('');
        setIsResetModalOpen(true);
    };

    // Membuat kata sandi acak dengan pola rpl[4-digit]!
    const generateRandomPassword = () => {
        const rand = Math.floor(1000 + Math.random() * 9000);
        setNewPassword(`rpl${rand}!`);
    };

    // Menangani aksi simpan perubahan kata sandi baru ke database server via Inertia POST
    const handleSaveNewPassword = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!selectedStudent) return;

        if (newPassword.trim().length < 4) {
            toast.error('Password minimal 4 karakter.');
            return;
        }

        setIsSubmitting(true);

        setAccounts((prev) =>
            prev.map((acc) =>
                acc.username.toLowerCase() === selectedStudent.username.toLowerCase()
                    ? { ...acc, password: newPassword.trim() }
                    : acc
            )
        );

        router.post('/admin/siswa/reset-password', {
            username: selectedStudent.username,
            new_password: newPassword.trim(),
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    `Password baru untuk ${selectedStudent.name} (${selectedStudent.username}) berhasil diperbarui: "${newPassword}"`,
                    { duration: 6000 }
                );
                setIsResetModalOpen(false);
                setNewPassword('');
                setIsSubmitting(false);
            },
            onError: (errors) => {
                setIsSubmitting(false);
                toast.error(Object.values(errors)[0] as string || 'Gagal memperbarui password.');
            }
        });
    };

    // Menangani pembuatan akun pengguna baru ke endpoint backend via Inertia POST
    const handleCreateUser = (formData: NewUserFormData) => {
        setIsCreatingUser(true);

        router.post('/admin/siswa', {
            name: formData.name,
            username: formData.username,
            role: formData.role,
            class: formData.class,
            email: formData.email,
            password: formData.password,
            nisn: formData.nisn || null,
            phone: formData.phone || null,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Akun ${formData.name} berhasil dibuat!`);
                setIsCreateModalOpen(false);
                setIsCreatingUser(false);
                setCurrentPage(1);
            },
            onError: (errors) => {
                setIsCreatingUser(false);
                toast.error(Object.values(errors)[0] as string || 'Gagal membuat akun.');
            }
        });
    };

    // Menyalin data teks ke papan klip komputer pengguna
    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.info(`${label} disalin ke clipboard!`);
    };

    return (
        <AdminLayout
            currentTab="siswa"
            title="Akun & Password"
        >
            {/* Metadata judul halaman browser */}
            <Head title="Admin CMS - Manajemen Akun & Password" />

            <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
                    {/* 1. Bar Filter Pencarian dan Tombol Buat User Baru */}
                    <SiswaFilterBar
                        filters={filterForm}
                        onFilterChange={setFilterForm}
                        onApply={handleApplyFilter}
                        onReset={handleResetFilter}
                        totalAccounts={accounts.length}
                        onOpenCreateModal={() => setIsCreateModalOpen(true)}
                    />

                    {/* 2. Tabel Daftar Akun Pengguna & Tindakan Reset Password */}
                    <SiswaTable
                        students={paginatedAccounts}
                        revealedPasswords={revealedPasswords}
                        onTogglePasswordReveal={togglePasswordReveal}
                        onCopy={copyToClipboard}
                        onOpenResetModal={openResetModal}
                    />

                    {/* 3. Kontrol Paginasi Navigasi Data */}
                    <AdminPagination
                        currentPage={safeCurrentPage}
                        totalPages={totalPages}
                        totalItems={filteredAccounts.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={setItemsPerPage}
                        itemsPerPageOptions={[10, 20, 50, 100]}
                        itemLabel="akun pengguna"
                    />
                </div>
            </div>

            {/* Modal Pembuatan Akun Baru (Siswa / Administrator) */}
            <SiswaCreateModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateUser}
                isSubmitting={isCreatingUser}
            />

            {/* Modal Reset / Penggantian Kata Sandi Akun Siswa */}
            <SiswaResetPasswordModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                student={selectedStudent}
                newPassword={newPassword}
                onNewPasswordChange={setNewPassword}
                onGenerateRandom={generateRandomPassword}
                onSubmit={handleSaveNewPassword}
                isSubmitting={isSubmitting}
            />
        </AdminLayout>
    );
}
