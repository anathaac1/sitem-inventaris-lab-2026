/**
 * ============================================================================
 * Folder  : resources/js/components/inventory/
 * Fungsi  : Kumpulan komponen modular pendukung alur inventaris dan peminjaman alat lab.
 * File    : admin-pagination.tsx
 * Fungsi  : Komponen navigasi halaman (pagination) pada tabel admin. Menyediakan kontrol
 *           pindah halaman, pemilihan batas data per halaman (10, 20, 50, 100),
 *           serta ringkasan rentang baris data yang sedang ditampilkan.
 * ============================================================================
 */

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

/**
 * Properti komponen pagination admin
 */
interface AdminPaginationProps {
    currentPage: number;                      // Halaman aktif saat ini
    totalPages: number;                       // Total keseluruhan halaman yang tersedia
    totalItems: number;                       // Total jumlah data barang / baris tabel
    itemsPerPage: number;                     // Jumlah baris yang ditampilkan per halaman
    onPageChange: (page: number) => void;     // Callback ketika user berpindah halaman
    onItemsPerPageChange?: (perPage: number) => void; // Callback ketika user mengganti jumlah data per baris
    itemsPerPageOptions?: number[];           // Opsi pilihan limit data (default: [10, 20, 50, 100])
    itemLabel?: string;                       // Label satuan item (opsional)
}

export function AdminPagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    itemsPerPageOptions = [10, 20, 50, 100],
}: AdminPaginationProps) {
    // Jika tidak ada data sama sekali, sembunyikan bar pagination
    if (totalItems === 0) return null;

    // Menghitung indeks data awal dan akhir yang sedang ditampilkan
    const from = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
    const to = Math.min(currentPage * itemsPerPage, totalItems);

    // Logika pembentukan nomor halaman dengan ellipsis (...) jika halaman sangat banyak
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Tampilkan semua angka jika total halaman masih sedikit (<= 5)
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Selalu tampilkan halaman 1
            pages.push(1);

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                end = 4;
            } else if (currentPage >= totalPages - 2) {
                start = totalPages - 3;
            }

            if (start > 2) {
                pages.push('...');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) {
                pages.push('...');
            }

            // Selalu tampilkan halaman terakhir
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="px-4 py-3 sm:px-6 bg-white border-t border-slate-200/90 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
            {/* Opsi dropdown jumlah baris data per halaman */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-slate-500 text-xs">Baris per halaman</span>

                {onItemsPerPageChange ? (
                    <div className="relative inline-flex items-center">
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                onItemsPerPageChange(Number(e.target.value));
                                onPageChange(1); // Reset kembali ke halaman pertama saat limit berubah
                            }}
                            aria-label="Pilih jumlah baris per halaman"
                            className="appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-md pl-2.5 pr-6 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:border-slate-800 cursor-pointer transition-colors shadow-2xs"
                        >
                            {itemsPerPageOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 pointer-events-none" />
                    </div>
                ) : (
                    <span className="font-semibold text-slate-700">{itemsPerPage}</span>
                )}
            </div>

            {/* Navigasi tombol halaman dan indikator jumlah data */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-slate-500 text-xs font-normal whitespace-nowrap">
                    {from} - {to} dari {totalItems}
                </span>

                <div className="flex items-center gap-1">
                    {/* Tombol kembali ke halaman sebelumnya */}
                    <button
                        type="button"
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage <= 1}
                        title="Halaman sebelumnya"
                        aria-label="Halaman sebelumnya"
                        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Tombol deretan angka halaman */}
                    <div className="flex items-center gap-1 mx-0.5">
                        {pages.map((p, idx) => {
                            if (p === '...') {
                                return (
                                    <span key={`dots-${idx}`} className="w-5 text-center text-slate-400 select-none text-xs">
                                        ...
                                    </span>
                                );
                            }

                            const isCurrent = p === currentPage;
                            return (
                                <button
                                    key={`page-${p}`}
                                    type="button"
                                    onClick={() => onPageChange(p as number)}
                                    className={`min-w-6 h-6 px-1.5 rounded text-xs font-semibold flex items-center justify-center transition-all ${
                                        isCurrent
                                            ? 'bg-slate-100 text-slate-800 border border-slate-200/80 shadow-2xs'
                                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                                >
                                    {p}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tombol maju ke halaman berikutnya */}
                    <button
                        type="button"
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage >= totalPages}
                        title="Halaman selanjutnya"
                        aria-label="Halaman selanjutnya"
                        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
