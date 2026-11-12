import { Clock } from 'lucide-react';
import { ItemIllustration } from '@/components/inventory/item-illustration';
import type { LoanItem } from '@/data/inventory-data';

interface PeminjamanHistoryListProps {
    loans: LoanItem[];
}

export function PeminjamanHistoryList({ loans }: PeminjamanHistoryListProps) {
    if (loans.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-zinc-200 p-8">
                <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-900">
                    Belum ada riwayat pengembalian
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                    Daftar alat yang pernah kamu pinjam dan sudah dikembalikan akan tampil di sini.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {loans.map((loan) => (
                <div
                    key={loan.id}
                    className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs opacity-90 hover:opacity-100 transition-opacity"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3">
                            <div className="w-12 h-12 rounded bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                                <ItemIllustration
                                    type={loan.category?.toLowerCase() === 'laptop' || String(loan.itemId ?? '').includes('laptop') || loan.itemName?.toLowerCase().includes('laptop') ? 'laptop' : 'mouse'}
                                    className="w-8 h-8 opacity-75"
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 font-semibold">
                                        {loan.code}
                                    </span>
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold flex items-center gap-1">
                                        Dikembalikan
                                    </span>
                                </div>
                                <h3 className="text-sm font-bold text-zinc-900 mt-1">
                                    {loan.itemName}
                                </h3>
                                <p className="text-xs text-zinc-500">{loan.category}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                        <span>Pinjam: {loan.borrowDate}</span>
                        {loan.returnDate && (
                            <span className="text-emerald-600 font-medium">
                                Dikembalikan: {loan.returnDate}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
