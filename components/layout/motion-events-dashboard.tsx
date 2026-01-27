"use client"
import { useEffect, useState } from "react";

type MotionEvent = {
  id: number
  motion: boolean
  timestamp: string
}

type Props = {
  initialEvents: MotionEvent[]
}

export function MotionEventsDashboard( {initialEvents} : Props ) {
  const [events, setEvents] = useState(initialEvents)

  return (
    <div className="table-wrp block max-30">
      <table className ="w-full">
        <thead className ="bg-white border b sticky top-0">
          <tr>
            <th>Motion</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody className='h-1 overflow-y auto'>
          {events.map((event) => (
            <tr
              key={event.id}
              className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950"
            >
              <td>{event.motion.toString()}</td>
              <td>
                {new Date(event.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

