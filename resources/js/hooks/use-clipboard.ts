/**
 * ============================================================================
 * Folder  : resources/js/hooks/
 * Fungsi  : Kumpulan custom hook React untuk logika antarmuka dan browser API.
 * File    : use-clipboard.ts
 * Fungsi  : Menyediakan fungsi penyalinan teks ke papan klip (clipboard) browser
 *           dengan penanganan kesalahan otomatis serta status teks yang berhasil disalin.
 * ============================================================================
 */

import { useState } from 'react';

export type CopiedValue = string | null;
export type CopyFn = (text: string) => Promise<boolean>;
export type UseClipboardReturn = [CopiedValue, CopyFn];

/**
 * Hook useClipboard
 * Mengembalikan array berpasangan [teksTersalin, fungsiSalin]
 */
export function useClipboard(): UseClipboardReturn {
    // State teks yang sedang berada di clipboard
    const [copiedText, setCopiedText] = useState<CopiedValue>(null);

    // Fungsi asinkron untuk menyalin string teks ke papan klip
    const copy: CopyFn = async (text) => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported');

            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);

            return true;
        } catch (error) {
            console.warn('Copy failed', error);
            setCopiedText(null);

            return false;
        }
    };

    return [copiedText, copy];
}
