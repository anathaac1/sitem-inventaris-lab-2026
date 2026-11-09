/**
 * ============================================================================
 * Folder  : resources/js/components/ui/
 * Fungsi  : Kumpulan komponen antarmuka pengguna dasar (UI Primitives) berbasis Tailwind CSS
 *           dan Radix UI yang dapat digunakan kembali (reusable) di seluruh aplikasi inventaris lab.
 * File    : input.tsx
 * Fungsi  : Komponen masukan teks formulir (Input) serbaguna dengan styling seragam,
 *           efek fokus cincin biru, penanganan status disabled, serta indikator validasi error.
 * ============================================================================
 */

import * as React from "react"

import { cn } from "@/lib/utils"

// Komponen Input field standar aplikasi
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
