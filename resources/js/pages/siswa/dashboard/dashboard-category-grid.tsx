import type { LucideIcon } from 'lucide-react';

export interface CategoryOption {
    name: string;
    icon: LucideIcon;
}

interface DashboardCategoryGridProps {
    categories: CategoryOption[];
    selectedCategory: string;
    onSelectCategory: (name: string) => void;
}

export function DashboardCategoryGrid({
    categories,
    selectedCategory,
    onSelectCategory
}: DashboardCategoryGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                const Icon = cat.icon;
                return (
                    <button
                        key={cat.name}
                        type="button"
                        onClick={() => onSelectCategory(isSelected ? 'Semua' : cat.name)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-colors text-left ${
                            isSelected
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'bg-white border-zinc-200 text-zinc-800 hover:border-zinc-300'
                        }`}
                    >
                        <div
                            className={`w-8 h-8 rounded-md flex items-center justify-center ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                        </div>

                        <span className="text-xs font-semibold">{cat.name}</span>
                    </button>
                );
            })}
        </div>
    );
}
