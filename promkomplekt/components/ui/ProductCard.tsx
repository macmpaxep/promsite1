import Link from "next/link";
import type { Product } from "@/lib/types";
import { getCategoryIcon } from "@/lib/category-icons";

const availabilityLabel: Record<Product["availability"], string> = {
  "in-stock": "В наличии",
  limited: "Мало",
  "on-order": "Под заказ",
};

const availabilityClass: Record<Product["availability"], string> = {
  "in-stock": "bg-green-500/10 text-green-400",
  limited: "bg-amber-500/10 text-amber-400",
  "on-order": "bg-gray-500/10 text-gray-400",
};

export function ProductCard({ product }: { product: Product }) {
  const Icon = getCategoryIcon(product.category);

  return (
    <Link href={`/catalog/${product.id}`}
      className="group bg-steel-800 hover:bg-steel-750 border border-steel-700 hover:border-amber-500/40 rounded overflow-hidden transition-all flex flex-col">
      <div className="h-36 bg-gradient-to-br from-steel-700/60 to-steel-800 flex items-center justify-center border-b border-steel-700 relative">
        <Icon size={40} className="text-steel-600 group-hover:text-amber-500/50 transition-colors" strokeWidth={1.5} />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <span className="text-xs px-2 py-0.5 bg-amber-500 text-steel-900 rounded font-semibold">Новинка</span>}
          {product.priceOld && <span className="text-xs px-2 py-0.5 bg-red-500/80 text-white rounded font-semibold">Скидка</span>}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2 gap-2">
          <span className="text-xs text-gray-500 font-mono truncate">{product.article}</span>
          <span className={`text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 ${availabilityClass[product.availability]}`}>
            {availabilityLabel[product.availability]}
          </span>
        </div>

        <h3 className="text-sm font-medium text-gray-200 group-hover:text-white leading-snug mb-2 flex-1 line-clamp-2">
          {product.name}
        </h3>

        <div className="text-xs text-gray-500 mb-3">
          {product.brand} · {product.country}
          {product.deliveryDays <= 2 && <span className="ml-1 text-green-400">· завтра</span>}
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-amber-500 font-semibold text-lg">{product.price.toLocaleString("ru-RU")} ₸</span>
            </div>
            {product.priceOld && <div className="text-xs text-gray-500 line-through">{product.priceOld.toLocaleString("ru-RU")} ₸</div>}
            <div className="text-xs text-gray-500">за {product.unit}</div>
          </div>
          <div className="text-xs text-gray-500 text-right">
            <div>Доставка</div>
            <div className="text-gray-400">{product.deliveryDays === 1 ? "1 день" : `${product.deliveryDays} дн.`}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
