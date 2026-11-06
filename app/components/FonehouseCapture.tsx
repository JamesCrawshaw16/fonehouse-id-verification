"use client";
import { IdAndFaceValidation, themes } from "idmission-web-sdk";

export function createBrandTheme() {
  const surface = '#111111', accent = '#e6328e', canvas = '#ffffff', ink = '#111111', accentText = '#ffffff';

  return {
    ...themes.default,
    fontFamily: "Arial, Helvetica, sans-serif",
    isFullscreen: true,
    background: canvas,
    textColor: ink,
    textAlign: "center" as const,
    padding: "24px",
    colors: {
      ...themes.default.colors,
      primary: {
        ...themes.default.colors.primary,
        400: accent,
        500: accent,
        600: accent,
        700: accent,
      },
      secondary: {
        ...themes.default.colors.secondary,
        500: surface,
        600: surface,
        700: surface,
        800: surface,
        900: surface,
        950: surface,
      },
      positive: {
        ...themes.default.colors.positive,
        500: surface,
        600: surface,
        700: surface,
      },
    },
    buttons: {
      ...themes.default.buttons,
      primary: { backgroundColor: accent, textColor: accentText },
      secondary: { backgroundColor: surface, textColor: "#ffffff" },
      positive: { backgroundColor: surface, textColor: "#ffffff" },
      negative: { backgroundColor: "#c23532", textColor: "#ffffff" },
      warning: { backgroundColor: accent, textColor: accentText },
    },
    guidanceMessages: {
      ...themes.default.guidanceMessages,
      default: { backgroundColor: canvas, textColor: ink },
      positive: { backgroundColor: surface, textColor: "#ffffff" },
      negative: { backgroundColor: "#c23532", textColor: "#ffffff" },
    },
    idCapture: {
      ...themes.default.idCapture,
      loadingOverlay: {
        ...themes.default.idCapture.loadingOverlay,
        backgroundColor: canvas,
        textColor: ink,
        loadingGraphicAccentColor: accent,
        progressBarBackgroundColor: surface,
        progressBarIndicatorColor: accent,
        progressBarTextColor: "#ffffff",
        continueBtnDisabledBackgroundColor: accent,
        continueBtnDisabledTextColor: accentText,
      },
      guideOverlay: {
        ...themes.default.idCapture.guideOverlay,
        backgroundColor: surface,
        textColor: "#ffffff",
      },
      guideBox: {
        ...themes.default.idCapture.guideBox,
        unsatisfiedColor: "#ffffff",
        satisfiedColor: accent,
        wavesColor: accent,
        progressBarColor: "#ffffff",
        progressBarIndicatorColor: accent,
      },
    },
    selfieCapture: {
      ...themes.default.selfieCapture,
      loadingOverlay: {
        ...themes.default.selfieCapture.loadingOverlay,
        backgroundColor: canvas,
        textColor: ink,
        loadingGraphicAccentColor: accent,
        progressBarBackgroundColor: surface,
        progressBarIndicatorColor: accent,
        progressBarTextColor: "#ffffff",
      },
      guides: {
        ...themes.default.selfieCapture.guides,
        unsatisfiedColor: "#ffffff",
        satisfiedColor: accent,
      },
    },
  };
}


export default function FonehouseCapture({journeyId,onComplete}:{journeyId:string;onComplete:()=>void}) {
  const sessionId = async () => {
    const response = await fetch(`/api/get-session?journey=${encodeURIComponent(journeyId)}`, {cache:"no-store"});
    if(!response.ok) throw new Error("Unable to start verification");
    const data = await response.json();
    return data.id as string;
  };
  return <IdAndFaceValidation
    sessionId={sessionId}
    clientRequestID={journeyId}
    personalData={{uniqueNumber:journeyId}}
    theme={createBrandTheme()}
    verbiage={{
      idCapture:{loadingOverlay:{
        headingText:"First, photograph your identity document. We’ll then complete a quick face check.",
        continueText:"Let’s go",
        cameraInitializingText:"Getting your camera ready…",
        cameraInitializedText:"Camera ready",
        modelsReadyText:"Guided capture ready"
      }},
      faceLiveness:{loadingOverlay:{
        headingText:"Now we’ll compare your face with the photograph on your identity document.",
        removeEyeCoveringsText:"Remove glasses and hats",
        avoidExcessiveBacklightingText:"Find somewhere well lit",
        continueText:"Start face check"
      }}
    }}
    captureAdditionalDocuments={[]}
    onApproved={()=>onComplete()}
    onDenied={()=>onComplete()}
    onAuthError={(error)=>{console.error("Fonehouse IDMission authentication error",error);alert("We couldn't start verification. Please try again or contact Fonehouse support.");}}
  />;
}
