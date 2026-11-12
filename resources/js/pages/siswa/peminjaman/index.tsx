import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { MainLayout } from '@/components/inventory/main-layout';
import {
    type LoanItem
} from '@/data/inventory-data';
import { toast } from 'sonner';

import { PeminjamanTabs } from './peminjaman-tabs';
import { PeminjamanActiveList } from './peminjaman-active-list';
import { PeminjamanHistoryList } from './peminjaman-history-list';

interface PeminjamanProps {
    initialActiveLoans?: LoanItem[];
    initialLoanHistory?: LoanItem[];
}

export default function Peminjaman({ initialActiveLoans = [], initialLoanHistory = [] }: PeminjamanProps) {
    const [activeTab, setActiveTab] = useState<'aktif' | 'riwayat'>('aktif');
    const activeLoans = initialActiveLoans;
    const loanHistory = initialLoanHistory;

    const handleReturnItem = (loan: LoanItem) => {
        router.post(`/peminjaman/${loan.id}/kembalikan`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Alat ${loan.itemName} (${loan.code}) berhasil dikembalikan!`);
            },
            onError: (errors) => {
                const firstErr = Object.values(errors)[0] as string;
                toast.error(firstErr || 'Gagal memproses pengembalian alat.');
            }
        });
    };

    return (
        <MainLayout currentTab="peminjaman">
            <Head title="Peminjaman Saya - Sistem Inventory Lab RPL" />

            <div className="space-y-4">
                <PeminjamanTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    activeCount={activeLoans.length}
                    historyCount={loanHistory.length}
                />

                {activeTab === 'aktif' ? (
                    <PeminjamanActiveList
                        loans={activeLoans}
                        onReturnItem={handleReturnItem}
                    />
                ) : (
                    <PeminjamanHistoryList loans={loanHistory} />
                )}
            </div>
        </MainLayout>
    );
}
