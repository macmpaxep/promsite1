"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, Cog, PackageSearch } from "lucide-react";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/blog", label: "Блог" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      <div className="bg-steel-950 border-b border-steel-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              Пн–Пт 09:00–18:00, Сб 10:00–15:00
            </span>
            <span>г. Алматы, Казахстан</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <a href="tel:+77272001122" className="flex items-center gap-1.5 hover:text-amber-500 transition-colors">
              <Phone size={12} /> +7 (727) 200-11-22
            </a>
            <a href="mailto:info@promkomplekt.kz" className="flex items-center gap-1.5 hover:text-amber-500 transition-colors">
              <Mail size={12} /> info@promkomplekt.kz
            </a>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? "bg-steel-900/95 backdrop-blur-md border-b border-steel-700 shadow-lg shadow-black/20" : "bg-steel-900 border-b border-steel-800"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-amber-500 rounded flex items-center justify-center flex-shrink-0">
              <Cog size={20} className="text-steel-900" />
            </div>
            <div>
              <div className="font-barlow font-bold text-xl leading-tight tracking-wide text-white">ПРОМКОМПЛЕКТ</div>
              <div className="text-[10px] text-gray-400 leading-none tracking-widest uppercase">Промышленные запчасти</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded ${pathname === link.href ? "text-amber-500 bg-amber-500/10" : "text-gray-300 hover:text-white hover:bg-steel-800"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/catalog" className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-steel-900 text-sm font-semibold rounded transition-colors">
              <PackageSearch size={16} /> Найти запчасть
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-400 hover:text-white transition-colors" aria-label="Меню">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-steel-800 bg-steel-900">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded transition-colors ${pathname === link.href ? "text-amber-500 bg-amber-500/10" : "text-gray-300 hover:text-white hover:bg-steel-800"}`}>
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-steel-800 flex flex-col gap-2 text-sm text-gray-400">
                <a href="tel:+77272001122" className="flex items-center gap-2"><Phone size={14} /> +7 (727) 200-11-22</a>
                <a href="mailto:info@promkomplekt.kz" className="flex items-center gap-2"><Mail size={14} /> info@promkomplekt.kz</a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
