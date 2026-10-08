"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { showcaseItems } from "@/lib/content";

type VideoViewerProps = {
  video: (typeof showcaseItems)[number];
  onClose: () => void;
};

/** Native modal keeps keyboard focus inside the player and makes the page inert. */
export function VideoViewer({ video, onClose }: VideoViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const playerRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const fallbackRef = useRef<HTMLAnchorElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const player = playerRef.current;
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";
    return () => {
      player?.pause();
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="work-viewer-title"
      aria-describedby="work-viewer-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[92dvh] w-[min(94vw,960px)] max-w-none overflow-auto border border-[#f7efe6]/20 bg-[#2e211c] p-0 text-[#f7efe6] shadow-2xl backdrop:bg-[#251912]/85"
    >
      {/* Only the boundary guards redirect focus; native media controls keep their Tab order. */}
      <span
        tabIndex={0}
        aria-hidden="true"
        data-focus-guard="start"
        onFocus={() => (fallbackRef.current ?? playerRef.current)?.focus({ preventScroll: true })}
        className="pointer-events-none fixed h-px w-px overflow-hidden opacity-0"
      />
      <div className="flex items-center justify-between gap-4 border-b border-[#f7efe6]/15 px-5 py-4 sm:px-7">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#e5ba9e]">{video.label}</p>
          <h2 id="work-viewer-title" className="mt-1 font-display text-2xl sm:text-3xl">{video.title}</h2>
        </div>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close video"
          onClick={onClose}
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#f7efe6]/30 transition-colors hover:bg-[#f7efe6]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7efe6]"
        >
          <X size={20} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <div className="bg-[#1e1612]">
        <video
          ref={playerRef}
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          className="mx-auto h-[min(65dvh,640px)] w-full object-contain"
        >
          Your browser does not support this video. <a href={video.src}>Open video</a>.
        </video>
      </div>
      <div className="px-5 py-5 sm:px-7">
        <p id="work-viewer-description" className="max-w-xl text-sm leading-relaxed text-[#f7efe6]/80">{video.description}</p>
        {failed && (
          <p role="status" className="mt-3 text-sm text-[#e5ba9e]">
            The video could not load. <a ref={fallbackRef} href={video.src} className="underline underline-offset-4">Open the original video</a> to try again.
          </p>
        )}
      </div>
      <span
        tabIndex={0}
        aria-hidden="true"
        data-focus-guard="end"
        onFocus={() => closeRef.current?.focus({ preventScroll: true })}
        className="pointer-events-none fixed h-px w-px overflow-hidden opacity-0"
      />
    </dialog>
  );
}


