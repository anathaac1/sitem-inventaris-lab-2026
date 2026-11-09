/**
 * ============================================================================
 * Folder  : resources/js/hooks/
 * Fungsi  : Kumpulan custom hook React untuk logika antarmuka dan browser API.
 * File    : use-mobile-navigation.ts
 * Fungsi  : Membersihkan properti CSS 'pointer-events' pada elemen body setelah menu
 *           navigasi mobile atau drawer ditutup agar interaksi klik layar tidak macet.
 * ============================================================================
 */

import { useCallback } from 'react';

export type CleanupFn = () => void;

/**
 * Hook useMobileNavigation
 * Memastikan interaksi klik normal kembali setelah navigasi mobile selesai digunakan
 */
export function useMobileNavigation(): CleanupFn {
    return useCallback(() => {
        document.body.style.removeProperty('pointer-events');
    }, []);
}
