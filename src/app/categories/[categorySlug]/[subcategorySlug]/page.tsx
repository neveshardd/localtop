interface Props {
    params: {
        categorySlug: string;
        subcategorySlug: string
    }
}

export default async function SubcategoryPage({ params }: Props) {
    const { subcategorySlug, categorySlug } = params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/subcategories/${subcategorySlug}/sections`,
        { cache: 'no-store' }
    )

    const sections = await res.json()

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold">{subcategorySlug}</h2>
            <ul className="mt-4 space-y-2">
                {sections.map((sec: any) => (
                    <li key={sec.id}>
                        <a
                            href={`/categories/${categorySlug}/${subcategorySlug}/${sec.slug}`}
                            className="block p-3 border rounded hover:bg-gray-50"
                        >
                            <h3 className="font-bold">{sec.title}</h3>
                            {sec.subtitle && <p className="text-sm text-gray-600">{sec.subtitle}</p>}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
