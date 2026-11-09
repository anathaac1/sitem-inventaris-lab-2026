/**
 * ============================================================================
 * Folder  : resources/js/
 * Fungsi  : Direktori utama kode frontend (React + TypeScript + Inertia.js).
 * File    : app.tsx
 * Fungsi  : Titik masuk (entry point) aplikasi frontend. Menginisialisasi Inertia.js,
 *           mengatur judul halaman (title), merender komponen halaman dinamis,
 *           serta menyediakan provider global (TooltipProvider & Toaster notifikasi).
 * ============================================================================
 */

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';

// Nama aplikasi yang diambil dari konfigurasi environment (.env)
const appName = import.meta.env.VITE_APP_NAME || 'Pinjam Yuk!';

// Inisialisasi client-side aplikasi Inertia.js
void createInertiaApp({
    // Menentukan format judul halaman pada browser tab
    title: (title) => (title ? `${title} - ${appName}` : appName),

    // Resolusi otomatis komponen halaman berdasarkan nama yang dikirim dari controller Laravel
    resolve: (name) =>
        resolvePageComponent(
            [`./pages/${name}.tsx`, `./pages/${name}/index.tsx`],
            import.meta.glob('./pages/**/*.tsx')
        ) as Promise<any>,

    layout: () => null,
    strictMode: true,

    // Membungkus seluruh halaman dengan provider global untuk tooltip dan popup toast notifikasi
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },

    // Garis progres warna biru di bagian atas saat navigasi antar halaman
    progress: {
        color: '#2563EB',
    },
});

// Menjalankan pengecekan dan penerapan tema tampilan (terang / gelap) saat aplikasi pertama kali dimuat
initializeTheme();
