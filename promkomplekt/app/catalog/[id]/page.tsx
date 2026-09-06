import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Truck, ShieldCheck, Phone, Package, Tag, Globe, Clock } from "lucide-react";
import { products } from "@/lib/data";
import { getCategoryIcon } from "@/lib/category-icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = products.find((p) => p.id === params.id);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const Icon = getCategoryIcon(product.category);

  return (
    <div className="min-h-screen">
      <div className="bg-steel-950 border-b border-steel-800 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs items={[{ label: "Каталог", href: "/catalog" }, { label: product.name }]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-steel-800 border border-steel-700 rounded-lg h-64 flex items-center justify-center">
                <Icon size={80} className="text-steel-600" strokeWidth={1.25} />
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.isNew && <span className="text-xs px-2 py-0.5 bg-amber-500 text-steel-900 rounded font-semibold">Новинка</span>}
                  {product.isPopular && <span className="text-xs px-2 py-0.5 bg-steel-700 text-gray-300 rounded">Популярное</span>}
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${product.availability === "in-stock" ? "bg-green-500/10 text-green-400 border border-green-500/20" : product.availability === "limited" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-gray-500/10 text-gray-400 border border-gray-500/20"}`}>
                    {product.availability === "in-stock" ? "В наличии" : product.availability === "limited" ? "Ограниченное кол-во" : "Под заказ"}
                  </span>
                </div>

                <h1 className="font-barlow font-bold text-2xl uppercase text-white mb-2 leading-tight">{product.name}</h1>

                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-gray-500" />
                    Артикул: <span className="text-gray-200 font-mono">{product.article}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-gray-500" />
                    {product.brand} · {product.country}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-500" />
                    Доставка: <span className="text-gray-200">{product.deliveryDays === 1 ? "в течение 1 дня" : `${product.deliveryDays} рабочих дней`}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-amber-500">{product.price.toLocaleString("ru-RU")} ₸</span>
                    <span className="text-gray-500">/ {product.unit}</span>
                  </div>
                  {product.priceOld && <div className="text-sm text-gray-500 line-through">{product.priceOld.toLocaleString("ru-RU")} ₸</div>}
                </div>

                <div className="text-sm text-gray-400 leading-relaxed">{product.description}</div>
              </div>
            </div>

            <div className="bg-steel-800 border border-steel-700 rounded-lg p-6">
              <h2 className="font-barlow font-bold text-xl uppercase text-white mb-4">Технические характеристики</h2>
              <div className="divide-y divide-steel-700">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3">
                    <span className="text-sm text-gray-400">{key}</span>
                    <span className="text-sm text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {product.equipment.length > 0 && (
              <div className="bg-steel-800 border border-steel-700 rounded-lg p-6">
                <h2 className="font-barlow font-bold text-xl uppercase text-white mb-4">Применяется в оборудовании</h2>
                <div className="flex flex-wrap gap-2">
                  {product.equipment.map((eq) => (
                    <span key={eq} className="text-sm px-3 py-1.5 bg-steel-700 border border-steel-600 rounded text-gray-300">{eq}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-steel-800 border border-steel-700 rounded-lg p-5 sticky top-24">
              <h2 className="font-semibold text-white mb-4">Оформить заявку</h2>

              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between py-2 border-b border-steel-700">
                  <span className="text-sm text-gray-400">Цена за ед.</span>
                  <span className="text-amber-500 font-semibold">{product.price.toLocaleString("ru-RU")} ₸</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-steel-700">
                  <span className="text-sm text-gray-400">Наличие</span>
                  <span className={`text-sm font-medium ${product.availability === "in-stock" ? "text-green-400" : product.availability === "limited" ? "text-amber-400" : "text-gray-400"}`}>
                    {product.availability === "in-stock" ? "Есть на складе" : product.availability === "limited" ? "Мало на складе" : "Под заказ"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-400">Срок доставки</span>
                  <span className="text-sm text-white">{product.deliveryDays === 1 ? "1 день" : `${product.deliveryDays} дн.`}</span>
                </div>
              </div>

              <div className="space-y-2">
                <a href="tel:+77272001122"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-amber-500 hover:bg-amber-400 text-steel-900 font-semibold rounded transition-colors">
                  <Phone size={16} /> Позвонить и заказать
                </a>
                <Link href="/contacts"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-steel-700 hover:bg-steel-600 text-gray-200 rounded transition-colors text-sm">
                  <Package size={16} /> Запросить счёт
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <ShieldCheck size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                  Оригинальная продукция с сертификатами качества
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-400">
                  <Truck size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  Доставка по Казахстану: Алматы, Астана, регионы
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-barlow font-bold text-2xl uppercase text-white mb-6">Похожие позиции</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
