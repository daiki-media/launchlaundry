import Link from "next/link";
import { contactBlock } from "@/data/privacy";

/** Closing block on the privacy policy page: how to reach us about your data. */
export default function PolicyContact() {
  return (
    <section className="border-t border-slate-200 bg-slate-50/70">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
        <h2 className="text-xl font-bold text-navy sm:text-2xl">{contactBlock.title}</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-body">
          {contactBlock.description}
        </p>

        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          {contactBlock.items.map((item) => (
            <div key={item.label}>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-navy">
                {item.href ? (
                  <a
                    href={item.href}
                    className="font-semibold text-brand underline underline-offset-2 hover:text-brand-dark"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href={contactBlock.cta.href}
          className="mt-8 inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          {contactBlock.cta.label}
        </Link>
      </div>
    </section>
  );
}
