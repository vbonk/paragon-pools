import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  return (
    <div className="bg-muted border-b border-border">
      <Container className="py-3">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-muted-foreground">
            {allItems.map((item, index) => (
              <li key={item.label} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {item.href && index < allItems.length - 1 ? (
                  <Link
                    href={item.href}
                    className="hover:text-primary-dark transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-foreground" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </div>
  );
}
