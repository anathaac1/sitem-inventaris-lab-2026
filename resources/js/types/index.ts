/**
 * ============================================================================
 * Folder  : resources/js/types/
 * Fungsi  : Direktori definisi tipe data TypeScript untuk seluruh aplikasi.
 * File    : index.ts
 * Fungsi  : Titik ekspor pusat (barrel export) yang menggabungkan seluruh tipe data
 *           dari modul auth, navigation, dan ui agar mudah diimpor dari `@/types`.
 * ============================================================================
 */

// Ekspor kembali seluruh tipe data autentikasi (User, Auth)
export type * from './auth';

// Ekspor kembali seluruh tipe data navigasi (BreadcrumbItem, NavItem)
export type * from './navigation';

// Ekspor kembali seluruh tipe data antarmuka (AppLayoutProps, FlashToast, dll)
export type * from './ui';
