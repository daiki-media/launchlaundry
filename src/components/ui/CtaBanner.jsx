import Link from "next/link";
import RichText from "@/components/ui/RichText";

/**
 * Reusable call-to-action banner.
 * variant="light"  → full-width soft gradient band (e.g. "Looking for Reliable Laundry Equipment?")
 * variant="purple" → rounded purple card with a wide white button (e.g. "Need Genuine Spare Parts?")
 */
export default function CtaBanner({ title, description, button, variant = "purple" }) {
  if (variant === "light") {
    return (
      <section className="bg-gradient-to-r from-sky-100 via-white to-emerald-50">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">{title}</h2>
          {description && (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-body sm:text-base">
              <RichText segments={description} />
            </p>
          )}
          <Link
            href={button.href}
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-brand/20 bg-white px-6 py-3 text-sm font-semibold text-brand shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {button.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-brand px-6 py-12 shadow-xl shadow-brand/25 sm:px-12">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            <RichText segments={description} />
          </p>
        )}
        <Link
          href={button.href}
          className="mt-8 flex items-center justify-between rounded-xl bg-white px-6 py-4 text-sm font-semibold text-brand shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          {button.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
