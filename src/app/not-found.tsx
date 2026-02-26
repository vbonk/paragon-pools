import Link from "next/link";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section background="white">
      <div className="mx-auto max-w-lg text-center py-16">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold text-secondary">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or doesn&apos;t exist.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border-2 border-secondary px-6 py-3 font-semibold text-secondary hover:bg-secondary hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </Section>
  );
}
