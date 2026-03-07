import { createHash } from 'crypto';

export function hashIp(ip: string): string {
  const daySalt = new Date().toISOString().split('T')[0];
  const salt = process.env.IP_HASH_SALT || 'signalscore';
  return createHash('sha256')
    .update(`${ip}:${salt}:${daySalt}`)
    .digest('hex')
    .slice(0, 16);
}
