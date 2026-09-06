/**
 * Supabase client
 * Настройте переменные окружения в .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
 *
 * Пример запроса продуктов из Supabase (замените static data/data.ts):
 *
 * import { supabase } from "@/lib/supabase";
 * const { data: products } = await supabase.from("products").select("*");
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
