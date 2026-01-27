import prisma from "@/lib/prisma";
import { MotionEventsDashboard } from "@/components/layout/motion-events-dashboard"

export default async function MotionEventsPage() {

  const events = await prisma.motionEvent.findMany({
    take: 20,
    orderBy: { timestamp: 'desc' }
  })
  
  const initialEvents = JSON.parse(JSON.stringify(events))

  return < MotionEventsDashboard initialEvents={initialEvents} />
}



