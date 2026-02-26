"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./nav-mobile";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      {/* Top bar */}
      <div className="bg-secondary text-white">
        <Container className="flex items-center justify-between py-2 text-sm">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="flex items-center gap-2 hover:text-primary-light transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            {COMPANY.phone}
          </a>
          <span className="hidden sm:inline">{COMPANY.email}</span>
        </Container>
      </div>

      {/* Main nav */}
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-secondary">
            Paragon
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            Pool & Spa
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === link.href
                  ? "text-primary-dark bg-primary/10"
                  : "text-foreground hover:text-primary-dark hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
          >
            Free Quote
          </Link>
        </nav>

        {/* Mobile nav */}
        <MobileNav />
      </Container>
    </header>
  );
}
