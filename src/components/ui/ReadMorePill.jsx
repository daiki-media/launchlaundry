/**
 * Card affordance: a bordered "+" circle that expands on hover to reveal its
 * label ("Read More", "Explore", …). Used on product, location and service cards.
 *
 * The parent card must carry Tailwind's `group` class — the expansion is driven
 * by `group-hover` / `group-focus-visible` so it also reacts to keyboard focus.
 */
export default function ReadMorePill({ label = "Read More" }) {
  return (
    <span
      aria-hidden="true"
      className="mt-5 inline-flex h-9 items-center gap-2 self-start rounded-full border border-slate-200 pl-2.5 pr-2.5 text-navy-soft transition-all duration-300 ease-out group-hover:border-brand group-hover:bg-brand group-hover:pr-4 group-hover:text-white group-focus-visible:border-brand group-focus-visible:bg-brand group-focus-visible:pr-4 group-focus-visible:text-white"
    >
      <svg
        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:rotate-90 group-focus-visible:rotate-90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 ease-out group-hover:max-w-[9rem] group-hover:opacity-100 group-focus-visible:max-w-[9rem] group-focus-visible:opacity-100">
        {label}
      </span>
    </span>
  );
}
