import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { hashToken } from '../../../../lib/security';
export const runtime = 'nodejs';
export async function GET(_req:Request,{params}:{params:Promise<{token:string}>}) {
 const {token}=await params;
 if (!/^[\w-]{40,60}$/.test(token)) return NextResponse.json({error:'Invalid link'}, {status:404});
 const result=await db.query('SELECT email,status,expires_at FROM verification_links WHERE token_hash=$1',[hashToken(token)]);
 const row=result.rows[0];
 if(!row || new Date(row.expires_at).getTime()<Date.now()) return NextResponse.json({error:'This link is unavailable or expired'}, {status:404});
 return NextResponse.json({email:row.email,status:row.status},{headers:{'Cache-Control':'no-store'}});
}
