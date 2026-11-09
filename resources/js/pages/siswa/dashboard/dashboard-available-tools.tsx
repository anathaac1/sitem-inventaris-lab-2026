/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/dashboard/
 * Fungsi  : Kumpulan komponen modular penyusun halaman beranda (dashboard) siswa.
 * File    : dashboard-available-tools.tsx
 * Fungsi  : Menampilkan kartu grid katalog peralatan lab yang tersedia untuk dipinjam,
 *           dilengkapi foto/ilustrasi, jumlah unit stok, serta aksi klik untuk membuka modal peminjaman.
 * ============================================================================
 */

import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { ItemIllustration } from '@/components/inventory/item-illustration';
import type { InventoryItem } from '@/data/inventory-data';

interface DashboardAvailableToolsProps {
    items: InventoryItem[];                                   // Daftar barang yang tersedia
    onOpenDetail: (item: InventoryItem) => void;              // Callback ketika kartu barang diklik
}

export function DashboardAvailableTools({
    items,
    onOpenDetail
}: DashboardAvailableToolsProps) {
    return (
        <div>
            {/* Header Bagian: Judul dan Tautan Menuju Katalog Lengkap */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-zinc-900">Alat Tersedia</h3>
                <Link
                    href="/alat"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                    <span>Lihat Semua</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* Kondisi jika tidak ada barang yang sesuai filter pencarian */}
            {items.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg border border-zinc-200 p-6">
                    <p className="text-xs text-zinc-500">Tidak ada alat yang sesuai.</p>
                </div>
            ) : (
                /* Grid kartu peralatan lab (responsif 2 hingga 5 kolom) */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
                    {items.slice(0, 10).map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onOpenDetail(item)}
                            className="flex flex-col items-center justify-between p-3 rounded-lg bg-white border border-zinc-200 hover:border-blue-500 transition-colors text-center cursor-pointer"
                        >
                            {/* Area Gambar atau Ilustrasi Alat */}
                            <div className="w-full aspect-[4/3] rounded bg-zinc-50 flex items-center justify-center mb-2 overflow-hidden">
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                ) : (
                                    <ItemIllustration type={item.iconType} className="w-16 h-12" />
                                )}
                            </div>

                            {/* Nama Alat & Status Jumlah Unit Tersedia */}
                            <div className="w-full">
                                <h4 className="text-xs font-semibold text-zinc-900 truncate">
                                    {item.name}
                                </h4>
                                <p className="text-[11px] text-emerald-600 mt-0.5">
                                    {item.stock} Tersedia
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
