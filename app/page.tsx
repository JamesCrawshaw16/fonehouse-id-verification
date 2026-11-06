'use client';
import {useState} from 'react';
import FonehouseCapture from './components/FonehouseCapture';
export default function Home(){
 const [journeyId,setJourneyId]=useState<string|null>(null);
 const [finished,setFinished]=useState(false);
 return <main className="shell">
  <img className="logo" src="https://cdn2.fonehouse.co.uk/site-settings/site-branding/fonehouse-logo-pink-new-gXeNSwtTGs.svg" alt="Fonehouse"/>
  {finished?<><h1>Thank you</h1><p>You've completed the identity verification steps.</p><button className="btn" onClick={()=>{setJourneyId(null);setFinished(false)}}>Start another demonstration</button></>:
   journeyId?<FonehouseCapture journeyId={journeyId} onComplete={()=>setFinished(true)}/>:
   <><h1>Verify your identity</h1><p>This Fonehouse demonstration will guide you through capturing your identity document and a selfie.</p><p>Have your identity document ready and allow camera access when prompted.</p><button className="btn" onClick={()=>setJourneyId(crypto.randomUUID())}>Start verification</button></>}
 </main>;
}
