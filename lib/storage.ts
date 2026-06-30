import { promises as fs } from "fs";
import path from "path";
import type { Application } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "applications.json");

// Serializes writes so concurrent requests don't clobber the file.
let writeChain: Promise<unknown> = Promise.resolve();

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

export async function readApplications(): Promise<Application[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeApplications(apps: Application[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(apps, null, 2), "utf-8");
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
