"use client"

import { useState } from "react"
import { X, Download, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/nextui-button"

interface DocumentPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  document: {
    name: string
    type: string
    url: string
  } | null
}

export function DocumentPreviewModal({ isOpen, onClose, document }: DocumentPreviewModalProps) {
  const [zoom, setZoom] = useState(100)

  if (!isOpen || !document) return null

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = document.url
    link.download = document.name
    link.click()
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50))
  }

  const isPDF = document.type === "application/pdf"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">{document.name}</h3>
          <div className="flex items-center gap-2">
            {!isPDF && (
              <>
                <Button size="sm" variant="bordered" onClick={handleZoomOut} disabled={zoom <= 50}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-500 min-w-[60px] text-center">{zoom}%</span>
                <Button size="sm" variant="bordered" onClick={handleZoomIn} disabled={zoom >= 200}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button size="sm" variant="bordered" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              Descargar
            </Button>
            <Button size="sm" variant="bordered" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto">
          {isPDF ? (
            <iframe src={document.url} className="w-full h-full border-0 rounded" title={document.name} />
          ) : (
            <div className="flex justify-center">
              <img
                src={document.url || "/placeholder.svg"}
                alt={document.name}
                className="max-w-full h-auto rounded"
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
