/**
 * ============================================================================
 * Folder  : resources/js/components/ui/
 * Fungsi  : Kumpulan komponen antarmuka pengguna dasar (UI Primitives) berbasis Tailwind CSS
 *           dan Radix UI yang dapat digunakan kembali (reusable) di seluruh aplikasi inventaris lab.
 * File    : skeleton.tsx
 * Fungsi  : Komponen kerangka pemuatan (Skeleton Loader) beranimasi denyut (pulse) untuk
 *           memberikan indikasi visual placeholder saat data asinkron sedang dimuat dari server.
 * ============================================================================
 */

import { cn } from "@/lib/utils"

// Komponen placeholder pemuatan dengan efek animasi pulse
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-primary/10 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
