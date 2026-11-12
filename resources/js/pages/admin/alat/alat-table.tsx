import { Eye, Edit2, Trash2 } from 'lucide-react';
import type { InventoryItem } from '@/data/inventory-data';
import { ItemIllustration } from '@/components/inventory/item-illustration';

interface AlatTableProps {
    items: InventoryItem[];
    onViewDetail: (item: InventoryItem) => void;
    onEdit: (item: InventoryItem) => void;
    onDelete: (item: InventoryItem) => void;
    onToggleVisibility: (itemId: string) => void;
}

export function AlatTable({
    items,
    onViewDetail,
    onEdit,
    onDelete,
    onToggleVisibility
}: AlatTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                        <th className="py-3.5 px-5">Perangkat & Kode</th>
                        <th className="py-3.5 px-4">Kategori</th>
                        <th className="py-3.5 px-4">Ketersediaan Stok</th>
                        <th className="py-3.5 px-4 text-center">Status</th>
                        <th className="py-3.5 px-5 text-right">Opsi</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-slate-800">
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="py-12 text-center text-slate-400">
                                Tidak ada perangkat inventaris yang sesuai dengan filter.
                            </td>
                        </tr>
                    ) : (
                        items.map((item) => {
                            const isLowStock = item.stock <= 2 && item.stock > 0;
                            const isOutOfStock = item.stock === 0;
                            const isVisible = item.isVisibleToStudents !== false;

                            return (
                                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                                    <td className="py-3.5 px-5">
                                        <div className="flex items-center gap-3.5">
                                            <div
                                                onClick={() => onViewDetail(item)}
                                                className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 cursor-pointer hover:border-blue-400 transition-colors overflow-hidden"
                                                title="Klik untuk melihat detail"
                                            >
                                                {item.imageUrl ? (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <ItemIllustration type={item.iconType} className="w-6 h-6" />
                                                )}
                                            </div>

                                            <div className="min-w-0">
                                                <button
                                                    type="button"
                                                    onClick={() => onViewDetail(item)}
                                                    className="font-bold text-slate-900 text-xs block truncate hover:text-[#0256D0] text-left transition-colors cursor-pointer"
                                                >
                                                    {item.name}
                                                </button>
                                                <span className="text-[11px] text-slate-400">
                                                    {item.code}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                                        {item.category}
                                    </td>

                                    <td className="py-3.5 px-4">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`w-2 h-2 rounded-full shrink-0 ${
                                                    isOutOfStock
                                                        ? 'bg-rose-500'
                                                        : isLowStock
                                                        ? 'bg-amber-500'
                                                        : 'bg-emerald-500'
                                                }`}
                                            />
                                            <div>
                                                <span className="font-bold text-slate-900 text-xs">
                                                    {item.stock} Unit
                                                </span>
                                                <span className="text-slate-400 text-[11px] font-medium">
                                                    {' '}/ {item.total} total
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-3.5 px-4 text-center">
                                        <button
                                            type="button"
                                            onClick={() => onToggleVisibility(item.id)}
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-semibold transition-all border ${
                                                isVisible
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                                            }`}
                                            title="Klik untuk beralih status (Aktif / Tidak Aktif)"
                                        >
                                            <span>{isVisible ? 'Aktif' : 'Tidak Aktif'}</span>
                                        </button>
                                    </td>

                                    <td className="py-3.5 px-5 text-right">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => onViewDetail(item)}
                                                className="w-8 h-8 rounded-lg bg-blue-50/80 hover:bg-blue-100 text-[#0256D0] border border-blue-200/80 flex items-center justify-center transition-all cursor-pointer shadow-2xs group"
                                                title="Lihat detail spesifikasi lengkap"
                                            >
                                                <Eye className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => onEdit(item)}
                                                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 flex items-center justify-center transition-all cursor-pointer shadow-2xs group"
                                                title="Ubah data alat (memuat data saat ini)"
                                            >
                                                <Edit2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => onDelete(item)}
                                                className="w-8 h-8 rounded-lg bg-rose-50/80 hover:bg-rose-100 text-rose-600 border border-rose-200/80 flex items-center justify-center transition-all cursor-pointer shadow-2xs group"
                                                title="Hapus dari inventaris"
                                            >
                                                <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                            </button>
                                        </div>
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
