import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { JsonLd } from "@/components/seo/json-ld";
import { generateArticleSchema } from "@/lib/schema";
import { CtaBanner } from "@/components/sections/cta-banner";
import { COMPANY } from "@/lib/constants";
import { allPosts, getPostBySlug } from "@/content/blog";

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ...(post.image && { image: post.image }),
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={generateArticleSchema({
          title: post.title,
          description: post.description,
          author: post.author,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          url: `${COMPANY.url}/blog/${post.slug}`,
          image: post.image ? `${COMPANY.url}${post.image}` : undefined,
        })}
      />
      <BreadcrumbSchema
        items={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <Section background="white">
        <article className="mx-auto max-w-3xl">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-secondary md:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span>|</span>
              <time>
                {new Date(post.datePublished).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <p className="mt-4 text-lg text-muted-foreground">
              {post.description}
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            {post.sections.map((section) => (
              <section key={section.heading} className="mb-8">
                <h2 className="text-2xl font-semibold text-secondary">
                  {section.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </article>
      </Section>

      <CtaBanner
        title="Ready to Start Your Pool Project?"
        text="Contact us for a free consultation with owner Mike Henry."
        cta={{ label: "Get a Free Quote", href: "/contact" }}
        phone={COMPANY.phone}
        phoneRaw={COMPANY.phoneRaw}
      />
    </>
  );
}
