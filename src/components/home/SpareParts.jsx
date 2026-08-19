import RichText from "@/components/ui/RichText";
import CheckList from "@/components/ui/CheckList";
import { spareParts } from "@/data/home";

export default function SpareParts() {
  return (
    <section aria-label="Commercial laundry machine spare parts in Malaysia" className="bg-emerald-50/40">
      <div className="mx-auto max-w-4xl px-5 py-20">
        <h2 className="text-center text-3xl font-bold leading-tight text-navy sm:text-4xl">
          {spareParts.title}
        </h2>

        <div className="mt-8 space-y-4">
          {spareParts.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-body sm:text-base">
              <RichText segments={p} />
            </p>
          ))}
        </div>

        <h3 className="mt-10 text-xl font-bold text-navy">{spareParts.listTitle}</h3>
        <CheckList items={spareParts.list} className="mt-5" />

        <p className="mt-8 text-sm leading-relaxed text-body sm:text-base">{spareParts.closing}</p>
      </div>
    </section>
  );
}
