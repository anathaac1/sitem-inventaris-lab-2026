import { Search, SlidersHorizontal } from 'lucide-react';

interface DashboardSearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    isFiltered: boolean;
    onOpenFilter: () => void;
}

export function DashboardSearchBar({
    searchQuery,
    onSearchChange,
    isFiltered,
    onOpenFilter
}: DashboardSearchBarProps) {
    return (
        <div className="flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-zinc-200 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-500"
                />

                {searchQuery && (
                    <button
                        type="button"
                        onClick={() => onSearchChange('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600"
                    >
                        Clear
                    </button>
                )}
            </div>

            <button
                type="button"
                onClick={onOpenFilter}
                className={`px-3 py-2 rounded-lg border transition-colors flex items-center justify-center ${
                    isFiltered
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                }`}
                title="Filter"
            >
                <SlidersHorizontal className="w-4 h-4" />
            </button>
        </div>
    );
}
