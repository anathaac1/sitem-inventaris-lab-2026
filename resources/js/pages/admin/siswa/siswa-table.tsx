/**
 * ============================================================================
 * Folder  : resources/js/pages/admin/siswa/
 * Fungsi  : Kumpulan komponen antarmuka manajemen akun pengguna lab (Siswa & Administrator) untuk Administrator.
 * File    : siswa-table.tsx
 * Fungsi  : Tabel visual penyajian akun pengguna, menampilkan inisial avatar profil, nama lengkap,
 *           peran (Siswa/Admin), kelas/penugasan, username login (dengan tombol salin), NISN, kontak surel, serta tombol beri password baru.
 * ============================================================================
 */

import { Copy } from 'lucide-react';
import type { UserAccount } from '@/data/auth-store';

interface SiswaTableProps {
    students: UserAccount[];                                   // Daftar akun pengguna pada halaman aktif
    revealedPasswords: Record<string, boolean>;                // Kamus status password yang terlihat
    onTogglePasswordReveal: (username: string) => void;        // Handler beralih visibilitas password
    onCopy: (text: string, label: string) => void;             // Handler salin ke papan klip
    onOpenResetModal: (student: UserAccount) => void;          // Handler membuka dialog reset kata sandi
}

export function SiswaTable({
    students,
    onCopy,
    onOpenResetModal
}: SiswaTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
                {/* Header Kolom Tabel Akun */}
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                        <th className="py-3.5 px-5">Pengguna & Peran</th>
                        <th className="py-3.5 px-4">Username Login</th>
                        <th className="py-3.5 px-4">NISN & Kontak</th>
                        <th className="py-3.5 px-4 text-center">Status Akun</th>
                        <th className="py-3.5 px-5 text-right">Tindakan Admin</th>
                    </tr>
                </thead>

                {/* Tubuh Baris Akun Pengguna */}
                <tbody className="divide-y divide-slate-100 text-slate-800">
                    {students.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-12 text-center text-slate-400">
                                Tidak ada data akun pengguna yang cocok dengan filter pencarian.
                            </td>
                        </tr>
                    ) : (
                        students.map((student) => {
                            const isAdmin = student.role === 'admin';
                            return (
                                <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                                    {/* Kolom 1: Avatar Inisial, Nama Lengkap & Peran/Kelas */}
                                    <td className="py-3.5 px-5">
                                        <div className="flex items-center gap-3">
                                            {/* Lingkaran Avatar */}
                                            <div className={`w-8 h-8 rounded font-bold text-xs flex items-center justify-center shrink-0 border shadow-2xs ${
                                                isAdmin
                                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                                    : 'bg-blue-50 text-[#0256D0] border-blue-200/60'
                                            }`}>
                                                {student.avatar || student.name.substring(0, 2).toUpperCase()}
                                            </div>

                                            {/* Nama Pengguna & Badge Peran */}
                                            <div className="min-w-0">
                                                <span className="font-bold text-slate-900 block truncate">
                                                    {student.name}
                                                </span>
                                                <span className={`text-[11px] font-semibold px-1.5 py-0.2 border inline-block mt-0.5 rounded ${
                                                    isAdmin
                                                        ? 'text-purple-700 bg-purple-50 border-purple-200'
                                                        : 'text-blue-700 bg-blue-50 border-blue-200/60'
                                                }`}>
                                                    {student.class}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Kolom 2: Username Login & Tombol Salin */}
                                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                                        <div className="flex items-center gap-1.5">
                                            <span>{student.username}</span>
                                            <button
                                                type="button"
                                                onClick={() => onCopy(student.username, 'Username')}
                                                title="Salin Username"
                                                className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                                            >
                                                <Copy className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </td>

                                    {/* Kolom 3: Nomor NISN & Alamat Email */}
                                    <td className="py-3.5 px-4 text-slate-500 text-[11px] space-y-0.5">
                                        <p>NISN: {student.nisn || '-'}</p>
                                        <p>{student.email}</p>
                                    </td>

                                    {/* Kolom 4: Badge Status Keaktifan Akun */}
                                    <td className="py-3.5 px-4 text-center">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                            <span>Aktif</span>
                                        </span>
                                    </td>

                                    {/* Kolom 5: Tombol Aksi Beri Password Baru */}
                                    <td className="py-3.5 px-5 text-right">
                                        <button
                                            type="button"
                                            onClick={() => onOpenResetModal(student)}
                                            className="h-8 px-3 rounded bg-blue-50/80 hover:bg-blue-100 text-[#0256D0] border border-blue-200/80 text-xs font-bold flex items-center gap-1.5 ml-auto transition-all cursor-pointer shadow-2xs group"
                                            title="Atur ulang kata sandi untuk pengguna ini"
                                        >
                                            <span>Beri Password Baru</span>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}
