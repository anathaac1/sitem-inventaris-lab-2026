/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/dashboard/
 * Fungsi  : Kumpulan komponen antarmuka yang menyusun halaman beranda (dashboard) siswa.
 * File    : dashboard-active-loans.tsx
 * Fungsi  : Menampilkan daftar cuplikan peminjaman aktif terbaru milik siswa pada beranda,
 *           lengkap dengan status transaksi, estimasi waktu kembali, dan tautan menuju halaman detail peminjaman.
 * ============================================================================
 */

import { Link } from '@inertiajs/react';
import { ChevronRight, Clock } from 'lucide-react';
import { ItemIllustration } from '@/components/inventory/item-illustration';
import type { LoanItem } from '@/data/inventory-data';

interface DashboardActiveLoansProps {
    loans: LoanItem[];                        // Daftar data peminjaman yang sedang aktif berjalan
}

export function DashboardActiveLoans({ loans }: DashboardActiveLoansProps) {
    // Sembunyikan bagian ini jika siswa tidak memiliki tanggungan peminjaman
    if (loans.length === 0) return null;

    return (
        <div>
            {/* Header Bagian: Judul dan Tautan Lihat Semua */}
            <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-sm font-bold text-zinc-900">Terakhir Dipinjam</h3>
                <Link
                    href="/peminjaman"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                    <span>Lihat Semua</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            {/* Menampilkan maksimal 2 item transaksi peminjaman terbaru */}
            <div className="space-y-2">
                {loans.slice(0, 2).map((loan) => (
                    <Link
                        key={loan.id}
                        href="/peminjaman"
                        className="flex items-center justify-between p-3 rounded-lg bg-white border border-zinc-200 hover:border-blue-400 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            {/* Ikon ilustrasi barang pinjaman */}
                            <div className="w-10 h-10 rounded bg-zinc-50 flex items-center justify-center border border-zinc-100 shrink-0">
                                <ItemIllustration
                                    type={loan.itemId.includes('laptop') ? 'laptop' : 'mouse'}
                                    className="w-7 h-7"
                                />
                            </div>

                            {/* Informasi nama alat, status, dan estimasi waktu pengembalian */}
                            <div>
                                <h4 className="text-xs font-bold text-zinc-900">
                                    {loan.itemName}
                                </h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                                        {loan.status}
                                    </span>
                                    <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        Estimasi: {loan.returnEstimate}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Ikon panah penunjuk navigasi */}
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
