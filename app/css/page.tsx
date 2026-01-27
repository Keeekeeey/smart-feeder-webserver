"use client"

//import prisma from "@/lib/prisma";
import { useEffect, useState } from "react";

export default async function Home() {
  const [motionEvents, setMotionEvents] = useState<
    {
      id: number;
      motion: boolean;
      timestamp: Date;
    }[]
  >([]);

  const getMotionEvents = async () => {
    // const motionEvents = await prisma.motionEvent.findMany();
    setMotionEvents(motionEvents)
  };

  useEffect(() => {
    getMotionEvents()
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Motion</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {motionEvents.map((event) => (
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
