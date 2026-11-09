/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/dashboard/
 * Fungsi  : Kumpulan komponen antarmuka yang menyusun halaman beranda (dashboard) siswa.
 * File    : index.tsx
 * Fungsi  : Halaman utama beranda siswa. Menyatukan sapaan user, bilah pencarian, banner informasi bergerak,
 *           kategori alat cepat, daftar barang tersedia, cuplikan peminjaman aktif, serta alur pengajuan peminjaman barang.
 * ============================================================================
 */

import { useState, useMemo } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Laptop, Mouse, Wrench, Zap } from 'lucide-react';
import { MainLayout } from '@/components/inventory/main-layout';
import { ItemDetailModal } from '@/components/inventory/item-detail-modal';
import { FilterSheet } from '@/components/inventory/filter-sheet';
import { DashboardBannerCarousel } from '@/components/inventory/dashboard-banner-carousel';
import {
    type InventoryItem,
    type LoanItem
} from '@/data/inventory-data';
import { toast } from 'sonner';

import { DashboardGreeting } from './dashboard-greeting';
import { DashboardSearchBar } from './dashboard-search-bar';
import { DashboardCategoryGrid, type CategoryOption } from './dashboard-category-grid';
import { DashboardAvailableTools } from './dashboard-available-tools';
import { DashboardActiveLoans } from './dashboard-active-loans';

interface DashboardProps {
    initialItems?: InventoryItem[];                           // Data awal alat lab dari server Laravel
    initialActiveLoans?: LoanItem[];                          // Data peminjaman aktif siswa
}

export default function Dashboard({ initialItems = [], initialActiveLoans = [] }: DashboardProps) {
    const { auth } = usePage().props as any;
    const items = initialItems;

    // State pencarian dan filter kategori / status
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [selectedStatus, setSelectedStatus] = useState('Semua');
    const [filterSheetOpen, setFilterSheetOpen] = useState(false);

    // State pengelolaan modal detail dan peminjaman alat
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const activeLoans = initialActiveLoans;

    // Daftar opsi kategori dengan ikon pendukung
    const categories: CategoryOption[] = [
        { name: 'Laptop', icon: Laptop },
        { name: 'Peripheral', icon: Mouse },
        { name: 'Tools', icon: Wrench },
        { name: 'Elektrikal', icon: Zap }
    ];

    // Filter daftar barang secara komputasi (pencarian kata kunci, kategori, dan visibilitas siswa)
    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            // Sembunyikan barang jika diatur tidak terlihat oleh siswa oleh admin
            if (item.isVisibleToStudents === false) return false;

            const matchSearch =
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.code.toLowerCase().includes(searchQuery.toLowerCase());
            const matchCategory =
                selectedCategory === 'Semua' || item.category === selectedCategory;
            const matchStatus =
                selectedStatus === 'Semua' || item.status === selectedStatus;

            return matchSearch && matchCategory && matchStatus;
        });
    }, [items, searchQuery, selectedCategory, selectedStatus]);

    // Membuka modal detail barang saat item diklik
    const handleOpenDetail = (item: InventoryItem) => {
        setSelectedItem(item);
        setDetailModalOpen(true);
    };

    // Mengirim formulir peminjaman ke server Laravel via POST /peminjaman
    const handleLoanSuccess = (
        item: InventoryItem,
        borrowDate: string,
        returnEstimate: string,
        notes: string
    ) => {
        const borrowerName = auth?.user?.name || 'Ahmad Rizky Pratama';
        const borrowerClass = auth?.user?.class || 'XII RPL A';

        router.post('/peminjaman', {
            alat_id: item.id,
            borrower_name: borrowerName,
            borrower_class: borrowerClass,
            borrow_date: borrowDate,
            return_estimate: returnEstimate,
            notes: notes || null
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Berhasil mengajukan peminjaman ${item.name}!`);
            },
            onError: (errors) => {
                const firstErr = Object.values(errors)[0] as string;
                toast.error(firstErr || 'Gagal mengajukan peminjaman.');
            }
        });
    };

    // Format tanggal dan jam login siswa
    const studentName = auth?.user?.name || 'Ahmad Rizky Pratama';
    const loginDate = new Date();

    const loginDateStr = loginDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const loginTimeStr =
        loginDate.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        }) + ' WIB';

    return (
        <MainLayout currentTab="home">
            <Head title="Beranda - Sistem Inventory Lab RPL" />

            <div className="space-y-5">
                {/* 1. Baris Sapaan Siswa */}
                <DashboardGreeting
                    studentName={studentName}
                    loginDateStr={loginDateStr}
                    loginTimeStr={loginTimeStr}
                />

                {/* 2. Bilah Pencarian & Tombol Filter */}
                <DashboardSearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    isFiltered={selectedCategory !== 'Semua' || selectedStatus !== 'Semua'}
                    onOpenFilter={() => setFilterSheetOpen(true)}
                />

                {/* 3. Banner Carousel Informasi */}
                <DashboardBannerCarousel />

                {/* 4. Grid Pilihan Cepat Kategori */}
                <DashboardCategoryGrid
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                {/* 5. Daftar Kartu Barang yang Tersedia */}
                <DashboardAvailableTools
                    items={filteredItems}
                    onOpenDetail={handleOpenDetail}
                />

                {/* 6. Daftar Transaksi Peminjaman Siswa yang Sedang Berjalan */}
                <DashboardActiveLoans loans={activeLoans} />
            </div>

            {/* Modal Filter Geser Samping */}
            <FilterSheet
                isOpen={filterSheetOpen}
                onClose={() => setFilterSheetOpen(false)}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedStatus={selectedStatus}
                onSelectStatus={setSelectedStatus}
                onReset={() => {
                    setSelectedCategory('Semua');
                    setSelectedStatus('Semua');
                    setFilterSheetOpen(false);
                }}
            />

            {/* Modal Detail Barang & Formulir Pengajuan Pinjam */}
            {selectedItem && (
                <ItemDetailModal
                    item={selectedItem}
                    isOpen={detailModalOpen}
                    onClose={() => setDetailModalOpen(false)}
                    onLoanSuccess={handleLoanSuccess}
                />
            )}
        </MainLayout>
    );
}
