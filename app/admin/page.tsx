"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Application, ApplicationStatus } from "@/lib/types";
import { MODEL_LABELS, STATUS_LABELS } from "@/lib/types";

const STATUS_ORDER: ApplicationStatus[] = ["new", "in_progress", "done"];

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  new: "bg-coral/15 text-coral",
  in_progress: "bg-gold/20 text-gold",
  done: "bg-forest/15 text-forest-dark",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);

  const checkAuth = useCallback(async () => {
    setChecking(true);
    try {
      const res = await fetch("/api/admin/me");
      const data = await res.json();
      setAuthenticated(Boolean(data.authenticated));
    } finally {
      setChecking(false);
    }
  }, []);

  const loadApplications = useCallback(async () => {
    setLoadingApps(true);
    try {
      const res = await fetch("/api/applications");
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications ?? []);
      }
    } finally {
      setLoadingApps(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authenticated) loadApplications();
  }, [authenticated, loadApplications]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Неверный пароль");
      }
      setPassword("");
      setAuthenticated(true);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Ошибка входа");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setApplications([]);
  };

  const handleStatusChange = async (id: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить эту заявку без возможности восстановления?")) return;
    setApplications((prev) => prev.filter((a) => a.id !== id));
    await fetch(`/api/applications/${id}`, { method: "DELETE" });
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-sm text-graphite/50">Загрузка…</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-forest-dark px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-xl2 bg-cream p-8 shadow-soft"
        >
          <div className="mb-6 flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="VertadaCamp"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="font-heading text-lg font-semibold text-forest-dark">
              VertadaCamp
            </span>
          </div>
          <h1 className="font-heading text-xl font-bold uppercase tracking-tight text-forest-dark">
            Вход в админ-панель
          </h1>
          <p className="mt-1.5 text-sm text-graphite/60">
            Введите пароль для доступа к заявкам.
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            autoFocus
            className="mt-5 w-full rounded-xl border border-graphite/15 bg-white px-4 py-3 text-sm text-graphite outline-none transition focus:border-forest-dark"
          />
          {loginError && (
            <p className="mt-2 text-sm text-coral">{loginError}</p>
          )}

          <button
            type="submit"
            disabled={loggingIn}
            className="mt-5 w-full rounded-full bg-forest-dark px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream transition hover:brightness-110 disabled:opacity-60"
          >
            {loggingIn ? "Входим…" : "Войти"}
          </button>

          <Link
            href="/"
            className="mt-5 block text-center text-xs text-graphite/50 hover:text-graphite"
          >
            ← Вернуться на сайт
          </Link>
        </form>
      </div>
    );
  }

  const newCount = applications.filter((a) => a.status === "new").length;

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-graphite/10 bg-white">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="VertadaCamp"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="font-heading text-lg font-semibold text-forest-dark">
              Админ-панель VertadaCamp
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-graphite/60 hover:text-graphite"
            >
              На сайт
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full border border-graphite/20 px-5 py-2 text-sm font-semibold text-graphite transition hover:bg-graphite/5"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="container-x py-8">
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="rounded-xl2 bg-white px-6 py-4 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-graphite/50">
              Всего заявок
            </p>
            <p className="mt-1 font-heading text-3xl font-bold text-forest-dark">
              {applications.length}
            </p>
          </div>
          <div className="rounded-xl2 bg-white px-6 py-4 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-graphite/50">
              Новых
            </p>
            <p className="mt-1 font-heading text-3xl font-bold text-coral">
              {newCount}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl2 bg-white shadow-card">
          {loadingApps ? (
            <p className="p-8 text-center text-sm text-graphite/50">
              Загрузка заявок…
            </p>
          ) : applications.length === 0 ? (
            <p className="p-8 text-center text-sm text-graphite/50">
              Заявок пока нет.
            </p>
          ) : (
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-graphite/10 text-xs font-semibold uppercase tracking-wide text-graphite/50">
                  <th className="px-5 py-3.5">Дата</th>
                  <th className="px-5 py-3.5">Имя</th>
                  <th className="px-5 py-3.5">Телефон</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">Модель</th>
                  <th className="px-5 py-3.5">Комментарий</th>
                  <th className="px-5 py-3.5">Статус</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-graphite/5 align-top last:border-0 hover:bg-forest/5"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-graphite/70">
                      {formatDate(app.createdAt)}
                    </td>
                    <td className="px-5 py-4 font-medium text-graphite">
                      {app.name}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <a
                        href={`tel:${app.phone}`}
                        className="text-forest-dark hover:underline"
                      >
                        {app.phone}
                      </a>
                    </td>
                    <td className="px-5 py-4 text-graphite/70">
                      {app.email || "—"}
                    </td>
                    <td className="px-5 py-4 text-graphite/70">
                      {app.model ? MODEL_LABELS[app.model] : "—"}
                    </td>
                    <td className="max-w-[220px] px-5 py-4 text-graphite/70">
                      {app.comment || "—"}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(
                            app.id,
                            e.target.value as ApplicationStatus
                          )
                        }
                        className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${STATUS_STYLES[app.status]}`}
                      >
                        {STATUS_ORDER.map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="rounded-full px-3 py-1.5 text-xs font-semibold text-coral transition hover:bg-coral/10"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
