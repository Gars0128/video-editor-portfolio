import type { Metadata } from "next";
import Link from "next/link";
import { siteMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteMeta.brand}`,
  description: `How ${siteMeta.brand} handles information when you use this portfolio website.`
};

export default function PrivacyPolicyPage() {
  return (
    <div className="site-shell relative min-h-screen overflow-x-clip px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Legal</p>
        <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Last updated: March 27, 2026</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-[var(--text)]">
          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Overview</h2>
            <p className="text-[var(--muted)]">
              This policy describes how information may be collected or processed when you visit this website (
              {siteMeta.brand}
              ). It is provided for transparency. You should review it with qualified counsel if you rely on it for
              compliance decisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Information you provide</h2>
            <p className="text-[var(--muted)]">
              If you contact {siteMeta.brand} by email or direct message, you choose what to share (for example your
              name, email address, and project details). That information is used only to respond and collaborate on
              your request unless you agree otherwise.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Automatically collected data</h2>
            <p className="text-[var(--muted)]">
              Hosting and analytics providers used to operate this site may process technical data such as IP address,
              device or browser type, and pages viewed. Exact vendors and retention depend on the deployment; ask for
              details if you need them for your records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Cookies</h2>
            <p className="text-[var(--muted)]">
              The site may use cookies or similar technologies that are necessary for basic operation or that support
              analytics. You can control cookies through your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Third-party links</h2>
            <p className="text-[var(--muted)]">
              Links to social platforms or other sites (for example Instagram) are governed by those services&apos;
              policies. This site is not responsible for their practices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Contact</h2>
            <p className="text-[var(--muted)]">
              Questions about this policy:{" "}
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
