"use client";

import { useState } from "react";
import Link from "next/link";
import SectionBadge from "@/components/ui/SectionBadge";
import { faq } from "@/data/home";

function FaqItem({ item, open, onToggle, id }) {
  return (
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-bold leading-snug text-navy sm:text-base">{item.question}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-navy-soft transition-transform ${open ? "rotate-180" : ""}`}
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
      {/* Always rendered, only hidden: the answers have to be in the HTML for
          the FAQPage schema on this page to describe copy that is really
          there, and for the crawler to read them at all. */}
      <p id={id} hidden={!open} className="px-5 pb-5 text-sm leading-relaxed text-body">
        {item.answer}
      </p>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section aria-label="Frequently asked questions" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionBadge>{faq.badge}</SectionBadge>
          <h2 className="mt-6 text-4xl font-extrabold leading-tight text-navy sm:text-5xl">
            Got questions?
            <br />
            We’ve got answers
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-body sm:text-base">
            {faq.description}
          </p>
          <Link
            href={faq.cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5"
          >
            {faq.cta.label} <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="space-y-3">
          {faq.items.map((item, i) => (
            <FaqItem
              key={item.question}
              id={`home-faq-${i}`}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
