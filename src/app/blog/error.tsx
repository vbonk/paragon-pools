"use client";

import Link from "next/link";
import { Section } from "@/components/ui/section";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section background="white">
      <div className="mx-auto max-w-lg text-center py-16">
        <p className="text-6xl font-bold text-primary">500</p>
        <h1 className="mt-4 text-3xl font-bold text-secondary">
          Error Loading Article
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg border-2 border-secondary px-6 py-3 font-semibold text-secondary hover:bg-secondary hover:text-white transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </Section>
  );
}
