/**
 * ============================================================================
 * Folder  : resources/js/components/
 * Fungsi  : Kumpulan komponen antarmuka (UI) umum yang digunakan di berbagai bagian aplikasi.
 * File    : app-logo-icon.tsx
 * Fungsi  : Menampilkan gambar ikon logo aplikasi PinjamYuk dengan proteksi drag/select,
 *           dapat disesuaikan ukuran dan atribut gambarnya melalui props.
 * ============================================================================
 */

import type { ImgHTMLAttributes } from 'react';

/**
 * Komponen AppLogoIcon
 * Digunakan untuk menampilkan aset gambar logo tunggal (icon).
 * Cocok dipresentasikan sebagai identitas visual ringkas aplikasi pada header/sidebar.
 */
export default function AppLogoIcon({ className, alt = 'Logo PinjamYuk Lab RPL', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        // Gambar logo dari direktori public/images/app-logo.png
        <img
            src="/images/app-logo.png"
            alt={alt}
            className={`object-contain select-none ${className || ''}`}
            draggable={false}
            {...props}
        />
    );
}
