import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { JsonLd } from "@/components/seo/json-ld";
import { generateFAQPageSchema, generateServiceSchema, generateHowToSchema } from "@/lib/schema";
import { COMPANY } from "@/lib/constants";
import { servicesContent } from "@/content/pages/services";

export const metadata: Metadata = createMetadata({
  title: "Pool, Spa & Sauna Services",
  description:
    "Custom pool design, hot tub installation, sauna installation, pool renovation, maintenance, and more. Serving the Twin Cities metro for 35+ years.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={generateFAQPageSchema(servicesContent.faqs)} />
      {servicesContent.services.map((s) => (
        <JsonLd key={s.title} data={generateServiceSchema({
          name: s.title,
          description: s.description,
          url: `${COMPANY.url}/services`,
        })} />
      ))}
      <JsonLd data={generateHowToSchema({
        name: "How Paragon Pool & Spa Builds Your Pool",
        description: "Our 4-step process from consultation to enjoying your new pool.",
        steps: servicesContent.process.map((step) => ({
          name: step.title,
          text: step.description,
        })),
      })} />
      <BreadcrumbSchema items={[{ name: "Services", path: "/services" }]} />
      <PageHero
        title={servicesContent.hero.title}
        subtitle={servicesContent.hero.subtitle}
        backgroundImage="/images/hero/pool-aerial-2.jpg"
      />
      <Breadcrumbs items={[{ label: "Services" }]} />

      {/* All Services */}
      <Section background="white">
        <SectionHeader
          title="Comprehensive Pool & Spa Services"
          subtitle="From design to construction to ongoing care, we handle it all."
        />
        <ServicesGrid services={servicesContent.services} />
      </Section>

      {/* Process */}
      <Section background="muted">
        <SectionHeader
          title="Our Process"
          subtitle="A simple, transparent process from start to finish."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {servicesContent.process.map((step) => (
            <div key={step.step} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-secondary">
                {step.step}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-secondary">
                {step.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section background="white">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Answers to common questions about our services."
        />
        <div className="mx-auto max-w-3xl divide-y divide-border">
          {servicesContent.faqs.map((faq) => (
            <details key={faq.question} className="group py-6">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-secondary">
                {faq.question}
                <span className="ml-4 text-primary-dark group-open:rotate-45 transition-transform text-xl">
                  +
                </span>
              </summary>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Ready to Start Your Project?"
        text="Contact us for a free consultation. We'll help you choose the perfect solution for your backyard."
        cta={{ label: "Get a Free Quote", href: "/contact" }}
        phone={COMPANY.phone}
        phoneRaw={COMPANY.phoneRaw}
      />
    </>
  );
}
