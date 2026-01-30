'use client'
import { useState, useEffect, useRef} from 'react'
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function webcamPage(){
  const [loading,setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const wsRef = useRef<WebSocket | null>(null);


  useEffect(() => {
    const ws = new WebSocket("ws://192.168.127.105:8765");
    wsRef.current = ws;

    ws.onopen = () =>{ 
      ws.send('open')
      console.log('WebSocket connected');
    }
    ws.onclose = () =>{ 
      console.log('WebSocket disconnected');
    }
    ws.onerror = (event: Event) => {
      setLoading(false)
      setError('Failed to connect')
      console.log('WebSocket error:', event);
    }

    ws.onmessage = (event: MessageEvent<string>): void => {
      setLoading(false)
      if (imgRef.current){
        imgRef.current.src = `data:image/jpeg;base64,${event.data}`;
      }
    };

    return (): void => {
      if(ws.readyState === WebSocket.OPEN){
        ws.close();
      }
    };

  },[]);


  return (
    <div className='min-h-100 '>
      <div className='flex-1 rounded p-4 text-center bg-[#8f9e7f] min-h-100'>
        {loading && <LoadingSpinner/> }

        {error && <LoadingSpinner/> &&(
          <div className= "p-40">{error}</div>
        )}

        {!loading && !error && (
          <img ref={imgRef}
          style={{
            maxWidth: '100%',
            height:'auto',
            display:'block'
          }}></img>
        )}
      </div>
    </div>

  
)
}
