/**
 * ============================================================================
 * Folder  : resources/js/components/ui/
 * Fungsi  : Kumpulan komponen antarmuka pengguna dasar (UI Primitives) berbasis Tailwind CSS
 *           dan Radix UI yang dapat digunakan kembali (reusable) di seluruh aplikasi inventaris lab.
 * File    : spinner.tsx
 * Fungsi  : Komponen indikator animasi berputar (Loading Spinner) berbasis ikon Lucide Loader2Icon
 *           untuk menunjukkan proses kerja latar belakang atau pengiriman formulir sedang berlangsung.
 * ============================================================================
 */

import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

// Komponen ikon pemuatan berputar (Spinner)
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
