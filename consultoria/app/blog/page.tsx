import Link from "next/link"
import { getArticles } from "@/lib/strapi"

export const metadata = {
    title: "Blog | Mi Blog",
}

export default async function BlogPage() {
    const { data: articles, meta } = await getArticles()

    return (
        <div>
            <h1 className="text-4xl font-bold mb-2">Blog</h1>
            <p className="text-gray-400 text-sm mb-10">
                {meta.pagination.total} artículos publicados
            </p>

            <div className="flex flex-col gap-8">
                {articles.map((article) => (
                    <article key={article.id} className="border-b pb-8">
                        <p className="text-xs text-gray-400 mb-1">
                            {new Date(article.publishedAt).toLocaleDateString("es-PE", {
                                year: "numeric", month: "long", day: "numeric"
                            })}
                        </p>
                        <h2 className="text-2xl font-semibold mb-2">
                            <Link href={`/blog/${article.slug}`} className="hover:underline">
                                {article.title}
                            </Link>
                        </h2>
                        <p className="text-gray-600">{article.description}</p>
                    </article>
                ))}
            </div>
        </div>
    )
}