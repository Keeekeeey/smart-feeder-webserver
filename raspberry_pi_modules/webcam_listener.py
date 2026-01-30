import cv2
import numpy as np
import asyncio
import base64
import time

from picamera2 import Picamera2
from websockets.asyncio.server import serve

picam = Picamera2()
config = picam.create_preview_configuration()
picam.configure(config)
picam.start()
time.sleep(2)

async def echo(websocket):
    print("client connected")

    stop_event = asyncio.Event()
    stream_event = asyncio.Event()

    async def handle_commands():
        try:
            async for message in websocket:
                print('command received:', message)
                if message == 'open':
                    stream_event.set()
                elif message == 'close':
                    stream_event.clear()
                    print("Client Disconnected")
                    break
        except websockets.exceptions.ConnectionClosed:
            pass
        finally:
            stop_event.set()

    async def stream_frames():
        while not stop_event.is_set():
            if stream_event.is_set():
                curr_stream_frame = picam.capture_array()
                is_sucess, buffer = cv2.imencode('.jpg', curr_stream_frame)

                if is_sucess:
                    await websocket.send(base64.b64encode(buffer).decode('utf-8'))

                    await asyncio.sleep(0.033)
                else:
                   await websocket.send('encoding error')
            else:
                await asyncio.sleep(0.1)


    try:
        await asyncio.gather(
            handle_commands(),
            stream_frames()
        )
    except websockets.exceptions.ConnectionClosed:
        print("Connected Closed: handshake complete")
    finally:
        print("Cleaning up...")
        stream_event.clear()

async def main():
    async with serve(echo, "0.0.0.0", 8765) as server:
        await server.serve_forever()

asyncio.run(main())