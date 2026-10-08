"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";

import { ArrowUpRight, Play } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { VideoViewer } from "@/components/ui/VideoViewer";
import { showcaseItems } from "@/lib/content";

type ShowcaseItem = (typeof showcaseItems)[number];

function WorkCard({ video, index, onWatch }: { video: ShowcaseItem; index: number; onWatch: (video: ShowcaseItem) => void }) {
  const reduceMotion = useReducedMotion();
  const [preview, setPreview] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLVideoElement>(null);

  const stopPreview = () => {
    playerRef.current?.pause();
    setPreview(false);
    setPlaying(false);
  };

  const startPreview = (event: PointerEvent<HTMLButtonElement>) => {
    if (reduceMotion || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    setPreview(true);
  };

  return (
    <article className="group min-w-0">
      <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
        <span>{String(index + 1).padStart(2, "0")} / {video.label}</span>
        <span className="text-[var(--accent)]">Marta Vaitkevich</span>
      </div>
      <button
        type="button"
        aria-label={`Watch ${video.title}`}
        aria-haspopup="dialog"
        onPointerEnter={startPreview}
        onPointerLeave={stopPreview}
        onBlur={stopPreview}
        onClick={(event) => {
          event.currentTarget.focus({ preventScroll: true });
          stopPreview();
          onWatch(video);
        }}
        className="relative block aspect-[9/14] w-full overflow-hidden bg-[#ddcabc] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      >
        <Image
          src={video.poster}
          alt={`${video.title} — video still`}
          fill
          sizes={index === 0 ? "(max-width: 767px) 90vw, (max-width: 1023px) 46vw, 38vw" : "(max-width: 767px) 90vw, (max-width: 1023px) 46vw, 28vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
        />
        {preview && !reduceMotion && (
          <video
            ref={playerRef}
            src={video.src}
            muted
            autoPlay
            playsInline
              preload="none"
            aria-hidden="true"
            onPlaying={() => setPlaying(true)}
            onTimeUpdate={(event) => { if (event.currentTarget.currentTime >= 5) stopPreview(); }}
            onEnded={stopPreview}
            onError={stopPreview}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0"}`}
          />
        )}
        {preview && playing && !reduceMotion && <span aria-hidden="true" className="preview-indicator">Still to story <span className="preview-progress" /></span>}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#251912]/70 to-transparent" />
        <span className="absolute bottom-5 left-5 flex min-h-11 items-center gap-3 text-[#fff4e9] sm:bottom-6 sm:left-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#fff4e9]/60 transition-colors group-hover:bg-[#fff4e9] group-hover:text-[#3f2a22]">
            <Play size={15} fill="currentColor" strokeWidth={1.3} aria-hidden="true" />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.16em]">Watch film</span>
        </span>
        <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.4} className="absolute right-5 top-5 text-[#fff4e9] drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
      </button>
      <div className="border-b border-[var(--line)] pb-6 pt-5">
        <h3 className="font-display text-[clamp(1.65rem,2.6vw,2.6rem)] leading-[1.08] tracking-[-0.03em] text-[var(--text)]">{video.title}</h3>
        <p className="mt-3 max-w-[35ch] text-sm leading-relaxed text-[var(--muted)]">{video.description}</p>
      </div>
    </article>
  );
}

export function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<ShowcaseItem | null>(null);

  return (
    <section id="showcase" aria-labelledby="selected-work-title" className="section-wrap section-border">
      <div className="editorial-container">
        <AnimatedReveal>
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[var(--line)] pb-8 sm:mb-14 sm:flex-row sm:items-end">
            <div>
              <p className="mb-5 flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.23em] text-[var(--accent)]"><span>01</span><span className="h-px w-8 bg-current" />Video portfolio</p>
              <h2 id="selected-work-title" className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.045em] text-[var(--text)]">Selected <em className="font-normal">work.</em></h2>
            </div>
            <p className="max-w-[28ch] text-sm leading-relaxed text-[var(--muted)]">Beauty, fashion, and the moments in between. Filmed, shaped, and edited by Marta.</p>
          </div>
        </AnimatedReveal>
        <div className="grid items-start gap-x-7 gap-y-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-x-8">
          {showcaseItems.map((video, index) => (
            <AnimatedReveal key={video.src} delay={index * 0.08} className={index === 1 ? "lg:pt-24" : index === 2 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.875rem)] lg:col-span-1 lg:mx-0 lg:w-auto lg:pt-10" : undefined}>
              <WorkCard video={video} index={index} onWatch={setSelectedVideo} />
            </AnimatedReveal>
          ))}
        </div>
        <AnimatedReveal>
          <div className="mt-10 flex flex-col justify-between gap-4 text-xs text-[var(--muted)] sm:flex-row sm:items-center">
            <p>Creator-led films. An editorial eye.</p>
            <a href="#contact" className="inline-flex min-h-11 w-fit items-center gap-3 font-medium text-[var(--accent)] underline decoration-[var(--accent)]/35 underline-offset-8 transition-colors hover:text-[var(--text)]">Have a story in mind? <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </AnimatedReveal>
      </div>
      {selectedVideo && <VideoViewer key={selectedVideo.src} video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </section>
  );
}
