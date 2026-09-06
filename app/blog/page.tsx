"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, User, ChevronRight, Search, BookOpen, Tag } from "lucide-react";
import { blogPosts, blogCategories } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Все статьи");
  const [search, setSearch] = useState("");

  const filtered = blogPosts.filter((post) => {
    const matchesCat = activeCategory === "Все статьи" || post.category === activeCategory;
    const matchesSearch = !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen">
      <div className="bg-steel-950 border-b border-steel-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-4"><Breadcrumbs items={[{ label: "Блог" }]} /></div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-barlow font-bold text-4xl uppercase text-white mb-2">Технический блог</h1>
              <p className="text-gray-400 text-sm max-w-lg">Статьи для инженеров: подбор запчастей, техническое обслуживание, ремонт промышленного оборудования</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по статьям..."
                className="w-full bg-steel-800 border border-steel-600 rounded pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-steel-800 bg-steel-900 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {blogCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded whitespace-nowrap transition-colors flex-shrink-0 ${activeCategory === cat ? "bg-amber-500/10 text-amber-500" : "text-gray-400 hover:text-white hover:bg-steel-800"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={48} className="text-steel-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">Статьи не найдены</h3>
            <p className="text-gray-500 text-sm">Попробуйте изменить критерии поиска</p>
          </div>
        ) : (
          <>
            {featured && (
              <Link href={`/blog/${featured.slug}`}
                className="group block bg-steel-800 hover:bg-steel-750 border border-steel-700 hover:border-amber-500/30 rounded-lg overflow-hidden mb-8 transition-all">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-56 md:h-auto bg-gradient-to-br from-steel-700 via-steel-600 to-amber-500/20 flex items-center justify-center">
                    <BookOpen size={72} className="text-steel-500 group-hover:text-amber-500/40 transition-colors" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">{featured.category}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> {featured.readTime} мин чтения</span>
                    </div>
                    <h2 className="font-barlow font-bold text-2xl uppercase text-white group-hover:text-amber-500 transition-colors leading-tight mb-3">{featured.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-7 h-7 bg-amber-500/20 rounded-full flex items-center justify-center">
                          <User size={14} className="text-amber-500" />
                        </div>
                        <div>
                          <div className="text-white text-xs font-medium">{featured.author}</div>
                          <div className="text-gray-500 text-xs">{featured.authorRole}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">Читать <ChevronRight size={16} /></div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}
                    className="group bg-steel-800 hover:bg-steel-700 border border-steel-700 hover:border-amber-500/30 rounded-lg overflow-hidden transition-all flex flex-col">
                    <div className="h-40 bg-gradient-to-br from-steel-700 to-steel-600 flex items-center justify-center border-b border-steel-700">
                      <BookOpen size={44} className="text-steel-500 group-hover:text-amber-500/50 transition-colors" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">{post.category}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={11} /> {post.readTime} мин</span>
                      </div>
                      <h3 className="font-barlow font-semibold text-lg uppercase text-white group-hover:text-amber-500 transition-colors leading-tight mb-2">{post.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 flex-1 mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs text-gray-500 flex items-center gap-1"><Tag size={10} /> {tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs border-t border-steel-700 pt-3">
                        <div className="flex items-center gap-1.5 text-gray-400"><User size={12} /><span>{post.author}</span></div>
                        <span className="text-gray-500">{new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
