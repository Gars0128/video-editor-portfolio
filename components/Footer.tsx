import { navItems, siteMeta } from "@/lib/content";

export function Footer() {
  return (
    <footer className="section-border px-5 py-12 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 border-t border-[color:rgba(96,65,51,0.14)] pt-10 text-sm text-[var(--muted)] md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-lg tracking-[0.16em] text-[var(--text)]">{siteMeta.brand}</p>
          <p className="mt-3 leading-relaxed">
            UGC creator and video editor for beauty, lifestyle, fashion, and ad-ready short-form content.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-xs font-semibold tracking-[0.08em] transition hover:text-[var(--text)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="text-xs md:text-right">
          <p>{siteMeta.instagramHandle}</p>
          <p className="mt-2">© {new Date().getFullYear()} {siteMeta.brand}</p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-[color:rgba(96,65,51,0.14)] pt-8">
        <nav
          aria-label="Legal"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold tracking-[0.06em] text-[var(--muted)]"
        >
          <a href="/privacy" className="transition hover:text-[var(--text)]">
            Privacy Policy
          </a>
          <a href="/terms" className="transition hover:text-[var(--text)]">
            Terms of Use
          </a>
        </nav>
      </div>
    </footer>
  );
}
