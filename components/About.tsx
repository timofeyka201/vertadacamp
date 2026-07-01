const FEATURES = [
  {
    icon: "🚗",
    title: "Буксировка до 750 кг",
    text: "Лёгкий прицеп для любого внедорожника или седана с фаркопом.",
  },
  {
    icon: "🧊",
    title: "Утеплённый корпус",
    text: "Стенка 24 мм и потолок 38 мм держат тепло в любую погоду.",
  },
  {
    icon: "🔋",
    title: "Автономность",
    text: "Солнечная панель, АКБ и бак воды — без привязки к кемпингу.",
  },
  {
    icon: "🧭",
    title: "Готов к любому маршруту",
    text: "От тихих озёр до горных перевалов — конструкция выдержит дорогу.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad bg-cream">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
              О компании
            </p>
            <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-forest-dark sm:text-4xl">
              Команда мечтателей и инженеров
            </h2>
            <p className="mt-5 text-base leading-relaxed text-graphite/80 sm:text-lg">
              VertadaCamp — это команда мечтателей и инженеров, которая создаёт
              кэмперы-прицепы для тех, кто не хочет ждать отпуска, чтобы оказаться
              там, где сердце спокойно. Мы превращаем дорогу в дом, а каждую
              остановку — в новое любимое место.
            </p>
            <p className="mt-4 text-base leading-relaxed text-graphite/80 sm:text-lg">
              Наши прицепы сочетают надёжную конструкцию, продуманную эргономику
              и уют, который чувствуешь с первой ночёвки под звёздами. Лёгкие в
              буксировке, готовые к любым маршрутам — от тихих озёр до горных
              перевалов.
            </p>
            <p className="mt-4 text-base leading-relaxed text-graphite/80 sm:text-lg">
              Наш завод находится в Йошкар-Оле (Республика Марий Эл) — мы
              производим кэмперы-прицепы сами, напрямую, без посредников и
              дилерских наценок. Отгружаем по всему Приволжскому федеральному
              округу и России.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl2 border border-forest/10 bg-white/60 p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-2xl">
                  {f.icon}
                </div>
                <h3 className="font-heading text-base font-semibold text-forest-dark">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-graphite/70">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
