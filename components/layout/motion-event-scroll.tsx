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
    <div className="h-64 overflow-y-scroll border rounded p-4 bg-gray-50">
      <h2 className="text-sm font-bold mb-2 sticky top-0 bg-gray-50">
        Recent Activity
      </h2>
      <div className="space-y-2">
        {recentEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded hover:bg-blue-50 cursor-pointer p-2"
          >
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
