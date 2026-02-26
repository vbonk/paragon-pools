import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { ContactForm } from "@/components/sections/contact-form";
import { MapEmbed } from "@/components/sections/map-embed";
import { contactContent } from "@/content/pages/contact";

export const metadata: Metadata = createMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Paragon Pool & Spa for a free consultation. Visit our showrooms in Mahtomedi or Willernie, MN. Call (651) 653-6807.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Contact", path: "/contact" }]} />
      <PageHero
        title={contactContent.hero.title}
        subtitle={contactContent.hero.subtitle}
      />
      <Breadcrumbs items={[{ label: "Contact" }]} />

      {/* Contact Form */}
      <Section background="white">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-secondary mb-2">
              Send Us a Message
            </h2>
            <p className="text-muted-foreground mb-6">
              Fill out the form below and we&apos;ll get back to you within 1
              business day.
            </p>
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-secondary mb-2">
              {contactContent.info.title}
            </h2>
            <p className="text-muted-foreground mb-6">
              {contactContent.info.text}
            </p>
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-muted p-6">
                <p className="font-semibold text-secondary">Phone</p>
                <a
                  href="tel:+16516536807"
                  className="text-lg font-bold text-accent-dark hover:underline"
                >
                  (651) 653-6807
                </a>
              </div>
              <div className="rounded-xl border border-border bg-muted p-6">
                <p className="font-semibold text-secondary">Email</p>
                <a
                  href="mailto:sales@paragonpoolandspa.com"
                  className="text-primary-dark hover:underline"
                >
                  sales@paragonpoolandspa.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Map & Locations */}
      <Section background="muted">
        <SectionHeader
          title={contactContent.mapEmbed.title}
          subtitle={contactContent.mapEmbed.description}
        />
        <MapEmbed />
      </Section>
    </>
  );
}
