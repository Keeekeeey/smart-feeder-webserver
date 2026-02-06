# Smart Feeder Web Server

A real-time computer vision system that protects prescription cat food using automated access control. When the webcam detects the wrong cat approaching the food bowl, it is logged.
## Overview

This project uses AI-powered cat recognition to ensure only the correct cat can access prescription food. Built with YOLOv11n and deployed on edge devices for real-time inference.

## Features

- **Real-time Cat Detection**: Custom YOLOv11n model trained on 1000+ labeled images of two cats (Sherbert and Mousse)
- **Motion-Triggered Inference**: Efficient processing using PiCamera2 motion detection
- **Automated Physical Blocking**: 3D-printed mechanical cover deployment
- **Live Web Dashboard**: Real-time webcam feed and feeding history
- **Data Logging**: PostgreSQL database tracking with WebSocket updates

## How It Works

1. **Motion Detection**: PiCamera2 detects movement near the food bowl
2. **Inference**: Frame sent to NAS for YOLOv11n model inference
3. **Decision**: Model identifies which cat is present
4. **Action**: If wrong cat detected, mechanical blocker deploys
5. **Logging**: Event logged to PostgreSQL via WebSocket
6. **Dashboard**: Live feed and history displayed on web interface

## Model Training

The YOLOv11n model was trained on:
- 1000+ labeled images of Sherbert and Mousse
- Various lighting conditions and angles
- Data augmentation for robustness
- Other classes were disregarded in favor of a smaller model size

> More model information can be found [here ](https://github.com/Keeekeeey/YOLOv11n-Cat-Classifier)
## Acknowledgments

- Ultralytics for YOLOv11n 
- Raspberry Pi Foundation
- OpenCV for motion detection and frame processing
- The cats (Sherbert and Mousse) for being patient test subjects

---

**Note**: This is a pet project (pun intended) for managing prescription cat food access. I encourage you to always supervise automated pet care systems.
