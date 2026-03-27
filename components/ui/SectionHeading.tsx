type SectionHeadingProps = {
  eyebrow: string;
  title?: string;
  description: string;
  align?: "left" | "center";
  index?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  index
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";
  return (
    <div className={`${alignClass} mb-12 md:mb-16`}>
      <div
        className={`mb-5 flex flex-wrap items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        {index ? (
          <span className="font-display text-sm tabular-nums tracking-[0.22em] text-[var(--accent)]">
            {index}
          </span>
        ) : null}
        <span className="hidden h-px w-8 bg-[color:rgba(166,88,67,0.35)] sm:block" aria-hidden />
        <p className="eyebrow text-[11px] font-semibold">
          {eyebrow}
        </p>
      </div>
      {title ? (
        <h2 className="font-display balanced-text text-[clamp(2rem,4.6vw,4.2rem)] font-semibold leading-[0.96] tracking-[-0.02em] text-[var(--text)]">
          {title}
        </h2>
      ) : null}
      <h3 className="mt-5 max-w-2xl text-sm font-normal leading-relaxed text-[var(--muted)] md:text-base">
        {description}
      </h3>
    </div>
  );
}
