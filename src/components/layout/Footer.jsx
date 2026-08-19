import Link from "next/link";
import Image from "next/image";
import { footer, site } from "@/data/home";

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/logo-white.png"
            alt={`${site.name} logo`}
            width={90}
            height={110}
            className="h-20 w-auto"
          />
          <p className="mt-4 text-sm leading-relaxed">
            Delivering innovative laundry solutions to businesses across Malaysia.
            For inquiries, contact us at{" "}
            <a href={`mailto:${site.email}`} className="underline hover:text-white">
              {site.email}
            </a>{" "}
            or{" "}
            <a href={`tel:${site.phone}`} className="underline hover:text-white">
              {site.phone}
            </a>
            .
          </p>
        </div>

        {footer.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-base font-bold text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm leading-snug transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-slate-400">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
