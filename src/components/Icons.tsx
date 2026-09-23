import type { QuestionIcon } from "@/lib/intro-data";

const paths: Record<QuestionIcon, React.ReactNode> = {
  people: <><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></>,
  pin: <><circle cx="12" cy="10" r="3"/><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/></>,
  check: <><path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9"/></>,
  calendar: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  money: <><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/><circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"/></>,
  alert: <><path d="M12 2l10 18H2z"/><path d="M12 9v4"/><circle cx="12" cy="16.5" r=".7" fill="currentColor" stroke="none"/></>,
};
export function QuestionIcon({ icon }: { icon: QuestionIcon }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{paths[icon]}</svg>;
}
export function Arrow({ back = false }: { back?: boolean }) {
  return <svg className="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d={back ? "M13 8H3M7 4l-4 4 4 4" : "M3 8h10M9 4l4 4-4 4"}/></svg>;
}
