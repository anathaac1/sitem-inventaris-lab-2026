import type { LucideIcon } from 'lucide-react';

export interface CategoryStatItem {
    name: string;
    icon: LucideIcon;
    barColor: string;
    units: number;
    available: number;
}

interface CategoryDistributionProps {
    categoryStats: CategoryStatItem[];
    totalPhysicalUnits: number;
    isAnimated: boolean;
}

export function CategoryDistribution({
    categoryStats,
    totalPhysicalUnits,
    isAnimated
}: CategoryDistributionProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">
                    Distribusi Berdasarkan Kategori
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                    {totalPhysicalUnits} Unit
                </span>
            </div>

            <div className="space-y-4 text-xs">
                {categoryStats.map((cat) => {
                    const Icon = cat.icon;
                    const percentage = totalPhysicalUnits > 0
                        ? Math.round((cat.units / totalPhysicalUnits) * 100)
                        : 0;

                    return (
                        <div key={cat.name} className="space-y-1.5">
                            <div className="flex justify-between items-center text-slate-700 font-medium">
                                <span className="flex items-center gap-2 text-slate-800 font-semibold">
                                    <Icon className="w-3.5 h-3.5 text-slate-500" />
                                    <span>{cat.name}</span>
                                </span>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="font-bold text-slate-900 font-mono">
                                        {cat.units}
                                    </span>
                                    <span className="text-slate-400 text-[11px]">
                                        ({percentage}%)
                                    </span>
                                </div>
                            </div>

                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${cat.barColor} rounded-full transition-all duration-1000 ease-out`}
                                    style={{ width: isAnimated ? `${percentage}%` : '0%' }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
