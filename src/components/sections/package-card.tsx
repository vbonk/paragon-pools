import Link from "next/link";
import { Check, Gift, AlertCircle } from "lucide-react";
import type { RealPackageItem, ChemicalPackage } from "@/types/content";

function SpecList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-dark mb-3">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 shrink-0 text-accent mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PackageCard({ pkg }: { pkg: RealPackageItem }) {
  const hasPrice = pkg.price !== null;

  return (
    <div className="relative flex flex-col rounded-xl border-2 border-border bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl font-bold text-secondary">{pkg.name}</h3>
        {hasPrice ? (
          <span className="shrink-0 rounded-lg bg-accent px-4 py-2 text-lg font-bold text-white">
            {pkg.price}
          </span>
        ) : (
          <span className="shrink-0 rounded-lg bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
            Call for Quote
          </span>
        )}
      </div>

      <div className="mt-6 flex-1 space-y-6">
        <SpecList title="Pool Specifications" items={pkg.poolSpecs} />
        <SpecList title="Equipment Included" items={pkg.equipment} />

        {pkg.bonuses && pkg.bonuses.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-green-700 mb-3">
              Bonus Inclusions
            </h4>
            <ul className="space-y-2">
              {pkg.bonuses.map((bonus) => (
                <li key={bonus} className="flex items-start gap-2 text-sm text-green-800">
                  <Gift className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                  <span>{bonus}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {pkg.additionalCosts && pkg.additionalCosts.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Additional Costs (Not Included)
            </h4>
            <ul className="space-y-2">
              {pkg.additionalCosts.map((cost) => (
                <li key={cost} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{cost}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Link
        href="/contact"
        className="mt-8 block rounded-lg bg-accent px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-accent-dark"
      >
        {hasPrice ? "Get Started" : "Request a Quote"}
      </Link>
    </div>
  );
}

export function PackageGrid({ packages }: { packages: RealPackageItem[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {packages.map((pkg) => (
        <PackageCard key={pkg.name} pkg={pkg} />
      ))}
    </div>
  );
}

export function ChemicalPackageCard({ pkg }: { pkg: ChemicalPackage }) {
  return (
    <div className="rounded-xl border-2 border-accent/30 bg-accent/5 p-8">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl font-bold text-secondary">{pkg.name}</h3>
        <span className="shrink-0 rounded-lg bg-accent px-4 py-2 text-lg font-bold text-white">
          {pkg.price}
        </span>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-dark mb-3">
            Included
          </h4>
          <ul className="space-y-2">
            {pkg.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-green-700 mb-3">
            Free With Purchase
          </h4>
          <ul className="space-y-2">
            {pkg.freeItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-green-800">
                <Gift className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
