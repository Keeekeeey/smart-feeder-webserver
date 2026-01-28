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
    <div className="table-wrp block max-10">
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
              className="bg-white rounded hover:bg-[#dbe8cc] cursor-pointer p-2"
            >
              <td>{event.motion.toString()}</td>
              <td>
                <p className="text-xs text-gray-500">
                {new Date(event.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

