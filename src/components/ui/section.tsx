import { cn } from "@/lib/utils";
import { Container } from "./container";
import { type HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: "white" | "muted" | "primary" | "secondary";
}

const bgStyles = {
  white: "bg-white",
  muted: "bg-muted",
  primary: "bg-primary/10",
  secondary: "bg-secondary text-white",
};

export function Section({
  background = "white",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 md:py-24", bgStyles[background], className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className="text-3xl font-bold tracking-tight text-secondary md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
