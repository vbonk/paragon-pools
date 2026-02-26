import { COMPANY } from "@/lib/constants";
import { JsonLd } from "./json-ld";

interface BreadcrumbSchemaProps {
  items: { name: string; path: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const allItems = [{ name: "Home", path: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${COMPANY.url}${item.path}`,
    })),
  };

  return <JsonLd data={schema} />;
}
