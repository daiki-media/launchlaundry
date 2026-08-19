export default function SpecTable({ section }) {
  const { heading, caption, columns, rows, footnote } = section;

  return (
    <section aria-label={heading} className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">{heading}</h2>
        {caption && <p className="mt-2 max-w-xl text-sm text-body">{caption}</p>}

        {/* `.data-table` is the shared treatment defined in globals.css: a real
            table on desktop, one card per row on phones. Each cell carries its
            column name in data-label so the card view can print it — which is
            why a wide spec sheet needs no horizontal scrollbar. */}
        <div className="data-table-wrap mx-auto max-w-3xl">
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

        {footnote && <p className="mt-4 text-sm font-medium text-body">{footnote}</p>}
      </div>
    </section>
  );
}
