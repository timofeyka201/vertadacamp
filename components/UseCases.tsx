import Image from "next/image";

const CASES = [
  {
    src: "/images/camp-base.jpg",
    title: "Уикенд у озера",
    text: "Сорвались в пятницу вечером — к закату уже разожгли костёр у воды.",
  },
  {
    src: "/images/hero.jpg",
    title: "Путешествие по стране",
    text: "Тысячи километров без отелей и бронирований: дом всегда с собой.",
  },
  {
    src: "/images/camp-econom.jpg",
    title: "База для рыбалки",
    text: "Сухое тёплое место для ночёвки в любой точке маршрута.",
  },
  {
    src: "/images/camp-comfort.jpg",
    title: "Дом на колёсах для двоих",
    text: "Автономность, комфорт и приватность — там, где захочется остаться.",
  },
];

export default function UseCases() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-x">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            Применение
          </p>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-forest-dark sm:text-4xl">
            Куда бы вы ни поехали
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CASES.map((c) => (
            <div
              key={c.title}
              className="group relative flex h-80 flex-col justify-end overflow-hidden rounded-xl2 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
            >
              <Image
                src={c.src}
                alt={c.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/30 to-transparent" />
              <div className="relative p-5">
                <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-cream">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream/80">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
