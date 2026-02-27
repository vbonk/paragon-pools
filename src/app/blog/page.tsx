import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { CtaBanner } from "@/components/sections/cta-banner";
import { COMPANY } from "@/lib/constants";
import { allPosts } from "@/content/blog";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Pool tips, maintenance guides, and expert advice from Paragon Pool & Spa. Learn about inground pool costs, winterization, and more from 35+ years of experience.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Blog", path: "/blog" }]} />
      <PageHero
        title="Pool Tips & Resources"
        subtitle="Expert advice from 35+ years of pool construction and maintenance in Minnesota."
        backgroundImage="/images/hero/poolside-chairs.jpg"
      />
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <Section background="white">
        <SectionHeader
          title="Latest Articles"
          subtitle="Practical guides to help you make informed decisions about your pool project."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-lg"
            >
              {post.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <time className="text-sm text-muted-foreground">
                  {new Date(post.datePublished).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h3 className="mt-2 text-lg font-semibold text-secondary group-hover:text-primary-dark">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Have a Question About Your Pool?"
        text="Our team has 35+ years of experience. Contact us for expert advice."
        cta={{ label: "Contact Us", href: "/contact" }}
        phone={COMPANY.phone}
        phoneRaw={COMPANY.phoneRaw}
      />
    </>
  );
}
