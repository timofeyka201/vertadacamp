const REVIEWS = [
  {
    name: "Алексей М.",
    text: "Взяли «Базовую» в апреле — за лето накатали 6000 км. Автономности хватает на 3-4 дня без розетки. Корпус ни разу не подвёл.",
    rating: 5,
  },
  {
    name: "Ирина и Дмитрий",
    text: "Комфорт-версия — это отдельный уровень. Маркиза и тёплая вода реально меняют отношение к ночёвкам в дороге.",
    rating: 5,
  },
  {
    name: "Сергей К.",
    text: "Брал «Эконом» для рыбалки. Простой, лёгкий в буксировке, всё по делу. То, что нужно для частых вылазок.",
    rating: 5,
  },
  {
    name: "Наталья В.",
    text: "Заказывали под ключ, забрали готовый прицеп быстрее, чем ожидали. Качество сборки приятно удивило.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-x">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            Отзывы
          </p>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-forest-dark sm:text-4xl">
            Нам доверяют путешественники
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="flex flex-col rounded-xl2 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="mb-3 flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < r.rating ? "" : "opacity-25"}>
                    ★
                  </span>
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-graphite/80">
                «{r.text}»
              </p>
              <p className="mt-4 font-heading text-sm font-bold uppercase tracking-wide text-forest-dark">
                {r.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
