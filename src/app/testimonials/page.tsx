import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { TestimonialsGrid } from "@/components/sections/testimonials-carousel";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { generateReviewSchema } from "@/lib/schema";
import { COMPANY } from "@/lib/constants";
import { testimonialsContent } from "@/content/pages/testimonials";
export const metadata: Metadata = createMetadata({
  title: "Customer Testimonials",
  description:
    "Read real reviews from Paragon Pool & Spa customers across the Twin Cities. Families share their pool installation experiences with owner Mike Henry.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const { reviews } = testimonialsContent;

  return (
    <>
      <JsonLd data={generateReviewSchema(reviews)} />
      <BreadcrumbSchema
        items={[{ name: "Testimonials", path: "/testimonials" }]}
      />
      <PageHero
        title={testimonialsContent.hero.title}
        subtitle={testimonialsContent.hero.subtitle}
        backgroundImage="/images/backgrounds/testimonials-bg.jpg"
      />
      <Breadcrumbs items={[{ label: "Testimonials" }]} />

      {/* Reviews Grid */}
      <Section background="white">
        <SectionHeader
          title="What Our Customers Say"
          subtitle="Real reviews from real families across the Twin Cities."
        />
        <TestimonialsGrid testimonials={reviews} />
      </Section>

      <CtaBanner
        title="Join Our Happy Customers"
        text="Experience the Paragon difference. Contact us today to get started."
        cta={{ label: "Get a Free Quote", href: "/contact" }}
        phone={COMPANY.phone}
        phoneRaw={COMPANY.phoneRaw}
      />
    </>
  );
}
