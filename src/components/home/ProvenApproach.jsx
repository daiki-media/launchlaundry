import Image from "next/image";
import SectionBadge from "@/components/ui/SectionBadge";
import CheckList from "@/components/ui/CheckList";
import { provenApproach } from "@/data/home";

export default function ProvenApproach() {
  return (
    <section aria-label="Our proven approach" className="bg-sky-50/60">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-20 lg:grid-cols-2">
        <div>
          <SectionBadge>{provenApproach.badge}</SectionBadge>
          <h2 className="mt-6 text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-[2.75rem]">
            {provenApproach.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-body sm:text-base">
            {provenApproach.description}
          </p>

          <div className="mt-10 space-y-10">
            {provenApproach.features.map((feature) => (
              <div key={feature.title} className="flex gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-2.5 shadow-sm">
                  <Image src={feature.icon} alt="" width={36} height={36} className="h-9 w-9" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-navy">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{feature.description}</p>
                  <CheckList items={feature.list} className="mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:pl-8">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={provenApproach.image}
              alt="Launch Laundry customer using a self-service laundromat in Malaysia"
              width={640}
              height={720}
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-0 rounded-2xl bg-brand px-8 py-6 text-center shadow-xl shadow-brand/30 lg:left-0">
            <p className="text-4xl font-extrabold text-white">
              {provenApproach.counter.value}
              {provenApproach.counter.suffix}
            </p>
            <p className="mt-1 text-xs font-semibold text-white/90">{provenApproach.counter.label}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
