"use client";

import Image from "next/image";
import { useSite } from "./SiteContext";

export default function Hero() {
  const { openOrder, openVideo } = useSite();

  return (
    <section id="hero" className="relative flex min-h-[92vh] items-end overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Кэмпер-прицеп VertadaCamp в путешествии"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/40 to-forest-dark/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/40 via-transparent to-transparent" />

      <div className="container-x relative z-10 pb-16 pt-40 md:pb-24">
        <p className="mb-4 inline-block rounded-full border border-gold/60 bg-graphite/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
          Завод-производитель в Йошкар-Оле
        </p>
        <h1 className="max-w-3xl font-heading text-4xl font-bold uppercase leading-[1.05] tracking-tight text-cream sm:text-5xl md:text-6xl">
          VertadaCamp. <span className="text-gold">Твоя свобода</span> путешествовать.
        </h1>
        <p className="mt-5 max-w-xl text-base text-cream/85 sm:text-lg">
          Кэмперы-прицепы от производителя — делаем в Республике Марий Эл и
          отправляем по всему Приволжскому федеральному округу и России.
          Превращаем дорогу в дом, а каждую остановку — в любимое место.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#catalog"
            className="rounded-full bg-coral px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream shadow-soft transition hover:brightness-110 active:scale-95"
          >
            Смотреть модели
          </a>
          <button
            onClick={openVideo}
            className="group flex items-center gap-3 rounded-full border border-cream/40 bg-cream/10 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream backdrop-blur-sm transition hover:bg-cream/20"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-forest-dark transition group-hover:scale-110">
              ▶
            </span>
            Видео-обзор
          </button>
        </div>
      </div>
    </section>
  );
}
