"use client";

import { useSite } from "./SiteContext";

export default function FinalCta() {
  const { openOrder } = useSite();

  return (
    <section className="bg-forest-dark py-20">
      <div className="container-x text-center">
        <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-cream sm:text-5xl">
          Готовы отправиться в путь?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-cream/80 sm:text-lg">
          Оставьте заявку — подберём комплектацию под ваш маршрут и ответим в
          ближайшее время.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <button
            onClick={() => openOrder()}
            className="rounded-full bg-coral px-8 py-4 text-sm font-semibold uppercase tracking-wide text-cream shadow-soft transition hover:brightness-110 active:scale-95"
          >
            Оставить заявку
          </button>
          <a
            href="tel:+79276847252"
            className="text-lg font-semibold text-gold transition hover:text-cream"
          >
            8 927 684 72 52
          </a>
        </div>
      </div>
    </section>
  );
}
