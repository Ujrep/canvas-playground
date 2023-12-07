import React, { useEffect, useRef, useCallback } from 'react'

interface CanvasProps {
  image: File
  pickColor: boolean
  removeImage: Function
  setSelectedColor: Function
}

const rgbToHex = (r, g, b) => `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`

const Canvas = ({ image, pickColor, removeImage, setSelectedColor }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const zoomCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        context.drawImage(img, 0, 0, img.width, img.height)
      }
      img.src = e.target?.result as string
    }

    reader.readAsDataURL(image)
  }, [image])

  const getHexColor = useCallback(({ clientX, clientY }) => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    var rect = canvas.getBoundingClientRect()
    const x = ((clientX - rect.left) / (rect.right - rect.left)) * canvas.width
    const y = ((clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height

    const pixelData = context.getImageData(x, y, 1, 1).data
    const [red, green, blue] = pixelData
    return rgbToHex(red, green, blue)
  }, [])

  const showColor = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (!pickColor) {
        return
      }
      const zoomCanvas = zoomCanvasRef.current
      const canvas = canvasRef.current
      const zoomContext = zoomCanvas.getContext('2d')
      var rect = canvas.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width
      const y = ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height

      const zoomX = event.clientX - rect.left
      const zoomY = event.clientY - rect.top

      const hexCode = getHexColor({
        clientX: event.clientX,
        clientY: event.clientY,
      })

      zoomContext.beginPath()
      zoomContext.arc(80, 80, 80, 0, Math.PI * 2)
      zoomContext.fill()

      zoomContext.save()
      zoomContext.globalCompositeOperation = 'source-in'
      zoomContext.drawImage(canvas, x, y, 160, 160, 0, 0, 160, 160)
      zoomContext.restore()

      zoomContext.lineWidth = 16
      zoomContext.strokeStyle = hexCode
      zoomContext.stroke()

      zoomContext.font = '16px spaceGrotesk'
      zoomContext.fillText(hexCode, 50, 120)

      zoomCanvas.style.top = zoomY + 10 + 'px'
      zoomCanvas.style.left = zoomX + 10 + 'px'
      zoomCanvas.style.display = 'block'
    },
    [pickColor],
  )

  const setColor = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (!pickColor) {
        return
      }
      const hexCode = getHexColor({
        clientX: event.clientX,
        clientY: event.clientY,
      })
      setSelectedColor(hexCode)
    },
    [pickColor],
  )

  return (
    <section className="relative">
      <button
        className="absolute top-2 px-4 py-2 rounded-lg right-2 text-white bg-primary"
        onClick={() => removeImage()}>
        Remove
      </button>
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseMove={showColor}
        onClick={setColor}
        width="4000"
        height="4000"
        className={`h-auto max-w-full block ${
          pickColor && '[cursor:url(src/icons/icon-picker.svg)_3_3,pointer]'
        }`}></canvas>
      {pickColor && (
        <canvas
          id="zoom"
          width="160"
          height="160"
          ref={zoomCanvasRef}
          className="absolute top-0 left-0 hidden"></canvas>
      )}
    </section>
  )
}

export default Canvas
