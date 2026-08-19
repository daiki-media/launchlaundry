import Image from "next/image";
import SectionBadge from "@/components/ui/SectionBadge";
import { different } from "@/data/about";

export default function WhatMakesUsDifferent() {
  return (
    <section aria-label="What makes us different" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="text-center">
          <SectionBadge>{different.badge}</SectionBadge>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[2.8rem]">
            {different.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-body">
            {different.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {different.cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  width={520}
                  height={320}
                  className="h-40 w-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                />
              </div>
              <h3 className="mt-5 text-lg font-bold leading-snug text-navy">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-body">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
