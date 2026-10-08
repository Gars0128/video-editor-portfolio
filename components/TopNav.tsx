"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";

import { navItems } from "@/lib/content";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
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
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<NavId>("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
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
    const onHash = () => {
      const id = readHashNavId();
      if (id) setActive(id);
      else applyScrollSpy();
    };
    const initialFrame = requestAnimationFrame(onHash);

    window.addEventListener("hashchange", onHash);
    window.addEventListener("scroll", scheduleScrollSpy, { passive: true });
    window.addEventListener("resize", scheduleScrollSpy);

    const onScrollEnd = () => applyScrollSpy();
    window.addEventListener("scrollend" as keyof WindowEventMap, onScrollEnd as EventListener);

    return () => {
      cancelAnimationFrame(initialFrame);
      if (scrollDebounceRef.current != null) clearTimeout(scrollDebounceRef.current);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("scroll", scheduleScrollSpy);
      window.removeEventListener("resize", scheduleScrollSpy);
      window.removeEventListener("scrollend" as keyof WindowEventMap, onScrollEnd as EventListener);
    };
  }, [applyScrollSpy, scheduleScrollSpy]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="site-nav fixed inset-x-0 top-0 z-50 px-5 md:px-10">
      <div className="nav-inner editorial-container flex items-center justify-between gap-3">
        <a
          href="#hero"
          aria-label="Marta Vaitkevich - home"
          className="min-h-11 min-w-0 py-2"
          onClick={() => { setActive("hero"); setMenuOpen(false); }}
        >
          <span className="nav-wordmark" aria-hidden="true">Marta<span className="text-[var(--accent-deep)]">.</span></span>
          <span className="nav-byline">Vaitkevich / UGC &amp; video</span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden min-w-0 items-stretch gap-4 lg:flex"
        >
          {navItems
            .filter((item) => item.id !== "hero")
            .map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => setActiveFromHref(item.href)}
                  className="nav-link"
                >
                  {item.label}
                  {isActive && <motion.span layoutId="active-section" className="nav-active-line" transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }} aria-hidden />}
                </a>
              );
            })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#contact"
            onClick={() => setActive("contact")}
            className="nav-project editorial-link text-[var(--accent-deep)]"
          >
            Start a project
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(open => !open)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-[var(--text)] lg:hidden"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="nav-menu editorial-container grid max-h-[calc(100dvh-6.5rem)] gap-1 overflow-y-auto border-t bg-[var(--bg)] py-4 lg:hidden"
        >
          {navItems.filter(item => item.id !== "hero").map(item => (
            <a
              key={item.id}
              href={item.href}
              aria-current={active === item.id ? "location" : undefined}
              className={`flex min-h-12 items-center px-4 text-sm font-semibold ${active === item.id ? "bg-[var(--text)] text-[#fff6ef]" : "text-[var(--text)] hover:bg-[var(--bg)]"}`}
              onClick={() => { setActive(item.id); setMenuOpen(false); }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
