/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/profile/
 * Fungsi  : Kumpulan komponen antarmuka manajemen profil akun Administrator laboratorium.
 * File    : profile-banner.tsx
 * Fungsi  : Banner visual bernuansa gradien biru yang menampilkan avatar inisial, nama lengkap,
 *           unit kompetensi keahlian sekolah, dan username akun administrator.
 * ============================================================================
 */

interface ProfileBannerProps {
    adminName: string;                                         // Nama lengkap administrator
    adminUsername: string;                                     // Username akun administrator
    adminInitials: string;                                     // Inisial avatar dua huruf
}

export function ProfileBanner({ adminName, adminUsername, adminInitials }: ProfileBannerProps) {
    return (
        <div className="rounded-xl bg-gradient-to-r from-[#0256D0] via-[#0448AB] to-[#0A1C38] text-white p-5 sm:p-6 shadow-xs relative overflow-hidden">
            {/* Latar Belakang Pola Titik Dekoratif */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Konten Utama Banner: Avatar Inisial dan Identitas Akun */}
            <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    {/* Kotak Avatar Inisial Semi-Transparan */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0 font-black text-xl shadow-xs">
                        {adminInitials}
                    </div>

                    {/* Rincian Nama, Sekolah, dan Username */}
                    <div className="min-w-0">
                        <h2 className="text-base sm:text-lg font-bold text-white truncate">
                            {adminName}
                        </h2>
                        <p className="text-xs text-blue-100 font-medium">
                            Rekayasa Perangkat Lunak • SMKN 1 Kota Bekasi
                        </p>
                        <p className="text-[11px] text-blue-200 mt-0.5">
                            Username: {adminUsername}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
