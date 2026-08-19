"use client";

import { useState } from "react";

// Location pages pass `block`, service pages pass `section`; accept either.
export default function FaqAccordion({ block, section, tinted }) {
  const faq = block ?? section;
  const [open, setOpen] = useState(0);

  return (
    <section aria-label={faq.heading} className={tinted ? "bg-violet-50/40" : "bg-white"}>
      <div className="mx-auto max-w-3xl px-5 py-14 sm:py-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
          {faq.heading}
        </h2>

        <div className="mt-8 space-y-3">
          {faq.items.map((item, i) => (
            <div key={item.question} className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70">
              <button
                type="button"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-bold leading-snug text-navy sm:text-base">
                  {item.question}
                </span>
                <svg
                  className={`h-4 w-4 shrink-0 text-navy-soft transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {open === i && (
                <p className="px-5 pb-5 text-sm leading-relaxed text-body">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

