"use client";

import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingItems } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Pricing() {
  const reduceMotion = useReducedMotion();
  const displayItems = [pricingItems[1], pricingItems[0], pricingItems[2]];

  return (
    <section id="pricing" className="section-border px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedReveal>
          <SectionHeading
            index="03"
            eyebrow="Pricing"
            description="Packages start here and can scale with scope, deliverables, and turnaround."
          />
        </AnimatedReveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {displayItems.map((item, index) => (
            <AnimatedReveal key={item.title} delay={index * 0.06}>
              <motion.article
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -4, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }
                }
                className={`relative h-full rounded-[2rem] border p-6 md:p-7 ${
                  index === 1
                    ? "border-[color:rgba(112,61,46,0.22)] bg-[var(--text)] text-[#fff7f1]"
                    : "panel"
                }`}
              >
                <p
                  className={`eyebrow text-[10px] font-semibold ${
                    index === 1 ? "text-[#f0cbbb]" : ""
                  }`}
                >
                  {index === 1 ? "Most requested" : "Package"}
                </p>
                <h3
                  className={`mt-4 font-display text-[2.4rem] leading-none ${
                    index === 1 ? "text-[#fff8f2]" : "text-[var(--text)]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-5 text-3xl font-semibold tracking-tight ${
                    index === 1 ? "text-[#fff8f2]" : "text-[var(--accent-deep)]"
                  }`}
                >
                  {item.price}
                </p>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    index === 1 ? "text-[#ead8cf]" : "text-[var(--muted)]"
                  }`}
                >
                  {item.description}
                </p>
                <ul
                  className={`mt-6 space-y-3 text-sm leading-relaxed ${
                    index === 1 ? "text-[#f5e6de]" : "text-[var(--text)]/88"
                  }`}
                >
                  {item.includes.map((entry) => (
                    <li key={entry} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                    index === 1
                      ? "bg-[#fff4ec] text-[var(--text)] hover:bg-white"
                      : "border border-[color:rgba(96,65,51,0.14)] bg-white/60 text-[var(--text)] hover:border-[var(--accent)]"
                  }`}
                >
                  Ask about this option
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
                </a>
              </motion.article>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
