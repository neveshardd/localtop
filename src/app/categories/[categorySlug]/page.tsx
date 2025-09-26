import Link from "next/link"
import { notFound } from "next/navigation"

interface Subcategory {
  id: number
  name: string
  slug: string
}

interface Props {
  params: { categorySlug: string }
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/categories/${categorySlug}/subcategories`,
    { cache: 'no-store' }
  )

  if (!res.ok) return notFound()

  const subcategories: Subcategory[] = await res.json()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold capitalize">{categorySlug}</h1>
      <ul className="mt-4 space-y-2">
        {subcategories.map(sub => (
          <li key={sub.id}>
            <Link
              href={`/categories/${categorySlug}/${sub.slug}`}
              className="text-blue-600 hover:underline"
            >
              {sub.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
