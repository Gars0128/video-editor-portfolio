"use client";

import { navItems } from "@/lib/content";
import { useCallback, useEffect, useState } from "react";

function pickActiveSectionId(): string {
  const header = document.querySelector("header");
  const headerBottom = header?.getBoundingClientRect().bottom ?? 72;
  const y = headerBottom + Math.max(48, (window.innerHeight - headerBottom) * 0.12);

  const sections = navItems
    .map((item) => document.getElementById(item.id))
    .filter((el): el is HTMLElement => Boolean(el));

  for (const el of sections) {
    const r = el.getBoundingClientRect();
    if (r.top <= y && r.bottom >= y) {
      return el.id;
    }
  }

  let fallback: HTMLElement | null = null;
  let bestTop = -Infinity;
  for (const el of sections) {
    const r = el.getBoundingClientRect();
    if (r.top <= y && r.top > bestTop) {
      bestTop = r.top;
      fallback = el;
    }
  }
  return fallback?.id ?? "hero";
}

export function TopNav() {
  const [active, setActive] = useState<string>("hero");

  const syncActive = useCallback(() => {
    setActive(pickActiveSectionId());
  }, []);

  useEffect(() => {
    const sectionEls = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(syncActive, {
      rootMargin: "0px",
      threshold: [0, 0.02, 0.06, 0.12, 0.2, 0.35, 0.5, 0.65, 0.8, 1]
    });
    sectionEls.forEach((el) => obs.observe(el));

    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);

    const onHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (id && navItems.some((i) => i.id === id)) {
        requestAnimationFrame(() => syncActive());
      }
    };
    window.addEventListener("hashchange", onHash);
    syncActive();

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
      window.removeEventListener("hashchange", onHash);
    };
  }, [syncActive]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border border-[color:rgba(96,65,51,0.12)] bg-[rgba(255,248,241,0.78)] px-4 py-2.5 shadow-[0_14px_40px_rgba(111,76,61,0.08)] backdrop-blur-xl md:gap-3 md:px-5">
        <a href="#hero" className="min-h-11 shrink-0 py-2">
          <span className="block font-display text-sm tracking-[0.22em] text-[var(--text)]">
            MARTA VAITKEVICH
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] sm:block">
            UGC creator and video editor
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden min-w-0 flex-1 items-stretch gap-1 px-1 sm:px-3 md:px-4 lg:flex"
        >
          {navItems
            .filter((item) => item.id !== "hero")
            .map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActive(item.id)}
                  className={`flex min-h-11 flex-1 items-center justify-center rounded-full px-2 py-2 text-center text-xs font-semibold tracking-[0.08em] transition sm:px-3 ${
                    isActive
                      ? "bg-[var(--text)] text-[#fff6ef]"
                      : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--accent-deep)] px-4 py-3 text-xs font-semibold tracking-[0.08em] text-[#fff6ef] transition hover:bg-[var(--accent)]"
          >
            Start a project
          </a>
        </div>
      </div>
    </header>
  );
}
