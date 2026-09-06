"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SkuSearch() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = value.trim();
    router.push(query ? `/catalog?search=${encodeURIComponent(query)}` : "/catalog");
  };

  return (
    <form onSubmit={submit} className="relative w-full max-w-md">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Найти по артикулу, например SKF 6208-2RS"
        className="w-full bg-steel-800 border border-steel-600 rounded pl-11 pr-28 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/60"
      />
      <button type="submit"
        className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-amber-500 hover:bg-amber-400 text-steel-900 text-sm font-semibold rounded transition-colors">
        Найти
      </button>
    </form>
  );
}
