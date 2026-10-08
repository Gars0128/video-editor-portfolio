"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";

import { heroContent } from "@/lib/content";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const entrance = (delay: number) => ({
    "data-entrance": true,
    initial: { opacity: 1, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section ref={ref} id="hero" className="hero-section">
      <div className="editorial-container">
        <div className="hero-grid">
          <div className="hero-copy">
            <motion.p {...entrance(0)} className="eyebrow flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-deep)]" aria-hidden />
              The beauty edit / Marta Vaitkevich
            </motion.p>
            <h1 className="hero-title" aria-label="Beauty, in motion.">
              <span className="block overflow-hidden"><motion.span {...entrance(0.08)} aria-hidden className="block">Beauty,</motion.span></span>
              <span className="block overflow-hidden pb-3"><motion.span {...entrance(0.18)} aria-hidden className="block italic text-[var(--accent-deep)]">in motion.</motion.span></span>
            </h1>
            <motion.div {...entrance(0.28)}>
              <p className="mb-4 text-sm font-medium tracking-[0.04em] sm:text-base">{heroContent.title}</p>
              <p className="max-w-[37ch] text-base leading-relaxed text-[var(--muted)]">{heroContent.description}</p>
            </motion.div>
            <motion.div {...entrance(0.38)} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 sm:mt-10">
              <MagneticLink href={heroContent.primaryCta.href} className="button-primary">
                Watch my work <ArrowUpRight size={18} aria-hidden />
              </MagneticLink>
              <a href={heroContent.secondaryCta.href} className="editorial-link min-h-12">
                {heroContent.secondaryCta.label} <ArrowUpRight size={16} aria-hidden />
              </a>
            </motion.div>
            <motion.dl {...entrance(0.46)} className="hero-facts">
              {heroContent.quickFacts.map(fact => (
                <div key={fact.label} className="min-w-0">
                  <dt className="eyebrow text-[9px] sm:text-[10px]">{fact.label}</dt>
                  <dd className="mt-2 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">{fact.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
          <motion.figure {...entrance(0.12)} className="hero-figure">
            <span className="hero-frame-note" aria-hidden="true">A personal point of view</span>
            <div className="hero-image-frame">
              <motion.div className="absolute -inset-y-8 inset-x-0" style={{ y: reduceMotion ? 0 : imageY }}>
                <Image src={heroContent.heroImage} alt={heroContent.heroImageAlt} fill priority sizes="(min-width: 1440px) 560px, (min-width: 768px) 44vw, calc(100vw - 40px)" className="object-cover object-[50%_45%]" />
              </motion.div>
              <div className="hero-image-caption">
                <span className="text-[10px] uppercase tracking-[0.22em]">The creator behind the frame</span>
                <span className="font-display mt-2 block text-3xl sm:text-4xl">Marta Vaitkevich</span>
              </div>
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              <span>Beauty · fashion · lifestyle</span>
              <span className="shrink-0">01 / Portrait</span>
            </figcaption>
          </motion.figure>
        </div>
        <motion.a {...entrance(0.55)} href="#showcase" className="hero-scroll editorial-link">
          Explore selected work <ArrowDown size={16} aria-hidden />
        </motion.a>
      </div>
    </section>
  );
}
