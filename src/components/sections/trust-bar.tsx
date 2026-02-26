import { Shield, Award, Clock, Star } from "lucide-react";
import { Container } from "@/components/ui/container";

const trustItems = [
  { icon: Shield, label: "BBB A+ Rated", sublabel: "Since 1998" },
  { icon: Clock, label: "35+ Years", sublabel: "In Business" },
  { icon: Award, label: "Builder of Excellence", sublabel: "Latham 2015" },
  { icon: Star, label: "5-Star Reviews", sublabel: "Real Families" },
];

export function TrustBar({ variant = "compact" }: { variant?: "compact" | "full" }) {
  if (variant === "compact") {
    return (
      <div className="bg-secondary/5 border-y border-secondary/10">
        <Container className="py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm">
                <item.icon className="h-5 w-5 text-accent" />
                <span className="font-semibold text-secondary">{item.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-secondary/5 border-y border-secondary/10">
      <Container className="py-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center">
              <item.icon className="h-8 w-8 text-accent mb-2" />
              <span className="font-bold text-secondary">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.sublabel}</span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
