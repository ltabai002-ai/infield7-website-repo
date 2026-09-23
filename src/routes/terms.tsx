import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { termsMainHtml } from "@/lib/terms-content";
const title="Terms & Conditions — inFIELD7";const description="Terms and conditions for the inFIELD7 Android app and admin dashboard.";
export const Route=createFileRoute("/terms")({head:()=>({meta:[{title},{name:"description",content:description},{property:"og:title",content:title},{property:"og:description",content:description},{property:"og:type",content:"website"},{property:"og:url",content:"https://frugal-web-build.lovable.app/terms"},{name:"twitter:card",content:"summary"}],links:[{rel:"canonical",href:"https://frugal-web-build.lovable.app/terms"}]}),component:()=> <LegalPage html={termsMainHtml} counterpart="/privacy" counterpartLabel="Privacy Policy"/>});
