import { get, put } from "@vercel/blob";
import type { Application } from "./types";

const PATHNAME = "applications.json";

// Serializes writes so concurrent requests within the same instance don't clobber the blob.
let writeChain: Promise<unknown> = Promise.resolve();

export async function readApplications(): Promise<Application[]> {
  try {
    const result = await get(PATHNAME, { access: "private" });
    if (!result || result.statusCode !== 200) return [];
    const raw = await new Response(result.stream).text();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeApplications(apps: Application[]): Promise<void> {
  await put(PATHNAME, JSON.stringify(apps, null, 2), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
  });
}

function withWriteLock<T>(fn: () => Promise<T>): Promise<T> {
  const result = writeChain.then(fn, fn);
  writeChain = result.catch(() => undefined);
  return result;
}

export async function addApplication(
  app: Application
): Promise<Application> {
  return withWriteLock(async () => {
    const apps = await readApplications();
    apps.unshift(app);
    await writeApplications(apps);
    return app;
  });
}

export async function updateApplicationStatus(
  id: string,
  status: Application["status"]
): Promise<Application | null> {
  return withWriteLock(async () => {
    const apps = await readApplications();
    const idx = apps.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    apps[idx] = { ...apps[idx], status };
    await writeApplications(apps);
    return apps[idx];
  });
}

export async function deleteApplication(id: string): Promise<boolean> {
  return withWriteLock(async () => {
    const apps = await readApplications();
    const next = apps.filter((a) => a.id !== id);
    if (next.length === apps.length) return false;
    await writeApplications(next);
    return true;
  });
}
