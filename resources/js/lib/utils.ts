/**
 * ============================================================================
 * Folder  : resources/js/lib/
 * Fungsi  : Direktori fungsi pembantu (helper/utility) umum yang digunakan di seluruh aplikasi frontend.
 * File    : utils.ts
 * Fungsi  : Menyediakan fungsi utilitas standar: `cn` untuk penggabungan kelas styling Tailwind CSS
 *           secara dinamis tanpa konflik, serta `toUrl` untuk normalisasi tautan Inertia.js.
 * ============================================================================
 */

import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Menggabungkan nama-nama kelas CSS (Tailwind) dengan resolusi konflik otomatis.
 * Sangat berguna ketika membuat komponen reusable yang menerima custom className dari luar.
 *
 * Contoh: cn("bg-blue-500", isError && "bg-red-500")
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Mengubah tipe nilai href InertiaLinkProps menjadi string URL murni
 */
export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}
