/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/dashboard/
 * Fungsi  : Kumpulan komponen antarmuka dasbor analitik laboratorium untuk Administrator.
 * File    : class-distribution.tsx
 * Fungsi  : Menampilkan sebaran statistik jumlah alat yang sedang dipinjam oleh
 *           masing-masing kelas jurusan RPL (X RPL A/B, XI RPL A/B, XII RPL A/B).
 * ============================================================================
 */

export interface ClassStatItem {
    name: string;                                              // Nama kelas (misal: 'XII RPL A')
    active: number;                                            // Jumlah unit yang sedang dipinjam oleh kelas tersebut
}

interface ClassDistributionProps {
    classStats: ClassStatItem[];                               // Array data peminjaman per kelas
}

export function ClassDistribution({ classStats }: ClassDistributionProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
            {/* Header Sebaran Kelas */}
            <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Peminjam Per Kelas RPL</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0256D0]">
                    Kelas A & B
                </span>
            </div>

            {/* Grid Kartu Sebaran 6 Kelas RPL */}
            <div className="grid grid-cols-2 gap-2 text-xs">
                {classStats.map((cls) => (
                    <div
                        key={cls.name}
                        className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between"
                    >
                        {/* Nama Kelas */}
                        <span className="font-semibold text-slate-700 text-[11px]">
                            {cls.name}
                        </span>

                        {/* Badge Jumlah Unit Dipinjam */}
                        <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                                cls.active > 0
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-slate-200/70 text-slate-500'
                            }`}
                        >
                            {cls.active} Unit
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
