"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ChevronDown, LayoutGrid, Rows3 } from "lucide-react";
import { products, categories, brands, countries, equipmentTypes } from "@/lib/data";
import type { Availability, Condition } from "@/lib/types";
import { ProductCard } from "@/components/ui/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getCategoryIcon } from "@/lib/category-icons";
import { useSearchParams } from "next/navigation";

type AvailabilityFilter = "all" | Availability;
type ConditionFilter = "all" | Condition;
type SortKey = "default" | "price-asc" | "price-desc" | "delivery";
type ViewMode = "grid" | "table";

const availabilityLabels: Record<AvailabilityFilter, string> = {
  all: "Все", "in-stock": "В наличии", limited: "Мало на складе", "on-order": "Под заказ",
};
const conditionLabels: Record<ConditionFilter, string> = {
  all: "Любое", new: "Новое", refurbished: "Восстановленное",
};

function CatalogInner() {
  const searchParams = useSearchParams();
  const initCategory = searchParams.get("category") ?? "";
  const initSearch = searchParams.get("search") ?? "";

  const [search, setSearch] = useState(initSearch);
  const [selectedCategory, setSelectedCategory] = useState(initCategory);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [availability, setAvailability] = useState<AvailabilityFilter>("all");
  const [condition, setCondition] = useState<ConditionFilter>("all");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [sort, setSort] = useState<SortKey>("default");
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<ViewMode>("grid");

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);
  const toggleCountry = (c: string) =>
    setSelectedCountries((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  const toggleEquipment = (e: string) =>
    setSelectedEquipment((prev) => prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) list = list.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.article.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );
    if (selectedCategory) list = list.filter((p) => p.category === selectedCategory);
    if (selectedEquipment.length) list = list.filter((p) => p.equipment.some((e) => selectedEquipment.includes(e)));
    if (selectedBrands.length) list = list.filter((p) => selectedBrands.includes(p.brand));
    if (selectedCountries.length) list = list.filter((p) => selectedCountries.includes(p.country));
    if (availability !== "all") list = list.filter((p) => p.availability === availability);
    if (condition !== "all") list = list.filter((p) => p.condition === condition);
    if (priceMin) list = list.filter((p) => p.price >= Number(priceMin));
    if (priceMax) list = list.filter((p) => p.price <= Number(priceMax));
    if (isNew) list = list.filter((p) => p.isNew);
    if (hasDiscount) list = list.filter((p) => !!p.priceOld);

    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "delivery": list.sort((a, b) => a.deliveryDays - b.deliveryDays); break;
    }
    return list;
  }, [search, selectedCategory, selectedEquipment, selectedBrands, selectedCountries, availability, condition, priceMin, priceMax, isNew, hasDiscount, sort]);

  const activeFiltersCount = [
    selectedCategory, ...selectedEquipment, ...selectedBrands, ...selectedCountries,
    availability !== "all" ? availability : "",
    condition !== "all" ? condition : "",
    priceMin, priceMax,
    isNew ? "new" : "", hasDiscount ? "disc" : "",
  ].filter(Boolean).length;

  const resetAll = () => {
    setSearch(""); setSelectedCategory(""); setSelectedEquipment([]); setSelectedBrands([]);
    setSelectedCountries([]); setAvailability("all"); setCondition("all"); setPriceMin(""); setPriceMax("");
    setIsNew(false); setHasDiscount(false); setSort("default");
  };

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-b border-steel-700 pb-5 mb-5">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{title}</div>
      {children}
    </div>
  );

  const Sidebar = () => (
    <div className="bg-steel-800 border border-steel-700 rounded-lg p-5 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <span className="font-barlow font-bold text-lg uppercase text-white">Фильтры</span>
        {activeFiltersCount > 0 && (
          <button onClick={resetAll} className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1">
            <X size={12} /> Сбросить ({activeFiltersCount})
          </button>
        )}
      </div>

      <FilterSection title="Наличие">
        {(["all", "in-stock", "limited", "on-order"] as AvailabilityFilter[]).map((v) => (
          <label key={v} className="flex items-center gap-2.5 py-1 cursor-pointer group">
            <input type="radio" name="avail" checked={availability === v} onChange={() => setAvailability(v)}
              className="accent-amber-500" />
            <span className="text-sm text-gray-300 group-hover:text-white">{availabilityLabels[v]}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Категория">
        <div className="space-y-1">
          <label className="flex items-center gap-2.5 py-1 cursor-pointer group">
            <input type="radio" name="cat" checked={!selectedCategory} onChange={() => setSelectedCategory("")} className="accent-amber-500" />
            <span className="text-sm text-gray-300 group-hover:text-white">Все категории</span>
          </label>
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-2.5 py-1 cursor-pointer group">
              <input type="radio" name="cat" checked={selectedCategory === c.id} onChange={() => setSelectedCategory(c.id)} className="accent-amber-500" />
              <span className="text-sm text-gray-300 group-hover:text-white">{c.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Тип оборудования">
        <div className="space-y-1 max-h-44 overflow-y-auto pr-1 scrollbar-hide">
          {equipmentTypes.map((e) => (
            <label key={e} className="flex items-center gap-2.5 py-0.5 cursor-pointer group">
              <input type="checkbox" checked={selectedEquipment.includes(e)} onChange={() => toggleEquipment(e)} className="accent-amber-500 rounded flex-shrink-0" />
              <span className="text-sm text-gray-300 group-hover:text-white">{e}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Состояние">
        {(["all", "new", "refurbished"] as ConditionFilter[]).map((v) => (
          <label key={v} className="flex items-center gap-2.5 py-1 cursor-pointer group">
            <input type="radio" name="cond" checked={condition === v} onChange={() => setCondition(v)}
              className="accent-amber-500" />
            <span className="text-sm text-gray-300 group-hover:text-white">{conditionLabels[v]}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Цена, ₸">
        <div className="flex gap-2">
          <input type="number" placeholder="От" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}
            className="w-full bg-steel-700 border border-steel-600 rounded px-2.5 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60" />
          <input type="number" placeholder="До" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}
            className="w-full bg-steel-700 border border-steel-600 rounded px-2.5 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/60" />
        </div>
      </FilterSection>

      <FilterSection title="Производитель">
        <div className="space-y-1 max-h-44 overflow-y-auto pr-1 scrollbar-hide">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2.5 py-0.5 cursor-pointer group">
              <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} className="accent-amber-500 rounded" />
              <span className="text-sm text-gray-300 group-hover:text-white">{b}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Страна производства">
        <div className="space-y-1">
          {countries.map((c) => (
            <label key={c} className="flex items-center gap-2.5 py-0.5 cursor-pointer group">
              <input type="checkbox" checked={selectedCountries.includes(c)} onChange={() => toggleCountry(c)} className="accent-amber-500 rounded" />
              <span className="text-sm text-gray-300 group-hover:text-white">{c}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div className="space-y-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Дополнительно</div>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} className="accent-amber-500 rounded" />
          <span className="text-sm text-gray-300 group-hover:text-white">Только новинки</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input type="checkbox" checked={hasDiscount} onChange={(e) => setHasDiscount(e.target.checked)} className="accent-amber-500 rounded" />
          <span className="text-sm text-gray-300 group-hover:text-white">Со скидкой</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="bg-steel-950 border-b border-steel-800 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-4"><Breadcrumbs items={[{ label: "Каталог" }]} /></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-barlow font-bold text-4xl uppercase text-white">Каталог запчастей</h1>
              <p className="text-gray-400 text-sm mt-1">Найдено: <span className="text-white font-medium">{filtered.length}</span> позиций</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Артикул, название, марка..."
                className="w-full bg-steel-800 border border-steel-600 rounded pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="lg:hidden mb-4 flex gap-3">
          <button onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-steel-800 border border-steel-700 rounded text-sm text-gray-300">
            <SlidersHorizontal size={16} />
            Фильтры {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
          {activeFiltersCount > 0 && (
            <button onClick={resetAll} className="flex items-center gap-1 text-sm text-amber-500">
              <X size={14} /> Сбросить
            </button>
          )}
        </div>

        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Sidebar />
          </aside>

          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-40 flex">
              <div className="absolute inset-0 bg-black/60" onClick={() => setShowFilters(false)} />
              <div className="relative w-72 bg-steel-900 border-r border-steel-700 h-full overflow-y-auto p-5">
                <Sidebar />
              </div>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-steel-800 gap-3 flex-wrap">
              <div className="flex flex-wrap gap-2">
                {categories.filter((c) => selectedCategory === c.id).map((c) => (
                  <span key={c.id} className="flex items-center gap-1.5 text-xs px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-amber-500">
                    {c.label}
                    <button onClick={() => setSelectedCategory("")}><X size={12} /></button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center bg-steel-800 border border-steel-700 rounded overflow-hidden">
                  <button onClick={() => setView("grid")} aria-label="Сетка"
                    className={`p-2 ${view === "grid" ? "bg-amber-500/10 text-amber-500" : "text-gray-500 hover:text-gray-300"}`}>
                    <LayoutGrid size={16} />
                  </button>
                  <button onClick={() => setView("table")} aria-label="Таблица"
                    className={`p-2 ${view === "table" ? "bg-amber-500/10 text-amber-500" : "text-gray-500 hover:text-gray-300"}`}>
                    <Rows3 size={16} />
                  </button>
                </div>
                <span className="text-xs text-gray-500 hidden sm:block">Сортировка:</span>
                <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
                  className="bg-steel-800 border border-steel-700 rounded px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-amber-500/60">
                  <option value="default">По умолчанию</option>
                  <option value="price-asc">Цена ↑</option>
                  <option value="price-desc">Цена ↓</option>
                  <option value="delivery">Быстрая доставка</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <Search size={48} className="text-steel-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-300 mb-2">Позиции не найдены</h3>
                <p className="text-sm text-gray-500 mb-6">Попробуйте изменить фильтры или поисковый запрос</p>
                <button onClick={resetAll} className="px-5 py-2 bg-amber-500 text-steel-900 font-semibold rounded text-sm">
                  Сбросить фильтры
                </button>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="overflow-x-auto border border-steel-700 rounded-lg">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-steel-800 text-left text-xs text-gray-400 uppercase tracking-wider">
                      <th className="px-4 py-3 font-semibold">Артикул</th>
                      <th className="px-4 py-3 font-semibold">Наименование</th>
                      <th className="px-4 py-3 font-semibold hidden md:table-cell">Бренд</th>
                      <th className="px-4 py-3 font-semibold hidden lg:table-cell">Наличие</th>
                      <th className="px-4 py-3 font-semibold hidden lg:table-cell">Доставка</th>
                      <th className="px-4 py-3 font-semibold text-right">Цена</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-steel-700">
                    {filtered.map((p) => {
                      const Icon = getCategoryIcon(p.category);
                      return (
                        <tr key={p.id} className="bg-steel-850 hover:bg-steel-800 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-gray-400 whitespace-nowrap">{p.article}</td>
                          <td className="px-4 py-3 text-gray-200">
                            <div className="flex items-center gap-2.5">
                              <Icon size={16} className="text-steel-600 flex-shrink-0" />
                              <span className="line-clamp-1">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-400 hidden md:table-cell whitespace-nowrap">{p.brand}</td>
                          <td className="px-4 py-3 hidden lg:table-cell whitespace-nowrap">
                            <span className={p.availability === "in-stock" ? "text-green-400" : p.availability === "limited" ? "text-amber-400" : "text-gray-400"}>
                              {availabilityLabels[p.availability]}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-400 hidden lg:table-cell whitespace-nowrap">{p.deliveryDays === 1 ? "1 день" : `${p.deliveryDays} дн.`}</td>
                          <td className="px-4 py-3 text-right font-semibold text-amber-500 whitespace-nowrap">{p.price.toLocaleString("ru-RU")} ₸</td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            <Link href={`/catalog/${p.id}`} className="text-xs text-amber-500 hover:text-amber-400">Запросить КП</Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogInner />
    </Suspense>
  );
}
