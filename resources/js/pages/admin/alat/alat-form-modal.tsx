/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/alat/
 * Fungsi  : Kumpulan komponen antarmuka manajemen data barang inventaris laboratorium (CRUD Alat) untuk Administrator.
 * File    : alat-form-modal.tsx
 * Fungsi  : Dialog modal formulir penambahan dan penyuntingan alat laboratorium. Mendukung unggah foto alat (maks 2MB),
 *           penyesuaian stok siap pakai dan total unit fisik, deskripsi, sakelar visibilitas, serta baris spesifikasi teknis dinamis.
 * ============================================================================
 */

import React, { useRef } from 'react';
import { X, Plus, ChevronDown, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import type { InventoryItem } from '@/data/inventory-data';
import { ItemIllustration } from '@/components/inventory/item-illustration';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface SpecRow {
    key: string;                                               // Nama spesifikasi (misal: Processor, RAM, Daya)
    value: string;                                             // Nilai spesifikasi (misal: Intel Core i5, 16 GB, 65W)
}

export interface AlatFormData {
    name: string;                                              // Nama perangkat
    code: string;                                              // Kode inventaris unik (misal: LP-001)
    category: 'Laptop' | 'Peripheral' | 'Tools' | 'Elektrikal';// Kategori alat
    stock: number | '';                                        // Stok unit yang tersedia di rak
    total: number | '';                                        // Total unit fisik lab keseluruhan
    description: string;                                       // Keterangan atau panduan alat
    iconType?: string;                                         // Tipe ikon ilustrasi jika tidak ada foto
    isVisibleToStudents: boolean;                              // Visibilitas untuk siswa
    specs: SpecRow[];                                          // Baris spesifikasi dinamis
    imageFile?: File | null;                                   // File gambar yang diunggah
    imagePreview?: string | null;                              // URL pratinjau gambar
    imageSizeText?: string | null;                             // Teks ukuran file gambar
    removeImage?: boolean;                                     // Flag hapus gambar saat ini
}

interface AlatFormModalProps {
    isOpen: boolean;                                           // Status buka-tutup modal form
    onClose: () => void;                                       // Callback untuk menutup modal
    editingItem: InventoryItem | null;                         // Data alat yang sedang diedit (null jika tambah baru)
    formData: AlatFormData;                                    // State formulir data alat
    setFormData: React.Dispatch<React.SetStateAction<AlatFormData>>; // Setter data formulir
    onSubmit: (e: React.FormEvent) => void;                    // Callback pengiriman formulir
}

export function AlatFormModal({
    isOpen,
    onClose,
    editingItem,
    formData,
    setFormData,
    onSubmit
}: AlatFormModalProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Menambah baris spesifikasi teknis baru
    const handleAddSpecRow = () => {
        setFormData({
            ...formData,
            specs: [...formData.specs, { key: '', value: '' }]
        });
    };

    // Memperbarui nilai pada baris spesifikasi tertentu
    const handleUpdateSpecRow = (index: number, field: 'key' | 'value', val: string) => {
        const updated = [...formData.specs];
        updated[index][field] = val;
        setFormData({ ...formData, specs: updated });
    };

    // Menghapus salah satu baris spesifikasi
    const handleRemoveSpecRow = (index: number) => {
        const updated = formData.specs.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            specs: updated
        });
    };

    // Memproses pemilihan file gambar baru dan membuat URL pratinjau
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validasi ukuran berkas maksimal 2 Megabyte
        if (file.size > 2 * 1024 * 1024) {
            alert('Ukuran gambar maksimal 2MB');
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        const sizeFormatted = file.size >= 1048576
            ? `${(file.size / 1048576).toFixed(1)} MB`
            : `${(file.size / 1024).toFixed(1)} KB`;

        setFormData({
            ...formData,
            imageFile: file,
            imagePreview: previewUrl,
            imageSizeText: sizeFormatted,
            removeImage: false
        });
    };

    // Menghapus gambar yang sudah terunggah
    const handleRemoveImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setFormData({
            ...formData,
            imageFile: null,
            imagePreview: null,
            imageSizeText: null,
            removeImage: true
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-lg p-5 rounded-2xl border border-slate-200 bg-white shadow-xl max-h-[90vh] overflow-y-auto">
                {/* Header Judul Modal */}
                <DialogHeader>
                    <DialogTitle className="text-base font-bold text-slate-900">
                        {editingItem ? 'Perbarui Data Perangkat' : 'Tambah Perangkat Inventaris Baru'}
                    </DialogTitle>
                    <p className="text-xs text-slate-500">
                        {editingItem
                            ? `Memuat data saat ini untuk "${editingItem.name}" (${editingItem.code}). Sesuaikan kolom yang ingin diubah.`
                            : 'Masukkan rincian spesifikasi perangkat laboratorium baru.'}
                    </p>
                </DialogHeader>

                {/* Banner Pratinjau Singkat Saat Mode Edit */}
                {editingItem && (
                    <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-white border border-blue-200 flex items-center justify-center shrink-0 overflow-hidden">
                            {formData.imagePreview ? (
                                <img
                                    src={formData.imagePreview}
                                    alt={formData.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <ItemIllustration type={formData.iconType} className="w-7 h-7" />
                            )}
                        </div>
                        <div className="min-w-0">
                            <p className="font-bold text-xs text-slate-900 truncate">
                                {formData.name} <span className="text-slate-500 font-mono">({formData.code})</span>
                            </p>
                            <span className="text-[11px] text-slate-600">
                                Stok: <strong>{formData.stock}</strong> dari <strong>{formData.total}</strong> unit
                            </span>
                        </div>
                    </div>
                )}

                {/* Formulir Input Data Inventaris */}
                <form onSubmit={onSubmit} className="space-y-4 text-xs pt-2">
                    {/* Baris 1: Nama Perangkat dan Kode Inventaris */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2 space-y-2">
                            <label className="mb-1 block font-semibold text-slate-700">Nama Perangkat</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Contoh: Laptop Lenovo"
                                className="w-full px-3 py-2 rounded border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:border-slate-800"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="mb-1 block font-semibold text-slate-700">Kode Inventaris</label>
                            <input
                                type="text"
                                required
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                placeholder="EL-001"
                                className="w-full px-3 py-2 rounded border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:border-slate-800"
                            />
                        </div>
                    </div>

                    {/* Baris 2: Unggah Foto/Gambar Perangkat */}
                    <div className="space-y-1.5 p-3 rounded-lg border border-slate-200 bg-slate-50/60">
                        <div className="flex items-center justify-between">
                            <label className="font-semibold text-slate-700 flex items-center gap-1.5">
                                <ImageIcon className="w-3.5 h-3.5 text-[#0256D0]" />
                                <span>Foto / Gambar Alat (Opsional)</span>
                            </label>
                            {formData.imagePreview && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="text-[11px] text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
                                >
                                    <Trash2 className="w-3 h-3" />
                                    <span>Hapus Gambar</span>
                                </button>
                            )}
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                            onChange={handleImageChange}
                            className="hidden"
                        />

                        {formData.imagePreview ? (
                            <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-200">
                                <img
                                    src={formData.imagePreview}
                                    alt="Preview"
                                    className="w-16 h-16 object-cover rounded-md border border-slate-200 shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold text-slate-800 truncate">
                                        {formData.imageFile?.name || 'Gambar saat ini'}
                                    </p>
                                    <p className="text-[11px] text-slate-400">
                                        {formData.imageSizeText
                                            ? `${formData.imageSizeText}`
                                            : ''}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="mt-1 text-[11px] font-bold text-[#0256D0] hover:underline cursor-pointer"
                                    >
                                        Ganti Foto
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-lg bg-white hover:bg-slate-50 hover:border-[#0256D0] cursor-pointer transition-colors text-center"
                            >
                                <div className="w-9 h-9 rounded-full bg-blue-50 text-[#0256D0] flex items-center justify-center mb-1.5">
                                    <Upload className="w-4 h-4" />
                                </div>
                                <p className="text-xs font-semibold text-slate-700">
                                    Klik untuk unggah gambar perangkat
                                </p>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                    PNG, JPG, WEBP, atau SVG (Maks. 2MB)
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Baris 3: Pilihan Kategori Alat */}
                    <div className="space-y-1">
                        <label className="mb-1 block font-semibold text-slate-700">Kategori</label>
                        <div className="relative">
                            <select
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value as InventoryItem['category']
                                    })
                                }
                                className="w-full h-9 pl-3 pr-8 rounded border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-slate-800 cursor-pointer"
                            >
                                <option value="Laptop">Laptop</option>
                                <option value="Peripheral">Peripheral</option>
                                <option value="Tools">Tools</option>
                                <option value="Elektrikal">Elektrikal</option>
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* Baris 4: Pengaturan Stok Siap Pakai dan Total Fisik */}
                    <div className="space-y-1">
                        <div className="grid grid-cols-2 gap-3">
                            {/* Counter Stok Siap Pakai */}
                            <div className="space-y-1">
                                <label className="mb-1 block font-semibold text-slate-700">Stok Siap Pakai</label>
                                <div className={`flex items-center justify-between rounded border bg-white p-1 ${
                                    formData.stock !== '' && formData.total !== '' && Number(formData.stock) > Number(formData.total)
                                        ? 'border-rose-400 ring-1 ring-rose-300'
                                        : 'border-slate-200'
                                }`}>
                                    <button
                                        type="button"
                                        disabled={Number(formData.stock || 0) <= 0}
                                        onClick={() => setFormData({
                                            ...formData,
                                            stock: Math.max(0, Number(formData.stock || 0) - 1)
                                        })}
                                        className="px-3 py-1 text-slate-500 hover:text-blue-600 disabled:opacity-40 cursor-pointer"
                                    >−</button>

                                    <input
                                        type="number"
                                        min="0"
                                        max={formData.total !== '' ? Number(formData.total) : undefined}
                                        required
                                        value={formData.stock}
                                        onChange={(e) => {
                                            const val = e.target.value === '' ? '' : Math.max(0, Number(e.target.value));
                                            setFormData({ ...formData, stock: val });
                                        }}
                                        className="w-full min-w-0 bg-transparent text-center text-xs text-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => {
                                            const nextStock = Number(formData.stock || 0) + 1;
                                            setFormData({
                                                ...formData,
                                                stock: nextStock,
                                                total: formData.total !== '' && nextStock > Number(formData.total) ? nextStock : formData.total
                                            });
                                        }}
                                        className="px-3 py-1 text-slate-500 hover:text-blue-600 cursor-pointer"
                                    >+</button>
                                </div>
                            </div>

                            {/* Counter Total Fisik Unit Lab */}
                            <div className="space-y-1">
                                <label className="mb-1 block font-semibold text-slate-700">Total Unit Fisik Lab</label>
                                <div className="flex items-center justify-between rounded border border-slate-200 bg-white p-1">
                                    <button
                                        type="button"
                                        disabled={Number(formData.total || 0) <= 0}
                                        onClick={() => {
                                            const nextTotal = Math.max(0, Number(formData.total || 0) - 1);
                                            setFormData({
                                                ...formData,
                                                total: nextTotal,
                                                stock: formData.stock !== '' && Number(formData.stock) > nextTotal ? nextTotal : formData.stock
                                            });
                                        }}
                                        className="px-3 py-1 text-slate-500 hover:text-blue-600 disabled:opacity-40 cursor-pointer"
                                    >−</button>

                                    <input
                                        type="number"
                                        min="0"
                                        required
                                        value={formData.total}
                                        onChange={(e) => {
                                            const val = e.target.value === '' ? '' : Math.max(0, Number(e.target.value));
                                            setFormData({ ...formData, total: val });
                                        }}
                                        className="w-full min-w-0 bg-transparent text-center text-xs text-slate-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setFormData({
                                            ...formData,
                                            total: Number(formData.total || 0) + 1
                                        })}
                                        className="px-3 py-1 text-slate-500 hover:text-blue-600 cursor-pointer"
                                    >+</button>
                                </div>
                            </div>
                        </div>

                        {formData.stock !== '' && formData.total !== '' && Number(formData.stock) > Number(formData.total) && (
                            <p className="text-[11px] text-rose-500 font-medium pt-1">
                                Stok siap pakai ({formData.stock}) tidak boleh melebihi total unit fisik lab ({formData.total}).
                            </p>
                        )}
                    </div>

                    {/* Baris 5: Deskripsi Perangkat */}
                    <div className="space-y-1">
                        <label className="mb-1 block font-semibold text-slate-700">Deskripsi Alat</label>
                        <textarea
                            rows={2}
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Tuliskan spesifikasi umum atau panduan praktikum..."
                            className="w-full px-3 py-2 rounded border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:border-slate-800"
                        />
                    </div>

                    {/* Baris 6: Spesifikasi Teknis Dinamis */}
                    <div className="space-y-2 p-3 rounded bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between">
                            <label className="font-semibold text-slate-800 block">
                                Spesifikasi Lengkap
                            </label>
                            <button
                                type="button"
                                onClick={handleAddSpecRow}
                                className="text-[11px] font-bold text-[#0256D0] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                                <Plus className="w-3 h-3" />
                                <span>Tambah Baris</span>
                            </button>
                        </div>

                        <div className="space-y-2">
                            {formData.specs.length === 0 ? (
                                <p className="text-[11px] text-slate-400 italic py-1">
                                    Belum ada spesifikasi teknis tambahan. Klik "Tambah Baris" jika diperlukan.
                                </p>
                            ) : (
                                formData.specs.map((spec, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={spec.key}
                                            onChange={(e) => handleUpdateSpecRow(idx, 'key', e.target.value)}
                                            placeholder="Label (Processor/RAM/Port)"
                                            className="w-2/5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:border-slate-800"
                                        />
                                        <input
                                            type="text"
                                            value={spec.value}
                                            onChange={(e) => handleUpdateSpecRow(idx, 'value', e.target.value)}
                                            placeholder="Nilai (Intel i5/8 GB/USB-C)"
                                            className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSpecRow(idx)}
                                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                                            title="Hapus baris spesifikasi"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Baris 7: Sakelar Keaktifan (Visibilitas Siswa) */}
                    <div className="p-3.5 rounded border border-slate-200 bg-slate-50 flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-slate-900">Status Alat (Aktif)</p>
                            <p className="text-[11px] text-slate-500">
                                Alat berstatus aktif dapat dicari dan diajukan pinjam oleh siswa di katalog
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isVisibleToStudents}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        isVisibleToStudents: e.target.checked
                                    })
                                }
                                className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0256D0]"></div>
                        </label>
                    </div>

                    {/* Tombol Aksi Batal dan Simpan */}
                    <DialogFooter className="pt-2 flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="h-9 rounded-lg text-xs font-semibold border-slate-200"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            className="h-9 rounded-lg bg-[#0256D0] hover:bg-[#0243a4] text-white text-xs font-semibold px-4 cursor-pointer shadow-xs"
                        >
                            Simpan Perubahan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
