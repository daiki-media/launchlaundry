import RichBody, { Inline } from "@/components/locations/RichBody";

/**
 * Comparison / specification table laid out like ServiceProse: heading, table
 * and notes share the one `max-w-3xl` column the copy around it uses, and the
 * section takes its turn in the alternating tint. The table itself is the
 * shared `.data-table` from globals.css — a real table on desktop, one card per
 * row on phones — fed the same `section` shape as SpecTable on product pages.
 * Optional `body` / `after` are RichBody arrays for prose above and below the
 * table, and cells, caption and footnote accept RichBody inline runs (links).
 */
export default function ServiceTable({ section, tinted }) {
  const { heading, caption, body, columns, rows, footnote, after } = section;

  return (
    <section aria-label={heading} className={tinted ? "bg-violet-50/40" : "bg-white"}>
      <div className="mx-auto max-w-3xl px-5 py-14 sm:py-16">
        {heading && (
          <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{heading}</h2>
        )}
        {caption && (
          <p className="mt-5 text-sm leading-relaxed text-body sm:text-[15px]">
            <Inline content={caption} />
          </p>
        )}
        {body && <RichBody body={body} className="mt-5" />}

        {/* `.data-table-wrap` brings its own 2rem block margin. The top one is
            the gap under the heading; the bottom one would stack on the
            section padding, and only `!` outranks the unlayered rule. */}
        <div className="data-table-wrap mb-0!">
          <table className="data-table">
            {columns && (
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col} scope="col">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, i) => (
                <tr key={typeof row[0] === "string" ? row[0] : i}>
                  {row.map((cell, j) => (
                    <td key={j} data-label={columns?.[j] ?? ""}>
                      <Inline content={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {footnote && (
          <p className="mt-4 text-sm text-body">
            <Inline content={footnote} />
          </p>
        )}
        {after && <RichBody body={after} className="mt-6" />}
      </div>
    </section>
  );
}
