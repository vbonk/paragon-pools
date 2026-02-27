import type { Metadata } from "next";
import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePersonSchema } from "@/lib/schema";
import { COMPANY } from "@/lib/constants";
import { mikeHenryContent } from "@/content/pages/mike-henry";

export const metadata: Metadata = createMetadata({
  title: "Mike Henry — President & Founder",
  description:
    "Meet Mike Henry, founder of Paragon Pool & Spa. Over 50 years in the pool industry, on-site for every project, BBB A+ rated since 1998.",
  path: "/about/mike-henry",
});

export default function MikeHenryPage() {
  return (
    <>
      <JsonLd
        data={generatePersonSchema({
          name: "Mike Henry",
          jobTitle: "President & Founder",
          description:
            "Founder of Paragon Pool & Spa with over 50 years of pool industry experience. On-site for every project since 1990.",
          url: `${COMPANY.url}/about/mike-henry`,
          knowsAbout: mikeHenryContent.expertise,
        })}
      />
      <BreadcrumbSchema
        items={[
          { name: "About", path: "/about" },
          { name: "Mike Henry", path: "/about/mike-henry" },
        ]}
      />
      <PageHero
        title={mikeHenryContent.hero.title}
        subtitle={mikeHenryContent.hero.subtitle}
        backgroundImage="/images/hero/pool-project-2.jpg"
      />
      <Breadcrumbs
        items={[
          { label: "About", href: "/about" },
          { label: "Mike Henry" },
        ]}
      />

      {/* Bio */}
      <Section background="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-secondary md:text-4xl">
            {mikeHenryContent.bio.title}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {mikeHenryContent.bio.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Expertise */}
      <Section background="muted">
        <SectionHeader
          title="Areas of Expertise"
          subtitle="Decades of hands-on experience across every aspect of pool construction."
        />
        <div className="mx-auto max-w-3xl">
          <ul className="grid gap-3 sm:grid-cols-2">
            {mikeHenryContent.expertise.map((item) => (
              <li key={item} className="flex items-start gap-2 text-muted-foreground">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Career Timeline */}
      <Section background="white">
        <SectionHeader
          title="Career Timeline"
          subtitle="Over 50 years of dedication to the pool industry."
        />
        <div className="mx-auto max-w-2xl">
          <div className="relative border-l-2 border-primary pl-8">
            {mikeHenryContent.milestones.map((milestone) => (
              <div key={milestone.year} className="relative mb-8 last:mb-0">
                <div className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <div className="h-2.5 w-2.5 rounded-full bg-secondary" />
                </div>
                <p className="text-sm font-bold text-primary-dark">
                  {milestone.year}
                </p>
                <p className="mt-1 text-muted-foreground">{milestone.event}</p>
              </div>
            ))}
          </div>

          {/* Latham Award */}
          <div className="mt-12 text-center">
            <Image
              src="/images/logos/latham-dealer.jpg"
              alt="Mike Henry and Paragon Pool team at 2015 Latham Dealer Conference"
              width={600}
              height={400}
              sizes="(max-width: 640px) 100vw, 600px"
              className="mx-auto rounded-xl"
            />
            <p className="mt-3 text-sm text-muted-foreground">
              2015 Latham Dealer Conference — Mike Henry recognized as Builder of Excellence.
            </p>
          </div>
        </div>
      </Section>

      {/* Brand Partners */}
      <Section background="muted">
        <SectionHeader
          title="Trusted Brand Partners"
          subtitle="We work exclusively with industry-leading manufacturers."
        />
        <div className="flex flex-wrap justify-center gap-4">
          {mikeHenryContent.brands.map((brand) => (
            <span
              key={brand}
              className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-secondary"
            >
              {brand}
            </span>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Work Directly With Mike"
        text="Mike is on-site for every project. Contact us to schedule your free consultation."
        cta={{ label: "Get a Free Quote", href: "/contact" }}
        phone={COMPANY.phone}
        phoneRaw={COMPANY.phoneRaw}
      />
    </>
  );
}
