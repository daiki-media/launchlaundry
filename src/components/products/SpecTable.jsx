export default function SpecTable({ section }) {
  const { heading, caption, columns, rows, footnote } = section;

  return (
    <section aria-label={heading} className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{heading}</h2>
        {caption && <p className="mt-2 max-w-xl text-sm text-body">{caption}</p>}

        {/* Wide tables scroll inside their own container rather than the page. */}
        <div className="mt-6 overflow-x-auto">
          <table className="mx-auto w-full min-w-[520px] max-w-3xl border-collapse text-sm">
            {columns && (
              <thead>
                <tr className="bg-slate-100">
                  {columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="border-2 border-slate-700 px-3 py-3 text-center font-bold text-navy"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, i) => (
                <tr key={row[0]} className={i % 2 ? "bg-slate-50" : undefined}>
                  {row.map((cell, j) => (
                    <td
                      key={`${row[0]}-${j}`}
                      className={`border border-slate-700 px-3 py-3 text-center ${
                        j === 0 ? "font-bold text-navy" : "text-body"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {footnote && <p className="mt-4 text-sm font-medium text-body">{footnote}</p>}
      </div>
    </section>
  );
}
