/**
 * ============================================================================
 * Folder  : resources/js/hooks/
 * Fungsi  : Kumpulan custom hook React untuk logika antarmuka dan browser API.
 * File    : use-mobile.tsx
 * Fungsi  : Mendeteksi apakah ukuran viewport layar pengguna berada di bawah ambang batas mobile (lebar < 768px)
 *           menggunakan matchMedia dan useSyncExternalStore untuk tampilan responsif.
 * ============================================================================
 */

import { useSyncExternalStore } from 'react';

// Ambang batas ukuran layar mobile (768px / breakpoint 'md' di Tailwind)
const MOBILE_BREAKPOINT = 768;

const mql =
    typeof window === 'undefined'
        ? undefined
        : window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

// Memasang listener terhadap perubahan ukuran jendela browser (resize event)
function mediaQueryListener(callback: (event: MediaQueryListEvent) => void) {
    if (!mql) {
        return () => {};
    }

    mql.addEventListener('change', callback);

    return () => {
        mql.removeEventListener('change', callback);
    };
}

// Cek apakah lebar layar saat ini lebih kecil dari 768px
function isSmallerThanBreakpoint(): boolean {
    return mql?.matches ?? false;
}

// Nilai default awal saat proses Server-Side Rendering (SSR)
function getServerSnapshot(): boolean {
    return false;
}

/**
 * Hook useIsMobile
 * Mengembalikan nilai boolean `true` jika pengguna membuka aplikasi lewat layar ponsel/smartphone
 */
export function useIsMobile(): boolean {
    return useSyncExternalStore(
        mediaQueryListener,
        isSmallerThanBreakpoint,
        getServerSnapshot,
    );
}
