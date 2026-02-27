import type { BlogPost } from "@/types/content";
import { poolCostGuide } from "./pool-cost-guide";
import { winterizePoolMinnesota } from "./winterize-pool-minnesota";
import { vinylLinerVsFiberglass } from "./vinyl-liner-vs-fiberglass";

export const allPosts: BlogPost[] = [
  vinylLinerVsFiberglass,
  winterizePoolMinnesota,
  poolCostGuide,
].sort(
  (a, b) =>
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}
