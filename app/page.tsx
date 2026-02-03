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
              href="/webcam" 
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
      <div className="bg-amber-50 p-4 rounded-2xl">
        <p>
          A real-time webcam application that utilizes computer vision to track my cats and protect one cat’s prescription food from the other. When the webcam detects the wrong cat a mechanical cover is deployed to block access.
        </p>
        <p>
        Built using  Ultralytics YOLOv8 on 1000+ labeled images of both cats (Sherbert and Mousse). The model is deployed on a NAS with the Raspberry Pi4 as a client for minimal storage overhead. Using the PiCamera2 library, model inference is triggered upon motion. Once the model determines which cat is present, a 3d-printed block is deployed to physically block the food bowl. The results are logged in a local PostgreSQL database via Prisma and Websockets. The database and webcam display live feed and feeding history. 
        </p>
      </div>
    </div>
  );
}