/**
 * ============================================================================
 * Folder  : resources/js/components/inventory/
 * Fungsi  : Kumpulan komponen antarmuka yang mengelola fitur inventaris dan peminjaman alat lab.
 * File    : item-detail-modal.tsx
 * Fungsi  : Menampilkan rincian lengkap barang (spesifikasi, stok, foto, deskripsi) serta
 *           formulir pengajuan peminjaman barang bagi siswa, dilengkapi fitur perbesaran gambar (zoom).
 * ============================================================================
 */

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Info, ZoomIn, X } from 'lucide-react';
import { ItemIllustration } from './item-illustration';
import type { InventoryItem } from '@/data/inventory-data';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

/**
 * Properti untuk modal detail barang & peminjaman
 */
interface ItemDetailModalProps {
    item: InventoryItem | null;       // Data objek alat yang dipilih
    open?: boolean;                   // Status tampil modal
    isOpen?: boolean;                 // Alternatif penanda tampil modal
    onClose: () => void;              // Fungsi menutup modal
    onLoanSuccess?: (item: InventoryItem, borrowDate: string, returnEstimate: string, notes: string) => void; // Callback jika form disubmit
}

export function ItemDetailModal({ item, open, isOpen, onClose, onLoanSuccess }: ItemDetailModalProps) {
    const isModalOpen = open ?? isOpen ?? false;

    // State transisi antara tampilan "Detail Alat" dan "Formulir Peminjaman"
    const [isBorrowing, setIsBorrowing] = useState(false);
    // State pratinjau gambar dalam ukuran besar (lightbox zoom)
    const [isImageZoomed, setIsImageZoomed] = useState(false);

    // Nilai default tanggal hari ini dan perkiraan tanggal kembali (2 hari kemudian)
    const getTodayString = () => new Date().toISOString().split('T')[0];
    const getEstimateString = () => {
        const d = new Date();
        d.setDate(d.getDate() + 2);
        return d.toISOString().split('T')[0];
    };

    // State field input formulir peminjaman
    const [borrowDate, setBorrowDate] = useState(getTodayString());
    const [returnEstimate, setReturnEstimate] = useState(getEstimateString());
    const [notes, setNotes] = useState('Praktikum Pemrograman Web & Aplikasi');
    const [loading, setLoading] = useState(false);

    if (!item) return null;

    // Menangani aksi konfirmasi submit peminjaman
    const handleConfirmBorrow = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (onLoanSuccess) {
            onLoanSuccess(item, borrowDate, returnEstimate, notes);
        }

        setLoading(false);
        setIsBorrowing(false);
        onClose();
    };

    return (
        <>
            {/* Modal Utama: Detail Alat & Formulir Pinjam */}
            <Dialog open={isModalOpen} onOpenChange={(val) => !val && onClose()}>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0 rounded-xl border border-zinc-200 bg-white">
                    {/* Header dialog dengan judul dinamis sesuai mode aktif */}
                    <DialogHeader className="p-4 border-b border-zinc-100 flex flex-row items-center justify-between sticky top-0 bg-white z-20">
                        <DialogTitle className="text-sm font-bold text-zinc-900">
                            {isBorrowing ? 'Formulir Peminjaman' : 'Detail Alat'}
                        </DialogTitle>
                    </DialogHeader>

                    {/* Mode 1: Tampilan Detail Informasi Alat */}
                    {!isBorrowing ? (
                        <div className="p-5 space-y-4">
                            {/* Area Foto Barang / Ilustrasi Cadangan */}
                            <div className="rounded-lg bg-zinc-50 p-3 flex flex-col items-center justify-center border border-zinc-100 overflow-hidden relative group">
                                {item.imageUrl ? (
                                    <>
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            onClick={() => setIsImageZoomed(true)}
                                            className="max-h-52 w-full object-contain rounded cursor-pointer hover:opacity-95 transition-opacity"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsImageZoomed(true)}
                                            className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/70 hover:bg-black/90 text-white rounded text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer"
                                        >
                                            <ZoomIn className="w-3.5 h-3.5" />
                                            <span>Lihat Ukuran Penuh</span>
                                        </button>
                                    </>
                                ) : (
                                    <ItemIllustration type={item.iconType} className="w-32 h-24" />
                                )}
                            </div>

                            {/* Nama, Kategori, dan Status Ketersediaan */}
                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <span className="text-[11px] font-semibold text-blue-600 uppercase">
                                        {item.category}
                                    </span>
                                    <h2 className="text-base font-bold text-zinc-900">
                                        {item.name}
                                    </h2>
                                </div>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {item.status}
                                </span>
                            </div>

                            {/* Ringkasan Jumlah Stok dan Kode Unik Barang */}
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="p-2.5 rounded bg-zinc-50 border border-zinc-100">
                                    <span className="text-zinc-500">Jumlah Tersedia</span>
                                    <p className="font-bold text-blue-600 mt-0.5">
                                        {item.stock} Unit ({item.total} Total)
                                    </p>
                                </div>
                                <div className="p-2.5 rounded bg-zinc-50 border border-zinc-100">
                                    <span className="text-zinc-500">Kode Barang</span>
                                    <p className="font-bold text-zinc-800 mt-0.5">
                                        {item.code}
                                    </p>
                                </div>
                            </div>

                            {/* Deskripsi Barang */}
                            <div>
                                <h3 className="text-xs font-bold text-zinc-800 mb-1">
                                    Deskripsi
                                </h3>
                                <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50 p-2.5 rounded border border-zinc-100">
                                    {item.description}
                                </p>
                            </div>

                            {/* Rincian Spesifikasi Teknis Alat */}
                            <div>
                                <h3 className="text-xs font-bold text-zinc-800 mb-1">
                                    Spesifikasi
                                </h3>
                                <div className="rounded-lg bg-[#1E60AA] text-white p-3.5 space-y-1.5 text-xs">
                                    {Object.entries(item.specs).map(([key, val]) => (
                                        <div key={key} className="flex justify-between items-center border-b border-blue-400/20 pb-1 last:border-none last:pb-0">
                                            <span className="text-blue-100">{key}</span>
                                            <span className="font-semibold text-white">{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tombol Lanjut ke Formulir Pinjam */}
                            <div className="pt-1">
                                <Button
                                    onClick={() => setIsBorrowing(true)}
                                    className="w-full py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                                >
                                    <span>Pinjam Sekarang</span>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        /* Mode 2: Formulir Pengisian Peminjaman */
                        <form onSubmit={handleConfirmBorrow} className="p-5 space-y-3 text-xs">
                            <div className="flex items-center gap-2 p-2.5 bg-blue-50 rounded border border-blue-100 text-blue-800">
                                <Info className="w-3.5 h-3.5 shrink-0" />
                                <span>Silakan lengkapi formulir peminjaman alat lab.</span>
                            </div>

                            {/* Nama Barang (Hanya Baca / Readonly) */}
                            <div className="space-y-1">
                                <label className="font-medium text-zinc-700">Nama Alat</label>
                                <input
                                    type="text"
                                    readOnly
                                    value={`${item.name} (${item.code})`}
                                    className="w-full px-3 py-2 rounded border border-zinc-200 bg-zinc-50 text-slate-900 text-xs font-medium"
                                />
                            </div>

                            {/* Tanggal Peminjaman dan Estimasi Pengembalian */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <label className="font-medium text-zinc-700">Tanggal Pinjam</label>
                                    <input
                                        type="date"
                                        required
                                        value={borrowDate}
                                        onChange={(e) => setBorrowDate(e.target.value)}
                                        className="w-full px-3 py-2 rounded border border-zinc-200 text-slate-900 bg-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-medium text-zinc-700">Estimasi Pengembalian</label>
                                    <input
                                        type="date"
                                        required
                                        value={returnEstimate}
                                        onChange={(e) => setReturnEstimate(e.target.value)}
                                        className="w-full px-3 py-2 rounded border border-zinc-200 text-slate-900 bg-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Catatan / Keperluan Praktikum */}
                            <div className="space-y-1">
                                <label className="font-medium text-zinc-700">Keperluan</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Contoh: Praktikum Web"
                                    className="w-full px-3 py-2 rounded border border-zinc-200 text-slate-900 bg-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Tombol Navigasi Formulir */}
                            <div className="pt-2 flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsBorrowing(false)}
                                    className="flex-1 rounded-lg text-xs py-2"
                                >
                                    Kembali
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2"
                                >
                                    {loading ? 'Memproses...' : 'Konfirmasi Pinjam'}
                                </Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* Modal Perbesaran Gambar Ukuran Penuh (Image Zoom) */}
            {item && item.imageUrl && (
                <Dialog open={isImageZoomed} onOpenChange={setIsImageZoomed}>
                    <DialogContent className="max-w-2xl w-full p-2 bg-white/95 backdrop-blur-md rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden">
                        <div className="relative">
                            <div className="p-3 border-b border-zinc-100 flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-sm text-zinc-900">{item.name}</h4>
                                    <p className="text-[11px] text-zinc-500 font-mono">Kode: {item.code}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsImageZoomed(false)}
                                    className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center cursor-pointer transition-colors"
                                    title="Tutup"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-4 flex items-center justify-center bg-zinc-50 rounded-xl overflow-hidden min-h-[300px] max-h-[75vh]">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-sm"
                                />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
