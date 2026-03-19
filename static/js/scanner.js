// QR Scanner JS
let video = document.getElementById('video')
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let stream = null

function switchTab(tabName) {
  // Hide all tab contents
  document
    .querySelectorAll('.tab-content')
    .forEach((tab) => tab.classList.remove('active'))
  document
    .querySelectorAll('.tab-btn')
    .forEach((btn) => btn.classList.remove('active'))

  // Show selected tab
  document.getElementById(tabName).classList.add('active')
  event.target.classList.add('active')
}

async function generateQR() {
  const url = document.getElementById('urlInput').value
  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
    const data = await response.json()
    if (data.qr) {
      document.getElementById('qrImg').src = data.qr
      document.getElementById('qrContainer').style.display = 'block'
    } else {
      alert('Error: ' + data.error)
    }
  } catch (e) {
    alert('Error generating QR: ' + e.message)
  }
}

function downloadQR() {
  const link = document.createElement('a')
  link.download = 'qr-code.png'
  link.href = document.getElementById('qrImg').src
  link.click()
}

function copyQR() {
  canvas.width = 300
  canvas.height = 300
  ctx.drawImage(document.getElementById('qrImg'), 0, 0)
  canvas.toBlob((blob) => {
    navigator.clipboard
      .write([new ClipboardItem({ 'image/png': blob })])
      .then(() => {
        alert('QR copied to clipboard!')
      })
      .catch(() => {
        alert('Copy failed, download instead.')
      })
  })
}

async function startScanner() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    })
    video.srcObject = stream
    video.play()
    video.style.display = 'block'
    document.getElementById('scanBtn').style.display = 'inline'
  } catch (e) {
    alert('Error accessing camera: ' + e.message)
  }
}

function stopScanner() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
  }
  video.style.display = 'none'
  canvas.style.display = 'none'
  document.getElementById('scanBtn').style.display = 'none'
}

async function scanImage() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    ctx.drawImage(video, 0, 0, 300, 300)
    canvas.toBlob(async (blob) => {
      const formData = new FormData()
      formData.append('image', blob, 'qr.png')

      try {
        const response = await fetch('/scan', {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        if (data.url) {
          document.getElementById('result').innerHTML =
            `Scanned URL: <a href="${data.url}" target="_blank">${data.url}</a>`
          window.open(data.url, '_blank')
        } else {
          document.getElementById('result').innerHTML =
            'No QR code found. Try again.'
        }
      } catch (e) {
        alert('Error scanning: ' + e.message)
      }
    })
  }
}
