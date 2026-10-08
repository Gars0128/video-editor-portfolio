"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function ParallaxImage({ src, alt, className, priority = false }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [35, -35]);

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-2xl ${className ?? ""}`}>
      <motion.div className="absolute inset-x-0 -inset-y-10" style={{ y: reduceMotion ? 0 : y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 540px, (min-width: 1024px) 45vw, (min-width: 768px) 90vw, 100vw"
          priority={priority}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
