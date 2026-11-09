/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/alat/
 * Fungsi  : Kumpulan komponen antarmuka yang menyusun halaman katalog peralatan lab versi siswa.
 * File    : alat-category-chips.tsx
 * Fungsi  : Menampilkan deretan filter berbentuk pil/chip horizontal yang dapat digeser (scrollable)
 *           untuk menyaring katalog berdasarkan kategori alat (Semua, Laptop, Peripheral, Tools, Elektrikal).
 * ============================================================================
 */

interface AlatCategoryChipsProps {
    categories: readonly string[];                            // Daftar nama kategori alat
    selectedCategory: string;                                 // Kategori yang sedang aktif dipilih
    onSelectCategory: (category: string) => void;             // Callback ketika chip kategori ditekan
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
