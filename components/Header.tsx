"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSite } from "./SiteContext";

const NAV = [
  { href: "/#hero", label: "Главная" },
  { href: "/#about", label: "О компании" },
  { href: "/#catalog", label: "Продукты" },
  { href: "/blog", label: "Блог" },
  { href: "/#faq", label: "Вопросы" },
  { href: "/#contacts", label: "Контакты" },
];

export default function Header() {
  const { openOrder } = useSite();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const solid = !isHome || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        solid ? "bg-cream/95 shadow-card backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold uppercase tracking-wide transition-colors hover:text-coral ${
                solid ? "text-graphite" : "text-cream"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Меню"
        >
          <span
            className={`block h-0.5 w-6 ${solid ? "bg-graphite" : "bg-cream"}`}
          />
        </button>

        <div className="flex items-center gap-3">
          <a href="/#hero" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="VertadaCamp"
              width={40}
              height={40}
              className="h-9 w-9 rounded-full object-cover md:h-11 md:w-11"
            />
            <span
              className={`hidden font-heading text-lg font-semibold tracking-tight sm:inline md:text-xl ${
                solid ? "text-forest-dark" : "text-cream"
              }`}
            >
              VertadaCamp
            </span>
          </a>
          <button
            onClick={() => openOrder()}
            className="inline-flex items-center whitespace-nowrap rounded-full bg-coral px-3.5 py-2 text-xs font-semibold text-cream shadow-card transition hover:brightness-110 active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Оставить заявку
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-graphite/10 bg-cream md:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-semibold uppercase tracking-wide text-graphite hover:bg-forest/5"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                openOrder();
              }}
              className="mt-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-cream"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
