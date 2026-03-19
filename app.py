from flask import Flask, render_template, request, jsonify
import pyqrcode
import png
import base64
from io import BytesIO
import cv2
import numpy as np
from PIL import Image
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_qr():
    data = request.json
    url = data.get('url', 'https://www.example.com')
    try:
        qr = pyqrcode.create(url)
        buffer = BytesIO()
        qr.png(buffer, scale=10)
        buffer.seek(0)
        img_base64 = base64.b64encode(buffer.read()).decode()
        return jsonify({'qr': f'data:image/png;base64,{img_base64}'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/scan', methods=['POST'])
def scan_qr():
    if 'image' not in request.files:
        return jsonify({'error': 'No image'}), 400
    file = request.files['image']
    img_array = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    detector = cv2.QRCodeDetector()
    data, bbox, _ = detector.detectAndDecode(img)
    if data:
        return jsonify({'url': data})
    return jsonify({'error': 'No QR found'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
