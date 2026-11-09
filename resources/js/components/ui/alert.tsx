/**
 * ============================================================================
 * Folder  : resources/js/components/ui/
 * Fungsi  : Kumpulan komponen antarmuka pengguna dasar (UI Primitives) berbasis Tailwind CSS
 *           dan Radix UI yang dapat digunakan kembali (reusable) di seluruh aplikasi inventaris lab.
 * File    : alert.tsx
 * Fungsi  : Komponen kotak peringatan (Alert) untuk menyampaikan pesan informasi penting,
 *           peringatan kesalahan sistem, atau instruksi operasional kepada pengguna.
 * ============================================================================
 */

import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

// Variasi styling visual komponen Alert menggunakan CVA (Class Variance Authority)
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "text-destructive-foreground [&>svg]:text-current *:data-[slot=alert-description]:text-destructive-foreground/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Komponen pembungkus utama kotak notifikasi/alert
function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

// Komponen judul pesan pada alert
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

// Komponen teks deskripsi penjelas pada alert
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
