"use client";

import { useState } from "react";
import Link from "next/link";
import SectionBadge from "@/components/ui/SectionBadge";
import { services, site } from "@/data/home";

function ArrowRight() {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export default function ServicesTabs() {
  const [active, setActive] = useState(1); // "Site Selection" is highlighted on the live site
  const tab = services.tabs[active];

  return (
    <section
      aria-label="How we help you build a laundry business"
      className="relative overflow-hidden bg-white"
    >
      {/* Soft colour wash: mint on the left, lavender on the right (matches the original design) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 65% at 2% 78%, rgba(198,238,216,.55) 0%, rgba(198,238,216,0) 68%)," +
            "radial-gradient(50% 55% at 12% 8%, rgba(214,240,228,.35) 0%, rgba(214,240,228,0) 70%)," +
            "radial-gradient(60% 70% at 100% 32%, rgba(224,214,250,.65) 0%, rgba(224,214,250,0) 70%)," +
            "radial-gradient(55% 60% at 88% 100%, rgba(233,226,252,.55) 0%, rgba(233,226,252,0) 70%)," +
            "linear-gradient(115deg, #f4fbf7 0%, #fbfaff 45%, #f6f2fe 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:py-24">
        <div className="text-center">
          <SectionBadge>{services.badge}</SectionBadge>
          <h2 className="mx-auto mt-6 max-w-4xl text-[1.75rem] font-light leading-[1.25] tracking-tight text-navy-soft sm:text-4xl lg:text-[2.9rem] lg:leading-[1.2]">
            Helping You <strong className="font-extrabold text-navy">Build</strong>
            <br className="hidden sm:block" />{" "}
            a Successful{" "}
            <strong className="font-extrabold text-navy">Laundry Business</strong>
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-[345px_1fr] lg:gap-6">
          <div role="tablist" aria-label="Our services" className="flex flex-col gap-2.5">
            {services.tabs.map((t, i) => (
              <button
                key={t.label}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`flex items-center justify-between gap-3 rounded-lg px-5 py-4 text-left text-[15px] font-bold transition sm:px-6 ${
                  i === active
                    ? "bg-brand text-white shadow-lg shadow-brand/25"
                    : "border border-slate-200/80 bg-white text-navy shadow-[0_1px_2px_rgba(16,24,40,.04)] hover:border-brand/30 hover:text-brand"
                }`}
              >
                <span>{t.label}</span>
                {i === active && <ArrowRight />}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            className="rounded-xl bg-white p-6 shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/60 sm:p-9"
          >
            <h3 className="text-xl font-bold text-navy sm:text-2xl">{tab.heading}</h3>
            <p className="mt-3 text-sm text-navy-soft">{tab.lead}</p>
            <p className="mt-4 text-sm leading-relaxed text-body">{tab.body}</p>
            <p className="mt-6 text-sm font-bold text-navy">Key Points:</p>
            <ul className="mt-3 space-y-2.5 text-sm text-body">
              {tab.keyPoints.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href={services.primaryCta.href}
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            {services.primaryCta.label}
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-navy transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <PhoneIcon />
            {services.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
