/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/peminjaman/
 * Fungsi  : Kumpulan komponen antarmuka manajemen sirkulasi dan log transaksi peminjaman alat laboratorium untuk Administrator.
 * File    : index.tsx
 * Fungsi  : Halaman utama log peminjaman siswa. Mengelola filter multi-kriteria (nama siswa, kelas, alat, kode, status),
 *           paginasi transaksi, serta pemrosesan pengembalian alat langsung ke database via endpoint POST.
 * ============================================================================
 */

import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/admin-layout';
import {
    type LoanItem
} from '@/data/inventory-data';
import { toast } from 'sonner';
import { AdminPagination } from '@/components/inventory/admin-pagination';
import { PeminjamanFilterBar, type PeminjamanFilterValues } from './peminjaman-filter-bar';
import { PeminjamanTable } from './peminjaman-table';

// Nilai default untuk formulir penyaringan transaksi peminjaman
const DEFAULT_LOAN_FILTERS: PeminjamanFilterValues = {
    borrowerName: '',
    borrowerClass: 'all',
    itemName: '',
    code: '',
    status: 'all'
};

interface AdminPeminjamanProps {
    initialLoans?: LoanItem[];                                 // Riwayat peminjaman dari controller
}

export default function AdminPeminjaman({ initialLoans = [] }: AdminPeminjamanProps) {
    const loans = initialLoans;

    // State form input filter dan filter yang sedang diterapkan
    const [filterForm, setFilterForm] = useState<PeminjamanFilterValues>(DEFAULT_LOAN_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState<PeminjamanFilterValues>(DEFAULT_LOAN_FILTERS);

    // State kontrol paginasi tabel
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Menyaring daftar peminjaman berdasarkan nama peminjam, kelas, nama alat, kode, dan status transaksi
    const filteredLoans = loans.filter((loan) => {
        const borrowerQuery = appliedFilters.borrowerName.toLowerCase().trim();
        const matchesBorrower = !borrowerQuery || loan.borrowerName.toLowerCase().includes(borrowerQuery);

        const matchesClass =
            appliedFilters.borrowerClass === 'all' ||
            loan.borrowerClass.toLowerCase().trim() === appliedFilters.borrowerClass.toLowerCase().trim();

        const itemQuery = appliedFilters.itemName.toLowerCase().trim();
        const matchesItem = !itemQuery || loan.itemName.toLowerCase().includes(itemQuery);

        const codeQuery = appliedFilters.code.toLowerCase().trim();
        const matchesCode = !codeQuery || loan.code.toLowerCase().includes(codeQuery);

        const matchesStatus =
            appliedFilters.status === 'all' ||
            (appliedFilters.status === 'active' && loan.status === 'Sedang Dipinjam') ||
            (appliedFilters.status === 'returned' && loan.status === 'Dikembalikan');

        return matchesBorrower && matchesClass && matchesItem && matchesCode && matchesStatus;
    });

    // Menerapkan parameter filter dan reset paginasi ke halaman 1
    const handleApplyFilter = () => {
        setAppliedFilters({ ...filterForm });
        setCurrentPage(1);
    };

    // Mengembalikan filter ke kondisi awal
    const handleResetFilter = () => {
        setFilterForm(DEFAULT_LOAN_FILTERS);
        setAppliedFilters(DEFAULT_LOAN_FILTERS);
        setCurrentPage(1);
    };

    // Kalkulasi pemecahan data per halaman
    const totalPages = Math.max(1, Math.ceil(filteredLoans.length / itemsPerPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedLoans = filteredLoans.slice(
        (safeCurrentPage - 1) * itemsPerPage,
        safeCurrentPage * itemsPerPage
    );

    // Penghitungan agregat transaksi aktif vs selesai dikembalikan
    const activeCount = loans.filter((l) => l.status === 'Sedang Dipinjam').length;
    const returnedCount = loans.filter((l) => l.status === 'Dikembalikan').length;

    // Menangani aksi admin menandai pengembalian alat laboratorium (Inertia POST request)
    const handleReturnItem = (loanId: string) => {
        const targetLoan = loans.find((l) => l.id === loanId);
        if (!targetLoan) return;

        router.post(`/admin/peminjaman/${loanId}/kembalikan`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Alat "${targetLoan.itemName}" telah dikonfirmasi kembali.`);
            },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] as string || 'Gagal memproses pengembalian alat.');
            }
        });
    };

    return (
        <AdminLayout
            currentTab="peminjaman"
            title="Log Peminjaman Siswa"
        >
            {/* Metadata judul halaman browser */}
            <Head title="Admin CMS - Log Peminjaman Siswa" />

            <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
                    {/* 1. Bar Filter Pencarian Transaksi */}
                    <PeminjamanFilterBar
                        filters={filterForm}
                        onFilterChange={setFilterForm}
                        onApply={handleApplyFilter}
                        onReset={handleResetFilter}
                        totalCount={loans.length}
                        activeCount={activeCount}
                        returnedCount={returnedCount}
                    />

                    {/* 2. Tabel Log Peminjaman & Tombol Aksi Pengembalian */}
                    <PeminjamanTable
                        loans={paginatedLoans}
                        onReturnItem={handleReturnItem}
                    />

                    {/* 3. Kontrol Navigasi Paginasi Halaman */}
                    <AdminPagination
                        currentPage={safeCurrentPage}
                        totalPages={totalPages}
                        totalItems={filteredLoans.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={setItemsPerPage}
                        itemsPerPageOptions={[10, 20, 50, 100]}
                        itemLabel="riwayat"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
