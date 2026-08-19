import Link from "next/link";
import RichText from "@/components/ui/RichText";
import { hero } from "@/data/home";

export default function Hero() {
  return (
    <section
      aria-label="Commercial laundry machines and laundromat setup in Malaysia"
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-[#9fb1c4] bg-cover bg-center px-5 py-20 sm:px-12 lg:px-20"
      style={{
        backgroundImage: `linear-gradient(100deg, rgba(225,231,240,.85) 0%, rgba(210,220,233,.35) 42%, rgba(160,178,198,.05) 70%), url(${hero.image})`,
      }}
    >
      <div className="w-full max-w-[560px] rounded-[22px] border border-white/65 bg-white/55 p-7 shadow-[0_24px_60px_rgba(20,35,70,.12)] backdrop-blur-xl sm:p-12">
        <span className="mb-6 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold tracking-wide text-brand shadow-[0_6px_18px_rgba(108,71,255,.14)]">
          {hero.eyebrow}
        </span>

        <h1 className="mb-5 text-4xl leading-[1.15] tracking-tight text-navy-soft sm:text-5xl lg:text-6xl lg:leading-[1.1]">
          <strong className="font-extrabold text-navy">{hero.titleStrong}</strong>{" "}
          <svg
            className="inline-block h-[.7em] w-[.7em] align-middle text-brand"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M12 2v20M3 7l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>{" "}
          {hero.titleRest}
        </h1>

        <p className="mb-8 max-w-[46ch] text-base leading-relaxed text-body sm:text-lg">
          <RichText segments={hero.text} />
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_26px_rgba(108,71,255,.3)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(108,71,255,.38)]"
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy/10 bg-white px-6 py-3.5 text-base font-semibold text-navy transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(20,35,70,.12)]"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
