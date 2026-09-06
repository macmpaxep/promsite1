/**
 * Payload CMS REST API helpers
 * Настройте переменную окружения:
 *   PAYLOAD_API_URL=https://your-payload-cms.com/api
 *
 * Пример подключения блога через Payload:
 *
 *   const posts = await getCollection<BlogPost>("blog-posts");
 *   const product = await getDoc<Product>("products", id);
 */

const API_URL = process.env.PAYLOAD_API_URL ?? "";

export async function getCollection<T>(
  collection: string,
  params?: Record<string, string>
): Promise<T[]> {
  const url = new URL(`${API_URL}/${collection}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Payload: failed to fetch ${collection}`);
  const json = await res.json();
  return json.docs ?? [];
}

export async function getDoc<T>(collection: string, id: string): Promise<T | null> {
  const res = await fetch(`${API_URL}/${collection}/${id}`, { next: { revalidate: 60 } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Payload: failed to fetch ${collection}/${id}`);
  return res.json();
}
