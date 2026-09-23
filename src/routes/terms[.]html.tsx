import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route=createFileRoute("/terms.html")({beforeLoad:()=>{throw redirect({to:"/terms",statusCode:301});}});
