/**
 * ============================================================================
 * Folder  : resources/js/hooks/
 * Fungsi  : Kumpulan custom hook React untuk membungkus logika state, browser API, dan navigasi.
 * File    : use-appearance.tsx
 * Fungsi  : Mengatur preferensi mode tampilan visual aplikasi (tema terang, gelap, atau mengikuti sistem OS),
 *           menyimpan pilihan ke cookie & localStorage, serta menyinkronkan class 'dark' pada elemen HTML.
 * ============================================================================
 */

import { useSyncExternalStore } from 'react';

// Tipe mode tema yang sudah terpecahkan (light / dark)
export type ResolvedAppearance = 'light' | 'dark';
// Tipe opsi mode tema yang didukung
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;                          // Opsi tema yang tersimpan
    readonly resolvedAppearance: ResolvedAppearance;          // Tema aktual yang diterapkan (light/dark)
    readonly updateAppearance: (mode: Appearance) => void;     // Fungsi pengubah tema
};

const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'system';

// Mendeteksi apakah sistem operasi pengguna memakai dark mode
const prefersDark = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Menyimpan cookie mode tema agar backend Laravel dapat merender warna yang tepat sejak SSR
const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

// Mengambil pengaturan tema yang tersimpan di localStorage browser
const getStoredAppearance = (): Appearance => {
    if (typeof window === 'undefined') {
        return 'system';
    }

    return (localStorage.getItem('appearance') as Appearance) || 'system';
};

// Evaluasi apakah tema saat ini menghasilkan mode gelap
const isDarkMode = (appearance: Appearance): boolean => {
    return appearance === 'dark' || (appearance === 'system' && prefersDark());
};

// Menerapkan class CSS 'dark' dan color-scheme pada root dokumen HTML
const applyTheme = (appearance: Appearance): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const isDark = isDarkMode(appearance);

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

// Registrasi listener saat tema berubah
const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

// Memberi tahu semua komponen terdaftar bahwa tema telah berganti
const notify = (): void => listeners.forEach((listener) => listener());

// Mengambil media query browser untuk deteksi preferensi warna sistem operasi
const mediaQuery = (): MediaQueryList | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

// Handler saat preferensi tema sistem OS berubah
const handleSystemThemeChange = (): void => applyTheme(currentAppearance);

/**
 * Inisialisasi awal tema aplikasi saat app.tsx pertama kali dijalankan
 */
export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    if (!localStorage.getItem('appearance')) {
        localStorage.setItem('appearance', 'system');
        setCookie('appearance', 'system');
    }

    currentAppearance = getStoredAppearance();
    applyTheme(currentAppearance);

    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

/**
 * Hook useAppearance
 * Digunakan oleh komponen untuk membaca dan mengubah mode tampilan (Dark/Light/System)
 */
export function useAppearance(): UseAppearanceReturn {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () => currentAppearance,
        () => 'system',
    );

    const resolvedAppearance: ResolvedAppearance = isDarkMode(appearance)
        ? 'dark'
        : 'light';

    // Memperbarui mode tampilan dan menyimpannya secara permanen
    const updateAppearance = (mode: Appearance): void => {
        currentAppearance = mode;

        localStorage.setItem('appearance', mode);

        setCookie('appearance', mode);

        applyTheme(mode);
        notify();
    };

    return { appearance, resolvedAppearance, updateAppearance } as const;
}
