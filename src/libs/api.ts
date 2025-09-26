export async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/categories`,
        { next: { revalidate: 60 } }
    )

    if(!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
}