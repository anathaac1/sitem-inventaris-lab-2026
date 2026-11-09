/**
 * ============================================================================
 * Folder  : resources/js/types/
 * Fungsi  : Direktori definisi tipe data TypeScript untuk seluruh aplikasi.
 * File    : global.d.ts
 * Fungsi  : Deklarasi global TypeScript untuk memperluas modul React (atribut HTML)
 *           dan modul Inertia.js (sharedPageProps) agar props global backend dapat dibaca dengan aman.
 * ============================================================================
 */

import type { Auth } from '@/types/auth';

// Perluasan atribut elemen input React untuk dukungan passwordrules browser
declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

// Perluasan properti halaman bersama (shared page props) pada Inertia.js
declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;                     // Nama aplikasi
            auth: Auth;                       // Data autentikasi user aktif
            sidebarOpen: boolean;             // Status buka/tutup sidebar
            [key: string]: unknown;           // Menampung flash message atau prop server lainnya
        };
    }
}
