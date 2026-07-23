import Link from "next/link";
import { getArticlesSorted } from "@/lib/articles";
import ArticleCard from "./ArticleCard";

export default function ArticlesSection() {
  const latest = getArticlesSorted().slice(0, 3);

  return (
    <section id="articles" className="section-pad bg-cream">
      <div className="container-x">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            Блог
          </p>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-forest-dark sm:text-4xl">
            Полезное о кэмперах и автодомах
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-graphite/70">
            Разбираем частые вопросы про права, оформление, автономность и
            выбор автодома-прицепа — без воды, по делу.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-block rounded-full border border-forest-dark/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-forest-dark transition hover:border-forest-dark hover:bg-forest-dark hover:text-cream"
          >
            Все статьи
          </Link>
        </div>
      </div>
    </section>
  );
}
