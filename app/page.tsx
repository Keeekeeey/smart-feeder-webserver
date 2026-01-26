import prisma from '@/lib/prisma'

export default async function Home() {
  const motionEvent = await prisma.motionEvent.findMany();
  return (
    <div>
      <h1>
        Working Title tm 
      </h1>
      <ol>
        {motionEvent.map((motionEvent) => (
          <li key={motionEvent.id} className="mb-2">
            {motionEvent.motion.toString()}
            {new Date(motionEvent.timestamp).toLocaleDateString('en-US',{
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </li>
        ))}
      </ol>
    </div>
  );
}