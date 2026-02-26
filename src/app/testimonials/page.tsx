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
import { Star } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Customer Testimonials",
  description:
    "Read real reviews from Paragon Pool & Spa customers across the Twin Cities. Families share their pool installation experiences with owner Mike Henry.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const { reviews, summary } = testimonialsContent;

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

      {/* Summary Stats */}
      <Section background="primary">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-4xl font-bold text-secondary">
              {summary.averageRating}
              <Star className="h-8 w-8 fill-accent text-accent" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Average Rating</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-secondary">
              {summary.totalReviews}+
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-secondary">
              {summary.recommendation}%
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Would Recommend Us
            </p>
          </div>
        </div>
      </Section>

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
