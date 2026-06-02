const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL
const TOKEN = process.env.STRAPI_API_TOKEN

const headers = {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
}

// --- Tipos ---
export interface Article {
    id: number
    documentId: string
    title: string
    description: string
    slug: string
    cover?: {
        url: string
        alternativeText?: string
    }
    category?: {
        name: string
        slug: string
    }
    publishedAt: string
    createdAt: string
}

export interface PaginationMeta {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

// --- Funciones ---
export async function getArticles(): Promise<{
    data: Article[]
    meta: { pagination: PaginationMeta }
}> {
    const res = await fetch(
        `${BASE_URL}/api/articles?populate[0]=cover&populate[1]=category&sort=publishedAt:desc`,
        { headers, next: { revalidate: 60 } }
    )
    if (!res.ok) {
        const text = await res.text()
        throw new Error(`Error ${res.status}: ${text}`)
    }
    return res.json()
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
    if (!slug) return null

    const params = new URLSearchParams({
        "filters[slug][$eq]": slug,
        "populate[0]": "cover",
        "populate[1]": "category",
    })

    const res = await fetch(
        `${BASE_URL}/api/articles?${params}`,
        { headers, next: { revalidate: 60 } }
    )
    if (!res.ok) return null
    const json = await res.json()
    return json.data?.[0] ?? null
}

export async function getCategories() {
    const res = await fetch(
        `${BASE_URL}/api/categories`,
        { headers, next: { revalidate: 300 } }
    )
    if (!res.ok) return []
    const json = await res.json()
    return json.data
}