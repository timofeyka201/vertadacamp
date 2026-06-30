"use client";

import Image from "next/image";
import { useSite } from "./SiteContext";

export default function VideoSection() {
  const { openVideo } = useSite();

  return (
    <section className="section-pad bg-forest-dark">
      <div className="container-x">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Видео-обзор
          </p>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-cream sm:text-4xl">
            Посмотрите кэмпер изнутри и снаружи
          </h2>
        </div>

        <button
          onClick={openVideo}
          className="group relative mx-auto block aspect-video w-full max-w-4xl overflow-hidden rounded-xl2 shadow-soft"
        >
          <Image
            src="/images/camp-comfort.jpg"
            alt="Превью видео-обзора кэмпера VertadaCamp"
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-graphite/40 transition group-hover:bg-graphite/30" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-coral text-2xl text-cream shadow-soft transition group-hover:scale-110">
              ▶
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}
