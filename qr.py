import pyqrcode
import png
from pyqrcode import QRCode
link = "www.whatsapp.com"
url = pyqrcode.create(link)
url.png("whatapp3.png",scale=10)