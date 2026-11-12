import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-2.5">
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-200/80 p-1 shadow-xs">
                <AppLogoIcon className="size-7" />
            </div>

            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-extrabold text-slate-900">
                    Pinjam<span className="text-[#0256D0]">Yuk!</span>
                </span>
                <span className="truncate text-[10px] text-slate-500 font-semibold">
                    Lab RPL SMKN 1 Kota Bekasi
                </span>
            </div>
        </div>
    );
}
