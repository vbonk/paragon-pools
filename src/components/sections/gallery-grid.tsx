import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryItem {
  src: string;
  alt: string;
  featured?: boolean;
}

export function GalleryGrid({ images }: { images: GalleryItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <div
          key={image.src}
          className={cn(
            "group relative overflow-hidden rounded-xl bg-muted",
            image.featured && "sm:col-span-2 sm:row-span-2"
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
