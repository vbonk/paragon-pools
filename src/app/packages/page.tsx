import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { PackageGrid } from "@/components/sections/package-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { COMPANY } from "@/lib/constants";
import { packagesContent } from "@/content/pages/packages";

export const metadata: Metadata = createMetadata({
  title: "Pool Packages",
  description:
    "Explore our curated inground pool packages — Essentials, Premium, and Ultimate Paradise. Custom pool design and construction with quality guarantees.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Packages", path: "/packages" }]} />
      <PageHero
        title={packagesContent.hero.title}
        subtitle={packagesContent.hero.subtitle}
      />
      <Breadcrumbs items={[{ label: "Packages" }]} />

      <Section background="white">
        <SectionHeader
          title="Choose Your Package"
          subtitle="Each package is fully customizable to fit your space, style, and budget."
        />
        <PackageGrid packages={packagesContent.packages} />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {packagesContent.note}
        </p>
      </Section>

      <CtaBanner
        title="Let's Design Your Dream Pool"
        text="Every project starts with a free consultation. Let us help you choose the right package for your backyard."
        cta={{ label: "Get a Free Quote", href: "/contact" }}
        phone={COMPANY.phone}
        phoneRaw={COMPANY.phoneRaw}
      />
    </>
  );
}
