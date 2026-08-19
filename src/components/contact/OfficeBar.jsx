import Link from "next/link";
import { officeBar } from "@/data/contact";

function Icon({ path }) {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

export default function OfficeBar() {
  return (
    <section aria-label="Office information" className="bg-brand text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-6 text-sm sm:grid-cols-3">
        <p className="flex gap-2.5">
          <Icon
            path={
              <>
                <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </>
            }
          />
          <span className="leading-relaxed text-white/95">{officeBar.address}</span>
        </p>

        <p className="flex gap-2.5">
          <Icon path={<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />} />
          <a href={`tel:${officeBar.phone}`} className="underline-offset-2 hover:underline">
            {officeBar.phone}
          </a>
        </p>

        <p className="flex gap-2.5">
          <Icon
            path={
              <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 16v-4M12 8h.01" />
              </>
            }
          />
          <span className="leading-relaxed text-white/95">
            {officeBar.note}{" "}
            <Link href={officeBar.noteLink.href} className="underline underline-offset-2">
              {officeBar.noteLink.label}
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
}
