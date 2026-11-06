import { Pool } from 'pg';
const globalForPg = globalThis as unknown as { fhPool?: Pool };
export const db = globalForPg.fhPool ?? new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSL === 'disable' ? false : { rejectUnauthorized: false } });
if (process.env.NODE_ENV !== 'production') globalForPg.fhPool = db;
