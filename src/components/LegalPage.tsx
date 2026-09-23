import { useEffect } from "react";
import { SiteHeader } from "./SiteHeader";
export function LegalPage({ html, counterpart, counterpartLabel }: { html: string; counterpart: string; counterpartLabel: string }) {
  useEffect(()=>{document.documentElement.classList.add("legal-page");return()=>document.documentElement.classList.remove("legal-page");},[]);
  return <><a className="skip" href="#main">Skip to content</a><SiteHeader/><main id="main" dangerouslySetInnerHTML={{__html:html}}/><footer><div className="wrap"><div className="footer-bot" style={{marginTop:0,paddingTop:0,borderTop:0}}><span>© 2026 inFIELD7. All rights reserved.</span><span><a href="/">Home</a> · <a href={counterpart}>{counterpartLabel}</a></span></div></div></footer></>;
}
