# QR Code Web App 🚀

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0-green.svg)](https://flask.palletsprojects.com/)
[![OpenCV](https://img.shields.io/badge/OpenCV-4.10-orange.svg)](https://opencv.org/)

A modern **web-based QR Code Generator & Scanner** built with Flask, preserving your original Python backend (pyqrcode & cv2). Two tabs: Generate QR from URL + webcam QR scanner w/ auto-open links. Now with **Download & Copy QR** features!

## ✨ Features

- **QR Generator**: Enter URL → instant QR PNG (pyqrcode/png, scale 10 like original).
- **QR Scanner**: Live webcam scan → decodes & opens URL (cv2.QRCodeDetector like qr_scanner.py).
- **Download QR**: Save as `qr-code.png`.
- **Copy QR**: Clipboard copy for paste anywhere.
- Responsive UI, dark/light ready, auto-reload dev server.

## 📁 Structure

```
QR_code copy/
├── app.py              # Flask backend (generate/scan endpoints)
├── requirements.txt    # Deps: flask pyqrcode opencv-python pillow
├── templates/index.html # Main UI (tabs)
├── static/
│   ├── css/style.css   # Styling
│   └── js/scanner.js   # Webcam + fetch logic
├── venv/               # Python venv (activated)
└── README.md          # This file!
```

## 🚀 Quick Start

Ensure in `(venv)` prompt (if not: `venv\Scripts\activate`).

```bash
# Deps already installed, but if needed:
pip install -r requirements.txt

# Run server
python app.py
```

**Open:** http://localhost:5000


## 🎮 Usage

### 1. **Generate QR**

- Enter URL (e.g., `www.whatsapp.com`).
- Click **Generate QR** → QR appears.
- **Download QR** → Saves PNG.
- **Copy QR Image** → Paste in Paint/anywhere.

### 2. **Scan QR**

- Click **Start Scanner** → Allow camera.
- Point at QR → **Scan QR**.
- Decoded URL shows + auto-opens in new tab.

**Stop anytime** w/ Stop Scanner.

## 🔧 Tech Stack

- **Backend**: Flask 3.0, pyqrcode 1.2, pypng, OpenCV 4.10 (exact original logic).
- **Frontend**: Vanilla HTML/JS/CSS + jsQR (preview), MediaDevices API (webcam).
- **No build tools** - pure Python web.

## 🛠️ Development

- Auto-reload: Edit files → instant update.
- Debug: `debug=True` (console logs).
- Production: Use Gunicorn/NGINX.

## 📱 Browser Support

- Chrome/Firefox/Edge (HTTPS for webcam).
- Mobile: Rear camera auto-detect.

## 🤔 Troubleshooting

- **No Flask?** `pip install -r requirements.txt`
- **Camera?** HTTPS/localhost ok, allow permissions.
- **Copy fail?** Use Download (older browsers).

## 🚀 Next Steps

- Upload QR scan from file.
- Bulk generate.
- QR text/data (not just URL).

**Original desktop scripts preserved** - web layer on top!

⭐ **Star if useful!** Questions? Open issue.
