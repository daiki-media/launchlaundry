"use client";

import { useState } from "react";
import Image from "next/image";
import CheckList from "@/components/ui/CheckList";
import { originStory } from "@/data/about";

export default function OriginStory() {
  const [active, setActive] = useState(0);
  const tab = originStory.tabs[active];

  return (
    <section aria-label="Our origin story" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 pb-16 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
              {originStory.title}
            </h2>
            <div className="mt-8 overflow-hidden rounded-2xl shadow-sm">
              <Image
                src={originStory.image}
                alt={originStory.imageAlt}
                width={760}
                height={560}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </div>

          <div className="lg:pt-14">
            <div
              role="tablist"
              aria-label="Our story, vision and mission"
              className="flex overflow-x-auto rounded-t-lg bg-slate-50/80"
            >
              {originStory.tabs.map((t, i) => (
                <button
                  key={t.label}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`relative flex-1 whitespace-nowrap px-4 py-3.5 text-sm font-semibold transition ${
                    i === active ? "text-brand" : "text-navy-soft hover:text-brand"
                  }`}
                >
                  {t.label}
                  {i === active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-1/2 bottom-1.5 h-[2px] w-8 -translate-x-1/2 rounded-full bg-brand"
                    />
                  )}
                </button>
              ))}
            </div>

            <div role="tabpanel" className="space-y-4 pt-6">
              {tab.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-body">
                  {p}
                </p>
              ))}
              {tab.list && <CheckList items={tab.list} className="pt-1" />}
            </div>

            <hr className="mt-8 border-slate-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
