import { FAQ_ITEMS } from "@/lib/faq";

export default function FAQ() {
  return (
    <section id="faq" className="section-pad bg-cream">
      <div className="container-x">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            Вопросы и ответы
          </p>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-forest-dark sm:text-4xl">
            Частые вопросы
          </h2>
        </div>

        <div className="mx-auto max-w-3xl divide-y divide-forest/10 rounded-xl2 bg-white shadow-card">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-semibold text-forest-dark marker:content-none">
                {item.question}
                <span className="shrink-0 text-xl leading-none text-coral transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-graphite/70">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
