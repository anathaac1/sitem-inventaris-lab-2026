/**
 * ============================================================================
 * Folder  : resources/js/components/ui/
 * Fungsi  : Kumpulan komponen antarmuka pengguna dasar (UI Primitives) berbasis Tailwind CSS
 *           dan Radix UI yang dapat digunakan kembali (reusable) di seluruh aplikasi inventaris lab.
 * File    : sonner.tsx
 * Fungsi  : Komponen kontainer notifikasi mengambang (Toast Notification) berbasis pustaka Sonner,
 *           terintegrasi dengan penyesuaian tema visual sistem serta hook flash message Laravel Inertia.
 * ============================================================================
 */

import { useFlashToast } from '@/hooks/use-flash-toast';
import { useAppearance } from '@/hooks/use-appearance';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

// Komponen penampil notifikasi toast di sudut layar
function Toaster({ ...props }: ToasterProps) {
    // Mendapatkan tema aktif (light / dark / system)
    const { appearance } = useAppearance();

    // Hook untuk mendeteksi pesan flash dari sesi Laravel backend dan menampilkannya sebagai toast
    useFlashToast();

    return (
        <Sonner
            theme={appearance}
            className="toaster group"
            position="bottom-right"
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                } as React.CSSProperties
            }
            {...props}
        />
    );
}

export { Toaster };
