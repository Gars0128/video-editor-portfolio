"use client";

import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { siteMeta } from "@/lib/content";
import { ArrowUpRight, Mail } from "lucide-react";

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CTA() {
  return (
    <section id="contact" className="section-border px-5 py-24 md:px-10 md:py-28">
      <AnimatedReveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-[color:rgba(96,65,51,0.14)] bg-[var(--text)] p-8 text-[#fff7f1] shadow-[0_30px_80px_rgba(83,53,43,0.2)] md:p-14">
          <div
            className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-[color:rgba(227,183,162,0.18)] blur-3xl"
            aria-hidden
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="eyebrow text-[11px] font-semibold text-[#efccbc]">Contact</p>
              <h2 className="font-display mt-5 balanced-text text-4xl leading-[0.94] text-[#fff8f2] md:text-[4.4rem]">
                Need creator-led content that feels native and still sells?
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#ead7cf] sm:text-base">
                Send the product, the angle, or a rough brief. Marta can shape the hook, shoot the
                content, edit the final piece, or handle the full delivery flow.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-stretch">
              <a
                href={`mailto:${siteMeta.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#fff4ec] px-6 py-3.5 text-sm font-semibold tracking-wide text-[var(--text)] transition hover:bg-white"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={`mailto:${siteMeta.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/6 px-5 py-3.5 text-sm text-[#f6e4da] transition hover:border-[#f2d0c0] hover:text-white"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} /> {siteMeta.email}
              </a>
              <a
                href={siteMeta.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/6 px-5 py-3.5 text-sm text-[#f6e4da] transition hover:border-[#f2d0c0] hover:text-white"
              >
                <InstagramIcon /> {siteMeta.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </AnimatedReveal>
    </section>
  );
}
