import Link from "next/link";
import SectionBadge from "@/components/ui/SectionBadge";
import ReadMorePill from "@/components/ui/ReadMorePill";
import { notFound, quickLinks } from "@/data/notFound";

/**
 * Body of the 404 page: oversized error code, recovery copy, and cards pointing
 * at the sections people usually meant to reach.
 */
export default function NotFoundPanel() {
  return (
    <section className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <SectionBadge>{notFound.badge}</SectionBadge>
          <p
            aria-hidden="true"
            className="mt-6 bg-gradient-to-b from-brand-soft to-brand bg-clip-text text-7xl font-extrabold leading-none tracking-tight text-transparent sm:text-8xl lg:text-9xl"
          >
            {notFound.code}
          </p>
          <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            {notFound.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-body sm:text-base">
            {notFound.description}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={notFound.primary.href}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg sm:w-auto"
            >
              {notFound.primary.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={notFound.secondary.href}
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:text-brand hover:shadow-md sm:w-auto"
            >
              {notFound.secondary.label}
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="text-center text-sm font-bold uppercase tracking-[0.14em] text-navy-soft">
            Popular pages
          </h3>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="text-base font-bold text-navy transition group-hover:text-brand">
                    {link.label}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-body">
                    {link.description}
                  </span>
                  <ReadMorePill label="Explore" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
