"use client";

import { useState } from "react";
import Image from "next/image";
import CheckList from "@/components/ui/CheckList";
import { aboutTabs } from "@/data/home";

export default function AboutTabs() {
  const [active, setActive] = useState(0);
  const tab = aboutTabs.tabs[active];

  return (
    <section aria-label="About Launch Laundry" className="bg-white">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-light leading-tight tracking-tight text-navy-soft sm:text-4xl lg:text-[2.75rem]">
            High <strong className="font-extrabold text-navy">Performance Laundry Solutions For</strong>{" "}
            Every Business in Malaysia
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-body">{aboutTabs.description}</p>
          <div className="mt-10 overflow-hidden rounded-2xl">
            <Image
              src={aboutTabs.image}
              alt="High performance laundry solutions for every business in Malaysia"
              width={640}
              height={420}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div>
          <div role="tablist" aria-label="Company story" className="flex rounded-xl bg-slate-50 p-1">
            {aboutTabs.tabs.map((t, i) => (
              <button
                key={t.label}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-bold transition ${
                  i === active
                    ? "bg-white text-brand shadow-sm border-b-2 border-brand"
                    : "text-navy-soft hover:text-brand"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="mt-6 space-y-4">
            {tab.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-body sm:text-base">
                {p}
              </p>
            ))}
            {tab.listTitle && <p className="pt-2 font-bold text-navy">{tab.listTitle}</p>}
            {tab.list && <CheckList items={tab.list} className="pt-2" />}
          </div>
        </div>
      </div>
    </section>
  );
}
