import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { privacyMainHtml } from "@/lib/privacy-content";
const title="Privacy Policy — inFIELD7";const description="Privacy Policy for the inFIELD7 Android app and admin dashboard.";
export const Route=createFileRoute("/privacy")({head:()=>({meta:[{title},{name:"description",content:description},{property:"og:title",content:title},{property:"og:description",content:description},{property:"og:type",content:"website"},{property:"og:url",content:"https://frugal-web-build.lovable.app/privacy"},{name:"twitter:card",content:"summary"}],links:[{rel:"canonical",href:"https://frugal-web-build.lovable.app/privacy"}]}),component:()=> <LegalPage html={privacyMainHtml} counterpart="/terms" counterpartLabel="Terms & Conditions"/>});
