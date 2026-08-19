import Image from "next/image";
import RichBody from "@/components/locations/RichBody";

/** Heading + prose/list block, optionally paired with an image. */
export default function ServiceProse({ section, tinted }) {
  const { heading, body, image, imageAlt } = section;

  if (image) {
    return (
      <section aria-label={heading} className={tinted ? "bg-violet-50/40" : "bg-white"}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:py-16 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-2xl shadow-[0_10px_36px_rgba(20,35,70,.10)]">
            <Image
              src={image}
              alt={imageAlt || heading}
              width={720}
              height={520}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold leading-[1.25] tracking-tight text-navy sm:text-3xl">
              {heading}
            </h2>
            <RichBody body={body} className="mt-5" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label={heading} className={tinted ? "bg-violet-50/40" : "bg-white"}>
      <div className="mx-auto max-w-3xl px-5 py-14 sm:py-16">
        {heading && (
          <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{heading}</h2>
        )}
        <RichBody body={body} className={heading ? "mt-5" : ""} />
      </div>
    </section>
  );
}
