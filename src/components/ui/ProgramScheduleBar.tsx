"use client";

import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface ScheduleItem {
  time: string;
  title: string;
  status: "live" | "up-next" | "later";
}

const mockSchedule: ScheduleItem[] = [
  { time: "08:00", title: "Semangat Pagi Indonesia", status: "live" },
  { time: "10:00", title: "Seputar Kampus", status: "up-next" },
  { time: "12:00", title: "Makan Siang Seru", status: "later" },
  { time: "14:00", title: "Tech Update 2024", status: "later" },
  { time: "16:00", title: "Kartun Sore", status: "later" },
];

export const ProgramScheduleBar = () => {
  return (
    <div className="w-full bg-neutral-100 border-y border-neutral-200 py-4 overflow-x-auto custom-scrollbar">
      <div className="container mx-auto px-4 min-w-[800px]">
        <div className="flex items-center gap-6">
          {/* Label */}
          <div className="flex flex-col shrink-0 border-r border-neutral-300 pr-6 mr-2">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
              Schedule
            </span>
            <span className="text-lg font-black text-primary">TODAY</span>
          </div>

          {/* Timeline Items */}
          <div className="flex-1 flex items-center gap-4">
            {mockSchedule.map((item, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg border transition-all shrink-0",
                  item.status === "live"
                    ? "bg-white border-primary shadow-sm ring-1 ring-primary/20"
                    : "bg-white/50 border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <div
                  className={cn(
                    "flex flex-col",
                    item.status === "live"
                      ? "text-neutral-900"
                      : "text-neutral-500",
                  )}
                >
                  <span className="text-xs font-medium flex items-center gap-1">
                    <Clock size={12} /> {item.time}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-bold truncate max-w-[150px]",
                      item.status === "live" && "text-primary",
                    )}
                  >
                    {item.title}
                  </span>
                </div>

                {item.status === "live" && (
                  <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200">
                    ON AIR
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
