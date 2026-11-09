/**
 * ============================================================================
 * Folder  : resources/js/types/
 * Fungsi  : Direktori definisi tipe data TypeScript untuk seluruh aplikasi.
 * File    : navigation.ts
 * Fungsi  : Mendefinisikan struktur data untuk elemen navigasi antarmuka, seperti
 *           jejak halaman (BreadcrumbItem) dan item menu samping/navbar (NavItem).
 * ============================================================================
 */

import type { InertiaLinkProps } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';

/**
 * Tipe data satu butir remah roti / jejak navigasi halaman (Breadcrumb)
 */
export type BreadcrumbItem = {
    title: string;                            // Label teks jejak halaman
    href: NonNullable<InertiaLinkProps['href']>; // Alamat URL tujuan
};

/**
 * Tipe data item menu navigasi (sidebar / navbar)
 */
export type NavItem = {
    title: string;                            // Judul menu yang ditampilkan
    href: NonNullable<InertiaLinkProps['href']>; // Alamat tautan menu
    icon?: LucideIcon | null;                 // Ikon Lucide untuk menu (opsional)
    isActive?: boolean;                       // Penanda status menu sedang aktif dikunjungi
};
