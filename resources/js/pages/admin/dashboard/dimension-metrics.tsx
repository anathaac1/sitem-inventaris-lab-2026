/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/dashboard/
 * Fungsi  : Kumpulan komponen antarmuka dasbor analitik laboratorium untuk Administrator.
 * File    : dimension-metrics.tsx
 * Fungsi  : Menampilkan 4 kartu ringkasan dimensi analitik utama (Total Unit Fisik,
 *           Katalog Alat, Peminjaman Aktif, dan Siswa Terdata) yang dapat diklik untuk filter.
 * ============================================================================
 */

import { SlidersHorizontal } from 'lucide-react';

export type DimensionTab = 'all' | 'categories' | 'loans' | 'classes';

interface DimensionMetricsProps {
    activeTab: DimensionTab;                                   // Tab analitik yang sedang dipilih
    onTabChange: (tab: DimensionTab) => void;                  // Callback saat kartu analitik diklik
    totalUnits: number;                                        // Total unit barang fisik
    availableStock: number;                                    // Jumlah unit siap dipinjam
    catalogCount: number;                                      // Jumlah item di katalog alat
    activeLoansCount: number;                                  // Jumlah peminjaman yang sedang aktif
    studentCount: number;                                      // Jumlah akun siswa terdaftar
}

export function DimensionMetrics({
    activeTab,
    onTabChange,
    totalUnits,
    availableStock,
    catalogCount,
    activeLoansCount,
    studentCount
}: DimensionMetricsProps) {
    return (
        <div className="space-y-2">
            {/* Judul Seksi Analitik */}
            <div className="flex items-center justify-between text-xs px-1">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#0256D0]" />
                    <span>Dimensi Analitik</span>
                </span>
            </div>

            {/* Grid 4 Kartu Analitik */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* 1. Kartu Total Unit Fisik */}
                <button
                    type="button"
                    onClick={() => onTabChange(activeTab === 'all' ? 'categories' : 'all')}
                    className={`p-4 sm:p-5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                        activeTab === 'all'
                            ? 'bg-white border-[#0256D0] shadow-xs ring-1 ring-[#0256D0]/20'
                            : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-2xs'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">Total Unit Fisik</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-mono">
                        {totalUnits}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
                        <span className="text-emerald-600 font-semibold">{availableStock} Unit Siap</span>
                        <span className="text-slate-400 font-medium">Rak Lab</span>
                    </div>
                </button>

                {/* 2. Kartu Katalog Alat */}
                <button
                    type="button"
                    onClick={() => onTabChange(activeTab === 'categories' ? 'all' : 'categories')}
                    className={`p-4 sm:p-5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                        activeTab === 'categories'
                            ? 'bg-white border-[#0256D0] shadow-xs ring-1 ring-[#0256D0]/20'
                            : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-2xs'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">Katalog Alat</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-mono">
                        {catalogCount}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
                        <span className="text-slate-700 font-semibold">4 Kategori</span>
                        <span className="text-[#0256D0] font-medium">Perangkat</span>
                    </div>
                </button>

                {/* 3. Kartu Peminjaman Aktif */}
                <button
                    type="button"
                    onClick={() => onTabChange(activeTab === 'loans' ? 'all' : 'loans')}
                    className={`p-4 sm:p-5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                        activeTab === 'loans'
                            ? 'bg-white border-[#0256D0] shadow-xs ring-1 ring-[#0256D0]/20'
                            : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-2xs'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">Sedang Dipinjam</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-mono">
                        {activeLoansCount}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
                        <span className="text-amber-700 font-semibold">{activeLoansCount} Siswa Aktif</span>
                        <span className="text-slate-400 font-medium">Praktikum</span>
                    </div>
                </button>

                {/* 4. Kartu Siswa Terdata */}
                <button
                    type="button"
                    onClick={() => onTabChange(activeTab === 'classes' ? 'all' : 'classes')}
                    className={`p-4 sm:p-5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                        activeTab === 'classes'
                            ? 'bg-white border-[#0256D0] shadow-xs ring-1 ring-[#0256D0]/20'
                            : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-2xs'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">Siswa Terdata</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-mono">
                        {studentCount}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
                        <span className="text-slate-700 font-semibold">6 Kelas</span>
                        <span className="text-emerald-600 font-medium">RPL A & B</span>
                    </div>
                </button>
            </div>
        </div>
    );
}
