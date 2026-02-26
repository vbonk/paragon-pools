import Link from "next/link";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/container";

interface CtaBannerProps {
  title: string;
  text: string;
  cta: { label: string; href: string };
  phone?: string;
  phoneRaw?: string;
}

export function CtaBanner({
  title,
  text,
  cta,
  phone,
  phoneRaw,
}: CtaBannerProps) {
  return (
    <section className="bg-gradient-to-r from-accent-dark to-accent text-white">
      <Container className="py-16 text-center md:py-20">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
          {text}
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={cta.href}
            className="inline-flex items-center justify-center rounded-lg bg-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-secondary-light transition-colors"
          >
            {cta.label}
          </Link>
          {phone && phoneRaw && (
            <a
              href={`tel:${phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Phone className="h-5 w-5" />
              {phone}
            </a>
          )}
        </div>
        <p className="mt-4 text-sm text-white/70">
          A+ BBB Rated &middot; 35+ Years Experience &middot; 2015 Builder of Excellence
        </p>
      </Container>
    </section>
  );
}
