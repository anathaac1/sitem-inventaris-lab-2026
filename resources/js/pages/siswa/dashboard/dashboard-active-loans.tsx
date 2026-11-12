import { Link } from '@inertiajs/react';
import { ChevronRight, Clock } from 'lucide-react';
import { ItemIllustration } from '@/components/inventory/item-illustration';
import type { LoanItem } from '@/data/inventory-data';

interface DashboardActiveLoansProps {
    loans: LoanItem[];
}

export function DashboardActiveLoans({ loans }: DashboardActiveLoansProps) {
    if (loans.length === 0) return null;

    return (
        <div>
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

            <div className="space-y-2">
                {loans.slice(0, 2).map((loan) => (
                    <Link
                        key={loan.id}
                        href="/peminjaman"
                        className="flex items-center justify-between p-3 rounded-lg bg-white border border-zinc-200 hover:border-blue-400 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded bg-zinc-50 flex items-center justify-center border border-zinc-100 shrink-0">
                                <ItemIllustration
                                    type={loan.itemId.includes('laptop') ? 'laptop' : 'mouse'}
                                    className="w-7 h-7"
                                />
                            </div>

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

                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
