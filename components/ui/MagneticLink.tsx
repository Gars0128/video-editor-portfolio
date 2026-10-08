"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

export function MagneticLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 26 });
  const springY = useSpring(y, { stiffness: 220, damping: 26 });
  const reset = () => { x.set(0); y.set(0); };
  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.12);
  };
  return <motion.a href={href} className={className} style={{ x: reduceMotion ? 0 : springX, y: reduceMotion ? 0 : springY }} onPointerMove={move} onPointerLeave={reset} onBlur={reset}>{children}</motion.a>;
}
