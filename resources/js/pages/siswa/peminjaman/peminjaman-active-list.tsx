/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/peminjaman/
 * Fungsi  : Kumpulan komponen antarmuka yang mengelola data peminjaman dan pengembalian alat oleh siswa.
 * File    : peminjaman-active-list.tsx
 * Fungsi  : Menampilkan daftar peminjaman aktif yang sedang dipinjam oleh siswa,
 *           informasi tenggat waktu (estimasi kembali), catatan keperluan, serta tombol aksi "Kembalikan".
 * ============================================================================
 */

import { Clock, Calendar, Box } from 'lucide-react';
import { ItemIllustration } from '@/components/inventory/item-illustration';
import { Button } from '@/components/ui/button';
import type { LoanItem } from '@/data/inventory-data';

interface PeminjamanActiveListProps {
    loans: LoanItem[];                                        // Daftar data peminjaman yang masih aktif
    onReturnItem: (loan: LoanItem) => void;                   // Callback ketika tombol "Kembalikan" diklik
}

export function PeminjamanActiveList({
    loans,
    onReturnItem
}: PeminjamanActiveListProps) {
    // Tampilan kosong jika tidak ada pinjaman aktif
    if (loans.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-zinc-200 p-8">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                    <Box className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-900">
                    Tidak ada peminjaman aktif
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                    Kamu sedang tidak meminjam perangkat laboratorium apapun saat ini.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {loans.map((loan) => (
                <div
                    key={loan.id}
                    className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs hover:border-zinc-300 transition-colors"
                >
                    {/* Header Kartu: Ikon Barang, Kode, Nama Alat, dan Tombol Kembalikan */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3">
                            <div className="w-12 h-12 rounded bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                                <ItemIllustration
                                    type={loan.category?.toLowerCase() === 'laptop' || String(loan.itemId ?? '').includes('laptop') || loan.itemName?.toLowerCase().includes('laptop') ? 'laptop' : 'mouse'}
                                    className="w-8 h-8"
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 font-semibold">
                                        {loan.code}
                                    </span>
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                                        Sedang Dipinjam
                                    </span>
                                </div>
                                <h3 className="text-sm font-bold text-zinc-900 mt-1">
                                    {loan.itemName}
                                </h3>
                                <p className="text-xs text-zinc-500">{loan.category}</p>
                            </div>
                        </div>

                        {/* Tombol Pengembalian Alat */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onReturnItem(loan)}
                            className="text-xs h-8 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 hover:text-blue-600 focus:bg-white focus:text-blue-600 active:text-blue-600 shrink-0 cursor-pointer"
                        >
                            Kembalikan
                        </Button>
                    </div>

                    {/* Rincian Tanggal Peminjaman & Estimasi Pengembalian */}
                    <div className="mt-3 pt-3 border-t border-zinc-100 grid gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-zinc-500">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span>Pinjam: {loan.borrowDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-500">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            <span>Kembali: {loan.returnEstimate}</span>
                        </div>
                    </div>

                    {/* Catatan / Keterangan Keperluan */}
                    {loan.notes && (
                        <div className="mt-2 text-[11px] text-zinc-500 bg-zinc-50 p-2 rounded border border-zinc-100">
                            <span className="font-semibold text-zinc-700">Keperluan:</span> {loan.notes}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
