export default function SectionBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-violet-100/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand sm:text-xs">
      <span aria-hidden="true" className="flex gap-[3px]">
        <span className="h-1 w-1 rounded-full bg-brand-soft" />
        <span className="h-1 w-1 rounded-full bg-brand-soft" />
      </span>
      {children}
    </span>
  );
}
