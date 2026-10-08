"use client";

import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { aboutContent } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="section-wrap section-border">
      <div className="editorial-container">
        <AnimatedReveal className="mb-10 flex items-center justify-between border-b border-[var(--border)] pb-4 md:mb-16">
          <p className="eyebrow">02 / Behind the work</p>
          <p className="text-xs text-[var(--muted)]">Creator &amp; editor</p>
        </AnimatedReveal>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <AnimatedReveal className="min-w-0">
            <figure>
              <ParallaxImage src={aboutContent.image} alt={aboutContent.imageAlt} className="aspect-[4/5] !rounded-none" />
              <figcaption className="mt-4 flex justify-between gap-4 text-xs text-[var(--muted)]">
                <span>Marta Vaitkevich</span><span>Beauty. Fashion. Everyday life.</span>
              </figcaption>
            </figure>
          </AnimatedReveal>
          <AnimatedReveal delay={0.08} className="min-w-0 lg:pt-8">
            <h2 className="font-display text-[clamp(3rem,5.5vw,5.5rem)] leading-[0.98] tracking-[-0.04em] text-[var(--text)]">{aboutContent.title}</h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--text)] md:text-xl">{aboutContent.description}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)]">{aboutContent.supportingText}</p>
            <dl className="mt-10 border-t border-[var(--border)] md:mt-14">
              {aboutContent.cards.map((card) => (
                <div key={card.title} className="grid gap-3 border-b border-[var(--border)] py-5 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-6">
                  <dt className="eyebrow pt-1 text-[10px]">{card.title}</dt>
                  <dd>
                    <p className="font-display text-2xl leading-tight text-[var(--text)]">{card.value}</p>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">{card.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
