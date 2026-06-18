import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
  }

  console.log("Nirvanaah lead capture", body);

  return NextResponse.json({
    ok: true,
    message: "Lead captured"
  });
}
