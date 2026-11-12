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

const DEFAULT_LOAN_FILTERS: PeminjamanFilterValues = {
    borrowerName: '',
    borrowerClass: 'all',
    itemName: '',
    code: '',
    status: 'all'
};

interface AdminPeminjamanProps {
    initialLoans?: LoanItem[];
}

export default function AdminPeminjaman({ initialLoans = [] }: AdminPeminjamanProps) {
    const loans = initialLoans;

    const [filterForm, setFilterForm] = useState<PeminjamanFilterValues>(DEFAULT_LOAN_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState<PeminjamanFilterValues>(DEFAULT_LOAN_FILTERS);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

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

    const handleApplyFilter = () => {
        setAppliedFilters({ ...filterForm });
        setCurrentPage(1);
    };

    const handleResetFilter = () => {
        setFilterForm(DEFAULT_LOAN_FILTERS);
        setAppliedFilters(DEFAULT_LOAN_FILTERS);
        setCurrentPage(1);
    };

    const totalPages = Math.max(1, Math.ceil(filteredLoans.length / itemsPerPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedLoans = filteredLoans.slice(
        (safeCurrentPage - 1) * itemsPerPage,
        safeCurrentPage * itemsPerPage
    );

    const activeCount = loans.filter((l) => l.status === 'Sedang Dipinjam').length;
    const returnedCount = loans.filter((l) => l.status === 'Dikembalikan').length;

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
            <Head title="Admin CMS - Log Peminjaman Siswa" />

            <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
                    <PeminjamanFilterBar
                        filters={filterForm}
                        onFilterChange={setFilterForm}
                        onApply={handleApplyFilter}
                        onReset={handleResetFilter}
                        totalCount={loans.length}
                        activeCount={activeCount}
                        returnedCount={returnedCount}
                    />

                    <PeminjamanTable
                        loans={paginatedLoans}
                        onReturnItem={handleReturnItem}
                    />

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
