/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/peminjaman/
 * Fungsi  : Kumpulan komponen antarmuka manajemen sirkulasi dan log transaksi peminjaman alat laboratorium untuk Administrator.
 * File    : peminjaman-table.tsx
 * Fungsi  : Komponen tabel penyajian data log transaksi peminjaman alat oleh siswa,
 *           menampilkan data peminjam, kelas, perangkat yang dipinjam, jadwal batas pengembalian, status badge, dan tombol "Selesai".
 * ============================================================================
 */

import { Calendar, Clock, Check } from 'lucide-react';
import type { LoanItem } from '@/data/inventory-data';

interface PeminjamanTableProps {
    loans: LoanItem[];                                         // Daftar transaksi peminjaman pada halaman aktif
    onReturnItem: (loanId: string) => void;                    // Callback saat admin menyetujui pengembalian alat
}

export function PeminjamanTable({ loans, onReturnItem }: PeminjamanTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
                {/* Header Kolom Tabel */}
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                        <th className="py-3.5 px-5">Peminjam & Kelas</th>
                        <th className="py-3.5 px-4">Perangkat Lab</th>
                        <th className="py-3.5 px-4">Jadwal Penggunaan</th>
                        <th className="py-3.5 px-4">Keperluan Praktikum</th>
                        <th className="py-3.5 px-4 text-center">Status</th>
                        <th className="py-3.5 px-5 text-right">Tindakan</th>
                    </tr>
                </thead>

                {/* Tubuh Baris Log Transaksi */}
                <tbody className="divide-y divide-slate-100 text-slate-800">
                    {loans.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-12 text-center text-slate-400">
                                Tidak ada riwayat peminjaman yang sesuai dengan filter.
                            </td>
                        </tr>
                    ) : (
                        loans.map((loan) => {
                            const isActive = loan.status === 'Sedang Dipinjam';
                            return (
                                <tr key={loan.id} className="hover:bg-slate-50/70 transition-colors">
                                    {/* Kolom 1: Avatar Inisial, Nama Peminjam & Kelas */}
                                    <td className="py-3.5 px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-50 text-[#0256D0] font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200/60 shadow-2xs">
                                                {loan.borrowerName.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <span className="font-bold text-slate-900 block truncate">
                                                    {loan.borrowerName}
                                                </span>
                                                <span className="text-[11px] font-medium text-slate-500">
                                                    {loan.borrowerClass}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Kolom 2: Nama Perangkat, Kode, dan Kategori */}
                                    <td className="py-3.5 px-4">
                                        <div>
                                            <span className="font-semibold text-slate-900 block">
                                                {loan.itemName}
                                            </span>
                                            <span className="text-[11px] text-slate-400">
                                                {loan.code} • {loan.category}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Kolom 3: Tanggal Pinjam, Batas Pengembalian, dan Tanggal Aktual Kembali */}
                                    <td className="py-3.5 px-4">
                                        <div className="text-[11px] space-y-0.5">
                                            <p className="text-slate-600 flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-slate-400" />
                                                <span>Pinjam: {loan.borrowDate}</span>
                                            </p>
                                            <p className="text-slate-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-slate-400" />
                                                <span>Batas: {loan.returnEstimate}</span>
                                            </p>
                                            {loan.returnDate && (
                                                <p className="text-emerald-600 font-medium">
                                                    Kembali: {loan.returnDate}
                                                </p>
                                            )}
                                        </div>
                                    </td>

                                    {/* Kolom 4: Keterangan / Keperluan Praktikum */}
                                    <td className="py-3.5 px-4">
                                        <p className="text-[11px] text-slate-600 max-w-xs truncate">
                                            {loan.notes || 'Praktikum Reguler Lab'}
                                        </p>
                                    </td>

                                    {/* Kolom 5: Badge Status Peminjaman */}
                                    <td className="py-3.5 px-4 text-center">
                                        {isActive ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                                                <span>Sedang Dipinjam</span>
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                <span>Dikembalikan</span>
                                            </span>
                                        )}
                                    </td>

                                    {/* Kolom 6: Tindakan Pengembalian */}
                                    <td className="py-3.5 px-5 text-right">
                                        {isActive ? (
                                            <button
                                                type="button"
                                                onClick={() => onReturnItem(loan.id)}
                                                className="h-8 px-3 rounded bg-[#0256D0] hover:bg-[#0243a4] text-white text-xs font-bold flex items-center gap-1.5 ml-auto shadow-2xs transition-colors cursor-pointer"
                                                title="Konfirmasi alat telah dikembalikan ke lab"
                                            >
                                                <Check className="w-3.5 h-3.5" />
                                                <span>Selesai</span>
                                            </button>
                                        ) : (
                                            <span className="text-[11px] text-slate-400 font-medium italic">
                                                Tuntas
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}
