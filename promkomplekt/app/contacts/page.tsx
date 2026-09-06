import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { QuickRfqForm } from "@/components/ui/QuickRfqForm";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты ТОО «ПромКомплект»: адрес, телефон, email и форма заявки на коммерческое предложение.",
};

const offices = [
  { city: "Алматы", address: "ул. Промышленная, 14А", phone: "+7 (727) 200-11-22", hours: "Пн–Пт 09:00–18:00, Сб 10:00–15:00" },
  { city: "Астана", address: "пр. Индустриальный, 7", phone: "+7 (7172) 55-30-10", hours: "Пн–Пт 09:00–18:00" },
  { city: "Шымкент", address: "ул. Заводская, 22", phone: "+7 (7252) 40-12-05", hours: "Пн–Пт 09:00–18:00" },
];

export default function ContactsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-steel-950 border-b border-steel-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-4"><Breadcrumbs items={[{ label: "Контакты" }]} /></div>
          <h1 className="font-barlow font-bold text-4xl uppercase text-white mb-2">Контакты</h1>
          <p className="text-gray-400 text-sm max-w-lg">Свяжитесь с нами удобным способом — ответим в рабочее время в течение часа</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {offices.map((o) => (
              <div key={o.city} className="bg-steel-800 border border-steel-700 rounded-lg p-5">
                <h3 className="font-barlow font-bold text-xl uppercase text-amber-500 mb-4">{o.city}</h3>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>{o.address}</span>
                  </div>
                  <a href={`tel:${o.phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-2.5 hover:text-amber-500 transition-colors">
                    <Phone size={14} className="text-gray-500 flex-shrink-0" />
                    {o.phone}
                  </a>
                  <div className="flex items-start gap-2.5">
                    <Clock size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>{o.hours}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="sm:col-span-3 bg-steel-800 border border-steel-700 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <a href="mailto:info@promkomplekt.kz" className="flex items-center gap-2.5 text-sm text-gray-300 hover:text-amber-500 transition-colors">
                <Mail size={16} className="text-amber-500" /> info@promkomplekt.kz
              </a>
              <span className="hidden sm:block text-steel-600">·</span>
              <span className="text-xs text-gray-500">БИН 080940012345 · ТОО «ПромКомплект»</span>
            </div>
          </div>

          <div className="bg-steel-800 border border-amber-500/20 rounded-lg p-6">
            <h2 className="font-barlow font-bold text-xl uppercase text-white mb-2">Заявка на КП</h2>
            <p className="text-xs text-gray-400 mb-5 leading-relaxed">Укажите артикул или опишите деталь — инженер подготовит коммерческое предложение.</p>
            <QuickRfqForm />
          </div>
        </div>
      </div>
    </div>
  );
}
