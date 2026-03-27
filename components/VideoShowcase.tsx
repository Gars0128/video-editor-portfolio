"use client";

import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { showcaseItems } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";

export function VideoShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="showcase" className="section-border px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedReveal>
          <SectionHeading
            index="05"
            eyebrow="Video examples"
            title="Selected works"
            description="The previews are inline and mobile-friendly, using Marta's actual footage."
          />
        </AnimatedReveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {showcaseItems.map((video, index) => (
            <AnimatedReveal key={video.title} delay={index * 0.06}>
              <motion.article
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -3, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }
                }
                className="glass group overflow-hidden rounded-[2rem] p-3"
              >
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <video
                    className="aspect-[9/16] w-full bg-[rgba(52,30,23,0.22)] object-cover"
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    poster={video.poster}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
                    <span className="rounded-full bg-[rgba(38,22,17,0.62)] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[#f5e1d6]">
                      {video.label}
                    </span>
                    <span className="rounded-full border border-white/20 bg-[rgba(38,22,17,0.56)] p-2 text-[#fff5ef]">
                      <Play className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
                <div className="px-2 pb-2 pt-5">
                  <h3 className="font-display text-[2rem] leading-none text-[var(--text)]">
                    {video.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {video.description}
                  </p>
                </div>
              </motion.article>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
