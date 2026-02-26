import Link from "next/link";
import {
  Waves,
  Thermometer,
  Flame,
  Wrench,
  RefreshCw,
  Settings,
  Sun,
  Droplets,
  PenTool,
  type LucideIcon,
} from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import type { ServiceItem } from "@/types/content";

const iconMap: Record<string, LucideIcon> = {
  waves: Waves,
  thermometer: Thermometer,
  flame: Flame,
  wrench: Wrench,
  "refresh-cw": RefreshCw,
  settings: Settings,
  sun: Sun,
  droplets: Droplets,
  "pen-tool": PenTool,
};

export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => {
        const Icon = iconMap[service.icon] ?? Waves;
        const content = (
          <Card
            key={service.title}
            className="group flex flex-col h-full hover:border-primary/50"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary-dark group-hover:bg-primary/20 transition-colors">
              <Icon className="h-6 w-6" />
            </div>
            <CardTitle className="mb-2">{service.title}</CardTitle>
            <CardDescription>{service.description}</CardDescription>
          </Card>
        );

        if (service.href) {
          return (
            <Link key={service.title} href={service.href} className="block">
              {content}
            </Link>
          );
        }

        return content;
      })}
    </div>
  );
}
