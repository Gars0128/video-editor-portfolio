import type { Metadata } from "next";
import Link from "next/link";
import { siteMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: `Terms of Use | ${siteMeta.brand}`,
  description: `Terms and conditions for using the ${siteMeta.brand} portfolio website.`
};

export default function TermsOfUsePage() {
  return (
    <div className="site-shell relative min-h-screen overflow-x-clip px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Legal</p>
        <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Last updated: March 27, 2026</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-[var(--text)]">
          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Agreement</h2>
            <p className="text-[var(--muted)]">
              By accessing this website, you agree to these terms. If you disagree, please do not use the site.{" "}
              {siteMeta.brand} may update these terms; continued use after changes means you accept the revised terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Use of content</h2>
            <p className="text-[var(--muted)]">
              Text, images, video, and design on this site are owned by {siteMeta.brand} or used with permission. You
              may not copy, redistribute, or exploit portfolio materials for commercial use without prior written
              consent, except as allowed by applicable law (for example fair use).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">No professional advice</h2>
            <p className="text-[var(--muted)]">
              This site is a portfolio and marketing presence. Nothing here is legal, financial, or other professional
              advice. Engagements are subject to separate agreements and scope.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Disclaimer of warranties</h2>
            <p className="text-[var(--muted)]">
              The site is provided &quot;as is&quot; without warranties of any kind. {siteMeta.brand} does not guarantee
              uninterrupted or error-free access or that content is complete or current.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Limitation of liability</h2>
            <p className="text-[var(--muted)]">
              To the fullest extent permitted by law, {siteMeta.brand} is not liable for indirect, incidental, or
              consequential damages arising from your use of this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Governing law</h2>
            <p className="text-[var(--muted)]">
              These terms are governed by the laws applicable to {siteMeta.brand}&apos;s operations, without regard to
              conflict-of-law rules. Specify your jurisdiction here if you require a fixed venue.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Contact</h2>
            <p className="text-[var(--muted)]">
              For questions about these terms:{" "}
              <a className="font-semibold text-[var(--accent-deep)] underline-offset-2 hover:underline" href={`mailto:${siteMeta.email}`}>
                {siteMeta.email}
              </a>
              .
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-12 inline-block text-sm font-semibold tracking-[0.06em] text-[var(--accent-deep)] transition hover:text-[var(--accent)]"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
