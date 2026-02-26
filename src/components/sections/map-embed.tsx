import { MapPin, Clock, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function MapEmbed() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Map */}
      <div className="overflow-hidden rounded-xl border border-border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90185.82920388698!2d-93.05!3d45.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87f7d5c02e1c1c1d%3A0x0!2zNDXCsDAzJzI3LjAiTiA5MsijNTcnMjkuMiJX!5e0!3m2!1sen!2sus!4v1"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Paragon Pool & Spa locations"
          className="w-full"
        />
      </div>

      {/* Locations & Info */}
      <div className="space-y-4">
        {COMPANY.locations.map((location) => (
          <div
            key={location.name}
            className="rounded-xl border border-border bg-white p-5"
          >
            <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary-dark" />
              {location.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {location.street}
              <br />
              {location.city}, {location.state} {location.zip}
            </p>
            <div className="mt-2 flex items-center gap-4">
              <a
                href={`tel:${location.phone.replace(/\D/g, "")}`}
                className="text-sm font-medium text-accent-dark hover:underline"
              >
                {location.phone}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${location.street}, ${location.city}, ${location.state} ${location.zip}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary-dark hover:underline"
              >
                Get Directions
              </a>
            </div>
          </div>
        ))}

        <div className="rounded-xl border border-border bg-white p-5">
          <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary-dark" />
            Hours
          </h3>
          <div className="mt-3 space-y-1 text-sm text-muted-foreground">
            {Object.entries(COMPANY.hours).map(([day, hours]) => (
              <div key={day} className="flex justify-between">
                <span className="capitalize font-medium">{day}</span>
                <span>{hours}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-5">
          <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary-dark" />
            Call Us
          </h3>
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="mt-2 block text-xl font-bold text-accent-dark hover:underline"
          >
            {COMPANY.phone}
          </a>
          <a
            href={`mailto:${COMPANY.email}`}
            className="mt-1 block text-sm text-primary-dark hover:underline"
          >
            {COMPANY.email}
          </a>
        </div>
      </div>
    </div>
  );
}
