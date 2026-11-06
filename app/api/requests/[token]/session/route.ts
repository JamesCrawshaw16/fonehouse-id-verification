import {NextResponse} from 'next/server';
import {db} from '../../../../../lib/db';
import {hashToken} from '../../../../../lib/security';
export const runtime='nodejs';
export async function POST(_req:Request,{params}:{params:Promise<{token:string}>}) {
 const {token}=await params;
 if(!/^[\w-]{40,60}$/.test(token)) return NextResponse.json({error:'Invalid link'},{status:404});
 const found=await db.query("SELECT status FROM verification_links WHERE token_hash=$1 AND expires_at>now()",[hashToken(token)]);
 if(found.rows[0]?.status!=='confirmed') return NextResponse.json({error:'Email confirmation required'},{status:403});
 const api_key_id=process.env.IDMISSION_API_KEY_ID, api_key_secret=process.env.IDMISSION_API_KEY_SECRET;
 if(!api_key_id||!api_key_secret) return NextResponse.json({error:'IDMission not configured'},{status:503});
 const r=await fetch('https://portal-api.idmission.com/portal.sessions.v1.SessionsService/CreateSession',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({api_key_id,api_key_secret}),cache:'no-store'});
 if(!r.ok) { console.error('Fonehouse IDMission session creation failed',{upstreamStatus:r.status}); return NextResponse.json({error:'Unable to create session',code:'IDMISSION_SESSION_UPSTREAM',upstreamStatus:r.status},{status:502}); }
 const data=await r.json();
 if(!data?.session?.id) { console.error('Fonehouse IDMission session response missing ID',{responseKeys:Object.keys(data||{})}); return NextResponse.json({error:'Unexpected session response',code:'IDMISSION_SESSION_RESPONSE'},{status:502}); }
 return NextResponse.json({id:data.session.id},{headers:{'Cache-Control':'no-store'}});
}
