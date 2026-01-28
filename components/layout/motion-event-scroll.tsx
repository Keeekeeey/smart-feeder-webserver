"use client";
import { useEffect, useState } from "react";

type MotionEvent = {
  id: number;
  motion: boolean;
  timestamp: string;
};

type Props = {
  initialEvents: MotionEvent[];
};

export function RecentEventsWidget({ initialEvents }: Props) {
  const [recentEvents, setRecentEvents] = useState(initialEvents);

  return (
    <div className="h-fill w-fill overflow-y-scroll rounded p-4 bg-gray-50">
      <div className="p-3 text-sm font-bold mb-2 top-0 bg-[#c5d4b3] text-[#8f9e7f] ">
        Recent Activity
      </div>
      <div className="space-y-2">
        {recentEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded hover:bg-[#dbe8cc] hover:text-[#8f9e7f] cursor-pointer p-2"
          >
            {event.motion.toString()}
                <p className="text-xs text-gray-500">
              {new Date(event.timestamp).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
