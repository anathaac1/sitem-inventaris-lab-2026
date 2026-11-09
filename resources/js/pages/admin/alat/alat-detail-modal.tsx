/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/alat/
 * Fungsi  : Kumpulan komponen antarmuka manajemen data barang inventaris laboratorium (CRUD Alat) untuk Administrator.
 * File    : alat-detail-modal.tsx
 * Fungsi  : Dialog modal untuk memeriksa informasi detail dan spesifikasi lengkap perangkat inventaris,
 *           dilengkapi pratinjau gambar dengan fitur zoom lightbox dan tombol pintas ubah data.
 * ============================================================================
 */

import { useState } from 'react';
import { Info, ZoomIn, X } from 'lucide-react';
import type { InventoryItem } from '@/data/inventory-data';
import { ItemIllustration } from '@/components/inventory/item-illustration';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AlatDetailModalProps {
    item: InventoryItem | null;                                // Objek data alat yang sedang ditampilkan
    onClose: () => void;                                       // Callback untuk menutup dialog modal
    onEdit: (item: InventoryItem) => void;                     // Callback untuk beralih ke modal edit alat
}

export function AlatDetailModal({ item, onClose, onEdit }: AlatDetailModalProps) {
    // State kendali pembesaran foto perangkat (lightbox zoom)
    const [isImageZoomed, setIsImageZoomed] = useState(false);

    return (
        <>
            <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="max-w-md w-full p-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
                    {item && (
                        <div>
                            {/* Header Gradasi Biru: Thumbnail Foto, Kategori, Nama, dan Kode Alat */}
                            <div className="bg-gradient-to-r from-[#0256D0] to-[#0A1C38] text-white p-5 flex items-center justify-between">
                                <div className="flex items-center gap-3.5">
                                    <div
                                        onClick={() => item.imageUrl && setIsImageZoomed(true)}
                                        className={`w-14 h-14 rounded-lg bg-white/15 backdrop-blur-xs border border-white/20 flex items-center justify-center shrink-0 overflow-hidden relative group ${
                                            item.imageUrl ? 'cursor-pointer' : ''
                                        }`}
                                        title={item.imageUrl ? 'Klik untuk memperbesar gambar' : undefined}
                                    >
                                        {item.imageUrl ? (
                                            <>
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <ZoomIn className="w-4 h-4 text-white" />
                                                </div>
                                            </>
                                        ) : (
                                            <ItemIllustration type={item.iconType} className="w-8 h-8" />
                                        )}
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 bg-white/15 px-2 py-0.5 rounded inline-block mb-1">
                                            {item.category}
                                        </span>
                                        <h3 className="text-base font-bold text-white">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-blue-100 font-mono mt-0.5">
                                            Kode: {item.code}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Konten Detail Spesifikasi */}
                            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
                                {/* Baris Statistik Stok dan Status Keaktifan */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 rounded bg-slate-50 border border-slate-200">
                                        <span className="text-[11px] text-slate-500 block mb-1">Ketersediaan Unit Lab</span>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-lg font-black text-slate-900">
                                                {item.stock}
                                            </span>
                                            <span className="text-xs text-slate-500 font-medium">
                                                / {item.total} unit
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1.5">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full"
                                                style={{
                                                    width: `${item.total > 0 ? (item.stock / item.total) * 100 : 0}%`
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="p-3 rounded bg-slate-50 border border-slate-200">
                                        <span className="text-[11px] text-slate-500 block mb-1">Status</span>
                                        {item.isVisibleToStudents !== false ? (
                                            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold text-xs mt-1">
                                                Aktif
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 text-slate-500 font-medium text-xs mt-1">
                                                Tidak Aktif
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Deskripsi Perangkat */}
                                <div className="space-y-1">
                                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                                        <Info className="w-3.5 h-3.5 text-[#0256D0]" />
                                        <span>Deskripsi Perangkat</span>
                                    </span>
                                    <p className="p-3 rounded bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed text-xs">
                                        {item.description || 'Tidak ada catatan deskripsi tambahan untuk perangkat ini.'}
                                    </p>
                                </div>

                                {/* Tabel Rincian Spesifikasi Teknis */}
                                <div className="space-y-2">
                                    <span className="font-bold text-slate-900 block">
                                        Spesifikasi Teknis & Rincian Lab
                                    </span>
                                    <div className="border border-slate-200 rounded overflow-hidden divide-y divide-slate-100">
                                        {item.specs && Object.keys(item.specs).length > 0 ? (
                                            Object.entries(item.specs).map(([specKey, specVal]) => (
                                                <div key={specKey} className="flex justify-between py-2 px-3 text-xs hover:bg-slate-50/60">
                                                    <span className="font-medium text-slate-500">{specKey}</span>
                                                    <span className="font-semibold text-slate-900 text-right">{String(specVal)}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-3 text-center text-slate-400">
                                                Belum ada rincian spesifikasi tambahan.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Tombol Aksi Bawah: Menuju Mode Ubah Data Alat */}
                            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                                <Button
                                    type="button"
                                    onClick={() => onEdit(item)}
                                    className="h-9 px-4 ml-auto rounded bg-[#0256D0] hover:bg-[#0243a4] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                                >
                                    <span>Ubah Data Alat Ini</span>
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Modal Lightbox Zoom Foto Alat */}
            {item && item.imageUrl && (
                <Dialog open={isImageZoomed} onOpenChange={setIsImageZoomed}>
                    <DialogContent className="max-w-2xl w-full p-2 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
                        <div className="relative">
                            <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                                    <p className="text-[11px] text-slate-500 font-mono">Kode: {item.code}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsImageZoomed(false)}
                                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                                    title="Tutup"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-4 flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden min-h-[300px] max-h-[75vh]">
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
