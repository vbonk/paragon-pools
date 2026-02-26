import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { TestimonialItem } from "@/types/content";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-accent text-accent" : "text-border"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialItem;
}) {
  return (
    <Card className="flex flex-col h-full">
      <Quote className="h-8 w-8 text-primary/30 mb-3" />
      <StarRating rating={testimonial.rating} />
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
