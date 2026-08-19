"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/data/home";
import { mainNav, navCta } from "@/data/navigation";

const ICONS = {
  spark: "M12 3l1.9 5.3L19 10.2l-5.1 1.9L12 17.4l-1.9-5.3L5 10.2l5.1-1.9L12 3z",
  box: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 0v18M4 7.5l8 4.5 8-4.5",
  pin: "M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11zm0-8.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z",
};

function MenuIcon({ name, className }) {
  const d = ICONS[name];
  if (!d) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

function Chevron({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile drawer
  const [openMenu, setOpenMenu] = useState(null); // desktop mega menu (label)
  const [openSection, setOpenSection] = useState(null); // mobile accordion (label)
  const [lastPath, setLastPath] = useState(pathname);
  const closeTimer = useRef(null);
  const headerRef = useRef(null);

  // Any navigation closes everything. Adjusted during render rather than in an
  // effect so the menus never paint over the page they just navigated to.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setDrawerOpen(false);
    setOpenMenu(null);
    setOpenSection(null);
  }

  const isActive = (item) =>
    (item.match ?? [item.href]).some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );

  // Lock the page behind the mobile drawer. The data attribute also lets
  // globals.css hide the floating WhatsApp button, which would otherwise sit on
  // top of the drawer's bottom CTAs.
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.navOpen = "true";
    return () => {
      document.body.style.overflow = previous;
      delete document.body.dataset.navOpen;
    };
  }, [drawerOpen]);

  // Escape closes whichever layer is open; clicks outside close the mega menu.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setDrawerOpen(false);
    };
    const onPointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Hover intent: opening is immediate, closing waits so the pointer can travel
  // from the trigger into the panel without the menu snapping shut.
  const openOnHover = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const closeOnHover = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const activeMenu = mainNav.find((item) => item.label === openMenu && item.columns);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85"
      onMouseLeave={closeOnHover}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5 lg:h-24">
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

        {/* ---------- desktop ---------- */}
        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(item);
              const expanded = openMenu === item.label;

              return (
                <li
                  key={item.href}
                  className="flex items-center"
                  onMouseEnter={() => (item.columns ? openOnHover(item.label) : closeOnHover())}
                >
                  <Link
                    href={item.href}
                    onFocus={() => (item.columns ? openOnHover(item.label) : setOpenMenu(null))}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-lg px-3 py-2 text-[15px] font-medium transition-colors ${
                      active ? "text-brand" : "text-navy hover:text-brand"
                    } ${item.columns ? "pr-1" : ""}`}
                  >
                    {item.label}
                  </Link>

                  {item.columns && (
                    <button
                      type="button"
                      onClick={() => setOpenMenu(expanded ? null : item.label)}
                      aria-expanded={expanded}
                      aria-controls={`menu-${item.label}`}
                      aria-label={`${expanded ? "Hide" : "Show"} ${item.label} menu`}
                      className={`-ml-1 flex h-8 w-6 items-center justify-center rounded-md transition-colors ${
                        active || expanded ? "text-brand" : "text-navy hover:text-brand"
                      }`}
                    >
                      <Chevron
                        className={`h-4 w-4 transition-transform duration-200 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href={navCta.href}
          className="hidden shrink-0 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark lg:inline-flex"
        >
          {navCta.label}
        </Link>

        {/* ---------- mobile trigger ---------- */}
        <button
          type="button"
          onClick={() => setDrawerOpen((value) => !value)}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-navy transition hover:bg-slate-50 lg:hidden"
          aria-expanded={drawerOpen}
          aria-controls="mobile-nav"
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
            {drawerOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* ---------- desktop mega panel ---------- */}
      {activeMenu && (
        <div
          id={`menu-${activeMenu.label}`}
          className="nav-panel absolute inset-x-0 top-full hidden pb-4 lg:block"
          onMouseEnter={() => clearTimeout(closeTimer.current)}
        >
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(12,27,58,0.35)] lg:grid-cols-4">
              <div className="grid gap-x-6 gap-y-1 lg:col-span-3 lg:grid-cols-2">
                {activeMenu.columns.map((column, index) => (
                  <ul key={index} className="space-y-1">
                    {column.items.map((entry) => {
                      const current = pathname === entry.href;
                      return (
                        <li key={entry.href}>
                          <Link
                            href={entry.href}
                            aria-current={current ? "page" : undefined}
                            className={`group flex gap-3 rounded-xl p-3 transition ${
                              current ? "bg-brand/5" : "hover:bg-slate-50"
                            }`}
                          >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                              <MenuIcon name={activeMenu.icon} className="h-4 w-4" />
                            </span>
                            <span className="min-w-0">
                              <span
                                className={`block text-sm font-semibold transition-colors ${
                                  current ? "text-brand" : "text-navy group-hover:text-brand"
                                }`}
                              >
                                {entry.label}
                              </span>
                              {entry.description && (
                                <span className="mt-0.5 block text-xs leading-relaxed text-body/80">
                                  {entry.description}
                                </span>
                              )}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ))}
              </div>

              {activeMenu.promo && (
                <div className="flex flex-col justify-between rounded-xl bg-navy p-5 text-white">
                  <div>
                    <p className="text-base font-bold">{activeMenu.promo.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                      {activeMenu.promo.text}
                    </p>
                  </div>
                  <Link
                    href={activeMenu.promo.cta.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition hover:text-brand-soft"
                  >
                    {activeMenu.promo.cta.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------- mobile drawer ---------- */}
      {drawerOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto overscroll-contain bg-white lg:hidden"
          id="mobile-nav"
        >
          <nav className="px-5 pb-10 pt-2" aria-label="Mobile">
            <ul className="divide-y divide-slate-100">
              {mainNav.map((item) => {
                const active = isActive(item);
                const expanded = openSection === item.label;

                if (!item.columns) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`block py-3.5 text-base font-semibold ${
                          active ? "text-brand" : "text-navy"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex-1 py-3.5 text-base font-semibold ${
                          active ? "text-brand" : "text-navy"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setOpenSection(expanded ? null : item.label)}
                        aria-expanded={expanded}
                        aria-controls={`mobile-${item.label}`}
                        aria-label={`${expanded ? "Hide" : "Show"} ${item.label} links`}
                        className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-navy transition hover:bg-slate-50"
                      >
                        <Chevron
                          className={`h-5 w-5 transition-transform duration-200 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div
                      id={`mobile-${item.label}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="mb-3 space-y-1 border-l-2 border-brand/20 pl-3">
                          {item.columns
                            .flatMap((column) => column.items)
                            .map((entry) => {
                              const current = pathname === entry.href;
                              return (
                                <li key={entry.href}>
                                  <Link
                                    href={entry.href}
                                    tabIndex={expanded ? undefined : -1}
                                    aria-current={current ? "page" : undefined}
                                    className={`flex gap-3 rounded-lg px-2 py-2.5 transition ${
                                      current ? "bg-brand/5" : "active:bg-slate-50"
                                    }`}
                                  >
                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
                                      <MenuIcon name={item.icon} className="h-3.5 w-3.5" />
                                    </span>
                                    <span className="min-w-0">
                                      <span
                                        className={`block text-sm font-medium leading-snug ${
                                          current ? "text-brand" : "text-navy"
                                        }`}
                                      >
                                        {entry.label}
                                      </span>
                                      {entry.description && (
                                        <span className="mt-0.5 block text-xs leading-relaxed text-body/80">
                                          {entry.description}
                                        </span>
                                      )}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          <li>
                            <Link
                              href={item.href}
                              tabIndex={expanded ? undefined : -1}
                              className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-brand"
                            >
                              View all {item.label.toLowerCase()}
                              <span aria-hidden="true">→</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 space-y-3">
              <Link
                href={navCta.href}
                className="flex h-12 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white transition active:bg-brand-dark"
              >
                {navCta.label}
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="flex h-12 items-center justify-center rounded-full border border-slate-200 text-sm font-semibold text-navy transition active:bg-slate-50"
              >
                Call {site.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
