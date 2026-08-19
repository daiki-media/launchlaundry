import Image from "next/image";
import RichText from "@/components/ui/RichText";
import { whyChooseUs } from "@/data/home";

export default function WhyChooseUs() {
  return (
    <section aria-label="Why choose Launch Laundry" className="bg-emerald-50/40">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
            <Image
              src={whyChooseUs.image}
              alt="Commercial laundry machines supplied by Launch Laundry Malaysia"
              width={640}
              height={480}
              className="h-auto w-full object-cover"
            />
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-brand shadow-sm ring-1 ring-brand/10">
              ✦ {whyChooseUs.badge}
            </span>
            <div className="mt-6 space-y-4">
              {whyChooseUs.paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-body sm:text-base">
                  <RichText segments={p} />
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-8">
          {whyChooseUs.bars.map((bar) => (
            <div key={bar.title}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-black">{bar.title}</h3>
                <span className="text-sm font-bold text-navy">{bar.percent}%</span>
              </div>
              <div
                className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
                role="progressbar"
                aria-valuenow={bar.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={bar.title}
              >
                <div className="h-full rounded-full bg-brand" style={{ width: `${bar.percent}%` }} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-body">
                <RichText segments={bar.description} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
