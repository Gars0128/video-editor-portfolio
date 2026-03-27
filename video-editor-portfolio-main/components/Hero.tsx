"use client";

import { heroContent } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-5 pb-20 pt-28 md:px-10 md:pb-24 md:pt-36"
    >
      <div
        className="pointer-events-none absolute inset-x-5 top-6 h-[26rem] rounded-[2.5rem] border border-[color:rgba(96,65,51,0.08)] bg-white/20 md:inset-x-10"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-12">
        <div className="relative z-10 max-w-[34rem]">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow inline-flex items-center gap-3 text-[11px] font-semibold"
          >
            <span className="accent-dot text-lg leading-none" aria-hidden>
              •
            </span>
            <span>{heroContent.eyebrow}</span>
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-6 max-w-[11.5ch] text-[clamp(2.8rem,6.4vw,5rem)] leading-[0.94] tracking-[-0.04em] text-[var(--text)]"
          >
            {heroContent.title}
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg"
          >
            {heroContent.description}
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent-deep)]"
          >
            UGC creator • video editor
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href={heroContent.primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent-deep)] px-6 py-3 text-sm font-semibold tracking-wide text-[#fff7f1] transition hover:bg-[var(--accent)]"
            >
              {heroContent.primaryCta.label}
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
            </a>
            <a
              href={heroContent.secondaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:rgba(96,65,51,0.18)] bg-white/45 px-6 py-3 text-sm font-semibold tracking-wide text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent-deep)]"
            >
              {heroContent.secondaryCta.label}
            </a>
          </motion.div>

          <motion.dl
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-10 grid gap-4 border-t border-[color:rgba(96,65,51,0.14)] pt-6 sm:grid-cols-3"
          >
            {heroContent.quickFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow text-[10px] font-semibold">{fact.label}</dt>
                <dd className="mt-2 text-sm text-[var(--text)]">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[34rem] lg:mr-0"
        >
          <div className="glass relative overflow-hidden rounded-[2rem] p-3 shadow-[0_30px_80px_rgba(112,75,60,0.18)]">
            <div className="relative overflow-hidden rounded-[1.55rem]">
              <Image
                src={heroContent.heroImage}
                alt={heroContent.heroImageAlt}
                width={1200}
                height={1600}
                priority
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(42,24,18,0.78)] via-[rgba(42,24,18,0.2)] to-transparent p-6 md:p-7">
                <p className="font-display text-[1.9rem] leading-none text-[#fff8f2] md:text-[2.2rem]">
                  Marta Vaitkevich
                </p>
              </div>
            </div>

            <div className="grid gap-3 border-t border-[color:rgba(96,65,51,0.12)] bg-white/55 p-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="eyebrow text-[10px] font-semibold">What&apos;s inside</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
                  UGC ads, organic content, hooks, filming, editing, and subtitles.
                </p>
              </div>
              <a
                href="#showcase"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[color:rgba(96,65,51,0.14)] bg-white px-4 py-2 text-xs font-semibold tracking-[0.08em] text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent-deep)]"
              >
                View portfolio
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
