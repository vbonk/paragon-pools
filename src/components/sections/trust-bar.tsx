import { Shield, Award, Clock, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { COMPANY } from "@/lib/constants";

const trustItems = [
  { icon: Shield, label: "BBB A+ Rated", sublabel: "Since 1998" },
  { icon: Clock, label: `${COMPANY.yearsInBusiness}+ Years`, sublabel: "In Business" },
  { icon: Award, label: "Builder of Excellence", sublabel: "Latham 2015" },
  { icon: Users, label: "Family Owned", sublabel: "Since 1990" },
];

export function TrustBar() {
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
