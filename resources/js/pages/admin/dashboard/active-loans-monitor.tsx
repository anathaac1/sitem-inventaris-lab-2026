/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/dashboard/
 * Fungsi  : Kumpulan komponen antarmuka dasbor analitik laboratorium untuk Administrator.
 * File    : active-loans-monitor.tsx
 * Fungsi  : Tabel pemantauan peminjaman alat yang sedang aktif di luar lab secara real-time,
 *           menampilkan nama siswa, kelas, alat yang dipinjam, estimasi pengembalian, dan catatan.
 * ============================================================================
 */

import { Link } from '@inertiajs/react';
import { ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import type { LoanItem } from '@/data/inventory-data';

interface ActiveLoansMonitorProps {
    activeLoans: LoanItem[];                                   // Daftar peminjaman yang statusnya masih 'Sedang Dipinjam'
}

export function ActiveLoansMonitor({ activeLoans }: ActiveLoansMonitorProps) {
    return (
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            {/* Header Panel Monitor Peminjaman */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">
                            Pemantauan Sirkulasi & Peminjaman Aktif
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            {activeLoans.length} Aktif
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Log perangkat lab yang sedang berada di luar ruang penyimpanan
                    </p>
                </div>

                {/* Tautan Pintas ke Modul Manajemen Peminjaman */}
                <Link
                    href="/admin/peminjaman"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-100 text-[#0256D0] text-xs font-semibold transition-colors"
                    title="Buka modul log peminjaman lengkap untuk memproses pengembalian"
                >
                    <span>Buka Modul Pengembalian</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
            </div>

            {/* Tampilan Kosong Jika Tidak Ada Peminjaman Berjalan */}
            {activeLoans.length === 0 ? (
                <div className="p-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3 border border-emerald-100">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-900">
                        Semua Peralatan Lengkap di Ruang Penyimpanan
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">
                        Tidak ada catatan peminjaman yang sedang berlangsung saat ini.
                    </p>
                </div>
            ) : (
                /* Daftar Peminjaman Aktif */
                <div className="divide-y divide-slate-100">
                    {activeLoans.map((loan) => (
                        <div
                            key={loan.id}
                            className="p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors hover:bg-slate-50/70"
                        >
                            <div className="min-w-0 flex items-start gap-3.5">
                                {/* Inisial Nama Peminjam */}
                                <div className="w-10 h-10 rounded bg-slate-100 text-[#0256D0] font-black text-xs flex items-center justify-center shrink-0 border border-slate-200/80 shadow-2xs">
                                    {loan.borrowerName.substring(0, 2).toUpperCase()}
                                </div>

                                <div className="min-w-0">
                                    {/* Nama Peminjam dan Kelas */}
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-xs text-slate-900 truncate">
                                            {loan.borrowerName}
                                        </span>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0256D0] border border-blue-200/60 shrink-0">
                                            {loan.borrowerClass}
                                        </span>
                                    </div>

                                    {/* Nama Barang dan Kode Registrasi */}
                                    <p className="text-xs text-slate-800 font-semibold mt-1 truncate">
                                        {loan.itemName}{' '}
                                        <span className="text-slate-400 font-mono text-[11px] font-normal">
                                            ({loan.code})
                                        </span>
                                    </p>

                                    {/* Estimasi Batas Waktu dan Catatan Keperluan */}
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 mt-1.5">
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                            <span>Batas: {loan.returnEstimate}</span>
                                        </span>
                                        {loan.notes && (
                                            <span className="truncate max-w-xs text-slate-400">
                                                • {loan.notes}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Badge Status Peminjaman */}
                            <div className="shrink-0 flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                    <span>Sedang Dipinjam</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
