"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export function QuickRfqForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      setName(""); setPhone(""); setMessage("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-lg px-5 py-4 text-sm text-green-400">
        <CheckCircle2 size={20} className="flex-shrink-0" />
        Заявка отправлена. Инженер свяжется с вами в течение часа.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
      <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя"
        className="bg-steel-900 border border-steel-600 rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60" />
      <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон"
        className="bg-steel-900 border border-steel-600 rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Артикул или описание детали"
        rows={2}
        className="sm:col-span-2 bg-steel-900 border border-steel-600 rounded px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60 resize-none" />
      <button type="submit" disabled={status === "sending"}
        className="sm:col-span-2 flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-steel-900 font-semibold rounded transition-colors text-sm">
        <Send size={16} /> {status === "sending" ? "Отправка..." : "Отправить заявку на КП"}
      </button>
      {status === "error" && (
        <p className="sm:col-span-2 text-xs text-red-400">Не удалось отправить заявку. Позвоните нам напрямую: +7 (727) 200-11-22</p>
      )}
    </form>
  );
}
