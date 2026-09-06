import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock, User, Tag, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function renderContent(content: string) {
  return content.split("\n").map((line) => {
    if (line.startsWith("## "))
      return `<h2 class="font-barlow font-bold text-2xl uppercase text-white mt-8 mb-4">${line.slice(3)}</h2>`;
    if (line.startsWith("### "))
      return `<h3 class="font-barlow font-semibold text-xl uppercase text-amber-500 mt-6 mb-3">${line.slice(4)}</h3>`;
    if (line.startsWith("**") && line.endsWith("**"))
      return `<p class="font-semibold text-white mb-2">${line.slice(2, -2)}</p>`;
    if (line.startsWith("- "))
      return `<li class="text-gray-300 mb-1.5 flex gap-2"><span class="text-amber-500 mt-1.5 flex-shrink-0">▪</span><span>${line.slice(2)}</span></li>`;
    if (line.match(/^\d+\.\s/))
      return `<li class="text-gray-300 mb-1.5 flex gap-2"><span class="text-amber-500 flex-shrink-0">${line.match(/^\d+/)?.[0]}.</span><span>${line.replace(/^\d+\.\s/, "")}</span></li>`;
    if (line.startsWith("|") && line.includes("|"))
      return `<div class="overflow-x-auto my-4"><table class="w-full text-sm border border-steel-700 rounded"><tr>${line.split("|").filter(Boolean).map((cell) => `<td class="px-4 py-2 border border-steel-700 text-gray-300">${cell.trim()}</td>`).join("")}</tr></table></div>`;
    if (line.trim() === "") return `<div class="mb-3"></div>`;
    return `<p class="text-gray-300 leading-relaxed mb-3">${line}</p>`;
  }).join("");
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="bg-steel-950 border-b border-steel-800 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "Блог", href: "/blog" }, { label: post.category }]} />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded">{post.category}</span>
            <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> {post.readTime} минут чтения</span>
          </div>

          <h1 className="font-barlow font-bold text-4xl md:text-5xl uppercase text-white leading-tight mb-6">{post.title}</h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-2xl">{post.excerpt}</p>

          <div className="flex items-center gap-4 pt-6 border-t border-steel-800">
            <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={18} className="text-amber-500" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">{post.author}</div>
              <div className="text-gray-500 text-xs">{post.authorRole}</div>
            </div>
            <div className="ml-auto text-gray-500 text-sm">
              {new Date(post.date).toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <article className="lg:col-span-3">
            <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} />

            <div className="mt-10 pt-6 border-t border-steel-800">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-gray-500">Теги:</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-xs px-2.5 py-1 bg-steel-800 border border-steel-700 rounded text-gray-400">
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link href="/blog" className="flex items-center gap-2 text-amber-500 hover:text-amber-400 text-sm transition-colors">
                <ArrowLeft size={16} /> Назад к статьям
              </Link>
            </div>
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-steel-800 border border-steel-700 rounded-lg p-5">
                <h3 className="font-barlow font-bold text-lg uppercase text-white mb-3">Нужна запчасть?</h3>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">Подберём компоненты под ваше оборудование. Опыт — 16 лет.</p>
                <Link href="/catalog" className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-steel-900 font-semibold rounded text-sm transition-colors">
                  Открыть каталог
                </Link>
                <a href="tel:+77272001122" className="flex items-center justify-center gap-2 w-full px-4 py-2.5 mt-2 bg-steel-700 hover:bg-steel-600 text-gray-200 rounded text-sm transition-colors">
                  Позвонить
                </a>
              </div>

              {related.length > 0 && (
                <div className="bg-steel-800 border border-steel-700 rounded-lg p-5">
                  <h3 className="font-barlow font-bold text-lg uppercase text-white mb-3">Похожие статьи</h3>
                  <div className="space-y-3">
                    {related.map((p) => (
                      <Link key={p.id} href={`/blog/${p.slug}`} className="block group">
                        <div className="text-xs text-amber-500/70 mb-1">{p.category}</div>
                        <div className="text-sm text-gray-300 group-hover:text-white transition-colors leading-snug line-clamp-2">{p.title}</div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Clock size={10} /> {p.readTime} мин</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
