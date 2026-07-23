import type { Metadata } from "next";
import { ARTICLES } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

const SITE_URL = "https://vertadacamp.ru";

export const metadata: Metadata = {
  title: "Блог о кэмперах и автодомах-прицепах | VertadaCamp",
  description:
    "Статьи о кэмперах-прицепах и автодомах: права на буксировку, выбор комплектации, автономность, оформление в ГИБДД. Полезные материалы от производителя VertadaCamp.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Блог о кэмперах и автодомах-прицепах | VertadaCamp",
    description:
      "Статьи о кэмперах-прицепах и автодомах: права на буксировку, выбор комплектации, автономность, оформление в ГИБДД.",
  },
};

export default function BlogIndexPage() {
  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            Блог
          </p>
          <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-forest-dark sm:text-4xl">
            Полезное о кэмперах и автодомах
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-graphite/70">
            Разбираем частые вопросы про права, оформление, автономность и
            выбор комплектации кэмпера-прицепа — без воды, по делу.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
