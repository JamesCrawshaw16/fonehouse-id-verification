"use client";
import { IdAndFaceValidation, themes } from "idmission-web-sdk";

export default function FonehouseCapture({token,onComplete}:{token:string;onComplete:()=>void}) {
 const sessionId = async () => {
   const r = await fetch(`/api/requests/${encodeURIComponent(token)}/session`, {method:"POST",cache:"no-store"});
   if (!r.ok) throw new Error("Unable to start verification");
   return (await r.json()).id as string;
 };
 const complete = () => onComplete();
 const theme = {
   ...themes.default,
   isFullscreen:true,
   fontFamily:"Arial, Helvetica, sans-serif",
   colors:{...themes.default.colors,primary:{...themes.default.colors.primary,500:"#e6328e",600:"#d5207d"}},
   buttons:{...themes.default.buttons,primary:{backgroundColor:"#e6328e",textColor:"#ffffff"}},
 };
 return <IdAndFaceValidation sessionId={sessionId} theme={theme}
  onApproved={()=>{void complete()}} onDenied={()=>{void complete()}}
  onAuthError={()=>alert("We couldn't start verification. Please try again or contact Fonehouse support.")}
 />;
}
