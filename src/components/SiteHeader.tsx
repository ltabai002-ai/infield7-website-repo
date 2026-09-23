import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/infield7-logo.png.asset.json";

const links = [["Product", "product"], ["Solutions", "solutions"], ["Features", "features"], ["How It Works", "how"], ["Hours & Reports", "pricing"]] as const;
export function SiteHeader({ home = false, onDemo }: { home?: boolean; onDemo?: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 8); fn(); addEventListener("scroll", fn, { passive: true }); return () => removeEventListener("scroll", fn); }, []);
  const href = (id: string) => home ? `#${id}` : `/#${id}`;
  return <header className={`nav${scrolled || !home ? " scrolled" : ""}`}>
    <div className="wrap nav-inner">
      <Link to="/" className="logo" aria-label="inFIELD7 home"><img className="logo-img" src={logo.url} alt="inFIELD7"/><span className="logo-word">inFIELD7</span></Link>
      <nav className="nav-links" aria-label="Primary">{links.map(([label,id]) => <a key={id} href={href(id)}>{label}</a>)}</nav>
      <div className="nav-cta"><a href={href("demo")} className="btn btn-primary" onClick={home ? (e) => { e.preventDefault(); onDemo?.(); } : undefined}>Book a Demo</a>
        <button className="hamburger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(v => !v)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
      </div>
    </div>
    <div className={`mobile-menu${open ? " open" : ""}`}><div className="wrap">{links.map(([label,id]) => <a key={id} href={href(id)} onClick={() => setOpen(false)}>{label}</a>)}<a href={href("demo")} className="btn btn-primary" onClick={home ? (e) => { e.preventDefault(); setOpen(false); onDemo?.(); } : undefined}>Book a Demo</a></div></div>
  </header>;
}
