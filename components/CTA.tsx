"use client";

import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { siteMeta } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="section-wrap bg-[var(--text)] text-[#f9f2e9]">
      <div className="editorial-container">
        <AnimatedReveal>
          <div className="flex items-center justify-between gap-4 border-b border-[#f9f2e9]/25 pb-4">
            <p className="eyebrow !text-[#edb39b]">05 / Contact</p>
            <p className="text-xs text-[#f9f2e9]/75">Let&apos;s create together</p>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:items-end lg:gap-16">
            <div className="min-w-0">
              <h2 className="font-display text-[clamp(3.25rem,8vw,8rem)] leading-[0.92] tracking-[-0.045em]">Need UGC<br />or <span className="italic text-[#edb39b]">an edit?</span></h2>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-[#f9f2e9]/80">Send a short brief or the product details — Marta can film, edit, or take it from idea to final cut.</p>
            </div>
            <a href={`mailto:${siteMeta.email}`} className="group inline-flex min-h-14 items-center justify-between gap-6 border-b border-[#f9f2e9]/60 py-4 text-lg transition-colors hover:text-[#edb39b]">
              Start a project<ArrowUpRight className="h-8 w-8 transition-transform duration-200 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" strokeWidth={1.2} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-14 grid gap-7 border-t border-[#f9f2e9]/25 pt-7 sm:grid-cols-2 md:mt-20">
            <div className="min-w-0">
              <p className="mb-2 text-xs text-[#f9f2e9]/65">Email</p>
              <a href={`mailto:${siteMeta.email}`} className="inline-flex min-h-11 items-center break-all text-base underline decoration-[#f9f2e9]/40 underline-offset-8 transition-colors hover:text-[#edb39b] md:text-xl">{siteMeta.email}</a>
            </div>
            <div className="sm:justify-self-end">
              <p className="mb-2 text-xs text-[#f9f2e9]/65">Instagram</p>
              <a href={siteMeta.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-3 text-base underline decoration-[#f9f2e9]/40 underline-offset-8 transition-colors hover:text-[#edb39b] md:text-xl">{siteMeta.instagramHandle}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
