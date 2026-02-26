import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import {
  PricingGrid,
  AdditionalServicesTable,
} from "@/components/sections/pricing-table";
import { CtaBanner } from "@/components/sections/cta-banner";
import { COMPANY } from "@/lib/constants";
import { plansPricingContent } from "@/content/pages/plans-pricing";

export const metadata: Metadata = createMetadata({
  title: "Plans & Pricing",
  description:
    "Pool and spa maintenance plans and services. Seasonal services, equipment repair, and custom pool construction quotes available from Paragon Pool & Spa.",
  path: "/plans-pricing",
});

export default function PlansPricingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Plans & Pricing", path: "/plans-pricing" }]}
      />
      <PageHero
        title={plansPricingContent.hero.title}
        subtitle={plansPricingContent.hero.subtitle}
        backgroundImage="/images/backgrounds/packages-bg.jpg"
      />
      <Breadcrumbs items={[{ label: "Plans & Pricing" }]} />

      {/* Maintenance Plans */}
      <Section background="white">
        <SectionHeader
          title="Maintenance Plans"
          subtitle="Keep your pool in perfect condition with a plan that fits your needs."
        />
        <PricingGrid tiers={plansPricingContent.maintenancePlans} />
      </Section>

      {/* Additional Services */}
      <Section background="muted">
        <SectionHeader
          title="Individual Services"
          subtitle="One-time services available without a maintenance plan."
        />
        <div className="mx-auto max-w-3xl">
          <AdditionalServicesTable
            services={plansPricingContent.additionalServices}
          />
        </div>
      </Section>

      {/* Construction Pricing */}
      <Section background="white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary md:text-4xl">
            {plansPricingContent.constructionNote.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {plansPricingContent.constructionNote.text}
          </p>
          <Link
            href={plansPricingContent.constructionNote.cta.href}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white hover:bg-accent-dark transition-colors"
          >
            {plansPricingContent.constructionNote.cta.label}
          </Link>
        </div>
      </Section>

      <CtaBanner
        title="Questions About Pricing?"
        text="We're happy to provide a detailed estimate for any service. Contact us today."
        cta={{ label: "Contact Us", href: "/contact" }}
        phone={COMPANY.phone}
        phoneRaw={COMPANY.phoneRaw}
      />
    </>
  );
}
