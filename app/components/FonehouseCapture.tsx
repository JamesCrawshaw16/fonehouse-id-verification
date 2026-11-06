"use client";
import { IdAndFaceValidation, themes } from "idmission-web-sdk";

export default function FonehouseCapture({token,onComplete}:{token:string;onComplete:()=>void}) {
 const sessionId = async () => {
   const r = await fetch(`/api/requests/${encodeURIComponent(token)}/session`, {method:"POST",cache:"no-store"});
   if (!r.ok) throw new Error("Unable to start verification");
   return (await r.json()).id as string;
 };
 const complete = () => onComplete();
 const accent="#e6328e", surface="#111111", canvas="#ffffff", ink="#111111";
 const theme = {
   ...themes.default,
   isFullscreen:true,
   fontFamily:"Arial, Helvetica, sans-serif",
   background:canvas,
   textColor:ink,
   textAlign:"center" as const,
   padding:"24px",
   colors:{...themes.default.colors,
     primary:{...themes.default.colors.primary,400:accent,500:accent,600:accent,700:accent},
     secondary:{...themes.default.colors.secondary,500:surface,600:surface,700:surface,800:surface,900:surface,950:surface},
     positive:{...themes.default.colors.positive,500:surface,600:surface,700:surface}},
   buttons:{...themes.default.buttons,
     primary:{backgroundColor:accent,textColor:"#ffffff"},
     secondary:{backgroundColor:surface,textColor:"#ffffff"},
     positive:{backgroundColor:surface,textColor:"#ffffff"},
     negative:{backgroundColor:"#c23532",textColor:"#ffffff"},
     warning:{backgroundColor:accent,textColor:"#ffffff"}},
   guidanceMessages:{...themes.default.guidanceMessages,
     default:{backgroundColor:canvas,textColor:ink},
     positive:{backgroundColor:surface,textColor:"#ffffff"},
     negative:{backgroundColor:"#c23532",textColor:"#ffffff"}},
   idCapture:{...themes.default.idCapture,
     loadingOverlay:{...themes.default.idCapture.loadingOverlay,backgroundColor:canvas,textColor:ink,loadingGraphicAccentColor:accent,progressBarBackgroundColor:surface,progressBarIndicatorColor:accent,progressBarTextColor:"#ffffff",continueBtnDisabledBackgroundColor:accent,continueBtnDisabledTextColor:"#ffffff"},
     guideOverlay:{...themes.default.idCapture.guideOverlay,backgroundColor:surface,textColor:"#ffffff"},
     guideBox:{...themes.default.idCapture.guideBox,unsatisfiedColor:"#ffffff",satisfiedColor:accent,wavesColor:accent,progressBarColor:"#ffffff",progressBarIndicatorColor:accent}},
   selfieCapture:{...themes.default.selfieCapture,
     loadingOverlay:{...themes.default.selfieCapture.loadingOverlay,backgroundColor:canvas,textColor:ink,loadingGraphicAccentColor:accent,progressBarBackgroundColor:surface,progressBarIndicatorColor:accent,progressBarTextColor:"#ffffff"},
     guides:{...themes.default.selfieCapture.guides,unsatisfiedColor:"#ffffff",satisfiedColor:accent}}
 };
 return <IdAndFaceValidation sessionId={sessionId} theme={theme}
  onApproved={()=>{void complete()}} onDenied={()=>{void complete()}}
  onAuthError={()=>alert("We couldn't start verification. Please try again or contact Fonehouse support.")}
 />;
}
