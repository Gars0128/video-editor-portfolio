"use client";

import { navItems } from "@/lib/content";
import { useCallback, useEffect, useRef, useState } from "react";

type NavId = (typeof navItems)[number]["id"];

function readHashNavId(): NavId | null {
  const id = window.location.hash.replace(/^#/, "");
  const hit = navItems.find((item) => item.id === id);
  return hit?.id ?? null;
}

/**
 * Последняя по порядку на странице секция, чей верх уже выше «линии внимания».
 * Линия ниже шапки (~верх экрана + доля высоты окна), иначе следующая секция
 * становится активной слишком поздно и «Portfolio» залипает при переходе на Pricing.
 */
function pickActiveSectionIdFromScroll(): NavId {
  const header = document.querySelector("header");
  const headerBottom = header?.getBoundingClientRect().bottom ?? 72;
  const line = Math.max(headerBottom + 28, window.innerHeight * 0.3);

  const ordered = navItems
    .map((item) => ({ id: item.id, el: document.getElementById(item.id) }))
    .filter((x): x is { id: NavId; el: HTMLElement } => Boolean(x.el))
    .sort((a, b) => a.el.offsetTop - b.el.offsetTop);

  if (ordered.length === 0) return "hero";

  let active = ordered[0].id;
  for (const { id, el } of ordered) {
    if (el.getBoundingClientRect().top <= line) {
      active = id;
    }
  }
  return active;
}

export function TopNav() {
  const [active, setActive] = useState<NavId>("hero");
  const scrollDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const applyScrollSpy = useCallback(() => {
    setActive(pickActiveSectionIdFromScroll());
  }, []);

  const scheduleScrollSpy = useCallback(() => {
    if (scrollDebounceRef.current != null) clearTimeout(scrollDebounceRef.current);
    scrollDebounceRef.current = setTimeout(() => {
      scrollDebounceRef.current = null;
      applyScrollSpy();
    }, 64);
  }, [applyScrollSpy]);

  const setActiveFromHref = useCallback((href: string | null) => {
    if (!href?.startsWith("#")) return;
    const id = href.slice(1);
    const hit = navItems.find((item) => item.id === id);
    if (hit) setActive(hit.id);
  }, []);

  useEffect(() => {
    const fromHash = readHashNavId();
    if (fromHash) setActive(fromHash);
    else applyScrollSpy();

    const onHash = () => {
      const id = readHashNavId();
      if (id) setActive(id);
      else applyScrollSpy();
    };

    window.addEventListener("hashchange", onHash);
    window.addEventListener("scroll", scheduleScrollSpy, { passive: true });
    window.addEventListener("resize", scheduleScrollSpy);

    const onScrollEnd = () => applyScrollSpy();
    window.addEventListener("scrollend" as keyof WindowEventMap, onScrollEnd as EventListener);

    return () => {
      if (scrollDebounceRef.current != null) clearTimeout(scrollDebounceRef.current);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("scroll", scheduleScrollSpy);
      window.removeEventListener("resize", scheduleScrollSpy);
      window.removeEventListener("scrollend" as keyof WindowEventMap, onScrollEnd as EventListener);
    };
  }, [applyScrollSpy, scheduleScrollSpy]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border border-[color:rgba(96,65,51,0.12)] bg-[rgba(255,248,241,0.78)] px-4 py-2.5 shadow-[0_14px_40px_rgba(111,76,61,0.08)] backdrop-blur-xl md:gap-3 md:px-5">
        <a
          href="#hero"
          className="min-h-11 shrink-0 py-2"
          onClick={() => setActive("hero")}
        >
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
                  onClick={() => setActiveFromHref(item.href)}
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
            onClick={() => setActive("contact")}
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--accent-deep)] px-4 py-3 text-xs font-semibold tracking-[0.08em] text-[#fff6ef] transition hover:bg-[var(--accent)]"
          >
            Start a project
          </a>
        </div>
      </div>
    </header>
  );
}
