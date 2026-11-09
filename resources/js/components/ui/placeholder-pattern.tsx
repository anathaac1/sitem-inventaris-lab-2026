/**
 * ============================================================================
 * Folder  : resources/js/components/ui/
 * Fungsi  : Kumpulan komponen antarmuka pengguna dasar (UI Primitives) berbasis Tailwind CSS
 *           dan Radix UI yang dapat digunakan kembali (reusable) di seluruh aplikasi inventaris lab.
 * File    : placeholder-pattern.tsx
 * Fungsi  : Komponen SVG motif latar belakang garis diagonal (Hatch Pattern) yang digunakan
 *           sebagai placeholder visual dekoratif pada container kosong atau kartu kosong.
 * ============================================================================
 */

import { useId } from 'react';

interface PlaceholderPatternProps {
    className?: string;                                        // Kelas CSS Tailwind kustom
}

export function PlaceholderPattern({ className }: PlaceholderPatternProps) {
    // Menghasilkan ID unik untuk elemen pattern SVG agar tidak konflik antar komponen
    const patternId = useId();

    return (
        <svg className={className} fill="none">
            <defs>
                {/* Definisi pola arsiran garis diagonal berulang */}
                <pattern id={patternId} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                </pattern>
            </defs>
            {/* Persegi penutup area penuh dengan arsiran pattern */}
            <rect stroke="none" fill={`url(#${patternId})`} width="100%" height="100%"></rect>
        </svg>
    );
}
