import type { Metadata } from "next";
import { workSans } from "@/lib/fonts";
import { COMPANY } from "@/lib/constants";
import { generateLocalBusinessSchema, generateWebsiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: `${COMPANY.name} | Pool, Spa & Sauna Experts | Twin Cities MN`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.description,
  keywords: [
    "pool installation Minnesota",
    "inground pool contractor Twin Cities",
    "pool builder Minneapolis St Paul",
    "spa installation Twin Cities",
    "inground pools MN",
    "hot tubs Minnesota",
    "sauna installation Minnesota",
    "pool maintenance Twin Cities",
    "pool renovation Minnesota",
    "automatic pool cover installation",
    "Hayward pool equipment dealer",
    "vinyl liner pool Minnesota",
    "pool packages Minnesota",
    "Paragon Pool and Spa",
    "Paragon Pool and Patio",
    "pool contractor Willernie MN",
    "pool builder Stillwater MN",
    "pool company Forest Lake MN",
  ],
  authors: [{ name: COMPANY.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: COMPANY.url,
    siteName: COMPANY.name,
    title: `${COMPANY.name} | Pool, Spa & Sauna Experts`,
    description: COMPANY.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Paragon Pool & Spa" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  other: {
    "geo.region": "US-MN",
    "geo.placename": "Willernie, Minnesota",
    "geo.position": "45.0575;-92.9581",
    "ICBM": "45.0575, -92.9581",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-secondary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <JsonLd data={generateLocalBusinessSchema()} />
        <JsonLd data={generateWebsiteSchema()} />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
