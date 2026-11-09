/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/profile/
 * Fungsi  : Kumpulan komponen antarmuka manajemen profil akun Administrator laboratorium.
 * File    : profile-info-card.tsx
 * Fungsi  : Kartu informasi statis rincian data kepegawaian dan organisasi administrator,
 *           mencakup nama sekolah, satuan kerja, jabatan struktural, nomor NIP, dan username login.
 * ============================================================================
 */

interface ProfileInfoCardProps {
    adminUsername: string;                                     // Username login administrator
}

export function ProfileInfoCard({ adminUsername }: ProfileInfoCardProps) {
    return (
        <div className="bg-white border border-slate-200/90 rounded divide-y divide-slate-100 text-xs shadow-2xs overflow-hidden">
            {/* Baris 1: Nama Institusi Sekolah */}
            <div className="flex justify-between py-3 px-4.5">
                <span className="text-slate-500">Sekolah</span>
                <span className="font-semibold text-slate-800">SMKN 1 Kota Bekasi</span>
            </div>

            {/* Baris 2: Satuan Kerja / Laboratorium */}
            <div className="flex justify-between py-3 px-4.5">
                <span className="text-slate-500">Satuan Kerja</span>
                <span className="font-semibold text-slate-800">Laboratorium RPL (Rekayasa Perangkat Lunak)</span>
            </div>

            {/* Baris 3: Jabatan Struktural di Laboratorium */}
            <div className="flex justify-between py-3 px-4.5">
                <span className="text-slate-500">Jabatan Struktural</span>
                <span className="font-semibold text-slate-800">Kepala Lab & Pengelola Aset</span>
            </div>

            {/* Baris 4: Nomor Identitas Pegawai (NIP) */}
            <div className="flex justify-between py-3 px-4.5">
                <span className="text-slate-500">NIP / Identitas</span>
                <span className="font-semibold text-slate-800">19820415 200801 1 012</span>
            </div>

            {/* Baris 5: Username Akun Administrator */}
            <div className="flex justify-between py-3 px-4.5">
                <span className="text-slate-500">Username Login</span>
                <span className="font-bold text-slate-800">{adminUsername}</span>
            </div>
        </div>
    );
}
