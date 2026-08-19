import Image from "next/image";
import Link from "next/link";
import RichBody from "@/components/locations/RichBody";
import FaqAccordion from "@/components/locations/FaqAccordion";

function Split({ block, tinted }) {
  return (
    <section aria-label={block.heading} className={tinted ? "bg-violet-50/40" : "bg-white"}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:py-16 lg:grid-cols-2 lg:gap-14">
        <div className={block.reverse ? "lg:order-2" : undefined}>
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_36px_rgba(20,35,70,.10)]">
            <Image
              src={block.image}
              alt={block.imageAlt}
              width={720}
              height={520}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </div>

        <div className={block.reverse ? "lg:order-1" : undefined}>
          <h2 className="text-2xl font-extrabold leading-[1.25] tracking-tight text-navy sm:text-3xl">
            {block.heading}
          </h2>
          <RichBody body={block.body} className="mt-5" />
        </div>
      </div>
    </section>
  );
}

function Prose({ block, tinted }) {
  return (
    <section aria-label={block.heading} className={tinted ? "bg-violet-50/40" : "bg-white"}>
      <div className="mx-auto max-w-3xl px-5 py-14 sm:py-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
          {block.heading}
        </h2>
        <RichBody body={block.body} className="mt-5" />
      </div>
    </section>
  );
}

function Table({ block, tinted }) {
  return (
    <section aria-label={block.heading} className={tinted ? "bg-violet-50/40" : "bg-white"}>
      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-16">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
          {block.heading}
        </h2>

        {/* One table for every width. `.data-table` in globals.css renders it
            as a real table on desktop and as one card per row on phones, using
            the data-label on each cell — so this no longer needs a second copy
            of the same content in the markup. */}
        <div className="data-table-wrap mx-auto max-w-4xl">
          <table className="data-table">
            <thead>
              <tr>
                {block.columns.map((col) => (
                  <th key={col} scope="col">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, j) => (
                    <td key={j} data-label={block.columns[j] ?? ""}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {block.footnote && (
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-body">{block.footnote}</p>
        )}
      </div>
    </section>
  );
}

function Cta({ block }) {
  return (
    <section aria-label="Get in touch" className="bg-white">
      <div className="mx-auto max-w-3xl px-5 pb-16 pt-6 text-center sm:pb-20">
        {block.heading && (
          <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            {block.heading}
          </h2>
        )}
        {block.text && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-body sm:text-[15px]">
            {block.text}
          </p>
        )}
        <Link
          href={block.button.href}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark"
        >
          {block.button.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

const RENDERERS = { split: Split, prose: Prose, table: Table, faq: FaqAccordion, cta: Cta };

export default function LocationBlocks({ blocks }) {
  let tintIndex = 0;
  return blocks.map((block, i) => {
    const Renderer = RENDERERS[block.type];
    if (!Renderer) return null;
    // Alternate tinted backgrounds so adjacent sections stay separated.
    const tinted = block.type !== "cta" && tintIndex++ % 2 === 1;
    return <Renderer key={`${block.type}-${i}`} block={block} tinted={tinted} />;
  });
}
