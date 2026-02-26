import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingTier } from "@/types/content";

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border-2 bg-white p-8 shadow-sm transition-shadow hover:shadow-md",
        tier.highlighted ? "border-accent" : "border-border"
      )}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
          {tier.cta}
        </span>
      )}
      <h3 className="text-2xl font-bold text-secondary">{tier.name}</h3>
      <p className="mt-2 text-muted-foreground">{tier.description}</p>
      <p className="mt-4 text-xl font-bold text-accent-dark">
        {tier.priceLabel}
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((feature) => (
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
          tier.highlighted
            ? "bg-accent text-white hover:bg-accent-dark"
            : "bg-secondary text-white hover:bg-secondary-light"
        )}
      >
        {tier.highlighted ? "Get Started" : tier.cta}
      </Link>
    </div>
  );
}

export function PricingGrid({ tiers }: { tiers: PricingTier[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {tiers.map((tier) => (
        <PricingCard key={tier.name} tier={tier} />
      ))}
    </div>
  );
}

export function AdditionalServicesTable({
  services,
}: {
  services: { service: string; price: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full">
        <thead>
          <tr className="bg-muted">
            <th className="px-6 py-3 text-left text-sm font-semibold text-secondary">
              Service
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-secondary">
              Starting Price
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {services.map((s) => (
            <tr key={s.service} className="hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4 text-sm">{s.service}</td>
              <td className="px-6 py-4 text-sm text-right font-medium">
                {s.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
