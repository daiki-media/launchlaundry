import Image from "next/image";
import Link from "next/link";
import SectionBadge from "@/components/ui/SectionBadge";
import ReadMorePill from "@/components/ui/ReadMorePill";

/** Cross-links to the service pages, with a "+" affordance as on the live site. */
export default function ServiceLinkCards({ section }) {
  return (
    <section
      aria-label={section.title}
      className="bg-gradient-to-b from-violet-50/70 via-violet-50/30 to-white"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="text-center">
          <SectionBadge>{section.badge}</SectionBadge>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-light leading-tight tracking-tight text-navy sm:text-4xl lg:text-[2.6rem]">
            {section.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col rounded-2xl bg-white p-7 shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/60 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Image src={card.icon} alt="" width={30} height={30} className="h-7 w-7" />
              <h3 className="mt-5 text-base font-bold leading-snug text-navy">{card.title}</h3>
              <ReadMorePill label="Learn More" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
