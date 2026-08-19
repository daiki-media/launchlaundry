import Image from "next/image";
import Link from "next/link";
import SectionBadge from "@/components/ui/SectionBadge";
import ImageFrame from "@/components/ui/ImageFrame";

function GreenCheck() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 7.28a.75.75 0 0 0-1.06-1.06l-4.72 4.72-1.72-1.72a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l5.25-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** Text-left / visual-right block used for the closing sections of each product page. */
export default function HighlightBlock({ section, tinted = false }) {
  const { badge, title, paragraphs, checkList, features, counter, button, image, imageAlt, framed } =
    section;

  return (
    <section aria-label={title} className={tinted ? "bg-indigo-50/60" : "bg-white"}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionBadge>{badge}</SectionBadge>
          <h2 className="mt-6 max-w-md text-3xl font-extrabold leading-[1.2] tracking-tight text-navy sm:text-4xl">
            {title}
          </h2>
          {paragraphs?.map((p) => (
            <p key={p.slice(0, 40)} className="mt-5 max-w-md text-sm leading-relaxed text-body">
              {p}
            </p>
          ))}

          {checkList && (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {checkList.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <GreenCheck />
                  <span className="text-sm leading-relaxed text-body">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {features && (
            <div className="mt-8 space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <Image src={feature.icon} alt="" width={32} height={32} className="h-8 w-8 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-navy">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-body">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {button && (
            <Link
              href={button.href}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              {button.label}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        <div>
          {image &&
            (framed ? (
              <ImageFrame src={image} alt={imageAlt} />
            ) : (
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={image}
                  alt={imageAlt}
                  width={760}
                  height={540}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
            ))}

          {counter && (
            <div
              className={`${
                image ? "mt-8" : ""
              } mx-auto flex w-full max-w-xs flex-col items-center rounded-2xl bg-brand px-8 py-10 text-center shadow-xl shadow-brand/25`}
            >
              <p className="text-4xl font-extrabold text-white sm:text-5xl">{counter.value}</p>
              <p className="mt-2 text-sm font-medium text-white/90">{counter.label}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
