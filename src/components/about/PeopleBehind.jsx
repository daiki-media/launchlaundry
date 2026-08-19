import Image from "next/image";
import SectionBadge from "@/components/ui/SectionBadge";
import { people } from "@/data/about";

export default function PeopleBehind() {
  return (
    <section aria-label="The people behind Launch Laundry" className="bg-indigo-50/70">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionBadge>{people.badge}</SectionBadge>
          <h2 className="mt-6 max-w-md text-3xl font-extrabold leading-[1.2] tracking-tight text-navy sm:text-4xl">
            {people.title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-body">{people.description}</p>

          <div className="mt-10 space-y-7">
            {people.roles.map((role) => (
              <div key={role.title} className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/80 p-2 shadow-sm">
                  <Image src={role.icon} alt="" width={30} height={30} className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-navy">{role.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-body">{role.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={people.image}
              alt={people.imageAlt}
              width={760}
              height={540}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
          <div className="absolute -bottom-5 left-0 rounded-2xl bg-brand px-7 py-5 text-center shadow-xl shadow-brand/30 sm:-left-5">
            <p className="text-3xl font-extrabold text-white sm:text-4xl">{people.counter.value}</p>
            <p className="mt-1 text-xs font-semibold text-white/90">{people.counter.label}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
