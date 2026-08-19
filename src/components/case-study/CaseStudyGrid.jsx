"use client";

import { useState } from "react";
import Image from "next/image";
import SectionBadge from "@/components/ui/SectionBadge";
import { intro, categories, items } from "@/data/caseStudy";

const ALL = "All Projects";

export default function CaseStudyGrid() {
  const [filter, setFilter] = useState(ALL);
  const tabs = [ALL, ...categories];
  const visible = filter === ALL ? items : items.filter((i) => i.category === filter);

  return (
    <section aria-label="Our projects" className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(55% 70% at 0% 0%, rgba(198,238,216,.5) 0%, rgba(198,238,216,0) 70%)," +
            "radial-gradient(60% 75% at 100% 10%, rgba(224,214,250,.6) 0%, rgba(224,214,250,0) 72%)," +
            "linear-gradient(180deg, #f8f6ff 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="text-center">
          <SectionBadge>{intro.badge}</SectionBadge>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-[3.5rem]">
            {intro.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-body sm:text-base">
            {intro.description}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={filter === tab}
              onClick={() => setFilter(tab)}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                filter === tab
                  ? "bg-brand text-white shadow-lg shadow-brand/25"
                  : "border border-slate-200 bg-white text-navy hover:border-brand/40 hover:text-brand"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-12 text-center text-sm text-body">
            No projects in this category yet.
          </p>
        ) : (
          <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {visible.map((item) => (
              <article
                key={item.image}
                className="group break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={620}
                    height={420}
                    className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand">
                    {item.category}
                  </span>
                  <h3 className="mt-2 text-base font-bold leading-snug text-navy">{item.title}</h3>
                  {item.summary && (
                    <p className="mt-2 text-sm leading-relaxed text-body">{item.summary}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
