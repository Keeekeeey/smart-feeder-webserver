import prisma from '@/lib/prisma'
import Button from "@components/ui/button";
import { RecentEventsWidget } from "@/components/layout/motion-event-scroll"

export default async function Home() {
  const events = await prisma.motionEvent.findMany({
    take: 10,
    orderBy: { timestamp: 'desc' }
  })
  
  const initialEvents = JSON.parse(JSON.stringify(events))
  
  return (
    <div className="text-[#6f6f6f]">
      <h1 className="bg-amber-50 p-4 rounded-2xl text-3xl md:text-3xl lg:text-4xl font-bold">
        Smart Cat Feeder
      </h1>
      
      <h1 className="border-t border-gray-300 p-2"></h1>
      
      <div className="flex flex-row">
        <div className="flex flex-row flex-1">
          <div className="basis-100 px-4 py-2">
            <img className="max-h-90" 
              src="https://i.pinimg.com/736x/e9/90/9a/e9909a3d6039e1029eacb8b4686b77ec.jpg" 
            />
            <div className="border-9 border-[#c5d4b3]">
            </div>
            <a 
              href="/page" 
              className="block text-center border-2 border-[#8f9e7f] text-[#8f9e7f] hover:text-white hover:bg-[#8f9e7f] px-4 py-2 rounded"
            >
              Webcam
            </a>
          </div>
          
          <div className="flex-1 rounded bg-[#8f9e7f]">
            <div className="max-h-100 overflow-y-auto ">
              <a href="/motionEventsDashboard" className="">
                <RecentEventsWidget initialEvents={initialEvents} />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* end img txt */}
      {/* end cols */}
      <div className="border-9 border-[#c5d4b3]">
      </div>
      <p className="bg-amber-50 p-4 rounded-2xl">
        Duis sollicitudin elit sed tellus blandit viverra sed eget odio. Donec accumsan tempor lacus, et venenatis elit feugiat non. Duis porta eros et velit blandit dapibus. Curabitur ac finibus eros. Duis placerat velit vitae massa sodales, eget mattis nibh pellentesque.
      </p>
    </div>
  );
}