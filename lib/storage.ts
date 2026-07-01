import { del, get, list, put } from "@vercel/blob";
import type { Application } from "./types";

const PREFIX = "applications/";

function pathnameFor(id: string): string {
  return `${PREFIX}${id}.json`;
}

async function readOne(pathname: string): Promise<Application | null> {
  try {
    const result = await get(pathname, { access: "private" });
    if (!result || result.statusCode !== 200) return null;
    const raw = await new Response(result.stream).text();
    return JSON.parse(raw) as Application;
  } catch {
    return null;
  }
}

export async function readApplications(): Promise<Application[]> {
  const { blobs } = await list({ prefix: PREFIX });
  const apps = await Promise.all(blobs.map((b) => readOne(b.pathname)));
  return apps
    .filter((a): a is Application => a !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// Each application gets its own blob (named by id), so a new submission
// never overwrites another one's data.
export async function addApplication(
  app: Application
): Promise<Application> {
  await put(pathnameFor(app.id), JSON.stringify(app), {
    access: "private",
    contentType: "application/json",
  });
  return app;
}

export async function updateApplicationStatus(
  id: string,
  status: Application["status"]
): Promise<Application | null> {
  const pathname = pathnameFor(id);
  const app = await readOne(pathname);
  if (!app) return null;
  const updated: Application = { ...app, status };
  await put(pathname, JSON.stringify(updated), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
  });
  return updated;
}

export async function deleteApplication(id: string): Promise<boolean> {
  const pathname = pathnameFor(id);
  const app = await readOne(pathname);
  if (!app) return false;
  await del(pathname);
  return true;
}
