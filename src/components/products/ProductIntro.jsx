import Image from "next/image";
import SectionBadge from "@/components/ui/SectionBadge";

export default function ProductIntro({ section }) {
  return (
    <section aria-label="Product introduction" className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:py-20 lg:grid-cols-2 lg:gap-14">
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={section.image}
            alt={section.imageAlt}
            width={760}
            height={760}
            priority
            className="h-auto w-full object-contain"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-[0_10px_40px_rgba(20,35,70,.08)] ring-1 ring-slate-200/60 sm:p-10">
          <SectionBadge>{section.badge}</SectionBadge>
          <h2 className="mt-6 text-2xl font-extrabold leading-[1.2] tracking-tight text-navy sm:text-3xl lg:text-[2.15rem]">
            {section.title}
          </h2>
          <div className="mt-5 space-y-4">
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-body">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
