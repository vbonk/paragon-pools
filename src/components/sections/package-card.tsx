import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PackageItem } from "@/types/content";

export function PackageCard({ pkg }: { pkg: PackageItem }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border-2 bg-white p-8 shadow-sm transition-shadow hover:shadow-md",
        pkg.popular ? "border-accent" : "border-border"
      )}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold text-secondary">{pkg.name}</h3>
      <p className="mt-2 text-muted-foreground leading-relaxed">
        {pkg.description}
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 shrink-0 text-accent mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className={cn(
          "mt-8 block rounded-lg px-6 py-3 text-center font-semibold transition-colors",
          pkg.popular
            ? "bg-accent text-white hover:bg-accent-dark"
            : "bg-secondary text-white hover:bg-secondary-light"
        )}
      >
        Get a Quote
      </Link>
    </div>
  );
}

export function PackageGrid({ packages }: { packages: PackageItem[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg) => (
        <PackageCard key={pkg.name} pkg={pkg} />
      ))}
    </div>
  );
}
