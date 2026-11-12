interface PeminjamanTabsProps {
    activeTab: 'aktif' | 'riwayat';
    onTabChange: (tab: 'aktif' | 'riwayat') => void;
    activeCount: number;
    historyCount: number;
}

export function PeminjamanTabs({
    activeTab,
    onTabChange,
    activeCount,
    historyCount
}: PeminjamanTabsProps) {
    return (
        <div className="flex border-b border-zinc-200">
            <button
                type="button"
                onClick={() => onTabChange('aktif')}
                className={`pb-2.5 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'aktif'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
            >
                <span>Aktif</span>
                <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        activeTab === 'aktif'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-zinc-100 text-zinc-600'
                    }`}
                >
                    {activeCount}
                </span>
            </button>

            <button
                type="button"
                onClick={() => onTabChange('riwayat')}
                className={`pb-2.5 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'riwayat'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
            >
                <span>Riwayat</span>
                <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        activeTab === 'riwayat'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-zinc-100 text-zinc-600'
                    }`}
                >
                    {historyCount}
                </span>
            </button>
        </div>
    );
}
