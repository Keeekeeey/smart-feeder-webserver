from picamera2 import Picamera2
import torch
import cv2
import time
from torchvision import transforms
from ultralytics import YOLO
from log_data import MotionLogger

model = YOLO('../mnt/model01292026.pt')
motion_threshold = 50
min_motion_area = 500
prev_frame = None
motion_logger = MotionLogger()


print('finished importing model...')

picam2 = Picamera2()
config = picam2.create_preview_configuration()
picam2.configure(config)
picam2.start()
time.sleep(2)

print('camera finished setup')

transform = transforms.Compose([
   transforms.ToPILImage(),
   transforms.Resize((224,224)),
   transforms.ToTensor(),
   transforms.Normalize(mean=[0.4,0.4,0.4], std=[0.299,0.224,0.225])
])

print('looking for  motion.\n Ctrl + C to exit...')

try:
   while True:
      curr_frame = picam2.capture_array()
      if curr_frame.shape[2] == 4:
        curr_frame = cv2.cvtColor(curr_frame,cv2.COLOR_RGBA2RGB)
      curr_frame_gray = cv2.cvtColor(curr_frame, cv2.COLOR_BGR2GRAY)
      curr_frame_gray = cv2.GaussianBlur(curr_frame_gray, (21,21), 0)

      if prev_frame is None:
        prev_frame = curr_frame_gray
        continue

      frame_delta = cv2.absdiff(prev_frame,curr_frame_gray)
      threshold = cv2.threshold(frame_delta, motion_threshold, 255, cv2.THRESH_BINARY)[1]
      threshold = cv2.dilate(threshold, None, iterations=2)
      contours,_ =  cv2.findContours(threshold.copy(),cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

      motion_detected = False
      for contour in contours:
        if cv2.contourArea(contour) < min_motion_area:
         print('no motion!')
         continue

      print('motion detected!')
      results = model.predict(curr_frame)
      if len(results[0].boxes) > 0:
         boxes = results[0].boxes[0]
         class_name = results[0].names[int(boxes.cls)]
      else:
         class_name = 'not a cat'
      motion_logger.log_motion(class_name)
      time.sleep(3)

except KeyboardInterrupt:
   print('\nStopping motion detection')

finally:
   picam2.stop()
   cv2.destroyAllWindows()