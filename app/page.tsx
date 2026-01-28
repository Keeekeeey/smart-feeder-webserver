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
      
      <h1 className="bg-amber-50 p-4 rounded-2xl 
      text-3xl md:text-3xl lg:text-4xl font-bold">
        Smart Cat Feeder
      </h1>
      <h1 className="border-t border-gray-300 p-4">
      </h1>
      <div className ="flex">
          <img className="w-full min-h-64 max-h-96" 
          src="https://i.pinimg.com/736x/e9/90/9a/e9909a3d6039e1029eacb8b4686b77ec.jpg" 
          />  
        <div className=" bg-[#8f9e7f] border-[#8f9e7f] border rounded-lg flex flex-col items-center p-4">
            <a href="/motionEventsDashboard" 
                className="w-full min-h-64 max-h-96 overflow-y-auto rounded p-4 bg-gray-50">
                < RecentEventsWidget initialEvents={initialEvents} />
            </a>
            <div className="">
              <a href="/page" 
                className="block text-center bg-[#c5d4b3] text-[#8f9e7f] hover:text-white px-4 py-2 rounded">
                Webcam
              </a>
            </div>
            {/*end img txt*/}
        </div>
        {/*end  cols */}
      </div>
      <p>----</p>
      <p className="bg-amber-50 p-4 rounded-2xl">Duis sollicitudin elit sed tellus blandit viverra sed eget odio. Donec accumsan tempor lacus, et venenatis elit feugiat non. Duis porta eros et velit blandit dapibus. Curabitur ac finibus eros. Duis placerat velit vitae massa sodales, eget mattis nibh pellentesque. </p>
    </div>
  );
}