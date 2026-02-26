import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article" | "main";
}

export function Container({
  as: Tag = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
