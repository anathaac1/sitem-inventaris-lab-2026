/**
 * ============================================================================
 * Folder  : resources/js/components/
 * Fungsi  : Kumpulan komponen antarmuka (UI) umum yang digunakan di berbagai bagian aplikasi.
 * File    : app-logo.tsx
 * Fungsi  : Menampilkan logo lengkap aplikasi berupa kombinasi ikon PinjamYuk dan teks identitas
 *           "PinjamYuk! Lab RPL SMKN 1 Kota Bekasi" untuk branding header atau navigasi.
 * ============================================================================
 */

import AppLogoIcon from '@/components/app-logo-icon';

/**
 * Komponen AppLogo
 * Digunakan sebagai identitas visual utama pada navbar atau menu login.
 * Memadukan kotak ikon berlatar biru muda dengan teks nama aplikasi & instansi.
 */
export default function AppLogo() {
    return (
        <div className="flex items-center gap-2.5">
            {/* Wadah ikon logo dengan styling rounded dan aksen border biru */}
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-200/80 p-1 shadow-xs">
                <AppLogoIcon className="size-7" />
            </div>

            {/* Bagian teks: Nama aplikasi dan unit laboratorium */}
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
