import Image from "next/image";
import SectionBadge from "@/components/ui/SectionBadge";
import { readyToLaunch } from "@/data/about";

export default function ReadyToLaunch() {
  return (
    <section
      aria-label="Ready to launch your laundromat"
      className="relative overflow-hidden bg-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "radial-gradient(50% 70% at 50% 100%, rgba(226,218,252,.6) 0%, rgba(226,218,252,0) 72%)," +
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, #f7f4fe 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="text-center">
          <SectionBadge>{readyToLaunch.badge}</SectionBadge>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold leading-[1.25] tracking-tight text-navy sm:text-4xl lg:text-[2.6rem]">
            {readyToLaunch.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {readyToLaunch.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl bg-white p-7 shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Image src={card.icon} alt="" width={34} height={34} className="h-8 w-8" />
              <h3 className="mt-6 text-base font-bold leading-snug text-navy">{card.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
