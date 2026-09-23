import { useEffect, useMemo, useState } from "react";
import logo from "@/assets/infield7-logo.png.asset.json";
import { businessQuestions, businessTypes, questionToSolution, type BusinessType } from "@/lib/intro-data";
import { Arrow, QuestionIcon } from "./Icons";

type Lead = { business: string; contact: string; phone: string };
type Props = { open: boolean; onClose: (business?: BusinessType) => void; onComplete: (business: BusinessType) => void };
const fallbackSolutions = ["Live present / absent / on-leave board", "Real-time on-shift location map", "Attendance hours for payroll"];
const businessIcons = ["check", "people", "alert", "pin", "clock", "calendar", "check"] as const;

export function IntroFlow({ open, onClose, onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState<BusinessType>();
  const [problems, setProblems] = useState<string[]>([]);
  const [lead, setLead] = useState<Lead>({ business: "", contact: "", phone: "" });
  useEffect(() => {
    if (!open) return;
    setStep(1); setBusiness(undefined); setProblems([]); setLead({ business: "", contact: "", phone: "" });
    document.body.classList.add("intro-open");
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", key);
    return () => { document.body.classList.remove("intro-open"); document.removeEventListener("keydown", key); };
  }, [open, onClose]);
  const solutions = useMemo(() => {
    const unique = [...new Set(problems.map(questionToSolution))];
    return (unique.length ? unique : fallbackSolutions).slice(0, 5);
  }, [problems]);
  const valid = lead.business.trim() && lead.contact.trim() && lead.phone.replace(/\D/g, "").length >= 7;
  if (!open) return null;
  const chooseBusiness = (value: BusinessType) => { setBusiness(value); setProblems([]); window.setTimeout(() => setStep(2), 260); };
  const toggleProblem = (text: string) => setProblems(current => current.includes(text) ? current.filter(item => item !== text) : [...current, text]);
  const submit = (event: React.FormEvent) => {
    event.preventDefault(); if (!valid || !business) return;
    const cleanPhone = lead.phone.replace(/^(\+?91[\s-]*)?/, "").trim();
    const record = { ...lead, phone: `+91 ${cleanPhone}`, businessType: business, problems, solutions, timestamp: new Date().toISOString() };
    try { sessionStorage.setItem("inf7_lead", JSON.stringify(record)); const list = JSON.parse(localStorage.getItem("inf7_leads_db") || "[]") as unknown[]; list.push(record); localStorage.setItem("inf7_leads_db", JSON.stringify(list)); } catch { /* storage may be unavailable */ }
    const rows = solutions.map(s => `• ${s}`).join("\n");
    const message = `📋 *NEW LEAD — inFIELD7*\n━━━━━━━━━━━━━━━━━━━━\n*BUSINESS NAME:* ${lead.business.trim()}\n*CONTACT NAME:* ${lead.contact.trim()}\n*PHONE NUMBER:* +91 ${cleanPhone}\n\n*BUSINESS TYPE:* ${business}\n\n*BUILT FOR YOUR TEAM:*\n${rows}\n━━━━━━━━━━━━━━━━━━━━`;
    window.open(`https://api.whatsapp.com/send?phone=918822459466&text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    sessionStorage.setItem("inf7_intro_done_v1", "1"); onComplete(business);
  };
  return <div className="intro" role="dialog" aria-modal="true" aria-label="Welcome — quick questions">
    <div className="intro-top"><a href="#main" className="intro-logo"><img src={logo.url} alt="inFIELD7 logo"/> inFIELD7</a>
      <div className="intro-progress" aria-hidden="true">{[1,2,3].map(n => <span key={n} className={n < step ? "done" : n === step ? "active" : ""}/>)}</div>
      <button type="button" className="intro-skip" onClick={() => { sessionStorage.setItem("inf7_intro_done_v1", "1"); onClose(); }}>Skip now <Arrow/></button>
    </div>
    <div className="intro-body">
      {step === 1 && <div className="intro-step"><div className="intro-eyebrow">Step 1 of 3</div><h2 className="intro-h">What kind of business do you run?</h2><p className="intro-sub">Pick one. We'll tailor the next question to you.</p>
        <div className="intro-grid biz" role="group" aria-label="Business type">{businessTypes.map((item, i) => <button type="button" className={`intro-card sm${business === item ? " selected" : ""}`} key={item} onClick={() => chooseBusiness(item)}><span className="intro-ic"><QuestionIcon icon={businessIcons[i]}/></span><span className="intro-txt">{item === "Service Centers" ? "Service Center" : item}</span></button>)}</div></div>}
      {step === 2 && business && <div className="intro-step"><div className="intro-eyebrow">Step 2 of 3</div><h2 className="intro-h">For a {business.replace(/s$/, "").toLowerCase()} team, which of these are true?</h2><p className="intro-sub">Select all that apply.</p>
        <div className="intro-grid" role="group" aria-label="Business-specific questions">{businessQuestions[business].map((q,i) => <button type="button" key={q.text} style={{ animationDelay: `${i*.05}s` }} className={`intro-card${problems.includes(q.text) ? " selected" : ""}`} aria-pressed={problems.includes(q.text)} onClick={() => toggleProblem(q.text)}><span className="intro-ic"><QuestionIcon icon={q.icon}/></span><span className="intro-txt">{q.text}</span><span className="intro-check" aria-hidden="true"/></button>)}</div>
        <div className="intro-cta"><button type="button" className="btn btn-ghost" onClick={() => setStep(1)}><Arrow back/>Back</button><button type="button" className="btn btn-primary" disabled={!problems.length} onClick={() => setStep(3)}>Continue<Arrow/></button></div></div>}
      {step === 3 && business && <div className="intro-step"><div className="intro-eyebrow">Step 3 of 3</div><h2 className="intro-h">We've solved it all.</h2><p className="intro-sub">We've built the tools your {business} team needs to fix that.</p>
        <div className="intro-form-wrap"><form className="intro-form" noValidate onSubmit={submit}>
          <label className="intro-field"><span className="intro-field-l">Business name</span><input name="business" autoComplete="organization" placeholder="e.g. Kumar Motors" required value={lead.business} onChange={e => setLead({...lead,business:e.target.value})}/></label>
          <label className="intro-field"><span className="intro-field-l">Contact name</span><input name="contact" autoComplete="name" placeholder="Your full name" required value={lead.contact} onChange={e => setLead({...lead,contact:e.target.value})}/></label>
          <div className="intro-field"><label className="intro-field-l" htmlFor="leadPhone">Phone number</label><div className="intro-phone-wrap"><span className="intro-phone-cc" aria-hidden="true">+91</span><input id="leadPhone" type="tel" name="phone" maxLength={15} autoComplete="tel-national" placeholder="98765 43210" required value={lead.phone} onChange={e => setLead({...lead,phone:e.target.value})}/></div></div>
          <button type="submit" className="btn btn-primary intro-form-cta" disabled={!valid}>Show me the platform<Arrow/></button><p className="intro-form-fine">We'll call you within an hour. No spam.</p>
        </form><aside className="intro-solutions"><div className="intro-solutions-l">Built for your team</div><div className="intro-chips" aria-live="polite">{solutions.map((text,i) => <div className="intro-chip" key={text} style={{animationDelay:`${i*.08}s`}}><span className="cic"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M3 8l3 3 7-7"/></svg></span><span>{text}</span></div>)}</div></aside></div>
      </div>}
    </div>
  </div>;
}
