"use client";

import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { pricingItems } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="section-wrap section-border">
      <div className="editorial-container">
        <AnimatedReveal className="mb-12 grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <p className="eyebrow mb-5">03 / Pricing</p>
            <h2 className="font-display text-[clamp(3rem,5.5vw,5.5rem)] leading-[0.98] tracking-[-0.04em]">Your next<br /><span className="italic text-[var(--accent-deep)]">creative collaboration.</span></h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[var(--muted)] md:ml-auto">Packages start here and can scale with scope, deliverables, and turnaround.</p>
        </AnimatedReveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.12fr_1fr] lg:gap-7 lg:pt-4">
          {pricingItems.map((item, index) => {
            const featured = index === 0;
            return (
              <AnimatedReveal key={item.title} delay={index * 0.06} className={`flex min-w-0 ${featured ? "lg:order-2" : index === 1 ? "lg:order-1" : "lg:order-3"}`}>
                <article data-featured={featured || undefined} className={`pricing-package flex w-full flex-col ${featured ? "pricing-featured" : "pricing-secondary"}`}>
                  <div className="flex min-h-7 flex-wrap items-center justify-between gap-3">
                    <p className="eyebrow text-[10px]">{featured ? "Full creation" : index === 1 ? "Before the camera" : "Post-production"}</p>
                    {featured && <span className="pricing-popular">Most popular</span>}
                  </div>
                  <h3 className="mt-5 font-display text-[2.2rem] leading-[1.1] tracking-[-0.03em] lg:min-h-[2.2em]">{item.title}</h3>
                  <p className={`pricing-price mt-6 font-display leading-tight ${featured ? "text-[3.5rem]" : "text-4xl"}`}>
                    {featured ? <><span className="text-lg">from</span>{" "}<span>{item.price.replace(/^from /, "")}</span></> : item.price}
                  </p>
                  <p className="pricing-muted mt-4 text-sm leading-relaxed lg:min-h-[3em]">{item.description}</p>
                  <ul className="mb-8 mt-7 flex-1 space-y-4 text-sm leading-relaxed">
                    {item.includes.map((entry) => (
                      <li key={entry} className="flex gap-3"><span className="pricing-dash mt-[0.65em] h-px w-3 shrink-0" aria-hidden="true" /><span>{entry}</span></li>
                    ))}
                  </ul>
                  <a href="#contact" className={`group inline-flex min-h-12 items-center justify-between gap-4 text-sm font-semibold transition-colors ${featured ? "pricing-featured-action px-5 py-4" : "border-t border-[var(--border)] py-3 hover:text-[var(--accent-deep)]"}`} aria-label={`Ask about ${item.title}`}>
                    {featured ? "Start a UGC project" : "Ask about this option"}<ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </article>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
