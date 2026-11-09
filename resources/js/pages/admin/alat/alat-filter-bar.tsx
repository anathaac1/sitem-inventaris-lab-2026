/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/alat/
 * Fungsi  : Kumpulan komponen antarmuka manajemen data barang inventaris laboratorium (CRUD Alat) untuk Administrator.
 * File    : alat-filter-bar.tsx
 * Fungsi  : Bilah kontrol penyaringan inventaris mencakup pencarian nama alat, kode alat,
 *           kategori dropdown, status stok, status keaktifan, tombol reset filter, dan tombol tambah alat baru.
 * ============================================================================
 */

import React from 'react';
import { Plus, ChevronDown, X } from 'lucide-react';
import { CATEGORIES } from '@/data/inventory-data';

export interface AlatFilterValues {
    name: string;                                              // Kata kunci nama alat
    code: string;                                              // Kata kunci kode alat
    category: string;                                          // Kategori terpilih atau 'Semua'
    stockStatus: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock'; // Status ketersediaan stok
    visibility: 'all' | 'visible' | 'hidden';                  // Status visibilitas alat (Aktif / Tidak Aktif)
}

interface AlatFilterBarProps {
    filters: AlatFilterValues;                                 // Nilai filter saat ini
    onFilterChange: (filters: AlatFilterValues) => void;       // Handler saat nilai filter diubah
    onReset: () => void;                                       // Callback untuk mengosongkan filter
    onApply: () => void;                                       // Callback untuk menerapkan filter
    onOpenAdd: () => void;                                     // Callback untuk membuka form tambah alat baru
}

export function AlatFilterBar({
    filters,
    onFilterChange,
    onReset,
    onApply,
    onOpenAdd
}: AlatFilterBarProps) {
    // Memperbarui nilai salah satu field filter secara dinamis
    const handleFieldChange = (field: keyof AlatFilterValues, value: string) => {
        onFilterChange({
            ...filters,
            [field]: value
        });
    };

    // Menerapkan filter saat pengguna menekan tombol Enter pada input pencarian
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onApply();
        }
    };

    return (
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-white">
            {/* Bagian Atas: Tombol Aksi Tambah Alat Baru */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Pencarian & Filter Inventaris
                </span>
                <button
                    type="button"
                    onClick={onOpenAdd}
                    className="h-8 px-3.5 rounded bg-[#0256D0] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer shrink-0"
                >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Alat Baru</span>
                </button>
            </div>

            {/* Grid Input Filter 3 Kolom */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3.5 text-xs">
                {/* 1. Filter Nama Alat */}
                <div className="flex items-center gap-3">
                    <label className="w-32 shrink-0 font-medium text-slate-600 text-[11px] sm:text-xs">
                        Nama Alat
                    </label>
                    <input
                        type="text"
                        placeholder="Masukkan Nama Alat"
                        value={filters.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 h-9 px-3 rounded border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                    />
                </div>

                {/* 2. Filter Kategori */}
                <div className="flex items-center gap-3">
                    <label className="w-32 shrink-0 font-medium text-slate-600 text-[11px] sm:text-xs">
                        Kategori
                    </label>
                    <div className="relative flex-1">
                        <select
                            value={filters.category}
                            onChange={(e) => handleFieldChange('category', e.target.value)}
                            className="w-full h-9 pl-3 pr-12 rounded border border-slate-300 bg-white text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0] cursor-pointer"
                        >
                            <option value="Semua">Semua Kategori</option>
                            {CATEGORIES.filter((cat) => cat !== 'Semua').map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {filters.category !== 'Semua' && (
                                <button
                                    type="button"
                                    onClick={() => handleFieldChange('category', 'Semua')}
                                    className="p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    title="Reset Kategori"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* 3. Filter Status Stok */}
                <div className="flex items-center gap-3">
                    <label className="w-32 shrink-0 font-medium text-slate-600 text-[11px] sm:text-xs">
                        Status Stok
                    </label>
                    <div className="relative flex-1">
                        <select
                            value={filters.stockStatus}
                            onChange={(e) => handleFieldChange('stockStatus', e.target.value)}
                            className="w-full h-9 pl-3 pr-12 rounded border border-slate-300 bg-white text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0] cursor-pointer"
                        >
                            <option value="all">Semua Stok</option>
                            <option value="in_stock">Tersedia</option>
                            <option value="low_stock">Stok Menipis</option>
                            <option value="out_of_stock">Habis</option>
                        </select>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {filters.stockStatus !== 'all' && (
                                <button
                                    type="button"
                                    onClick={() => handleFieldChange('stockStatus', 'all')}
                                    className="p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    title="Reset Status Stok"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* 4. Filter Kode Alat */}
                <div className="flex items-center gap-3">
                    <label className="w-32 shrink-0 font-medium text-slate-600 text-[11px] sm:text-xs">
                        Kode Alat
                    </label>
                    <input
                        type="text"
                        placeholder="Masukkan Kode Alat"
                        value={filters.code}
                        onChange={(e) => handleFieldChange('code', e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 h-9 px-3 rounded border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                    />
                </div>

                {/* 5. Filter Status Keaktifan (Visibilitas) */}
                <div className="flex items-center gap-3">
                    <label className="w-32 shrink-0 font-medium text-slate-600 text-[11px] sm:text-xs">
                        Status Alat
                    </label>
                    <div className="relative flex-1">
                        <select
                            value={filters.visibility}
                            onChange={(e) => handleFieldChange('visibility', e.target.value)}
                            className="w-full h-9 pl-3 pr-12 rounded border border-slate-300 bg-white text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0] cursor-pointer"
                        >
                            <option value="all">Semua Status</option>
                            <option value="visible">Aktif</option>
                            <option value="hidden">Tidak Aktif</option>
                        </select>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {filters.visibility !== 'all' && (
                                <button
                                    type="button"
                                    onClick={() => handleFieldChange('visibility', 'all')}
                                    className="p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    title="Reset Status Alat"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="hidden md:block"></div>
            </div>

            {/* Bagian Bawah: Tombol Terapkan Filter & Reset */}
            <div className="flex items-center justify-end gap-2.5 mt-4 pt-3 border-t border-slate-100">
                <button
                    type="button"
                    onClick={onApply}
                    className="h-8 px-6 rounded bg-[#0256D0] hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                >
                    Filter
                </button>
                <button
                    type="button"
                    onClick={onReset}
                    className="h-8 px-5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
