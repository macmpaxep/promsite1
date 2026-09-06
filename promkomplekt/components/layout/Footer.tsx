import Link from "next/link";
import { Cog, Phone, Mail, MapPin } from "lucide-react";

const catalogLinks = [
  { href: "/catalog?category=bearings", label: "Подшипники" },
  { href: "/catalog?category=gearboxes", label: "Редукторы" },
  { href: "/catalog?category=hydraulics", label: "Гидравлика" },
  { href: "/catalog?category=electrical", label: "Электрооборудование" },
  { href: "/catalog?category=pumps", label: "Насосы" },
  { href: "/catalog?category=seals", label: "Уплотнения" },
];

export function Footer() {
  return (
    <footer className="bg-steel-950 border-t border-steel-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-amber-500 rounded flex items-center justify-center flex-shrink-0">
                <Cog size={20} className="text-steel-900" />
              </div>
              <div>
                <div className="font-barlow font-bold text-lg text-white">ПРОМКОМПЛЕКТ</div>
                <div className="text-[10px] text-gray-500 tracking-widest uppercase">Промышленные запчасти</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Поставки запасных частей и комплектующих для промышленного оборудования. Работаем с 2008 года.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Работаем Пн–Пт 09:00–18:00
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="font-barlow font-bold text-sm uppercase tracking-wider text-white mb-4">Каталог</h4>
            <ul className="space-y-2">
              {catalogLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-amber-500 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-barlow font-bold text-sm uppercase tracking-wider text-white mb-4">Компания</h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "О компании" },
                { href: "/blog", label: "Технический блог" },
                { href: "/contacts", label: "Контакты" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-amber-500 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-barlow font-bold text-sm uppercase tracking-wider text-white mb-4">Контакты</h4>
            <div className="space-y-3">
              <a href="tel:+77272001122" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-amber-500 transition-colors">
                <Phone size={14} className="text-amber-500 flex-shrink-0" /> +7 (727) 200-11-22
              </a>
              <a href="mailto:info@promkomplekt.kz" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-amber-500 transition-colors">
                <Mail size={14} className="text-amber-500 flex-shrink-0" /> info@promkomplekt.kz
              </a>
              <div className="flex items-start gap-2.5 text-sm text-gray-400">
                <MapPin size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <span>Алматы, ул. Промышленная, 14А</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-steel-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} ТОО «ПромКомплект». Все права защищены.</span>
          <span>БИН 080940012345 · г. Алматы, Казахстан</span>
        </div>
      </div>
    </footer>
  );
}
