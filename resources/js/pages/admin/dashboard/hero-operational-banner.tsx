import { Activity } from 'lucide-react';

interface HeroOperationalBannerProps {
    availableStock: number;
    totalUnits: number;
    percentage: number;
}

export function HeroOperationalBanner({
    availableStock,
    totalUnits,
    percentage
}: HeroOperationalBannerProps) {
    return (
        <div className="relative rounded-xl bg-gradient-to-r from-[#0256D0] via-[#0448AB] to-[#0A1C38] text-white p-6 sm:p-7 shadow-xs overflow-hidden">
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-xs font-semibold text-blue-100">
                        <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        <span>Status Operasional Real-Time</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {availableStock} dari {totalUnits} Unit Siap Pakai
                    </h2>
                    <p className="text-xs text-blue-100/90 leading-relaxed">
                        Tingkat ketersediaan perangkat laboratorium saat ini mencapai {percentage}%. Semua unit siap digunakan untuk menunjang kegiatan belajar mengajar dan praktikum kejuruan RPL.
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-5 text-center min-w-[160px] shrink-0 shadow-xs">
                    <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
                        Tingkat Kesiapan
                    </span>
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono my-1 block">
                        {percentage}%
                    </span>
                    <span className="text-[11px] text-emerald-300 font-semibold inline-flex items-center gap-1 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Kondisi Normal
                    </span>
                </div>
            </div>
        </div>
    );
}
