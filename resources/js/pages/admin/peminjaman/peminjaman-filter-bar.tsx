import React from 'react';
import { ChevronDown, X } from 'lucide-react';

export interface PeminjamanFilterValues {
    borrowerName: string;
    borrowerClass: string;
    itemName: string;
    code: string;
    status: 'all' | 'active' | 'returned';
}

interface PeminjamanFilterBarProps {
    filters: PeminjamanFilterValues;
    onFilterChange: (filters: PeminjamanFilterValues) => void;
    onReset: () => void;
    onApply: () => void;
    totalCount: number;
    activeCount: number;
    returnedCount: number;
}

export const RPL_CLASSES_FILTER = [
    'Semua Kelas',
    'X RPL A',
    'X RPL B',
    'XI RPL A',
    'XI RPL B',
    'XII RPL A',
    'XII RPL B'
];

export function PeminjamanFilterBar({
    filters,
    onFilterChange,
    onReset,
    onApply
}: PeminjamanFilterBarProps) {
    const handleFieldChange = (field: keyof PeminjamanFilterValues, value: string) => {
        onFilterChange({
            ...filters,
            [field]: value
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onApply();
        }
    };

    return (
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3.5 text-xs">
                <div className="flex items-center gap-3">
                    <label className="w-32 shrink-0 font-medium text-slate-600 text-[11px] sm:text-xs">
                        Nama Siswa
                    </label>
                    <input
                        type="text"
                        placeholder="Input Nama Siswa"
                        value={filters.borrowerName}
                        onChange={(e) => handleFieldChange('borrowerName', e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 h-9 px-3 rounded border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <label className="w-32 shrink-0 font-medium text-slate-600 text-[11px] sm:text-xs">
                        Kelas
                    </label>
                    <div className="relative flex-1">
                        <select
                            value={filters.borrowerClass}
                            onChange={(e) => handleFieldChange('borrowerClass', e.target.value)}
                            className="w-full h-9 pl-3 pr-12 rounded border border-slate-300 bg-white text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0] cursor-pointer"
                        >
                            {RPL_CLASSES_FILTER.map((cls) => (
                                <option key={cls} value={cls === 'Semua Kelas' ? 'all' : cls}>
                                    {cls}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {filters.borrowerClass !== 'all' && (
                                <button
                                    type="button"
                                    onClick={() => handleFieldChange('borrowerClass', 'all')}
                                    className="p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    title="Reset Kelas"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <label className="w-32 shrink-0 font-medium text-slate-600 text-[11px] sm:text-xs">
                        Status Pinjam
                    </label>
                    <div className="relative flex-1">
                        <select
                            value={filters.status}
                            onChange={(e) => handleFieldChange('status', e.target.value)}
                            className="w-full h-9 pl-3 pr-12 rounded border border-slate-300 bg-white text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0] cursor-pointer"
                        >
                            <option value="all">Semua Status</option>
                            <option value="active">Sedang Dipinjam</option>
                            <option value="returned">Selesai Dikembalikan</option>
                        </select>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {filters.status !== 'all' && (
                                <button
                                    type="button"
                                    onClick={() => handleFieldChange('status', 'all')}
                                    className="p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    title="Reset Status Pinjam"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <label className="w-32 shrink-0 font-medium text-slate-600 text-[11px] sm:text-xs">
                        Perangkat Lab
                    </label>
                    <input
                        type="text"
                        placeholder="Masukkan Perangkat Lab"
                        value={filters.itemName}
                        onChange={(e) => handleFieldChange('itemName', e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 h-9 px-3 rounded border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <label className="w-32 shrink-0 font-medium text-slate-600 text-[11px] sm:text-xs">
                        Kode Alat
                    </label>
                    <input
                        type="text"
                        placeholder="Masukkan Kode Alat"
                        value={filters.code}
                        onChange={(e) => handleFieldChange('code', e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 h-9 px-3 rounded border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                    />
                </div>

                <div className="hidden md:block"></div>
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-4 pt-3 border-t border-slate-100">
                <button
                    type="button"
                    onClick={onApply}
                    className="h-8 px-6 rounded bg-[#0256D0] hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                >
                    Filter
                </button>
                <button
                    type="button"
                    onClick={onReset}
                    className="h-8 px-5 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
