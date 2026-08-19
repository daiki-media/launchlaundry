import Link from "next/link";

/**
 * Breadcrumb banner used at the top of every inner page.
 * Soft mint → lavender wash, matching the original design.
 */
export default function PageHero({ title, breadcrumb = [] }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(60% 100% at 0% 50%, rgba(198,238,216,.75) 0%, rgba(198,238,216,0) 70%)," +
          "radial-gradient(65% 110% at 100% 50%, rgba(224,214,250,.8) 0%, rgba(224,214,250,0) 72%)," +
          "linear-gradient(100deg, #eefaf3 0%, #fbfaff 48%, #f2ecfd 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        {breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-navy-soft">
              {breadcrumb.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-brand">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <span aria-hidden="true" className="text-slate-400">
                      &gt;
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
      </div>
    </section>
  );
}
