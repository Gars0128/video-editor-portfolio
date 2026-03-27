"use client";

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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [35, -35]);

  return (
    <div ref={ref} className={`overflow-hidden rounded-2xl ${className ?? ""}`}>
      <motion.div style={{ y }}>
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={900}
          priority={priority}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
