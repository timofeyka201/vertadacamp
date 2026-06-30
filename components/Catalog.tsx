import { PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function Catalog() {
  return (
    <section id="catalog" className="section-pad bg-cream">
      <div className="container-x">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            Каталог
          </p>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-forest-dark sm:text-4xl">
            Три комплектации — один характер
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-graphite/70">
            Выберите уровень автономности и комфорта под свой формат
            путешествий.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
