import Link from "next/link";
import { Container } from "@/components/ui/container";

interface HeroProps {
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundClass?: string;
}

export function Hero({
  title,
  subtitle,
  cta,
  secondaryCta,
  backgroundClass = "bg-gradient-to-br from-secondary via-secondary-light to-secondary",
}: HeroProps) {
  return (
    <section className={`relative ${backgroundClass} text-white`}>
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_50%)] opacity-20" />

      <Container className="relative py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg text-primary-light md:text-xl leading-relaxed">
              {subtitle}
            </p>
          )}
          {(cta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {cta && (
                <Link
                  href={cta.href}
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-accent-dark transition-colors"
                >
                  {cta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-to-r from-secondary to-secondary-light text-white">
      <Container className="py-16 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-primary-light md:text-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
