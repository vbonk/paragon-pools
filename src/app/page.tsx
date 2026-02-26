import { Hero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { TestimonialsGrid } from "@/components/sections/testimonials-carousel";
import { CtaBanner } from "@/components/sections/cta-banner";
import { TrustBar } from "@/components/sections/trust-bar";
import { COMPANY } from "@/lib/constants";
import { homeContent } from "@/content/pages/home";

const projectGallery = [
  { src: "/images/hero/pool-project-1.jpg", alt: "Custom inground pool project by Paragon Pool & Spa", featured: true },
  { src: "/images/hero/pool-aerial-1.jpg", alt: "Aerial view of completed pool installation", featured: true },
  { src: "/images/hero/pool-project-2.jpg", alt: "Backyard pool transformation" },
  { src: "/images/hero/pool-aerial-2.jpg", alt: "Drone shot of pool and landscaping" },
];

export default function HomePage() {
  return (
    <>
      <Hero
        title={homeContent.hero.title}
        subtitle={homeContent.hero.subtitle}
        cta={homeContent.hero.cta}
        secondaryCta={homeContent.hero.secondaryCta}
        backgroundImage="/images/hero/pool-project-1.jpg"
      />

      <TrustBar variant="compact" />

      {/* Intro */}
      <Section background="white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary md:text-4xl">
            {homeContent.intro.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {homeContent.intro.text}
          </p>
        </div>
      </Section>

      {/* Stats */}
      <Section background="primary">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {homeContent.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-secondary md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Project Gallery */}
      <Section background="white">
        <SectionHeader
          title="Our Recent Projects"
          subtitle="See some of our custom pool installations across the Twin Cities."
        />
        <GalleryGrid images={projectGallery} />
      </Section>

      {/* Featured Services */}
      <Section background="muted">
        <SectionHeader
          title="What We Do"
          subtitle="Comprehensive pool, spa, and sauna services for every step of your journey."
        />
        <ServicesGrid services={homeContent.featuredServices} />
      </Section>

      {/* Testimonials */}
      <Section background="white">
        <SectionHeader
          title="What Our Customers Say"
          subtitle="Trusted by families across the Twin Cities metro area."
        />
        <TestimonialsGrid testimonials={homeContent.featuredTestimonials} />
      </Section>

      {/* CTA */}
      <CtaBanner
        title={homeContent.ctaBanner.title}
        text={homeContent.ctaBanner.text}
        cta={homeContent.ctaBanner.cta}
        phone={COMPANY.phone}
        phoneRaw={COMPANY.phoneRaw}
      />
    </>
  );
}
