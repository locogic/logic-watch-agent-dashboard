"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, RotateCcw, Check, X } from "lucide-react"

interface SelfieCaptureProps {
  onSelfieCapture: (imageData: string) => void
  capturedSelfie?: string
}

export function SelfieCapture({ onSelfieCapture, capturedSelfie }: SelfieCaptureProps) {
  const [isCapturing, setIsCapturing] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string>("")
  const [isVideoReady, setIsVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Cleanup stream on component unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const startCamera = useCallback(async () => {
    try {
      setError("")
      setIsVideoReady(false)

      // Stop any existing stream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }

      console.log("Requesting camera access...")
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user", // Front camera
        },
      })

      console.log("Camera access granted, setting up video...")
      setStream(mediaStream)
      setIsCapturing(true)

      // Wait for the next render cycle to ensure video element exists
      setTimeout(() => {
        if (videoRef.current) {
          console.log("Video element found, setting srcObject...")
          videoRef.current.srcObject = mediaStream

          // Wait for video to be ready
          videoRef.current.onloadedmetadata = () => {
            console.log("Video metadata loaded")
            setIsVideoReady(true)
          }

          videoRef.current.oncanplay = () => {
            console.log("Video can play")
            setIsVideoReady(true)
          }
        } else {
          console.error("Video element still not found after timeout")
          setError("Error al inicializar la cámara. Intente nuevamente.")
        }
      }, 100)
    } catch (err) {
      console.error("Error accessing camera:", err)
      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          setError("Acceso a la cámara denegado. Por favor, permita el acceso a la cámara.")
        } else if (err.name === "NotFoundError") {
          setError("No se encontró ninguna cámara en el dispositivo.")
        } else {
          setError(
            "No se pudo acceder a la cámara. Verifique los permisos y que no esté siendo usada por otra aplicación.",
          )
        }
      } else {
        setError("Error desconocido al acceder a la cámara.")
      }
      setIsCapturing(false)
    }
  }, [stream])

  const stopCamera = useCallback(() => {
    console.log("Stopping camera...")

    if (videoRef.current) {
      videoRef.current.srcObject = null
      videoRef.current.onloadedmetadata = null
      videoRef.current.oncanplay = null
    }

    if (stream) {
      stream.getTracks().forEach((track) => {
        console.log("Stopping track:", track.kind)
        track.stop()
      })
      setStream(null)
    }

    setIsCapturing(false)
    setIsVideoReady(false)
  }, [stream])

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isVideoReady) {
      console.error("Video or canvas not ready for capture")
      setError("La cámara no está lista. Espere un momento e intente nuevamente.")
      return
    }

    try {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (!context) {
        setError("Error al procesar la imagen.")
        return
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 640
      canvas.height = video.videoHeight || 480

      console.log("Capturing photo with dimensions:", canvas.width, "x", canvas.height)

      // Draw the video frame to canvas (flip horizontally for selfie effect)
      context.save()
      context.scale(-1, 1)
      context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
      context.restore()

      // Convert to base64 image data
      const imageData = canvas.toDataURL("image/jpeg", 0.8)

      if (imageData && imageData !== "data:,") {
        console.log("Photo captured successfully")
        onSelfieCapture(imageData)
        stopCamera()
      } else {
        setError("Error al capturar la foto. Intente nuevamente.")
      }
    } catch (err) {
      console.error("Error capturing photo:", err)
      setError("Error al capturar la foto. Intente nuevamente.")
    }
  }, [onSelfieCapture, stopCamera, isVideoReady])

  const retakeSelfie = useCallback(() => {
    console.log("Retaking selfie...")
    onSelfieCapture("")
    stopCamera()
    // Small delay before starting camera again
    setTimeout(() => {
      startCamera()
    }, 500)
  }, [onSelfieCapture, stopCamera, startCamera])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Verificación de Identidad
        </CardTitle>
        <CardDescription>
          Tome una selfie para verificar su identidad. Asegúrese de que su rostro esté bien iluminado y visible.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => setError("")}>
              Cerrar
            </Button>
          </div>
        )}

        {!capturedSelfie && !isCapturing && (
          <div className="text-center space-y-4">
            <div className="w-64 h-48 mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <Camera className="h-12 w-12 text-gray-400" />
            </div>
            <Button type="button" onClick={startCamera} className="w-full">
              <Camera className="h-4 w-4 mr-2" />
              Iniciar Cámara
            </Button>
          </div>
        )}

        {isCapturing && (
          <div className="space-y-4">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full max-w-md mx-auto rounded-lg bg-black"
                style={{ transform: "scaleX(-1)" }} // Mirror effect
              />

              {!isVideoReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <p className="text-sm">Iniciando cámara...</p>
                  </div>
                </div>
              )}

              {isVideoReady && (
                <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none">
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-500"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-blue-500"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-blue-500"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>

            <div className="flex gap-2 justify-center">
              <Button type="button" variant="outline" onClick={stopCamera}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button type="button" onClick={capturePhoto} disabled={!isVideoReady}>
                <Camera className="h-4 w-4 mr-2" />
                Capturar Foto
              </Button>
            </div>
          </div>
        )}

        {capturedSelfie && (
          <div className="space-y-4">
            <div className="text-center">
              <img
                src={capturedSelfie || "/placeholder.svg"}
                alt="Selfie capturada"
                className="w-full max-w-md mx-auto rounded-lg border-2 border-green-500"
              />
            </div>

            <div className="flex gap-2 justify-center">
              <Button type="button" variant="outline" onClick={retakeSelfie}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Tomar Otra Foto
              </Button>
              <div className="flex items-center gap-2 text-green-600">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">Selfie Capturada</span>
              </div>
            </div>
          </div>
        )}

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  )
}
