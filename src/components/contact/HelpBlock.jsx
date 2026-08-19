import Image from "next/image";
import SectionBadge from "@/components/ui/SectionBadge";
import { helpBlock } from "@/data/contact";

export default function HelpBlock() {
  return (
    <section aria-label="How we can help" className="bg-violet-50/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionBadge>{helpBlock.badge}</SectionBadge>
          <h2 className="mt-6 max-w-md text-3xl font-extrabold leading-[1.2] tracking-tight text-navy sm:text-4xl">
            {helpBlock.title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-body sm:text-base">
            {helpBlock.description}
          </p>
        </div>

        <div className="space-y-5">
          {helpBlock.features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-5 rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(16,24,40,.06)] ring-1 ring-slate-200/60"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100/70 p-2.5">
                <Image src={feature.icon} alt="" width={28} height={28} className="h-7 w-7" />
              </span>
              <div>
                <h3 className="text-base font-bold text-navy">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-body">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
