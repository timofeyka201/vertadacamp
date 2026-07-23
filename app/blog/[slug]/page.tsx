import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

const SITE_URL = "https://vertadacamp.ru";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticle(params.slug);
  if (!article) return {};

  const url = `${SITE_URL}/blog/${article.slug}`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: article.metaTitle,
      description: article.metaDescription,
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: [article.coverImage],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const url = `${SITE_URL}/blog/${article.slug}`;
  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    image: `${SITE_URL}${article.coverImage}`,
    datePublished: article.publishedAt,
    url,
    author: { "@type": "Organization", name: "VertadaCamp" },
    publisher: {
      "@type": "Organization",
      name: "VertadaCamp",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <article className="section-pad">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-x max-w-3xl">
        <Link
          href="/blog"
          className="text-sm font-semibold uppercase tracking-wide text-forest-dark/60 hover:text-coral"
        >
          ← Все статьи
        </Link>

        <h1 className="mt-5 font-heading text-3xl font-bold uppercase tracking-tight text-forest-dark sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-coral">
          {formatDate(article.publishedAt)} · {article.readingTime}
        </p>

        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-xl2 shadow-card sm:h-96">
          <Image
            src={article.coverImage}
            alt={article.coverAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="mt-10">
          {article.content.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="mb-4 mt-10 font-heading text-2xl font-bold uppercase tracking-tight text-forest-dark sm:text-3xl"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul
                  key={i}
                  className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-graphite/80"
                >
                  {block.items?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="mt-8 rounded-xl2 border border-forest/15 bg-forest/5 p-6 text-base leading-relaxed text-forest-dark"
                >
                  {block.text}
                </blockquote>
              );
            }
            return (
              <p
                key={i}
                className="mt-4 text-base leading-relaxed text-graphite/80"
              >
                {block.text}
              </p>
            );
          })}
        </div>

        <div className="mt-12 rounded-xl2 border border-forest/15 bg-forest/5 p-6 text-center sm:p-8">
          <p className="font-heading text-lg font-bold uppercase tracking-tight text-forest-dark">
            Есть вопросы по выбору кэмпера?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-graphite/70">
            Посмотрите каталог комплектаций или оставьте заявку — поможем
            подобрать вариант под ваш маршрут.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#catalog"
              className="rounded-full bg-coral px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream shadow-card transition hover:brightness-110"
            >
              Смотреть каталог
            </Link>
            <Link
              href="/#faq"
              className="text-sm font-semibold uppercase tracking-wide text-forest-dark hover:text-coral"
            >
              Частые вопросы
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container-x mt-16 max-w-6xl">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold uppercase tracking-tight text-forest-dark">
            Читайте также
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
