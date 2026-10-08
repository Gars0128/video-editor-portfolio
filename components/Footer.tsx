import { navItems, siteMeta } from "@/lib/content";

export function Footer() {
  return (
    <footer className="px-5 py-10 md:px-10 md:py-14">
      <div className="editorial-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-14">
          <div className="max-w-sm">
            <a href="#hero" className="font-display text-2xl tracking-[-0.03em] text-[var(--text)]">{siteMeta.brand}</a>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">UGC creator and video editor for beauty, lifestyle, fashion, and ad-ready short-form content.</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-start gap-x-5 gap-y-2 lg:grid lg:grid-cols-2">
            {navItems.map((item) => (<a key={item.id} href={item.href} className="inline-flex min-h-11 items-center text-sm transition-colors hover:text-[var(--accent-deep)]">{item.label}</a>))}
          </nav>
          <div className="flex min-w-0 flex-col items-start gap-2 text-sm">
            <a href={siteMeta.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center transition-colors hover:text-[var(--accent-deep)]">{siteMeta.instagramHandle}</a>
            <a href={`mailto:${siteMeta.email}`} className="inline-flex min-h-11 items-center break-all transition-colors hover:text-[var(--accent-deep)]">{siteMeta.email}</a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--border)] pt-5 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteMeta.brand}</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/privacy" className="inline-flex min-h-11 items-center transition-colors hover:text-[var(--accent-deep)]">Privacy Policy</a>
            <a href="/terms" className="inline-flex min-h-11 items-center transition-colors hover:text-[var(--accent-deep)]">Terms of Use</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
