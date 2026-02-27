import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { COMPANY } from "@/lib/constants";
import { galleryContent } from "@/content/pages/gallery";

export const metadata: Metadata = createMetadata({
  title: "Project Gallery",
  description:
    "Browse photos of pool installations, hot tubs, spas, and outdoor living projects by Paragon Pool & Spa across the Twin Cities metro area.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Gallery", path: "/gallery" }]} />
      <PageHero
        title={galleryContent.hero.title}
        subtitle={galleryContent.hero.subtitle}
        backgroundImage="/images/hero/pool-project-2.jpg"
      />
      <Breadcrumbs items={[{ label: "Gallery" }]} />

      <Section background="white">
        <SectionHeader
          title="Our Work"
          subtitle="Pool installations, outdoor living spaces, and more from across the Twin Cities."
        />
        <GalleryGrid images={galleryContent.images} />
      </Section>

      <CtaBanner
        title="Ready to Start Your Project?"
        text="Contact us for a free consultation. We'll help you design the perfect backyard."
        cta={{ label: "Get a Free Quote", href: "/contact" }}
        phone={COMPANY.phone}
        phoneRaw={COMPANY.phoneRaw}
      />
    </>
  );
}
