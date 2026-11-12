import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/data/inventory-data';

interface FilterSheetProps {
    open?: boolean;
    isOpen?: boolean;
    onClose: () => void;
    selectedCategory: string;
    onSelectCategory: (cat: string) => void;
    selectedStatus: string;
    onSelectStatus: (status: string) => void;
    onApply?: () => void;
    onReset?: () => void;
}

export function FilterSheet({
    open,
    isOpen,
    onClose,
    selectedCategory,
    onSelectCategory,
    selectedStatus,
    onSelectStatus,
    onApply,
    onReset,
}: FilterSheetProps) {
    const isSheetOpen = open ?? isOpen ?? false;
    const statuses = ['Semua', 'Tersedia', 'Dipinjam'];

    return (
        <Dialog open={isSheetOpen} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="max-w-md w-full p-6 rounded-3xl bg-white border border-zinc-200 shadow-xl">
                <DialogHeader className="flex flex-row items-center justify-between pb-3 border-b border-zinc-100">
                    <DialogTitle className="text-lg font-bold text-zinc-900">
                        Filter
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-zinc-800 mb-3">
                            Kategori
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => {
                                const active = selectedCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => onSelectCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                            active
                                                ? 'bg-blue-600 text-white shadow-sm'
                                                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-800 mb-3">
                            Status
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {statuses.map((st) => {
                                const active = selectedStatus === st;
                                return (
                                    <button
                                        key={st}
                                        type="button"
                                        onClick={() => onSelectStatus(st)}
                                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                            active
                                                ? 'bg-blue-600 text-white shadow-sm'
                                                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                        }`}
                                    >
                                        {st}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                    {onReset && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onReset}
                            className="w-1/3 py-5 rounded-2xl bg-white border-zinc-200 text-zinc-700 font-semibold text-sm cursor-pointer"
                        >
                            Reset
                        </Button>
                    )}
                    <Button
                        type="button"
                        onClick={() => {
                            if (onApply) onApply();
                            onClose();
                        }}
                        className="flex-1 py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm cursor-pointer"
                    >
                        Terapkan
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
