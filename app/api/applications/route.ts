import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { addApplication, readApplications } from "@/lib/storage";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "@/lib/auth";
import type { Application, CamperModel } from "@/lib/types";

// Blob reads/writes go through fetch(); force-dynamic keeps Next.js from
// caching that fetch and serving stale application data.
export const dynamic = "force-dynamic";

const VALID_MODELS: (CamperModel | "")[] = ["econom", "base", "comfort", ""];

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const applications = await readApplications();
  return NextResponse.json({ applications });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const comment = typeof body.comment === "string" ? body.comment.trim() : "";
  const model = (typeof body.model === "string" ? body.model : "") as
    | CamperModel
    | "";

  if (!name) {
    return NextResponse.json({ error: "Укажите имя" }, { status: 400 });
  }
  if (!phone || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { error: "Укажите корректный телефон" },
      { status: 400 }
    );
  }
  if (!VALID_MODELS.includes(model)) {
    return NextResponse.json({ error: "Некорректная модель" }, { status: 400 });
  }

  const application: Application = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    phone,
    email,
    model,
    comment,
    status: "new",
  };

  await addApplication(application);

  return NextResponse.json({ application }, { status: 201 });
}
