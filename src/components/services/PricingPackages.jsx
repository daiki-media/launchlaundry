import Link from "next/link";
import CheckList from "@/components/ui/CheckList";

/** Turnkey / tiered package cards. Quotes are on request — no prices are published. */
export default function PricingPackages({ section, tinted }) {
  const { heading, packages } = section;

  return (
    <section aria-label={heading} className={tinted ? "bg-violet-50/40" : "bg-white"}>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {heading}
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className="flex flex-col rounded-2xl bg-white p-7 shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-lg"
            >
              {pkg.badge && (
                <span className="mb-4 inline-flex w-fit rounded-full bg-brand/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand">
                  {pkg.badge}
                </span>
              )}
              <h3 className="text-lg font-bold leading-snug text-navy">{pkg.name}</h3>
              {pkg.summary && (
                <p className="mt-3 text-sm leading-relaxed text-body">{pkg.summary}</p>
              )}
              <CheckList items={pkg.features} className="mt-5 flex-1" />
              <Link
                href="/contact-us"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                {pkg.button}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
