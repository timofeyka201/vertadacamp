"use client";

import Image from "next/image";
import { useState } from "react";
import { getProduct, TECH_SPECS } from "@/lib/products";
import Modal from "./Modal";
import { useSite } from "./SiteContext";

export default function ProductDetailModal() {
  const { detailOpen, detailModel, closeDetail, openOrder } = useSite();
  const product = getProduct(detailModel ?? undefined);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return <Modal open={detailOpen} onClose={closeDetail} children={null} />;
  }

  const handleClose = () => {
    closeDetail();
    setActiveImg(0);
  };

  return (
    <Modal open={detailOpen} onClose={handleClose} maxWidth="max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-5 pb-0 lg:p-6 lg:pb-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl2">
            <Image
              src={product.gallery[activeImg] ?? product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 500px"
            />
            {product.badge && (
              <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-graphite shadow-card">
                {product.badge}
              </span>
            )}
          </div>
          {product.gallery.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
              {product.gallery.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setActiveImg(i)}
                  className={`relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    activeImg === i ? "border-coral" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-6 hidden rounded-xl2 bg-forest/5 p-4 lg:block">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-forest-dark">
              Технические данные
            </p>
            <dl className="space-y-1.5">
              {TECH_SPECS.map((s) => (
                <div key={s.label} className="flex justify-between text-sm">
                  <dt className="text-graphite/60">{s.label}</dt>
                  <dd className="font-medium text-graphite">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="p-6 pt-5 lg:max-h-[90vh] lg:overflow-y-auto">
          <h3 className="font-heading text-3xl font-bold uppercase tracking-tight text-forest-dark">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-coral">{product.tagline}</p>
          <p className="mt-3 font-heading text-2xl font-bold text-forest-dark">
            {product.price}
          </p>

          <div className="mt-6 space-y-6">
            {product.sections.map((section) => (
              <div key={section.title}>
                <h4 className="font-heading text-sm font-bold uppercase tracking-wide text-forest-dark">
                  {section.title}
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-graphite/80"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl2 bg-forest/5 p-4 lg:hidden">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-forest-dark">
              Технические данные
            </p>
            <dl className="space-y-1.5">
              {TECH_SPECS.map((s) => (
                <div key={s.label} className="flex justify-between text-sm">
                  <dt className="text-graphite/60">{s.label}</dt>
                  <dd className="font-medium text-graphite">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                handleClose();
                openOrder(product.id);
              }}
              className="flex-1 rounded-full bg-coral px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-cream shadow-card transition hover:brightness-110 active:scale-95"
            >
              Заказать эту комплектацию
            </button>
            <button
              onClick={handleClose}
              className="rounded-full border-2 border-forest-dark px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-forest-dark transition hover:bg-forest-dark hover:text-cream"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
