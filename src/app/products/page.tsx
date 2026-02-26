import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { COMPANY } from "@/lib/constants";
import { productsContent } from "@/content/pages/products";

export const metadata: Metadata = createMetadata({
  title: "Products",
  description:
    "Browse hot tubs, spas, saunas, pool equipment, and supplies at Paragon Pool & Spa. Visit our Twin Cities showrooms to see our selection.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Products", path: "/products" }]} />
      <PageHero
        title={productsContent.hero.title}
        subtitle={productsContent.hero.subtitle}
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
