import Image from "next/image";
import Link from "next/link";

const NAV = [
  { href: "/#hero", label: "Главная" },
  { href: "/#about", label: "О компании" },
  { href: "/#catalog", label: "Продукты" },
  { href: "/blog", label: "Блог" },
  { href: "/#contacts", label: "Контакты" },
];

export default function Footer() {
  return (
    <footer id="contacts" className="bg-graphite text-cream/80">
      <div className="container-x py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="VertadaCamp"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="font-heading text-lg font-semibold text-cream">
                VertadaCamp
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              Кэмперы-прицепы, которые превращают дорогу в дом, а каждую
              остановку — в любимое место.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Навигация
            </p>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm hover:text-cream">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Контакты
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                424028, Республика Марий Эл, г. Йошкар-Ола, ул.
                Машиностроителей, д. 72, корпус литер В, офис 1
              </li>
              <li>
                <a href="mailto:Maf@vertada.ru" className="hover:text-cream">
                  Maf@vertada.ru
                </a>
              </li>
              <li>
                <a href="tel:+79276847252" className="hover:text-cream">
                  8 927 684 72 52
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/Kotletkad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream"
                >
                  Telegram: t.me/Kotletkad
                </a>
              </li>
              <li>
                <a
                  href="https://vk.com/vertada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream"
                >
                  ВКонтакте: vk.com/vertada
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row">
          <p>ООО «Вертада» © 2026</p>
          <Link href="/admin" className="text-cream/30 hover:text-cream/60">
            Админ
          </Link>
        </div>
      </div>
    </footer>
  );
}
