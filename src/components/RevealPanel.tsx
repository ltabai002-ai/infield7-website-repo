import { useEffect } from "react";
import logo from "@/assets/infield7-logo.png.asset.json";
export function RevealPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => { if (!open) return; const timer = window.setTimeout(onClose, 2000); const key = (e: KeyboardEvent) => { if (["Escape","Enter"," "].includes(e.key)) onClose(); }; addEventListener("keydown", key); return () => { clearTimeout(timer); removeEventListener("keydown", key); }; }, [open,onClose]);
  if (!open) return null;
  return <div className="reveal-panel" role="button" aria-label="Continue to inFIELD7" tabIndex={0} onClick={onClose}><div className="rp-inner"><img className="rp-logo" src={logo.url} alt="inFIELD7 logo"/><div className="rp-small">PRESENTING</div><div className="rp-big" aria-label="inFIELD7"><span className="rp-w">in</span><span className="rp-w">FIELD</span><span className="rp-w rp-accent">7</span></div><div className="rp-sub">One Platform. Complete Workforce Visibility.</div></div></div>;
}
