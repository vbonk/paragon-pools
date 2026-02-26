import Link from "next/link";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <Container className="py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Paragon Pool & Spa</h3>
            <p className="text-sm text-primary-light leading-relaxed mb-4">
              {COMPANY.description}
            </p>
            <div className="flex gap-4">
              <a
                href={COMPANY.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-light hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Locations
            </h4>
            <div className="flex flex-col gap-3 text-sm text-primary-light">
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {COMPANY.email}
              </a>
              {COMPANY.locations.map((loc) => (
                <div key={loc.name} className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">{loc.name}</p>
                    <p>
                      {loc.street}, {loc.city}, {loc.state} {loc.zip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Hours
            </h4>
            <div className="flex flex-col gap-1 text-sm text-primary-light">
              {Object.entries(COMPANY.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="capitalize">{day}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-xs text-primary-light">
                BBB Accredited &middot; A+ Rating
              </p>
            </div>
          </div>
        </div>

        <hr className="my-8 border-white/20" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-primary-light sm:flex-row">
          <p>
            &copy; {currentYear} {COMPANY.legalName}. All rights reserved.
          </p>
          <p>
            Serving the Twin Cities metro area for over {COMPANY.yearsInBusiness} years.
          </p>
        </div>
      </Container>
    </footer>
  );
}
