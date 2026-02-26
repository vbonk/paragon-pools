import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { COMPANY } from "@/lib/constants";
import { productsContent } from "@/content/pages/products";

export const metadata: Metadata = createMetadata({
  title: "Products",
  description:
    "Browse hot tubs, spas, saunas, pool equipment, and supplies at Paragon Pool & Spa. Visit our Twin Cities showrooms to see our selection.",
  path: "/products",
});

const productGallery = [
  { src: "/images/gallery/product-1.jpg", alt: "Pool and spa product" },
  { src: "/images/gallery/product-2.jpg", alt: "Pool and spa product" },
  { src: "/images/gallery/product-3.jpg", alt: "Pool and spa product" },
  { src: "/images/gallery/product-4.jpg", alt: "Pool and spa product" },
  { src: "/images/gallery/product-5.jpg", alt: "Pool and spa product" },
  { src: "/images/gallery/product-6.jpg", alt: "Pool and spa product" },
  { src: "/images/gallery/product-7.jpg", alt: "Pool and spa product" },
  { src: "/images/gallery/product-8.jpg", alt: "Pool and spa product" },
  { src: "/images/gallery/product-9.jpg", alt: "Pool and spa product" },
];

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Products", path: "/products" }]} />
      <PageHero
        title={productsContent.hero.title}
        subtitle={productsContent.hero.subtitle}
        backgroundImage="/images/hero/beach-ball-pool.jpg"
      />
      <Breadcrumbs items={[{ label: "Products" }]} />

      {productsContent.categories.map((category, index) => (
        <Section
          key={category.name}
          background={index % 2 === 0 ? "white" : "muted"}
        >
          <SectionHeader
            title={category.name}
            subtitle={category.description}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.products.map((product) => (
              <Card key={product.name}>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription className="mt-2">
                  {product.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </Section>
      ))}

      {/* Product Gallery */}
      <Section background="muted">
        <SectionHeader
          title="Product Gallery"
          subtitle="Browse our selection of pool and spa products."
        />
        <GalleryGrid images={productGallery} />
      </Section>

      <CtaBanner
        title="Visit Our Showroom"
        text="See our hot tubs, spas, and saunas in person. Our team is ready to help you find the perfect fit."
        cta={{ label: "Get Directions", href: "/contact" }}
        phone={COMPANY.phone}
        phoneRaw={COMPANY.phoneRaw}
      />
    </>
  );
}
