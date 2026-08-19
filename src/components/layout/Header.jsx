"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/data/home";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 lg:h-24">
        <Link href="/" aria-label={site.name} className="shrink-0">
          <Image
            src="/images/logo.png"
            alt={`${site.name} logo`}
            width={674}
            height={929}
            className="h-12 w-auto lg:h-16"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] text-navy transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-navy transition hover:bg-slate-50 lg:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-5 pb-4 lg:hidden" aria-label="Mobile">
          <ul className="pt-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-[15px] text-navy transition hover:bg-slate-50 hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
