/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/alat/
 * Fungsi  : Kumpulan komponen antarmuka manajemen data barang inventaris laboratorium (CRUD Alat) untuk Administrator.
 * File    : index.tsx
 * Fungsi  : Halaman utama kelola alat. Mengatur pencarian multi-kriteria, filter kategori/stok/status,
 *           paginasi data, aktivasi visibilitas alat, tambah alat baru, edit spesifikasi teknis, serta hapus alat.
 * ============================================================================
 */

import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '@/layouts/admin-layout';
import {
    type InventoryItem
} from '@/data/inventory-data';
import { toast } from 'sonner';
import { AdminPagination } from '@/components/inventory/admin-pagination';
import { AlatFilterBar, type AlatFilterValues } from './alat-filter-bar';
import { AlatTable } from './alat-table';
import { AlatDetailModal } from './alat-detail-modal';
import { AlatFormModal, type AlatFormData, type SpecRow } from './alat-form-modal';
import { AlatDeleteModal } from './alat-delete-modal';

// Nilai default untuk filter pencarian peralatan
const DEFAULT_ALAT_FILTERS: AlatFilterValues = {
    name: '',
    code: '',
    category: 'Semua',
    stockStatus: 'all',
    visibility: 'all'
};

interface AdminAlatProps {
    initialItems?: InventoryItem[];                            // Data inventaris alat dari controller
}

export default function AdminAlat({ initialItems = [] }: AdminAlatProps) {
    const items = initialItems;

    // State pengelolaan filter formulir dan filter yang diterapkan
    const [filterForm, setFilterForm] = useState<AlatFilterValues>(DEFAULT_ALAT_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState<AlatFilterValues>(DEFAULT_ALAT_FILTERS);

    // State paginasi tabel alat
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // State kendali modal (Form Tambah/Edit, Detail Spesifikasi, Konfirmasi Hapus)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
    const [selectedDetailItem, setSelectedDetailItem] = useState<InventoryItem | null>(null);
    const [deleteConfirmItem, setDeleteConfirmItem] = useState<InventoryItem | null>(null);

    // State nilai formulir tambah/edit peralatan
    const [formData, setFormData] = useState<AlatFormData>({
        name: '',
        code: '',
        category: 'Laptop',
        stock: '',
        total: '',
        description: '',
        iconType: 'laptop',
        isVisibleToStudents: true,
        specs: [],
        imageFile: null,
        imagePreview: null,
        imageSizeText: null,
        removeImage: false
    });

    // Melakukan penyaringan data inventaris berdasarkan kriteria nama, kode, kategori, stok, dan visibilitas
    const filteredItems = items.filter((item) => {
        const nameQuery = appliedFilters.name.toLowerCase().trim();
        const matchesName = !nameQuery || item.name.toLowerCase().includes(nameQuery);

        const codeQuery = appliedFilters.code.toLowerCase().trim();
        const matchesCode = !codeQuery || item.code.toLowerCase().includes(codeQuery);

        const matchesCategory =
            appliedFilters.category === 'Semua' || item.category === appliedFilters.category;

        let matchesStock = true;
        if (appliedFilters.stockStatus === 'in_stock') {
            matchesStock = item.stock > 2;
        } else if (appliedFilters.stockStatus === 'low_stock') {
            matchesStock = item.stock > 0 && item.stock <= 2;
        } else if (appliedFilters.stockStatus === 'out_of_stock') {
            matchesStock = item.stock === 0;
        }

        const isVisible = item.isVisibleToStudents !== false;
        const matchesVisibility =
            appliedFilters.visibility === 'all' ||
            (appliedFilters.visibility === 'visible' && isVisible) ||
            (appliedFilters.visibility === 'hidden' && !isVisible);

        return matchesName && matchesCode && matchesCategory && matchesStock && matchesVisibility;
    });

    // Menerapkan nilai filter pencarian dan mengembalikan halaman ke 1
    const handleApplyFilter = () => {
        setAppliedFilters({ ...filterForm });
        setCurrentPage(1);
    };

    // Mengosongkan filter pencarian kembali ke kondisi bawaan
    const handleResetFilter = () => {
        setFilterForm(DEFAULT_ALAT_FILTERS);
        setAppliedFilters(DEFAULT_ALAT_FILTERS);
        setCurrentPage(1);
    };

    // Kalkulasi pembagian halaman paginasi data
    const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedItems = filteredItems.slice(
        (safeCurrentPage - 1) * itemsPerPage,
        safeCurrentPage * itemsPerPage
    );

    // Mengubah status visibilitas barang (Aktif / Tidak Aktif) via HTTP PATCH
    const handleToggleVisibility = (itemId: string) => {
        const item = items.find((i) => i.id === itemId);
        if (!item) return;

        router.patch(`/admin/alat/${itemId}/visibility`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                const newVis = item.isVisibleToStudents === false ? true : false;
                toast.success(
                    newVis
                        ? `"${item.name}" diatur ke status AKTIF.`
                        : `"${item.name}" diatur ke status TIDAK AKTIF.`
                );
            },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] as string || 'Gagal mengubah status visibilitas.');
            }
        });
    };

    // Membuka modal formulir untuk menambahkan alat baru
    const handleOpenAdd = () => {
        setEditingItem(null);
        setFormData({
            name: '',
            code: '',
            category: 'Laptop',
            stock: '',
            total: '',
            description: '',
            iconType: 'laptop',
            isVisibleToStudents: true,
            specs: [],
            imageFile: null,
            imagePreview: null,
            imageSizeText: null,
            removeImage: false
        });
        setIsFormModalOpen(true);
    };

    // Membuka modal formulir untuk mengedit alat yang dipilih (pre-fill data)
    const handleOpenEdit = (item: InventoryItem) => {
        setEditingItem(item);

        const specsList: SpecRow[] = Object.entries(item.specs || {}).map(([key, value]) => ({
            key,
            value: String(value)
        }));

        setFormData({
            name: item.name,
            code: item.code,
            category: item.category,
            stock: Number(item.stock),
            total: Number(item.total),
            description: item.description || '',
            iconType: item.iconType || 'laptop',
            isVisibleToStudents: item.isVisibleToStudents !== false,
            specs: specsList,
            imageFile: null,
            imagePreview: item.imageUrl || null,
            imageSizeText: item.imageSizeFormatted || null,
            removeImage: false
        });

        setSelectedDetailItem(null);
        setIsFormModalOpen(true);
    };

    // Menyimpan data alat baru atau perubahan alat ke server (Inertia FormData POST / PUT)
    const handleSaveForm = (e: React.FormEvent) => {
        e.preventDefault();

        const stockNum = Number(formData.stock);
        const totalNum = Number(formData.total);

        // Validasi logika jumlah stok siap pakai
        if (stockNum > totalNum) {
            toast.error('Stok siap pakai tidak boleh lebih besar dari total unit fisik lab.');
            return;
        }

        const compiledSpecs: Record<string, string> = {};
        formData.specs.forEach((s) => {
            if (s.key.trim() && s.value.trim()) {
                compiledSpecs[s.key.trim()] = s.value.trim();
            }
        });

        // Membungkus payload ke objek FormData untuk mendukung unggahan berkas gambar
        const data = new FormData();
        data.append('name', formData.name.trim());
        data.append('code', formData.code.trim());
        data.append('category', formData.category);
        data.append('stock', String(formData.stock));
        data.append('total', String(formData.total));
        data.append('description', formData.description.trim());
        data.append('icon_type', formData.iconType || 'laptop');
        data.append('is_visible_to_students', formData.isVisibleToStudents ? '1' : '0');

        Object.entries(compiledSpecs).forEach(([key, val]) => {
            data.append(`specs[${key}]`, val);
        });

        if (formData.imageFile) {
            data.append('image', formData.imageFile);
        }

        if (formData.removeImage) {
            data.append('remove_image', '1');
        }

        if (editingItem) {
            // Mode Edit: Gunakan spoofing _method PUT
            data.append('_method', 'PUT');
            router.post(`/admin/alat/${editingItem.id}`, data, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`Data alat "${formData.name}" berhasil diperbarui!`);
                    setIsFormModalOpen(false);
                },
                onError: (errors) => {
                    toast.error(Object.values(errors)[0] as string || 'Gagal memperbarui alat.');
                }
            });
        } else {
            // Mode Tambah Baru: Kirim POST ke endpoint inventaris
            router.post('/admin/alat', data, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`Alat baru "${formData.name}" berhasil ditambahkan ke inventaris!`);
                    setIsFormModalOpen(false);
                },
                onError: (errors) => {
                    toast.error(Object.values(errors)[0] as string || 'Gagal menambahkan alat.');
                }
            });
        }
    };

    // Menghapus data alat yang dipilih dari database
    const handleConfirmDelete = () => {
        if (!deleteConfirmItem) return;

        router.delete(`/admin/alat/${deleteConfirmItem.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Alat "${deleteConfirmItem.name}" berhasil dihapus.`);
                setDeleteConfirmItem(null);
                setSelectedDetailItem(null);
            },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] as string || 'Gagal menghapus alat.');
            }
        });
    };

    return (
        <AdminLayout
            currentTab="alat"
            title="Data Inventaris & Alat"
        >
            {/* Metadata judul halaman browser */}
            <Head title="Admin CMS - Kelola Alat & Inventaris" />

            <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
                    {/* 1. Bar Filter Pencarian dan Tombol Tambah Alat Baru */}
                    <AlatFilterBar
                        filters={filterForm}
                        onFilterChange={setFilterForm}
                        onApply={handleApplyFilter}
                        onReset={handleResetFilter}
                        onOpenAdd={handleOpenAdd}
                    />

                    {/* 2. Tabel Utama Daftar Inventaris Alat */}
                    <AlatTable
                        items={paginatedItems}
                        onViewDetail={setSelectedDetailItem}
                        onEdit={handleOpenEdit}
                        onDelete={setDeleteConfirmItem}
                        onToggleVisibility={handleToggleVisibility}
                    />

                    {/* 3. Komponen Navigasi Paginasi Halaman */}
                    <AdminPagination
                        currentPage={safeCurrentPage}
                        totalPages={totalPages}
                        totalItems={filteredItems.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={setItemsPerPage}
                        itemsPerPageOptions={[10, 20, 50, 100]}
                        itemLabel="perangkat"
                    />
                </div>
            </div>

            {/* Modal Detail Spesifikasi Alat */}
            <AlatDetailModal
                item={selectedDetailItem}
                onClose={() => setSelectedDetailItem(null)}
                onEdit={handleOpenEdit}
            />

            {/* Modal Formulir Tambah / Ubah Perangkat */}
            <AlatFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                editingItem={editingItem}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSaveForm}
            />

            {/* Modal Konfirmasi Hapus Perangkat */}
            <AlatDeleteModal
                item={deleteConfirmItem}
                onClose={() => setDeleteConfirmItem(null)}
                onConfirm={handleConfirmDelete}
            />
        </AdminLayout>
    );
}
