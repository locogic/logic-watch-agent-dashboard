"use client"

import { X, CheckCircle, XCircle, Clock, Calendar, User, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/nextui-button"
import { Chip } from "@/components/ui/nextui-chip"
import { Divider } from "@/components/ui/nextui-divider"

interface DocumentInfoModalProps {
  isOpen: boolean
  onClose: () => void
  document: {
    id: number
    name: string
    status: "En Revisión" | "Aprobado" | "Rechazado"
    uploadDate: string
    reviewDate?: string
    reviewer?: string
    isValid: boolean
    expiryDate?: string
    fileSize: string
    fileType: string
    comments?: string
  } | null
}

export function DocumentInfoModal({ isOpen, onClose, document }: DocumentInfoModalProps) {
  if (!isOpen || !document) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aprobado":
        return <CheckCircle className="h-4 w-4" />
      case "Rechazado":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprobado":
        return "success"
      case "Rechazado":
        return "danger"
      default:
        return "warning"
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold">Información del Documento</h3>
          <Button size="sm" variant="bordered" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Document Name */}
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-500" />
            <div>
              <h4 className="text-lg font-medium">{document.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {document.fileType} • {document.fileSize}
              </p>
            </div>
          </div>

          <Divider />

          {/* Status Section */}
          <div className="space-y-4">
            <h5 className="font-medium text-gray-900 dark:text-gray-100">Estado del Documento</h5>
            <div className="flex items-center gap-3">
              <Chip
                color={getStatusColor(document.status) as any}
                variant="flat"
                size="md"
                startContent={getStatusIcon(document.status)}
              >
                {document.status}
              </Chip>
              <div className="flex items-center gap-2">
                {document.isValid ? (
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Documento Válido</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">Documento Inválido</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Divider />

          {/* Dates Section */}
          <div className="space-y-4">
            <h5 className="font-medium text-gray-900 dark:text-gray-100">Fechas Importantes</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Fecha de Subida</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{document.uploadDate}</p>
                </div>
              </div>
              {document.reviewDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Fecha de Revisión</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{document.reviewDate}</p>
                  </div>
                </div>
              )}
              {document.expiryDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Fecha de Vencimiento</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{document.expiryDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {document.reviewer && (
            <>
              <Divider />
              {/* Reviewer Section */}
              <div className="space-y-2">
                <h5 className="font-medium text-gray-900 dark:text-gray-100">Revisor</h5>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{document.reviewer}</span>
                </div>
              </div>
            </>
          )}

          {document.comments && (
            <>
              <Divider />
              {/* Comments Section */}
              <div className="space-y-2">
                <h5 className="font-medium text-gray-900 dark:text-gray-100">Comentarios de Revisión</h5>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{document.comments}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="bordered" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  )
}
