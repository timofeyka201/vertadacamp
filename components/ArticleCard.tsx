import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl2 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.coverAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-coral">
          {formatDate(article.publishedAt)} · {article.readingTime}
        </p>
        <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-forest-dark">
          {article.title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-graphite/70">
          {article.excerpt}
        </p>
        <span className="mt-4 text-sm font-semibold uppercase tracking-wide text-forest-dark transition group-hover:text-coral">
          Читать статью →
        </span>
      </div>
    </Link>
  );
}
