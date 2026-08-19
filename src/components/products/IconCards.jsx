import Image from "next/image";
import SectionBadge from "@/components/ui/SectionBadge";

/** "Key Benefits" / "Key Features" — icon, title, one-line description. */
export default function IconCards({ section }) {
  return (
    <section
      aria-label={section.title}
      className="bg-gradient-to-b from-violet-50/70 via-violet-50/40 to-white"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="text-center">
          <SectionBadge>{section.badge}</SectionBadge>
          <h2 className="mt-6 text-3xl font-light tracking-tight text-navy sm:text-4xl lg:text-5xl">
            {section.title}
          </h2>
          {section.description && (
            <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold text-navy-soft">
              {section.description}
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl bg-white p-7 shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/60 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Image src={card.icon} alt="" width={30} height={30} className="h-7 w-7" />
              <h3 className="mt-5 text-base font-bold leading-snug text-navy">{card.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-body">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
