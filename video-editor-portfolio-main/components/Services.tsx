"use client";

import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";

export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="section-border px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedReveal>
          <SectionHeading
            index="02"
            eyebrow="Services"
            title="Flexible support for brands, creators, and campaigns that need both content and edit logic."
            description="Marta can create the full UGC piece, develop the opening idea, or step in only for post-production when the footage already exists."
          />
        </AnimatedReveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-12 xl:gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            const spanClass =
              index < 2 ? "xl:col-span-6" : index === services.length - 1 ? "xl:col-span-12" : "xl:col-span-4";

            return (
              <AnimatedReveal key={service.title} delay={index * 0.05} className={spanClass}>
                <motion.article
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -4, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }
                  }
                  className={`group panel relative h-full overflow-hidden rounded-[1.8rem] p-6 md:p-7 ${
                    index === services.length - 1 ? "xl:mx-auto xl:max-w-4xl" : ""
                  }`}
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="font-display text-base text-[var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-[color:rgba(96,65,51,0.14)] bg-white/70 p-3 text-[var(--accent-deep)] transition group-hover:border-[var(--accent)]">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                  </div>
                  <h3 className="font-display text-[2rem] leading-none text-[var(--text)] md:text-[2.2rem]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text)]/88 md:text-base">
                    {service.description}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
                    {service.detail}
                  </p>
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[color:rgba(168,88,67,0.08)] blur-2xl transition group-hover:bg-[color:rgba(168,88,67,0.12)]"
                    aria-hidden
                  />
                </motion.article>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
