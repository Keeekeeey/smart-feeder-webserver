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
    <div>
      <h1>
        Working Title tm 
      </h1>
      <div className ="columns-2">
        <Button>
          <img className="aspect-3/2 ..." 
          src="https://i.pinimg.com/736x/e9/90/9a/e9909a3d6039e1029eacb8b4686b77ec.jpg" />  
        </Button>
        <div>
            <a href="/motionEventsDashboard" 
                className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded">
                < RecentEventsWidget initialEvents={initialEvents} />
            </a>
            <p> gduhsudoghidshguhsigshughsifiaie </p>
            {/*end img txt*/}
        </div>
        {/*end  cols */}
      </div>
      <p>Duis sollicitudin elit sed tellus blandit viverra sed eget odio. Donec accumsan tempor lacus, et venenatis elit feugiat non. Duis porta eros et velit blandit dapibus. Curabitur ac finibus eros. Duis placerat velit vitae massa sodales, eget mattis nibh pellentesque. </p>
    </div>
  );
}