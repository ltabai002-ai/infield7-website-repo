import { useEffect } from "react";
export function useLegacyAnimations() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const observers: IntersectionObserver[] = [];
    if (!reduced) {
      document.querySelectorAll<HTMLElement>(".split").forEach(split => { const kids=split.querySelectorAll(":scope > .reveal"); if(kids.length===2){kids[0].classList.add("fade-left");kids[1].classList.add("fade-right");} });
      [".prob-cards", ".who-cards", ".tiles", ".pay-cards", ".steps", ".one-app-side", ".kpis", ".kpis-8", ".kpis-3", ".dash-charts"].forEach(selector => document.querySelectorAll(selector).forEach(parent => parent.querySelectorAll<HTMLElement>(":scope > *").forEach((child,i)=>{child.classList.add("reveal");child.style.transitionDelay=`${i*.08}s`;})));
      document.querySelectorAll(".tile, .who-card").forEach(el=>el.classList.add("scale-in"));
      document.querySelectorAll<HTMLElement>("h1, .section-head h2, .final-cta h2").forEach(h=>{ if(h.dataset.split)return; h.dataset.split="true"; const words=(h.textContent||"").split(/(\s+)/); h.textContent=""; words.forEach((word,i)=>{if(/^\s+$/.test(word)) h.append(document.createTextNode(word)); else {const span=document.createElement("span");span.className="rw";span.style.transitionDelay=`${i*.05}s`;span.textContent=word;h.append(span);}});h.classList.add("split-words");});
    }
    const watch=(element:Element, callback:()=>void, threshold=.2)=>{if(reduced||typeof IntersectionObserver==="undefined"){callback();return;} const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){callback();io.disconnect();}},{threshold});io.observe(element);observers.push(io);};
    document.querySelectorAll<HTMLElement>(".reveal").forEach(el=>{if(!reduced)el.classList.add("pre");watch(el,()=>{el.classList.remove("pre");el.classList.add("in");},.08);});
    document.querySelectorAll<HTMLElement>("[data-count]").forEach(el=>watch(el,()=>{const target=Number(el.dataset.count||0);if(reduced){el.textContent=el.dataset.format==="comma"?target.toLocaleString("en-US"):String(target);return;}const t0=performance.now();const tick=(now:number)=>{const p=Math.min(1,(now-t0)/1300);const value=Math.round(target*(1-Math.pow(1-p,3)));el.textContent=el.dataset.format==="comma"?value.toLocaleString("en-US"):String(value);if(p<1)requestAnimationFrame(tick);};requestAnimationFrame(tick);}));
    document.querySelectorAll<HTMLElement>(".bars").forEach(root=>watch(root,()=>root.querySelectorAll<HTMLElement>(".bar[data-h]").forEach((bar,i)=>{const run=()=>bar.style.height=`${bar.dataset.h}%`;if(reduced)run();else timers.push(window.setTimeout(run,i*60));})));
    document.querySelectorAll<SVGGeometryElement>(".line-chart .line").forEach(line=>watch(line,()=>{if(reduced)return;const len=line.getTotalLength();line.style.strokeDasharray=String(len);line.style.strokeDashoffset=String(len);line.getBoundingClientRect();line.style.transition="stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)";line.style.strokeDashoffset="0";}));
    document.querySelectorAll<HTMLElement>(".field-progress").forEach(root=>watch(root,()=>root.querySelectorAll<HTMLElement>(".bar > div[data-w]").forEach(bar=>timers.push(window.setTimeout(()=>bar.style.width=`${bar.dataset.w}%`,reduced?0:200)))));
    document.querySelectorAll<HTMLElement>(".split-words").forEach(h=>watch(h,()=>h.classList.add("in")));document.querySelectorAll<HTMLElement>(".steps").forEach(s=>watch(s,()=>s.classList.add("in")));
    timers.push(window.setTimeout(()=>document.querySelectorAll(".reveal.pre").forEach(el=>{el.classList.remove("pre");el.classList.add("in");}),1500));
    return()=>{observers.forEach(io=>io.disconnect());timers.forEach(clearTimeout);};
  }, []);
}
