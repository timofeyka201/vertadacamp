"use client";

import Image from "next/image";
import type { Product } from "@/lib/products";
import { useSite } from "./SiteContext";

export default function ProductCard({ product }: { product: Product }) {
  const { openOrder, openDetail } = useSite();
  const isHit = Boolean(product.badge);

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-xl2 bg-white shadow-card transition hover:-translate-y-1.5 hover:shadow-soft ${
        isHit ? "ring-2 ring-gold" : ""
      }`}
    >
      {product.badge && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-graphite shadow-card">
          {product.badge}
        </span>
      )}

      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={`Кэмпер-прицеп VertadaCamp ${product.name} — ${product.tagline}`}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-forest-dark">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-coral">{product.tagline}</p>

        <ul className="mt-4 flex-1 space-y-2">
          {product.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-graphite/80">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
              {h}
            </li>
          ))}
        </ul>

        <p className="mt-5 font-heading text-2xl font-bold text-forest-dark">
          {product.price}
        </p>

        <div className="mt-5 flex gap-3">
          <button
            onClick={() => openDetail(product.id)}
            className="flex-1 rounded-full border-2 border-forest-dark px-4 py-2.5 text-sm font-semibold text-forest-dark transition hover:bg-forest-dark hover:text-cream"
          >
            Подробнее
          </button>
          <button
            onClick={() => openOrder(product.id)}
            className="flex-1 rounded-full bg-coral px-4 py-2.5 text-sm font-semibold text-cream shadow-card transition hover:brightness-110 active:scale-95"
          >
            Заказать
          </button>
        </div>
      </div>
    </div>
  );
}
