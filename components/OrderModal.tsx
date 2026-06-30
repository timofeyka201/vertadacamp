"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useSite } from "./SiteContext";
import { MODEL_LABELS } from "@/lib/types";
import type { CamperModel } from "@/lib/types";

const MODEL_OPTIONS: (CamperModel | "")[] = ["", "econom", "base", "comfort"];

export default function OrderModal() {
  const { orderOpen, orderModel, closeOrder } = useSite();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [model, setModel] = useState<CamperModel | "">("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (orderOpen) {
      setModel(orderModel);
    }
  }, [orderOpen, orderModel]);

  const handleClose = () => {
    closeOrder();
    setTimeout(() => {
      setName("");
      setPhone("");
      setEmail("");
      setComment("");
      setErrors({});
      setSubmitError("");
      setSuccess(false);
    }, 250);
  };

  const validate = () => {
    const next: { name?: string; phone?: string } = {};
    if (!name.trim()) next.name = "Укажите имя";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      next.phone = "Укажите корректный телефон";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, model, comment }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Не удалось отправить заявку");
      }
      setSuccess(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Не удалось отправить заявку"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={orderOpen} onClose={handleClose}>
      {success ? (
        <div className="flex flex-col items-center px-6 py-16 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 text-3xl text-forest-dark">
            ✓
          </div>
          <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-forest-dark">
            Спасибо!
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-graphite/70">
            Мы свяжемся с вами в ближайшее время.
          </p>
          <button
            onClick={handleClose}
            className="mt-7 rounded-full bg-forest-dark px-7 py-3 text-sm font-semibold text-cream transition hover:brightness-110"
          >
            Закрыть
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-forest-dark">
            Оставить заявку
          </h3>
          <p className="mt-1.5 text-sm text-graphite/60">
            Заполните форму — мы перезвоним и поможем выбрать комплектацию.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-graphite/60">
                Имя *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться"
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-graphite outline-none transition focus:border-forest-dark ${
                  errors.name ? "border-coral" : "border-graphite/15"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-coral">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-graphite/60">
                Телефон *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 ___ ___ __ __"
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-graphite outline-none transition focus:border-forest-dark ${
                  errors.phone ? "border-coral" : "border-graphite/15"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-coral">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-graphite/60">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-graphite/15 bg-white px-4 py-3 text-sm text-graphite outline-none transition focus:border-forest-dark"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-graphite/60">
                Модель
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value as CamperModel | "")}
                className="w-full rounded-xl border border-graphite/15 bg-white px-4 py-3 text-sm text-graphite outline-none transition focus:border-forest-dark"
              >
                {MODEL_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m ? MODEL_LABELS[m] : "Не выбрана"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-graphite/60">
                Комментарий
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Дополнительные пожелания"
                className="w-full resize-none rounded-xl border border-graphite/15 bg-white px-4 py-3 text-sm text-graphite outline-none transition focus:border-forest-dark"
              />
            </div>
          </div>

          {submitError && (
            <p className="mt-4 rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-coral px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream shadow-card transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Отправляем…" : "Отправить заявку"}
          </button>
        </form>
      )}
    </Modal>
  );
}
