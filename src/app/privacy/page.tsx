import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Learn about Paragon Pool & Spa's data practices, how we collect and use your information, and our commitment to protecting your privacy.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[{ name: "Privacy Policy", path: "/privacy" }]}
      />
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-secondary mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: February 2026
          </p>

          <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
            What Data We Collect
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We collect the following information when you submit our contact
            form: your name, email address, phone number, project budget, and
            referral source. We do not collect any personal information unless
            you voluntarily provide it through our contact form.
          </p>

          <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The information you provide is forwarded to our business team to
            respond to your inquiry. We do not sell, rent, or share your
            information with third parties.
          </p>

          <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
            Cookies
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may use analytics cookies (Google Analytics) to understand site
            traffic and improve your experience. We do not use advertising
            cookies.
          </p>

          <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">
            Contact
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            For questions about this policy, contact us at{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-accent hover:underline"
            >
              {COMPANY.email}
            </a>{" "}
            or call{" "}
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="text-accent hover:underline"
            >
              {COMPANY.phone}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
