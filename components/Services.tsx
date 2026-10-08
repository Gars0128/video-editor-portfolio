"use client";

import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="section-wrap section-border">
      <div className="editorial-container">
        <AnimatedReveal className="mb-12 grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <p className="eyebrow mb-5">04 / Services</p>
            <h2 className="font-display text-[clamp(2.75rem,5.5vw,5.5rem)] leading-[0.98] tracking-[-0.04em]">From the first<br /><span className="italic text-[var(--accent-deep)]">idea to the final cut.</span></h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[var(--muted)] md:ml-auto">Marta can create the full UGC piece, develop the opening idea, or step in only for post-production when the footage already exists.</p>
        </AnimatedReveal>
        <div className="border-t border-[var(--border)]">
          {services.map((service, index) => (
            <AnimatedReveal key={service.title}>
              <article className="grid gap-5 border-b border-[var(--border)] py-7 md:grid-cols-[40px_minmax(0,1fr)_minmax(0,1fr)] md:gap-8 md:py-9">
                <p className="text-xs tabular-nums text-[var(--accent-deep)]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-[clamp(1.8rem,3vw,2.7rem)] leading-[1.05] tracking-[-0.025em]">{service.title}</h3>
                <div>
                  <p className="text-base leading-relaxed text-[var(--text)]">{service.description}</p>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)]">{service.detail}</p>
                </div>
              </article>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
