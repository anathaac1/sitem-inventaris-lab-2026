/**
 * ============================================================================
 * Folder  : resources/js/components/ui/
 * Fungsi  : Kumpulan komponen antarmuka pengguna dasar (UI Primitives) berbasis Tailwind CSS
 *           dan Radix UI yang dapat digunakan kembali (reusable) di seluruh aplikasi inventaris lab.
 * File    : collapsible.tsx
 * Fungsi  : Komponen panel yang dapat dilipat/dibuka (Collapsible) berbasis Radix UI Collapsible,
 *           berguna untuk menghemat ruang vertikal layar dengan menyembunyikan konten sekunder.
 * ============================================================================
 */

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

// Komponen pembungkus utama panel lipat (Collapsible Root)
function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

// Komponen pemicu tombol klik untuk membuka/menutup panel
function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

// Komponen wadah konten yang akan disembunyikan atau ditampilkan secara dinamis
function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
