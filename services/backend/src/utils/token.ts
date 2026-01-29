import crypto from 'node:crypto';

export function generateToken(): string {
  return crypto.randomBytes(20).toString('hex');
}
