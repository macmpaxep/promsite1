import { NextResponse } from "next/server";

/**
 * Приём заявок на коммерческое предложение (RFQ).
 *
 * Сейчас — заглушка, логирующая заявку. В продакшне замените тело
 * на запись в Supabase ("rfq_requests") или создание документа в Payload CMS:
 *
 *   import { supabase } from "@/lib/supabase";
 *   await supabase.from("rfq_requests").insert({ name, phone, message });
 *
 * либо
 *
 *   const res = await fetch(`${process.env.PAYLOAD_API_URL}/rfq-requests`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ name, phone, message }),
 *   });
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.name !== "string" || typeof body.phone !== "string") {
    return NextResponse.json({ error: "Некорректные данные заявки" }, { status: 400 });
  }

  console.log("Новая заявка на КП:", {
    name: body.name,
    phone: body.phone,
    message: body.message ?? "",
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
