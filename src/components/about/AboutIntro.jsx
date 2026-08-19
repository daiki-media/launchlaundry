import SectionBadge from "@/components/ui/SectionBadge";
import ImageFrame from "@/components/ui/ImageFrame";
import { intro } from "@/data/about";

export default function AboutIntro() {
  return (
    <section aria-label="About Launch Laundry" className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionBadge>{intro.badge}</SectionBadge>
          <h2 className="mt-6 max-w-lg text-3xl font-extrabold leading-[1.2] tracking-tight text-navy sm:text-4xl lg:text-[2.6rem]">
            {intro.title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-body sm:text-base">
            {intro.description}
          </p>
        </div>

        <ImageFrame src={intro.image} alt={intro.imageAlt} priority />
      </div>
    </section>
  );
}
