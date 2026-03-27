"use client";

import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioItems } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function Portfolio() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="portfolio" className="section-border px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedReveal>
          <SectionHeading
            index="04"
            eyebrow="Selected work"
            title="A few directions Marta edits most often for beauty and fashion brands."
            description="These examples show how the work shifts between beauty UGC, creator-led lifestyle content, and editing that keeps the viewer moving."
          />
        </AnimatedReveal>

        <div className="grid gap-5 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
          {portfolioItems.map((item, index) => {
            const gridPlacement =
              index === 0
                ? "lg:col-span-7 lg:row-span-2"
                : index === 1
                  ? "lg:col-span-5 lg:row-span-1"
                  : "lg:col-span-5 lg:row-span-1";

            return (
              <AnimatedReveal key={item.title} delay={index * 0.06} className={gridPlacement}>
                <motion.article
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -3, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }
                  }
                  className={`group relative h-full overflow-hidden rounded-[2rem] border border-[color:rgba(96,65,51,0.12)] bg-[rgba(49,31,24,0.24)] ${
                    index === 0 ? "min-h-[420px] lg:min-h-[46rem]" : "min-h-[320px] lg:min-h-[22.3rem]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={1500}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(36,19,14,0.82)] via-[rgba(36,19,14,0.18)] to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="text-[10px] uppercase tracking-[0.36em] text-[#efd4c6]">
                      {item.category}
                    </p>
                    <h3 className="font-display mt-3 text-[2rem] leading-none text-[#fff7f1] md:text-[2.4rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-prose text-sm leading-relaxed text-[#f1ddd2] md:text-base">
                      {item.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[11px] text-[#fff0e6]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
