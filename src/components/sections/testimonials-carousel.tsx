import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { TestimonialItem } from "@/types/content";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialItem;
}) {
  return (
    <Card className="flex flex-col h-full">
      <Quote className="h-8 w-8 text-primary/30 mb-3" />
      <blockquote className="mt-3 flex-1 text-muted-foreground leading-relaxed">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>
      <div className="mt-4 pt-4 border-t border-border">
        <p className="font-semibold text-secondary">{testimonial.author}</p>
        {testimonial.location && (
          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
        )}
        {testimonial.service && (
          <p className="text-sm text-primary-dark">{testimonial.service}</p>
        )}
      </div>
    </Card>
  );
}

export function TestimonialsGrid({
  testimonials,
}: {
  testimonials: TestimonialItem[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <TestimonialCard key={t.author} testimonial={t} />
      ))}
    </div>
  );
}
