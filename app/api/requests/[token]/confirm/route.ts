import { NextResponse } from 'next/server';
import { db } from '../../../../../lib/db';
import { hashToken } from '../../../../../lib/security';
export const runtime = 'nodejs';
export async function POST(req:Request,{params}:{params:Promise<{token:string}>}) {
 const {token}=await params;
 if (!/^[\w-]{40,60}$/.test(token)) return NextResponse.json({error:'Invalid link'}, {status:404});
 const body=await req.json().catch(()=>null);
 if(body?.answer!=='yes' && body?.answer!=='no') return NextResponse.json({error:'Invalid response'}, {status:400});
 const status=body.answer==='yes'?'confirmed':'declined';
 const result=await db.query(`UPDATE verification_links SET status=$1, confirmed_at=CASE WHEN $1='confirmed' THEN now() ELSE confirmed_at END WHERE token_hash=$2 AND status='pending' AND expires_at>now() RETURNING status`,[status,hashToken(token)]);
 if (!result.rowCount) return NextResponse.json({error:'This request has already been handled or expired'}, {status:409});
 return NextResponse.json({status},{headers:{'Cache-Control':'no-store'}});
}
