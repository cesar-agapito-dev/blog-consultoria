import Link from "next/link"
import { getArticles } from "@/lib/strapi"

export default async function HomePage() {
  const { data: articles } = await getArticles()
  const latest = articles.slice(0, 3)

  return (
      <div>
        <h1 className="text-4xl font-bold mb-2">Bienvenido</h1>
        <p className="text-gray-500 mb-10">Últimos artículos</p>

        <div className="flex flex-col gap-8">
          {latest.map((article) => (
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
                <p className="text-gray-600 mb-3">{article.description}</p>
                <Link
                    href={`/blog/${article.slug}`}
                    className="text-sm font-medium underline"
                >
                  Leer más →
                </Link>
              </article>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/blog" className="text-sm font-medium underline">
            Ver todos los artículos →
          </Link>
        </div>
      </div>
  )
}