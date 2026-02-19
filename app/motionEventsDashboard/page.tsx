import prisma from "@/lib/prisma";
import { MotionEventsDashboard } from "@/app/components/layout/motion-events-dashboard"
export const dynamic = 'force-dynamic'

export default async function MotionEventsPage() {

  const events = await prisma.motionEvent.findMany({
    take: 20,
    orderBy: { timestamp: 'desc' }
  })
  
  const initialEvents = JSON.parse(JSON.stringify(events))

  return (
    <div className='flex-1 rounded p-4 text-center bg-[#8f9e7f] min-h-100'>
        < MotionEventsDashboard initialEvents={initialEvents} />
        </div>
  
  ) 
}



