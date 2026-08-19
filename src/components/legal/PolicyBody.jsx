import RichBody from "@/components/locations/RichBody";
import { intro, lastUpdated, sections } from "@/data/privacy";

/**
 * Long-form legal copy: sticky "On this page" index on desktop, sections on the
 * right. Section bodies reuse the RichBody renderer used by the location pages.
 */
export default function PolicyBody() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">
            On this page
          </p>
          <nav aria-label="Privacy policy sections" className="mt-4">
            <ol className="space-y-2.5 border-l border-slate-200 pl-4">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm leading-snug text-body transition hover:text-brand"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div>
          <p className="text-sm text-slate-500">
            Last updated: <span className="font-semibold text-navy">{lastUpdated}</span>
          </p>
          <p className="mt-4 border-l-2 border-brand/40 pl-4 text-[15px] leading-relaxed text-body sm:text-base">
            {intro}
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-8">
                <h2 className="text-xl font-bold text-navy sm:text-2xl">{section.title}</h2>
                <RichBody body={section.body} className="mt-4" />
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
