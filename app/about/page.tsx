import type { Metadata } from "next";
import { ShieldCheck, Truck, Award, Users, Factory, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О компании",
  description: "ПромКомплект — поставщик запасных частей для промышленного оборудования с 2008 года. Офисы в Алматы, Астане и Шымкенте.",
};

const milestones = [
  { year: "2008", text: "Основание компании. Первые поставки подшипников SKF на горнодобывающие предприятия Казахстана." },
  { year: "2012", text: "Открытие представительства в Астане. Расширение каталога: редукторы, гидравлика, электрооборудование." },
  { year: "2016", text: "Статус официального дистрибьютора Parker Hannifin и SEW-Eurodrive в Казахстане." },
  { year: "2019", text: "Открытие склада в Шымкенте. Запуск онлайн-каталога и системы онлайн-заявок." },
  { year: "2023", text: "850+ активных клиентов. Более 4 200 позиций в складском запасе." },
];

const partners = ["SKF", "FAG (Schaeffler)", "NSK", "NTN", "Parker Hannifin", "SEW-Eurodrive", "WEG", "Grundfos", "HYDAC", "Festo", "Gates", "Mann+Hummel"];

const values = [
  { Icon: ShieldCheck, title: "Оригинальность", desc: "Только сертифицированная продукция от официальных производителей. Никаких контрафактных аналогов." },
  { Icon: Clock, title: "Скорость", desc: "Аварийная поставка за 24 часа по Алматы. По Казахстану — 2–5 рабочих дней." },
  { Icon: Users, title: "Экспертиза", desc: "Инженеры со специализацией в подшипниках, гидравлике, электроприводе и пневматике." },
  { Icon: Factory, title: "Комплексность", desc: "Одна точка контакта для всех категорий промышленных запчастей." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-steel-950 border-b border-steel-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-4"><Breadcrumbs items={[{ label: "О компании" }]} /></div>
          <h1 className="font-barlow font-bold text-4xl uppercase text-white mb-2">О компании</h1>
          <p className="text-gray-400 text-sm max-w-lg">
            16 лет поставляем запасные части и комплектующие для промышленных предприятий Казахстана
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 space-y-16">

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-barlow font-bold text-3xl uppercase text-white mb-5">
              Надёжный партнёр в поставках промышленных запчастей
            </h2>
            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>
                ТОО «ПромКомплект» основано в 2008 году и специализируется на поставках запасных частей и комплектующих для промышленного оборудования. Мы работаем с предприятиями горнодобывающей, нефтегазовой, пищевой и металлургической отраслей.
              </p>
              <p>
                Наш склад в Алматы хранит более 4 200 позиций в постоянном наличии. Дополнительно — возможность поставки под заказ любых позиций от ведущих мировых производителей.
              </p>
              <p>
                Инженерная служба компании поможет подобрать аналоги, рассчитать ресурс, составить спецификацию на комплексное техническое обслуживание оборудования.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "16 лет", label: "опыта на рынке", Icon: Award },
              { value: "850+", label: "клиентов по Казахстану", Icon: Users },
              { value: "4 200+", label: "позиций в каталоге", Icon: Factory },
              { value: "3 офиса", label: "в городах Казахстана", Icon: Truck },
            ].map(({ value, label, Icon }) => (
              <div key={label} className="bg-steel-800 border border-steel-700 rounded-lg p-5">
                <Icon size={20} className="text-amber-500 mb-3" />
                <div className="font-barlow font-bold text-3xl text-white">{value}</div>
                <div className="text-xs text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="font-barlow font-bold text-3xl uppercase text-white mb-8">Наши принципы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-steel-800 border border-steel-700 rounded-lg p-5">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded flex items-center justify-center mb-4">
                  <Icon size={20} className="text-amber-500" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="font-barlow font-bold text-3xl uppercase text-white mb-8">История компании</h2>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-amber-500 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-steel-900">{m.year.slice(2)}</span>
                  </div>
                  {i < milestones.length - 1 && <div className="w-px bg-steel-700 flex-1 my-1" />}
                </div>
                <div className="pb-8">
                  <div className="font-barlow font-bold text-lg text-amber-500 mb-1">{m.year}</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div>
          <h2 className="font-barlow font-bold text-3xl uppercase text-white mb-2">Партнёры и поставщики</h2>
          <p className="text-gray-400 text-sm mb-6">Работаем напрямую с производителями и официальными дистрибьюторами</p>
          <div className="flex flex-wrap gap-3">
            {partners.map((p) => (
              <span key={p} className="px-4 py-2 bg-steel-800 border border-steel-700 rounded text-sm text-gray-300">{p}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-steel-800 border border-amber-500/20 rounded-lg p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-barlow font-bold text-2xl uppercase text-white mb-2">Стать партнёром</h3>
            <p className="text-gray-400 text-sm">Предлагаем дилерские условия для региональных компаний и корпоративные контракты для промышленных предприятий.</p>
          </div>
          <Link href="/contacts" className="flex-shrink-0 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-steel-900 font-bold rounded text-sm transition-colors">
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
}
