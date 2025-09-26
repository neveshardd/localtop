import { notFound } from "next/navigation"

interface Props {
  params: {
    categorySlug: string
    subcategorySlug: string
    sectionSlug: string
  }
}

export default async function SectionPage({ params }: Props) {
  const { categorySlug, subcategorySlug, sectionSlug } = params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/sections/${sectionSlug}`,
    { cache: "no-store" }
  )

  if (!res.ok) return notFound()
  const section = await res.json()

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{section.title}</h1>
      {section.subtitle && (
        <p className="text-lg text-gray-600 mb-4">{section.subtitle}</p>
      )}
      <p className="text-sm text-gray-500">
        Categoria: {categorySlug} / Subcategoria: {subcategorySlug}
      </p>
      {/* Conteúdo adicional da section */}
    </div>
  )
}
