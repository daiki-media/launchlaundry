import Image from "next/image";
import SectionBadge from "@/components/ui/SectionBadge";

/** "Features That Set It Apart" — icon, title, bulleted detail list. */
export default function FeatureCards({ section }) {
  return (
    <section aria-label={section.title} className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="text-center">
          <SectionBadge>{section.badge}</SectionBadge>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]">
            {section.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl bg-white p-7 shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/60 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Image src={card.icon} alt="" width={30} height={30} className="h-7 w-7" />
              <h3 className="mt-5 text-base font-bold leading-snug text-navy">{card.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-body">
                {card.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-400"
                    />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
