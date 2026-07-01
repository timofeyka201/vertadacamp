import Image from "next/image";

const ITEMS = [
  { src: "/images/interior.jpg", title: "Интерьер" },
  { src: "/images/kitchen-wood.jpg", title: "Кухня" },
  { src: "/images/sink.jpg", title: "Мойка" },
  { src: "/images/electric-panel.jpg", title: "Панель электрики" },
  { src: "/images/ventilation.jpg", title: "Вентиляция и окно" },
  { src: "/images/mattress.jpg", title: "Спальное место" },
  { src: "/images/hitch.jpg", title: "Сцепное устройство" },
  { src: "/images/water-hatch.jpg", title: "Люк для воды" },
];

export default function Gallery() {
  return (
    <section className="section-pad bg-forest-dark">
      <div className="container-x">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Детали
          </p>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-cream sm:text-4xl">
            Каждая деталь продумана
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <div
              key={item.src}
              className="group relative aspect-square overflow-hidden rounded-xl2 shadow-card"
            >
              <Image
                src={item.src}
                alt={`${item.title} — кэмпер-прицеп VertadaCamp`}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
              <p className="absolute bottom-3 left-3 right-3 font-heading text-sm font-semibold uppercase tracking-wide text-cream">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
