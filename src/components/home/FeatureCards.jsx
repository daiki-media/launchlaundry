import Image from "next/image";
import { featureCards } from "@/data/home";

export default function FeatureCards() {
  return (
    <section aria-label="Why our machines stand out" className="bg-brand-soft">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((card) => (
          <article
            key={card.title}
            className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            style={{
              backgroundImage: "url(/images/bg-line-5.png)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
            }}
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand/5 p-2.5">
              <Image src={card.icon} alt="" width={40} height={40} className="h-10 w-10" />
            </span>
            <h3 className="mt-5 text-lg font-bold leading-snug text-navy">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
