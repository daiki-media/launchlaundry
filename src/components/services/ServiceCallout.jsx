import Link from "next/link";

/** Short inline prompt between sections, e.g. "Talk to a Setup Specialist". */
export default function ServiceCallout({ section }) {
  return (
    <section aria-label="Get in touch" className="bg-white">
      <div className="mx-auto max-w-4xl px-5 pb-4 pt-2">
        <Link
          href={section.href || "/contact-us"}
          className="group flex items-center justify-between gap-4 rounded-xl border border-brand/20 bg-violet-50/60 px-6 py-4 transition hover:border-brand/40 hover:bg-violet-50"
        >
          <span className="text-sm font-semibold text-navy sm:text-base">{section.text}</span>
          <span
            aria-hidden="true"
            className="shrink-0 text-brand transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
