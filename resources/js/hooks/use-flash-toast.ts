/**
 * ============================================================================
 * Folder  : resources/js/hooks/
 * Fungsi  : Kumpulan custom hook React untuk logika antarmuka dan browser API.
 * File    : use-flash-toast.ts
 * Fungsi  : Mendengarkan event flash messages dari respon server Laravel Inertia,
 *           kemudian otomatis memunculkan notifikasi toast (Sonner) seperti sukses, info, atau error.
 * ============================================================================
 */

import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { FlashToast } from '@/types/ui';

/**
 * Hook useFlashToast
 * Memasang pendengar event 'flash' dari router Inertia secara otomatis
 */
export function useFlashToast(): void {
    useEffect(() => {
        // Mencegat paket data flash yang dikirimkan bersama response HTTP dari controller Laravel
        return router.on('flash', (event) => {
            const flash = (event as CustomEvent).detail?.flash;
            const data = flash?.toast as FlashToast | undefined;

            if (!data) {
                return;
            }

            // Memanggil toast Sonner berdasarkan tipe (success, error, warning, info)
            toast[data.type](data.message);
        });
    }, []);
}
