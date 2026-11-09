/**
 * ============================================================================
 * Folder  : resources/js/components/ui/
 * Fungsi  : Kumpulan komponen antarmuka pengguna dasar (UI Primitives) berbasis Tailwind CSS
 *           dan Radix UI yang dapat digunakan kembali (reusable) di seluruh aplikasi inventaris lab.
 * File    : separator.tsx
 * Fungsi  : Komponen garis pemisah visual (Separator / Divider) berbasis Radix UI Separator,
 *           mendukung orientasi horizontal maupun vertikal untuk memisahkan konten antar seksi.
 * ============================================================================
 */

import * as SeparatorPrimitive from "@radix-ui/react-separator"
import * as React from "react"

import { cn } from "@/lib/utils"

// Komponen garis pemisah pembatas konten
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
