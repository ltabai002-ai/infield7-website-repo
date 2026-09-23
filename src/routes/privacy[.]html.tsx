import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route=createFileRoute("/privacy.html")({beforeLoad:()=>{throw redirect({to:"/privacy",statusCode:301});}});
