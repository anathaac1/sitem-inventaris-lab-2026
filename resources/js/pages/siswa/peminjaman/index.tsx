/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/peminjaman/
 * Fungsi  : Kumpulan komponen antarmuka yang mengelola transaksi peminjaman alat oleh siswa.
 * File    : index.tsx
 * Fungsi  : Halaman utama log peminjaman siswa. Memungkinkan siswa memantau daftar alat yang sedang dipinjam,
 *           melihat batas waktu pengembalian, melakukan aksi pengembalian barang langsung ke server via POST,
 *           serta memeriksa arsip riwayat pengembalian masa lalu.
 * ============================================================================
 */

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
    initialActiveLoans?: LoanItem[];                          // Daftar peminjaman aktif dari controller
    initialLoanHistory?: LoanItem[];                          // Daftar riwayat pengembalian dari controller
}

export default function Peminjaman({ initialActiveLoans = [], initialLoanHistory = [] }: PeminjamanProps) {
    // State tab yang sedang aktif dipilih ('aktif' atau 'riwayat')
    const [activeTab, setActiveTab] = useState<'aktif' | 'riwayat'>('aktif');
    const activeLoans = initialActiveLoans;
    const loanHistory = initialLoanHistory;

    // Menangani aksi klik tombol "Kembalikan" untuk mengembalikan alat ke lab
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
            {/* Metadata judul halaman browser */}
            <Head title="Peminjaman Saya - Sistem Inventory Lab RPL" />

            <div className="space-y-4">
                {/* 1. Tab Navigasi Peminjaman Aktif & Riwayat */}
                <PeminjamanTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    activeCount={activeLoans.length}
                    historyCount={loanHistory.length}
                />

                {/* 2. Daftar Konten Berdasarkan Tab yang Dipilih */}
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
