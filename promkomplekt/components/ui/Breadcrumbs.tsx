import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
      <Link href="/" className="hover:text-gray-300 transition-colors">Главная</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight size={14} />
          {item.href ? (
            <Link href={item.href} className="hover:text-gray-300 transition-colors">{item.label}</Link>
          ) : (
            <span className="text-gray-300 truncate">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
