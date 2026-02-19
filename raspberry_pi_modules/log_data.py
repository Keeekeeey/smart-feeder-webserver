import requests
import os
from dotenv import load_dotenv

class MotionLogger:
    def __init__(self):
        load_dotenv('.env.local')
        self.api_url = "http://192.168.127.104:3000/api/log-data"
        self.api_key = os.getenv('API_SECRET_KEY')

    def log_motion(self, result):
        headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {self.api_key}'
        }
        data = {'catName': result}
        try:
            response = requests.post(
                self.api_url,
                headers=headers,
                json=data,
                timeout=5
            )
            response.raise_for_status()
            result = response.json()
            print(f"Motion Logged {result}")
            return result
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
            return None