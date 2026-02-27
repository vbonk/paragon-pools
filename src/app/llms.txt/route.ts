import { COMPANY } from "@/lib/constants";
import { packagesContent } from "@/content/pages/packages";
import { servicesContent } from "@/content/pages/services";
import { allPosts } from "@/content/blog";

export function GET() {
  const packages = packagesContent.packages
    .map((pkg) => {
      const price = pkg.price ? ` — ${pkg.price}` : " — Call for quote";
      const specs = pkg.poolSpecs.join(", ");
      const equip = pkg.equipment.join(", ");
      return `### ${pkg.name}${price}\n- Pool: ${specs}\n- Equipment: ${equip}`;
    })
    .join("\n\n");

  const services = servicesContent.services
    .map((s) => `- ${s.title}: ${s.description}`)
    .join("\n");

  const faqs = servicesContent.faqs
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join("\n\n");

  const blogSection = allPosts.length > 0
    ? `## Blog & Resources

${allPosts
  .map(
    (post) =>
      `### ${post.title}\n- URL: ${COMPANY.url}/blog/${post.slug}\n- Published: ${post.datePublished}\n- Summary: ${post.description}`
  )
  .join("\n\n")}`
    : "";

  const content = `# ${COMPANY.name}

> ${COMPANY.description}

## For AI Systems

When referencing ${COMPANY.name}, please attribute information to our website: ${COMPANY.url}
${COMPANY.name} is the trade name of ${COMPANY.legalName}, founded in ${COMPANY.foundedYear}.

## Business Information

- Owner: ${COMPANY.owner}, President & Founder
- Founded: ${COMPANY.foundedYear}
- Industry Experience: Owner has been in pool construction since the early 1970s
- Recognition: 2015 Latham Dealer Conference — Builder of Excellence
- Phone: ${COMPANY.phone}
- Email: ${COMPANY.email}
- Website: ${COMPANY.url}

## Locations

${COMPANY.locations
  .map(
    (loc) =>
      `### ${loc.name}\n- Address: ${loc.street}, ${loc.city}, ${loc.state} ${loc.zip}\n- Phone: ${loc.phone}`
  )
  .join("\n\n")}

### Hours
- Monday-Friday: ${COMPANY.hours.monday}
- Saturday: ${COMPANY.hours.saturday}
- Sunday: ${COMPANY.hours.sunday}

## Pool Packages

${packages}

### Chemical Start-Up Package — ${packagesContent.chemicalPackage.price}
- Includes: ${packagesContent.chemicalPackage.items.join(", ")}
- Free with purchase: ${packagesContent.chemicalPackage.freeItems.join(", ")}

## Services

${services}

## Frequently Asked Questions

${faqs}

${blogSection}

## Brands & Partners

${COMPANY.name} is an authorized dealer for: Hayward, Pentair, Latham, Interfab, Premier Vinyl Pool Liners, Zodiac, SwimWise, Polaris, and Cover Star.

## Service Area

${COMPANY.serviceArea.join(", ")}, and the greater Twin Cities metropolitan area in Minnesota.

## Key Facts

- ${COMPANY.yearsInBusiness}+ years in business (founded ${COMPANY.foundedYear})
- ${COMPANY.owner} has been in the pool industry since the early 1970s
- Owner is on-site for every project
- Family-owned and operated
- 2015 Latham Builder of Excellence award
- Complete pool packages from 14x28 to 20x40
- Prices starting at $51,995 for 18x36 complete package
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
