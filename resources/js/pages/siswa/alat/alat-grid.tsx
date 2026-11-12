import { ItemIllustration } from '@/components/inventory/item-illustration';
import type { InventoryItem } from '@/data/inventory-data';

interface AlatGridProps {
    items: InventoryItem[];
    onOpenDetail: (item: InventoryItem) => void;
}

export function AlatGrid({ items, onOpenDetail }: AlatGridProps) {
    if (items.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-zinc-200 p-8">
                <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold">?</span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-900">
                    Tidak ada alat yang ditemukan
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                    Coba sesuaikan kata kunci pencarian atau ubah filter kategori dan status ketersediaan.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {items.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenDetail(item)}
                    className="flex flex-col items-center justify-between p-3.5 rounded-xl bg-white border border-zinc-200 hover:border-blue-500 transition-all text-center group cursor-pointer shadow-2xs hover:shadow-sm"
                >
                    <div className="w-full aspect-[4/3] rounded-lg bg-zinc-50 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform overflow-hidden">
                        {item.imageUrl ? (
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            <ItemIllustration type={item.iconType} className="w-16 h-12" />
                        )}
                    </div>

                    <div className="w-full">
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500 font-semibold inline-block mb-1">
                            {item.code}
                        </span>
                        <h4 className="text-xs font-bold text-zinc-900 truncate">
                            {item.name}
                        </h4>
                        <div className="flex items-center justify-center gap-1.5 mt-1.5">
                            <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                    item.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'
                                }`}
                            />
                            <p
                                className={`text-[11px] font-medium ${
                                    item.stock > 0 ? 'text-emerald-600' : 'text-red-500'
                                }`}
                            >
                                {item.stock > 0 ? `${item.stock} Tersedia` : 'Habis Dipinjam'}
                            </p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}
