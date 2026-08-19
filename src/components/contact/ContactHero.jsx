import Image from "next/image";
import SectionBadge from "@/components/ui/SectionBadge";
import { hero } from "@/data/contact";

export default function ContactHero() {
  return (
    <section aria-label="Reach out to Launch Laundry" className="bg-indigo-50/70">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionBadge>{hero.badge}</SectionBadge>
          <h2 className="mt-6 max-w-md text-4xl font-extrabold leading-[1.15] tracking-tight text-navy sm:text-5xl">
            {hero.title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-body sm:text-base">
            {hero.description}
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl shadow-sm sm:max-w-sm">
            <Image
              src={hero.sideImage}
              alt={hero.sideImageAlt}
              width={520}
              height={340}
              className="h-auto w-full object-cover"
              sizes="(max-width: 640px) 100vw, 380px"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              width={760}
              height={430}
              priority
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col justify-center rounded-2xl bg-brand px-8 py-10 text-center shadow-xl shadow-brand/25">
              <p className="text-4xl font-extrabold text-white sm:text-5xl">{hero.counter.value}</p>
              <p className="mt-2 text-sm font-medium text-white/90">{hero.counter.label}</p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-sm">
              <Image
                src={hero.photo}
                alt={hero.photoAlt}
                width={420}
                height={300}
                className="h-full w-full object-cover"
                sizes="(max-width: 640px) 100vw, 280px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
