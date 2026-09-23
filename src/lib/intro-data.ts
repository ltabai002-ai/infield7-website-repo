export const businessTypes = ["Service Centers", "Construction", "Healthcare", "Field Operations", "Maintenance", "Logistics", "Other"] as const;
export type BusinessType = (typeof businessTypes)[number];
export type QuestionIcon = "people" | "pin" | "check" | "calendar" | "clock" | "money" | "alert";
export type Question = { icon: QuestionIcon; text: string };
export const businessQuestions: Record<BusinessType, Question[]> = {
  "Service Centers": [
    { icon: "people", text: "How many technicians are actually available today?" },
    { icon: "pin", text: "Are technicians present at their designated service branch or center?" },
    { icon: "check", text: "Can you verify employees are actually at the attendance location?" },
    { icon: "calendar", text: "Do you have visibility into technician attendance and shift hours?" },
    { icon: "clock", text: "How much time is lost manually checking who is on duty?" },
  ],
  Construction: [
    { icon: "people", text: "How many workers are actually present at each site today?" },
    { icon: "clock", text: "Who arrived, who left, and how many hours did they actually work?" },
    { icon: "pin", text: "Are workers staying at the assigned site or leaving during hours?" },
    { icon: "check", text: "Which workers are checked in at each site location?" },
    { icon: "money", text: "Are daily hours verified for accurate payroll processing?" },
  ],
  Healthcare: [
    { icon: "people", text: "Do you know which doctors, nurses and staff are available right now?" },
    { icon: "pin", text: "Can you see who is assigned to each ward or department?" },
    { icon: "check", text: "Are staff actually present at their assigned workplace at check-in?" },
    { icon: "calendar", text: "Can you track shift schedules and staff availability in one place?" },
    { icon: "alert", text: "What happens when someone leaves their assigned area during a shift?" },
  ],
  "Field Operations": [
    { icon: "pin", text: "Do you know where your field team is during active shift hours?" },
    { icon: "check", text: "Can you verify that staff clock in within designated work areas?" },
    { icon: "calendar", text: "Are employees completing their scheduled shift hours?" },
    { icon: "clock", text: "How much time is lost manually checking on-duty attendance?" },
    { icon: "people", text: "Can you see who is currently on shift across all operational locations?" },
  ],
  Maintenance: [
    { icon: "people", text: "How many technicians are on-shift and available right now?" },
    { icon: "pin", text: "Are technicians actually on-site when they mark attendance?" },
    { icon: "clock", text: "Can you verify shift start and end times accurately?" },
    { icon: "calendar", text: "Do you have a single view of scheduled shifts and staff attendance?" },
  ],
  Logistics: [
    { icon: "pin", text: "Do you know where your drivers and crews are during their shifts?" },
    { icon: "check", text: "Can you verify shift attendance at transit hubs and depots?" },
    { icon: "calendar", text: "Are team members starting and ending shifts on schedule?" },
    { icon: "clock", text: "How much time is lost coordinating attendance check-ins?" },
  ],
  Other: [
    { icon: "people", text: "Do you know who's actually working right now?" },
    { icon: "calendar", text: "Is attendance tracked on paper or WhatsApp?" },
    { icon: "pin", text: "Can you see where your field team is on shift?" },
    { icon: "check", text: "Do you have visibility into daily attendance and leaves?" },
    { icon: "clock", text: "Do shift hours take too long to calculate for payroll?" },
  ],
};
export function questionToSolution(text: string) {
  const t = text.toLowerCase();
  if (t.includes("available") || t.includes("who is available") || t.includes("are available")) return "Live present / absent / on-leave board";
  if (t.includes("attendance") || t.includes("arrived") || t.includes("check-in") || t.includes("clock")) return "Automatic check-in & check-out";
  if (t.includes("where") || t.includes("site") || t.includes("assigned") || t.includes("location")) return "Real-time on-shift location map";
  if (t.includes("verify") || t.includes("actually") || t.includes("present") || t.includes("leaving")) return "Office & geofence verification";
  if (t.includes("shift") || t.includes("schedule") || t.includes("hours")) return "Accurate shift & hours records";
  if (t.includes("wages") || t.includes("payroll") || t.includes("pay")) return "Attendance hours for payroll";
  if (t.includes("activity") || t.includes("performance") || t.includes("measure") || t.includes("progress")) return "Live workforce dashboard";
  if (t.includes("time") || t.includes("lost") || t.includes("coordinating")) return "Instant team presence visibility";
  return "One dashboard, one source of truth";
}
