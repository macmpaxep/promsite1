import Link from "next/link";
import {
  CircleDot, Settings, Waves, Zap, Droplet, Disc,
  RectangleHorizontal, Wind, Filter, ArrowRight,
  ShieldCheck, Truck, Clock, HeadphonesIcon, Phone,
  ChevronRight, Star,
} from "lucide-react";
import { products, blogPosts } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { SkuSearch } from "@/components/ui/SkuSearch";
import { QuickRfqForm } from "@/components/ui/QuickRfqForm";

const categoryCards = [
  { id: "bearings", label: "Подшипники", Icon: CircleDot, count: "1 200+" },
  { id: "gearboxes", label: "Редукторы", Icon: Settings, count: "340+" },
  { id: "hydraulics", label: "Гидравлика", Icon: Waves, count: "580+" },
  { id: "electrical", label: "Электрооборудование", Icon: Zap, count: "420+" },
  { id: "pumps", label: "Насосы", Icon: Droplet, count: "290+" },
  { id: "seals", label: "Уплотнения", Icon: Disc, count: "750+" },
  { id: "belts", label: "Ремни и цепи", Icon: RectangleHorizontal, count: "310+" },
  { id: "pneumatics", label: "Пневматика", Icon: Wind, count: "180+" },
  { id: "filters", label: "Фильтры", Icon: Filter, count: "220+" },
];

const advantages = [
  { Icon: ShieldCheck, title: "Оригинальная продукция", desc: "Только сертифицированные изделия от официальных дистрибьюторов SKF, FAG, Parker, SEW и других." },
  { Icon: Truck, title: "Доставка по Казахстану", desc: "Алматы, Астана, Шымкент, Атырау и другие города. Аварийная поставка — от 24 часов." },
  { Icon: Clock, title: "16 лет на рынке", desc: "Поставляем запчасти с 2008 года. Знаем специфику горнодобычи, нефтянки и пищепрома." },
  { Icon: HeadphonesIcon, title: "Техническая поддержка", desc: "Инженеры-специалисты помогут подобрать аналог, рассчитают ресурс, подготовят КП." },
];

const stats = [
  { value: "16 лет", label: "на рынке" },
  { value: "4 200+", label: "позиций в каталоге" },
  { value: "850+", label: "клиентов по КЗ" },
  { value: "24 ч", label: "аварийная поставка" },
];

export default function HomePage() {
  const popularProducts = products.filter((p) => p.isPopular).slice(0, 4);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative bg-steel-950 overflow-hidden">
        {/* grid texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(#8A9BAE 1px,transparent 1px),linear-gradient(90deg,#8A9BAE 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-steel-950" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Официальный дистрибьютор SKF, FAG, Parker, SEW
            </div>

            <h1 className="font-barlow font-bold text-5xl md:text-7xl uppercase text-white leading-[0.95] tracking-tight mb-6">
              Запасные части<br />
              <span className="text-amber-500">для промышленного</span><br />
              оборудования
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
              Подшипники, редукторы, гидравлика, насосы и 4 200 других позиций.
              Доставка по всему Казахстану. Техническая консультация бесплатно.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/catalog"
                className="flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-steel-900 font-bold rounded transition-colors text-sm">
                Открыть каталог <ArrowRight size={16} />
              </Link>
              <a href="tel:+77272001122"
                className="flex items-center gap-2 px-6 py-3.5 bg-steel-800 hover:bg-steel-700 text-white font-semibold rounded transition-colors border border-steel-700 text-sm">
                <Phone size={16} className="text-amber-500" /> Позвонить инженеру
              </a>
            </div>

            <div className="mt-8">
              <div className="text-xs text-gray-500 mb-2">Знаете артикул? Найдите его напрямую:</div>
              <SkuSearch />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-steel-800 bg-steel-900/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-steel-800">
              {stats.map(({ value, label }) => (
                <div key={label} className="pl-6 first:pl-0">
                  <div className="font-barlow font-bold text-3xl text-amber-500">{value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-16 border-b border-steel-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-barlow font-bold text-3xl uppercase text-white">Категории каталога</h2>
            <Link href="/catalog" className="hidden md:flex items-center gap-1 text-sm text-amber-500 hover:text-amber-400 transition-colors">
              Весь каталог <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {categoryCards.map(({ id, label, Icon, count }) => (
              <Link key={id} href={`/catalog?category=${id}`}
                className="group bg-steel-800 hover:bg-steel-750 border border-steel-700 hover:border-amber-500/30 rounded p-4 flex flex-col items-center text-center transition-all gap-3">
                <div className="w-10 h-10 bg-steel-700 group-hover:bg-amber-500/10 rounded flex items-center justify-center transition-colors">
                  <Icon size={20} className="text-gray-400 group-hover:text-amber-500 transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors leading-tight">{label}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{count} поз.</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR PRODUCTS ── */}
      <section className="py-16 border-b border-steel-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-500 mb-2">
                <Star size={12} fill="currentColor" /> Популярное
              </div>
              <h2 className="font-barlow font-bold text-3xl uppercase text-white">Часто заказывают</h2>
            </div>
            <Link href="/catalog" className="hidden md:flex items-center gap-1 text-sm text-amber-500 hover:text-amber-400 transition-colors">
              Все позиции <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section className="py-16 border-b border-steel-800 bg-steel-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-barlow font-bold text-3xl uppercase text-white mb-10">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {advantages.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-steel-800 border border-steel-700 rounded p-5">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded flex items-center justify-center mb-4">
                  <Icon size={20} className="text-amber-500" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="py-16 border-b border-steel-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-barlow font-bold text-3xl uppercase text-white">Технический блог</h2>
            <Link href="/blog" className="hidden md:flex items-center gap-1 text-sm text-amber-500 hover:text-amber-400 transition-colors">
              Все статьи <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}
                className="group bg-steel-800 hover:bg-steel-750 border border-steel-700 hover:border-amber-500/30 rounded overflow-hidden transition-all flex flex-col">
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded self-start mb-3">{post.category}</span>
                  <h3 className="font-barlow font-bold text-lg uppercase text-white group-hover:text-amber-500 transition-colors leading-tight mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 border-t border-steel-700 pt-3">
                    <span>{post.author}</span>
                    <span>{post.readTime} мин чтения</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-steel-800 to-steel-850 border border-amber-500/20 rounded-lg p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="font-barlow font-bold text-3xl md:text-4xl uppercase text-white mb-3">
                Не нашли нужную деталь?
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                Оставьте заявку — инженер подберёт аналог, уточнит наличие и пришлёт коммерческое предложение в течение часа.
              </p>
              <a href="tel:+77272001122" className="inline-flex items-center gap-2 text-sm text-white font-semibold hover:text-amber-500 transition-colors">
                <Phone size={16} className="text-amber-500" /> +7 (727) 200-11-22
              </a>
            </div>
            <div className="w-full lg:w-auto flex-shrink-0">
              <QuickRfqForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
