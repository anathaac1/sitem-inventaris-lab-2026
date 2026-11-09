/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/alat/
 * Fungsi  : Kumpulan komponen antarmuka yang menyusun halaman katalog peralatan lab versi siswa.
 * File    : index.tsx
 * Fungsi  : Halaman utama katalog alat untuk siswa. Menyediakan pencarian barang lengkap,
 *           filter kategori chips horizontal, modal filter ketersediaan, tampilan kisi kartu barang,
 *           serta formulir pengajuan pinjaman barang langsung ke server.
 * ============================================================================
 */

import { useState, useMemo } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { MainLayout } from '@/components/inventory/main-layout';
import { ItemDetailModal } from '@/components/inventory/item-detail-modal';
import { FilterSheet } from '@/components/inventory/filter-sheet';
import {
    CATEGORIES,
    type InventoryItem
} from '@/data/inventory-data';
import { toast } from 'sonner';

import { AlatSearchBar } from './alat-search-bar';
import { AlatCategoryChips } from './alat-category-chips';
import { AlatGrid } from './alat-grid';

interface AlatProps {
    initialItems?: InventoryItem[];                           // Data awal seluruh peralatan dari backend
    filters?: {
        search?: string;                                      // Filter pencarian awal (opsional)
        category?: string;                                    // Kategori awal (opsional)
    };
}

export default function Alat({ initialItems = [], filters }: AlatProps) {
    const { auth } = usePage().props as any;
    const items = initialItems;

    // State pengelolaan pencarian teks dan filter aktif
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [selectedCategory, setSelectedCategory] = useState<string>(filters?.category || 'Semua');
    const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
    const [filterSheetOpen, setFilterSheetOpen] = useState(false);

    // State detail barang yang sedang dibuka
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    // Filter daftar barang secara komputasi berdasarkan input siswa
    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            // Sembunyikan jika admin mengatur alat ini tidak boleh dilihat siswa
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

    // Membuka modal rincian spesifikasi barang
    const handleOpenDetail = (item: InventoryItem) => {
        setSelectedItem(item);
        setDetailModalOpen(true);
    };

    // Mengirim permintaan peminjaman ke endpoint POST /peminjaman
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

    return (
        <MainLayout currentTab="alat">
            <Head title="Semua Alat - Sistem Inventory Lab RPL" />

            <div className="space-y-4">
                {/* 1. Baris Input Pencarian & Tombol Filter Dialog */}
                <AlatSearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    isFiltered={selectedCategory !== 'Semua' || selectedStatus !== 'Semua'}
                    onOpenFilter={() => setFilterSheetOpen(true)}
                />

                {/* 2. Chip Pilihan Kategori Cepat (Horizontal Scroll) */}
                <AlatCategoryChips
                    categories={CATEGORIES}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                {/* 3. Grid Kartu Daftar Alat */}
                <AlatGrid
                    items={filteredItems}
                    onOpenDetail={handleOpenDetail}
                />
            </div>

            {/* Modal Filter Kategori & Ketersediaan */}
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

            {/* Modal Detail Alat & Formulir Pengajuan Pinjam */}
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
