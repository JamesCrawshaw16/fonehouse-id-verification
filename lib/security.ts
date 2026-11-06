import { createHash, randomBytes, timingSafeEqual } from 'crypto';
export const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');
export const newToken = () => randomBytes(32).toString('base64url');
export function staffAuthorised(request: Request) {
 const secret = process.env.GENERATOR_API_KEY;
 const supplied = request.headers.get('x-generator-key') || '';
 if (!secret || !supplied) return false;
 const a = Buffer.from(secret), b = Buffer.from(supplied);
 return a.length === b.length && timingSafeEqual(a,b);
}
