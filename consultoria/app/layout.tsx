import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mi Blog",
  description: "Blog personal",
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="es">
      <body className={geist.className}>
      <header className="border-b border-gray-200 py-4 px-6 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Mi Blog
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:underline">Inicio</Link>
          <Link href="/blog" className="hover:underline">Blog</Link>
        </nav>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-10">
        {children}
      </main>
      <footer className="text-center text-sm text-gray-400 py-8">
        © {new Date().getFullYear()} Mi Blog
      </footer>
      </body>
      </html>
  )
}