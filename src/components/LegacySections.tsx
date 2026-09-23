import { useEffect, useRef } from "react";
import { legacySections, legacyFooterHtml } from "@/lib/legacy-content";
export function LegacySections({ onDemo }: { onDemo: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element=root.current;if(!element)return;
    const click=(event:MouseEvent)=>{const anchor=(event.target as Element).closest<HTMLAnchorElement>('a[href="#demo"]');if(anchor){event.preventDefault();onDemo();}};
    element.addEventListener("click",click);return()=>element.removeEventListener("click",click);
  },[onDemo]);
  return <div ref={root}>{legacySections.map(section=><div data-react-section key={section.id} dangerouslySetInnerHTML={{__html:section.html}}/>)}<div dangerouslySetInnerHTML={{__html:legacyFooterHtml}}/></div>;
}
