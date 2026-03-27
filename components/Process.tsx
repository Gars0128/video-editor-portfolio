"use client";

import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processItems } from "@/lib/content";
import { motion, useReducedMotion } from "framer-motion";

export function Process() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="process" className="section-border px-5 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedReveal>
          <SectionHeading
            index="06"
            eyebrow="Working style"
            title="The goal is simple: make it look exceptional — and work instantly"
            description="Hook-first thinking, creator-native delivery, and editing choices made for retention."
          />
        </AnimatedReveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.1 }
            }
          }}
          className="grid gap-5 md:grid-cols-3 md:gap-6"
        >
          {processItems.map((item, index) => (
            <motion.article
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className={`panel rounded-[1.8rem] p-6 md:p-7 ${
                index === 1 ? "md:-translate-y-3" : ""
              }`}
            >
              <p className="font-display text-lg text-[var(--accent)]">{item.step}</p>
              <h3 className="font-display mt-5 text-[2rem] leading-none text-[var(--text)]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
