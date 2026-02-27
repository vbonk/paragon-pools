import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { COMPANY } from "@/lib/constants";
import { aboutContent } from "@/content/pages/about";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about Paragon Pool & Spa — a family-owned pool, spa, and sauna company serving the Twin Cities for over 35 years.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "About", path: "/about" }]} />
      <PageHero
        title={aboutContent.hero.title}
        subtitle={aboutContent.hero.subtitle}
        backgroundImage="/images/hero/pool-project-2.jpg"
      />
      <Breadcrumbs items={[{ label: "About" }]} />

      {/* Story */}
      <Section background="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-secondary md:text-4xl">
            {aboutContent.story.title}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {aboutContent.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section background="muted">
        <SectionHeader
          title="Our Values"
          subtitle="The principles that guide everything we do."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.values.map((value) => (
            <Card key={value.title}>
              <CardTitle>{value.title}</CardTitle>
              <CardDescription className="mt-2">
                {value.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section background="white">
        <SectionHeader
          title="Our Journey"
          subtitle="Key milestones in our 35+ year history."
        />
        <div className="mx-auto max-w-2xl">
          <div className="relative border-l-2 border-primary pl-8">
            {aboutContent.milestones.map((milestone) => (
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

          {/* Latham Dealer Award */}
          <div className="mt-12 text-center">
            <Image
              src="/images/logos/latham-dealer.jpg"
              alt="Paragon Pool & Spa team at Latham dealer conference"
              width={600}
              height={400}
              sizes="(max-width: 640px) 100vw, 600px"
              className="mx-auto rounded-xl"
            />
            <p className="mt-3 text-sm text-muted-foreground">
              2015 Latham Dealer Conference — Paragon Pools recognized as Builder of Excellence.
            </p>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section background="muted">
        <SectionHeader
          title="Our Team"
          subtitle="Meet the experts behind Paragon Pool & Spa."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {aboutContent.team.map((member) => (
            <Link key={member.name} href="/about/mike-henry" className="block">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-2xl font-bold text-secondary">
                  {member.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <CardTitle className="text-center">{member.name}</CardTitle>
                <p className="text-sm text-primary-dark mt-1">{member.role}</p>
                {member.bio && (
                  <CardDescription className="mt-2">
                    {member.bio}
                  </CardDescription>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Let's Build Something Great Together"
        text="Contact us today to start planning your dream backyard."
        cta={{ label: "Contact Us", href: "/contact" }}
        phone={COMPANY.phone}
        phoneRaw={COMPANY.phoneRaw}
      />
    </>
  );
}
