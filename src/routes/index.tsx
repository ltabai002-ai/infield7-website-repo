import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { IntroFlow } from "@/components/IntroFlow";
import { LegacyFooter, LegacySections } from "@/components/LegacySections";
import { RevealPanel } from "@/components/RevealPanel";
import { SiteHeader } from "@/components/SiteHeader";
import { useLegacyAnimations } from "@/hooks/useLegacyAnimations";
import type { BusinessType } from "@/lib/intro-data";

const title="inFIELD7 — Manage Your Workforce. Smarter.";
const description="Workforce attendance and field tracking with geofenced clock-in, live location, leave, holidays, shift history, and attendance hours.";
export const Route=createFileRoute("/")({head:()=>({meta:[{title},{name:"description",content:description},{property:"og:title",content:title},{property:"og:description",content:description},{property:"og:type",content:"website"},{property:"og:url",content:"https://frugal-web-build.lovable.app/"},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:"https://frugal-web-build.lovable.app/"}]}),component:HomePage});
function HomePage(){
  const [intro,setIntro]=useState(true);const [reveal,setReveal]=useState(false);useLegacyAnimations();
  useEffect(()=>{document.documentElement.classList.remove("legal-page");},[]);
  const close=useCallback(()=>setIntro(false),[]);const complete=useCallback((business:BusinessType)=>{const eyebrow=document.getElementById("heroEyebrow");if(eyebrow){eyebrow.innerHTML=`<span class="he-dot"></span>Built for ${business} teams`;eyebrow.hidden=false;}setIntro(false);setReveal(true);},[]);
  return <><a className="skip" href="#main">Skip to content</a><IntroFlow open={intro} onClose={close} onComplete={complete}/><RevealPanel open={reveal} onClose={()=>{setReveal(false);scrollTo(0,0);}}/><SiteHeader home onDemo={()=>setIntro(true)}/><main id="main"><LegacySections onDemo={()=>setIntro(true)}/></main><LegacyFooter/></>;
}
