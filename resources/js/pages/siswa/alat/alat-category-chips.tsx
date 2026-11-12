interface AlatCategoryChipsProps {
    categories: readonly string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export function AlatCategoryChips({
    categories,
    selectedCategory,
    onSelectCategory
}: AlatCategoryChipsProps) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => onSelectCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                            isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                        }`}
                    >
                        {cat}
                    </button>
                );
            })}
        </div>
    );
}
