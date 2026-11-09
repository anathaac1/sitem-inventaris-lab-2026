/**
 * ============================================================================
 * Folder  : resources/js/types/
 * Fungsi  : Direktori definisi tipe data TypeScript untuk seluruh aplikasi.
 * File    : ui.ts
 * Fungsi  : Mendefinisikan tipe-tipe data umum yang digunakan oleh komponen antarmuka pengguna (UI),
 *           seperti props layout utama, pesan flash toast, varian layout, dan auth layout.
 * ============================================================================
 */

import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/types/navigation';

/**
 * Properti untuk layout utama aplikasi
 */
export type AppLayoutProps = {
    children: ReactNode;                      // Komponen konten halaman di dalam layout
    breadcrumbs?: BreadcrumbItem[];           // Daftar jejak tautan halaman di header
};

/**
 * Pilihan varian struktur layout: bilah atas (header) atau bilah samping (sidebar)
 */
export type AppVariant = 'header' | 'sidebar';

/**
 * Struktur data notifikasi kilat (flash toast) yang dikirim dari backend Laravel
 */
export type FlashToast = {
    type: 'success' | 'info' | 'warning' | 'error'; // Tipe kategori notifikasi
    message: string;                                // Isi pesan notifikasi
};

/**
 * Properti untuk layout halaman autentikasi (login / register)
 */
export type AuthLayoutProps = {
    children?: ReactNode;                     // Konten formulir autentikasi
    name?: string;                            // Nama instansi / sistem
    title?: string;                           // Judul halaman login
    description?: string;                     // Deskripsi singkat arahan login
};
