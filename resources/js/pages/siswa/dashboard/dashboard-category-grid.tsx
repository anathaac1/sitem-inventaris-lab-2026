/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/dashboard/
 * Fungsi  : Kumpulan komponen modular penyusun halaman beranda (dashboard) siswa.
 * File    : dashboard-category-grid.tsx
 * Fungsi  : Menampilkan deretan tombol filter cepat kategori peralatan (Laptop, Peripheral, Tools, Elektrikal)
 *           dengan ikon tematik untuk memudahkan siswa memfilter alat praktikum dalam 1 klik.
 * ============================================================================
 */

import type { LucideIcon } from 'lucide-react';

export interface CategoryOption {
    name: string;                                             // Nama kategori alat
    icon: LucideIcon;                                         // Ikon grafis Lucide
}

interface DashboardCategoryGridProps {
    categories: CategoryOption[];                             // Daftar pilihan kategori
    selectedCategory: string;                                 // Kategori yang sedang aktif saat ini
    onSelectCategory: (name: string) => void;                 // Callback pemilihan kategori
}

export function DashboardCategoryGrid({
    categories,
    selectedCategory,
    onSelectCategory
}: DashboardCategoryGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                const Icon = cat.icon;
                return (
                    <button
                        key={cat.name}
                        type="button"
                        onClick={() => onSelectCategory(isSelected ? 'Semua' : cat.name)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-colors text-left ${
                            isSelected
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'bg-white border-zinc-200 text-zinc-800 hover:border-zinc-300'
                        }`}
                    >
                        {/* Wadah Ikon Kategori dengan Latar Kontras */}
                        <div
                            className={`w-8 h-8 rounded-md flex items-center justify-center ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                        </div>

                        {/* Label Nama Kategori */}
                        <span className="text-xs font-semibold">{cat.name}</span>
                    </button>
                );
            })}
        </div>
    );
}
