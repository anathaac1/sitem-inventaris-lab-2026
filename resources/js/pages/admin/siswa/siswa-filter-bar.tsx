import React from 'react';
import { UserPlus, ChevronDown, X } from 'lucide-react';
import { RPL_CLASSES } from '@/data/auth-store';

export interface SiswaFilterValues {
    name: string;
    username: string;
    role: 'all' | 'siswa' | 'admin';
    studentClass: string;
    nisn: string;
}

interface SiswaFilterBarProps {
    filters: SiswaFilterValues;
    onFilterChange: (filters: SiswaFilterValues) => void;
    onReset: () => void;
    onApply: () => void;
    totalAccounts: number;
    onOpenCreateModal: () => void;
}

export function SiswaFilterBar({
    filters,
    onFilterChange,
    onReset,
    onApply,
    onOpenCreateModal
}: SiswaFilterBarProps) {
    const handleFieldChange = (field: keyof SiswaFilterValues, value: string) => {
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
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Pencarian & Filter Pengguna
                </span>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onOpenCreateModal}
                        className="h-8 px-3.5 rounded bg-[#0256D0] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer shrink-0"
                    >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Tambah User Baru</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3.5 text-xs">
                <div className="flex items-center gap-3">
                    <label className="w-32 shrink-0 font-medium text-slate-600 text-[11px] sm:text-xs">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        placeholder="Masukkan Nama Lengkap"
                        value={filters.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 h-9 px-3 rounded border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <label className="w-32 shrink-0 font-medium text-slate-600 text-[11px] sm:text-xs">
                        Peran Akun
                    </label>
                    <div className="relative flex-1">
                        <select
                            value={filters.role}
                            onChange={(e) => handleFieldChange('role', e.target.value)}
                            className="w-full h-9 pl-3 pr-12 rounded border border-slate-300 bg-white text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0] cursor-pointer"
                        >
                            <option value="all">Semua Peran</option>
                            <option value="siswa">Siswa RPL</option>
                            <option value="admin">Administrator Lab</option>
                        </select>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {filters.role !== 'all' && (
                                <button
                                    type="button"
                                    onClick={() => handleFieldChange('role', 'all')}
                                    className="p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    title="Reset Peran Akun"
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
                        Kelas Siswa
                    </label>
                    <div className="relative flex-1">
                        <select
                            value={filters.studentClass}
                            onChange={(e) => handleFieldChange('studentClass', e.target.value)}
                            className="w-full h-9 pl-3 pr-12 rounded border border-slate-300 bg-white text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0] cursor-pointer"
                        >
                            <option value="all">Semua Kelas</option>
                            {RPL_CLASSES.map((cls) => (
                                <option key={cls} value={cls}>
                                    {cls}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {filters.studentClass !== 'all' && (
                                <button
                                    type="button"
                                    onClick={() => handleFieldChange('studentClass', 'all')}
                                    className="p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    title="Reset Kelas Siswa"
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
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder="Masukkan Username"
                        value={filters.username}
                        onChange={(e) => handleFieldChange('username', e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 h-9 px-3 rounded border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0]"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <label className="w-32 shrink-0 font-medium text-slate-600 text-[11px] sm:text-xs">
                        NISN
                    </label>
                    <input
                        type="text"
                        placeholder="Masukkan Nomor NISN"
                        value={filters.nisn}
                        onChange={(e) => handleFieldChange('nisn', e.target.value)}
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
