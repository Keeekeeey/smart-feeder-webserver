"use client"
import { useEffect, useState } from "react";

type MotionEvent = {
  id: number;
  catName:   string;
  timestamp: string;
}

type Props = {
  initialEvents: MotionEvent[]
}

export function MotionEventsDashboard( {initialEvents} : Props ) {
  const [events, setEvents] = useState(initialEvents)

  return (
    <div className="table-wrp block">
      <table className ="table-auto w-full text-[#8f9e7f]">
        <thead className ="bg-[#f6fdee] border b sticky top-0">
          <tr>
            <th className="bg-[#e8f8d6]">Cat Name</th>
            <th className="bg-[#e8f8d6]" >Timestamp</th>
          </tr>
        </thead>
        <tbody className='h-1 overflow-y auto'>
          {events.map((event) => (
            <tr
              key={event.id}
              className="text-center bg-white rounded hover:bg-[#dbe8cc] cursor-pointer p-2 even:bg-gray-50  max-10 divide-y divide-x-0 divide-gray-200"
            >
              <td>{event.catName.toString()}</td>
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

