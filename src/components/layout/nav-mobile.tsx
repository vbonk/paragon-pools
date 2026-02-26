"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-foreground hover:text-primary-dark"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-full z-50 border-b border-border bg-white shadow-lg">
          <nav className="flex flex-col p-4" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-md px-4 py-3 text-base font-medium transition-colors",
                  pathname === link.href
                    ? "text-primary-dark bg-primary/10"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="flex items-center gap-2 rounded-md px-4 py-3 text-base font-medium text-secondary"
            >
              <Phone className="h-4 w-4" />
              {COMPANY.phone}
            </a>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-lg bg-accent px-4 py-3 text-center text-base font-semibold text-white hover:bg-accent-dark transition-colors"
            >
              Get a Free Quote
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
