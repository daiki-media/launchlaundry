/**
 * Comparison / specification table laid out like ServiceProse: heading, table
 * and notes share the one `max-w-3xl` column the copy around it uses, and the
 * section takes its turn in the alternating tint. The table itself is the
 * shared `.data-table` from globals.css — a real table on desktop, one card per
 * row on phones — fed the same `section` shape as SpecTable on product pages.
 */
export default function ServiceTable({ section, tinted }) {
  const { heading, caption, columns, rows, footnote } = section;

  return (
    <section aria-label={heading} className={tinted ? "bg-violet-50/40" : "bg-white"}>
      <div className="mx-auto max-w-3xl px-5 py-14 sm:py-16">
        {heading && (
          <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{heading}</h2>
        )}
        {caption && (
          <p className="mt-5 text-sm leading-relaxed text-body sm:text-[15px]">{caption}</p>
        )}

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
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, j) => (
                    <td key={`${row[0]}-${j}`} data-label={columns?.[j] ?? ""}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {footnote && <p className="mt-4 text-sm text-body">{footnote}</p>}
      </div>
    </section>
  );
}
