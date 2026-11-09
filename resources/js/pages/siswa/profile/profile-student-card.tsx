/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/profile/
 * Fungsi  : Kumpulan komponen antarmuka yang mengelola data profil, keamanan akun,
 *           dan preferensi siswa dalam aplikasi inventaris lab.
 * File    : profile-student-card.tsx
 * Fungsi  : Kartu identitas utama siswa dengan aksen warna biru khas SMKN 1,
 *           menampilkan inisial avatar profil, nama lengkap, kelas, dan username.
 * ============================================================================
 */

interface ProfileStudentCardProps {
    studentName: string;                                       // Nama lengkap siswa
    studentClass: string;                                      // Kelas siswa (misal: XII RPL A)
    studentUsername: string;                                   // Username login akun siswa
    avatarInitials: string;                                    // 2 huruf inisial avatar
}

export function ProfileStudentCard({
    studentName,
    studentClass,
    studentUsername,
    avatarInitials
}: ProfileStudentCardProps) {
    return (
        <div className="rounded-xl bg-[#0256D0] text-white p-5 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
                {/* Lingkaran Avatar Inisial Siswa */}
                <div className="w-14 h-14 rounded-full border border-white/30 bg-white/20 flex items-center justify-center text-white shrink-0 font-bold text-lg shadow-inner">
                    {avatarInitials}
                </div>

                {/* Informasi Identitas Siswa */}
                <div>
                    <h2 className="text-base font-bold text-white">{studentName}</h2>
                    <p className="text-xs text-blue-100 font-medium">{studentClass}</p>
                    <p className="text-[11px] text-blue-200 mt-0.5">
                        Username: {studentUsername}
                    </p>
                </div>
            </div>
        </div>
    );
}
