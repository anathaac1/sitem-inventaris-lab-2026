/**
 * ============================================================================
 * Folder  : resources/js/hooks/
 * Fungsi  : Kumpulan custom hook React untuk logika antarmuka dan manipulasi data.
 * File    : use-initials.tsx
 * Fungsi  : Menghasilkan 1 atau 2 huruf inisial kapital dari nama lengkap pengguna
 *           untuk ditampilkan pada lingkaran avatar pengguna ketika foto belum tersedia.
 * ============================================================================
 */

import { useCallback } from 'react';

export type GetInitialsFn = (fullName: string) => string;

// Mengambil huruf pertama dari sebuah kata
function getInitial(name: string): string {
    return Array.from(name)[0] ?? '';
}

/**
 * Hook useInitials
 * Mengembalikan fungsi pembuat inisial nama yang di-memoize
 */
export function useInitials(): GetInitialsFn {
    return useCallback((fullName: string): string => {
        // Memecah nama menjadi potongan kata dan mengabaikan spasi berlebih
        const names = fullName.trim().split(/\s+/u).filter(Boolean);

        if (names.length === 0) {
            return '';
        }

        // Jika hanya terdiri dari 1 kata, ambil 1 huruf pertama (contoh: "Admin" -> "A")
        if (names.length === 1) {
            return getInitial(names[0]).toUpperCase();
        }

        // Jika terdiri dari banyak kata, ambil huruf pertama dari kata awal & akhir (contoh: "Ahmad Rizky Pratama" -> "AP")
        const firstInitial = getInitial(names[0]);
        const lastInitial = getInitial(names[names.length - 1]);

        return `${firstInitial}${lastInitial}`.toUpperCase();
    }, []);
}
