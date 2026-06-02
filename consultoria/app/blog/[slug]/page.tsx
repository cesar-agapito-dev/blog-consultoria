import { getArticleBySlug, getArticles } from "@/lib/strapi"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
    const { data: articles } = await getArticles()
    return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>  // ✅ Promise
}) {
    const { slug } = await params       // ✅ await
    const article = await getArticleBySlug(slug)
    if (!article) return {}
    return {
        title: `${article.title} | Mi Blog`,
        description: article.description,
    }
}

export default async function ArticlePage({
                                              params,
                                          }: {
    params: Promise<{ slug: string }>  // ✅ Promise
}) {
    const { slug } = await params       // ✅ await
    const article = await getArticleBySlug(slug)
    if (!article) notFound()

    return (
        <article>
            <p className="text-xs text-gray-400 mb-2">
                {new Date(article.publishedAt).toLocaleDateString("es-PE", {
                    year: "numeric", month: "long", day: "numeric",
                })}
            </p>

            {article.category && (
                <span className="text-xs font-medium uppercase tracking-wide text-blue-500">
                    {article.category.name}
                </span>
            )}

            <h1 className="text-4xl font-bold mt-2 mb-4">{article.title}</h1>
            <p className="text-gray-500 text-lg mb-8">{article.description}</p>

            <div className="prose prose-neutral max-w-none">
                <p className="text-gray-400 italic">
                    (Contenido completo próximamente)
                </p>
            </div>
        </article>
    )
}