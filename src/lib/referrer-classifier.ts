// Referrer classification for attribution. Standard: ai-marketing/standards/analytics.md
export const AI_DIRECT_PATTERNS = [
  'chat.openai.com', 'chatgpt.com',
  'perplexity.ai',
  'gemini.google.com', 'bard.google.com',
  'claude.ai',
  'copilot.microsoft.com', 'bing.com/chat',
  'you.com',
  'phind.com',
];

const AI_PROBABLE_PATTERNS = ['google.com'];

const SOCIAL_PATTERNS = [
  'linkedin.com', 'twitter.com', 'x.com',
  'facebook.com', 'instagram.com', 'youtube.com',
];

const SEARCH_PATTERNS = [
  'google.com', 'bing.com', 'yahoo.com', 'duckduckgo.com',
];

const PAID_SOURCES = new Set(['cpc', 'ppc', 'paid', 'adwords', 'gads']);

export type ReferrerCategory =
  | 'ai_direct' | 'ai_probable' | 'organic' | 'direct'
  | 'social' | 'paid' | 'referral' | 'unknown';

export function classifyReferrer(
  referrer: string | null | undefined,
  utmSource: string | null | undefined,
): ReferrerCategory {
  if (!referrer) {
    if (utmSource && utmSource.toLowerCase().includes('ai')) return 'ai_probable';
    return 'direct';
  }

  const r = referrer.toLowerCase();
  const utm = utmSource?.toLowerCase() ?? '';

  for (const pattern of AI_DIRECT_PATTERNS) {
    if (r.includes(pattern)) return 'ai_direct';
  }

  for (const pattern of AI_PROBABLE_PATTERNS) {
    if (r.includes(pattern)) {
      if (utm.includes('ai') || utm.includes('geo')) return 'ai_direct';
      return 'ai_probable';
    }
  }

  for (const pattern of SOCIAL_PATTERNS) {
    if (r.includes(pattern)) return 'social';
  }

  for (const pattern of SEARCH_PATTERNS) {
    if (r.includes(pattern)) return 'organic';
  }

  if (utmSource && PAID_SOURCES.has(utm)) return 'paid';

  return 'referral';
}
