import { NextRequest, NextResponse } from "next/server";
import { deleteApplication, updateApplicationStatus } from "@/lib/storage";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "@/lib/auth";
import type { ApplicationStatus } from "@/lib/types";

// Blob reads/writes go through fetch(); force-dynamic keeps Next.js from
// caching that fetch and serving stale application data.
export const dynamic = "force-dynamic";

const VALID_STATUSES: ApplicationStatus[] = ["new", "in_progress", "done"];

function requireAdmin(req: NextRequest): boolean {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return isValidSessionToken(token);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const status = body.status as ApplicationStatus;
  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Некорректный статус" }, { status: 400 });
  }

  const updated = await updateApplicationStatus(params.id, status);
  if (!updated) {
    return NextResponse.json({ error: "Заявка не найдена" }, { status: 404 });
  }

  return NextResponse.json({ application: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ok = await deleteApplication(params.id);
  if (!ok) {
    return NextResponse.json({ error: "Заявка не найдена" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
