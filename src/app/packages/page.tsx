import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { JsonLd } from "@/components/seo/json-ld";
import { generateProductSchema } from "@/lib/schema";
import { PackageGrid, ChemicalPackageCard } from "@/components/sections/package-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { COMPANY } from "@/lib/constants";
import { packagesContent } from "@/content/pages/packages";

export const metadata: Metadata = createMetadata({
  title: "Pool Packages",
  description:
    "Complete inground pool packages from Paragon Pool & Spa — 14x28 to 20x40 rectangles with Hayward equipment, steel walls, and lifetime warranties. Prices starting at $51,995.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <>
      <JsonLd
        data={generateProductSchema({
          name: "Complete Inground Pool Package 18x36",
          description:
            "Complete 18x36 inground pool package with 14-gauge steel walls, Hayward SuperPump, 250K BTU heater, C-4000 filter, Polaris robotic cleaner, and lifetime transferrable warranty.",
          price: 51995,
          url: `${COMPANY.url}/packages`,
        })}
      />
      <BreadcrumbSchema items={[{ name: "Packages", path: "/packages" }]} />
      <PageHero
        title={packagesContent.hero.title}
        subtitle={packagesContent.hero.subtitle}
        backgroundImage="/images/hero/pool-aerial-1.jpg"
      />
      <Breadcrumbs items={[{ label: "Packages" }]} />

      <Section background="white">
        <SectionHeader
          title="Inground Pool Packages"
          subtitle="Every package includes 14-gauge steel walls, Hayward equipment, concrete footings, and a lifetime transferrable warranty. Owner Mike Henry is on-site for every installation."
        />
        <PackageGrid packages={packagesContent.packages} />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {packagesContent.note}
        </p>
      </Section>

      <Section background="muted">
        <SectionHeader
          title="Chemical Start-Up Package"
          subtitle="Everything you need to get your new pool ready for swimming."
        />
        <div className="mx-auto max-w-2xl">
          <ChemicalPackageCard pkg={packagesContent.chemicalPackage} />
        </div>
      </Section>

      <CtaBanner
        title="Let's Design Your Dream Pool"
        text="Every project starts with a free consultation. Call today or fill out our contact form for a personalized quote."
        cta={{ label: "Get a Free Quote", href: "/contact" }}
        phone={COMPANY.phone}
        phoneRaw={COMPANY.phoneRaw}
      />
    </>
  );
}
