"use client";

import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="section-border px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16">
        <AnimatedReveal>
          <SectionHeading
            index="01"
            title={aboutContent.title}
            titleSize="compact"
            description={aboutContent.description}
          />
          <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">
            {aboutContent.supportingText}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {aboutContent.cards.map((card) => (
              <article key={card.title} className="panel rounded-[1.6rem] p-5">
                <p className="eyebrow text-[10px] font-semibold">{card.title}</p>
                <h3 className="mt-3 font-display text-[1.9rem] leading-none text-[var(--text)]">
                  {card.value}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{card.description}</p>
              </article>
            ))}
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.08} className="lg:pt-6">
          <div className="glass rounded-[2rem] p-3">
            <ParallaxImage
              src={aboutContent.image}
              alt={aboutContent.imageAlt}
              className="min-h-[440px] rounded-[1.65rem]"
            />
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
