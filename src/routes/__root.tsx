import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import "../styles.css";
export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { property: "og:type", content: "website" }, { property: "og:site_name", content: "inFIELD7" }],
    links: [{ rel: "preconnect", href: "https://fonts.googleapis.com" }, { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }, { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" }],
  }),
  component: Root,
});
function Root(){return <html lang="en"><head><HeadContent/></head><body><Outlet/><Scripts/></body></html>;}
