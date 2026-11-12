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
    initialItems?: InventoryItem[];
    filters?: {
        search?: string;
        category?: string;
    };
}

export default function Alat({ initialItems = [], filters }: AlatProps) {
    const { auth } = usePage().props as any;
    const items = initialItems;

    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [selectedCategory, setSelectedCategory] = useState<string>(filters?.category || 'Semua');
    const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
    const [filterSheetOpen, setFilterSheetOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
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

    const handleOpenDetail = (item: InventoryItem) => {
        setSelectedItem(item);
        setDetailModalOpen(true);
    };

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
                <AlatSearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    isFiltered={selectedCategory !== 'Semua' || selectedStatus !== 'Semua'}
                    onOpenFilter={() => setFilterSheetOpen(true)}
                />

                <AlatCategoryChips
                    categories={CATEGORIES}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                <AlatGrid
                    items={filteredItems}
                    onOpenDetail={handleOpenDetail}
                />
            </div>

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
