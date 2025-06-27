"use client"

import { useState } from "react"
import {
  X,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Phone,
  MessageCircle,
  Download,
  Eye,
  User,
  DollarSign,
  FileText,
  CreditCard,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/nextui-button"
import { Chip } from "@/components/ui/nextui-chip"
import { Divider } from "@/components/ui/nextui-divider"
import { Textarea } from "@/components/ui/textarea"

interface ApplicationDetailModalProps {
  isOpen: boolean
  onClose: () => void
  application: any
  onCallCustomer: (phone: string) => void
  onWhatsAppCustomer: (phone: string) => void
}

interface AIVerificationResult {
  isAuthentic: boolean
  confidenceScore: number
  verificationStatus: "verified" | "suspicious" | "failed" | "processing"
  issues: string[]
  recommendations: string[]
  timestamp: string
  aiModel: string
}

export function ApplicationDetailModal({
  isOpen,
  onClose,
  application,
  onCallCustomer,
  onWhatsAppCustomer,
}: ApplicationDetailModalProps) {
  const [decision, setDecision] = useState("")
  const [comments, setComments] = useState("")
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean
    document: any
    aiVerification?: AIVerificationResult
  }>({
    isOpen: false,
    document: null,
  })

  if (!isOpen || !application) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "missing":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "success"
      case "rejected":
        return "danger"
      case "pending":
        return "warning"
      case "missing":
        return "danger"
      default:
        return "default"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprobado"
      case "rejected":
        return "Rechazado"
      case "pending":
        return "Pendiente"
      case "missing":
        return "Faltante"
      default:
        return status
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "loan":
        return <DollarSign className="h-5 w-5" />
      case "credit_card":
        return <CreditCard className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <ShieldCheck className="h-4 w-4" />
      case "suspicious":
        return <ShieldAlert className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const getVerificationColor = (status: string) => {
    switch (status) {
      case "verified":
        return "success"
      case "suspicious":
        return "warning"
      case "failed":
        return "danger"
      case "processing":
        return "default"
      default:
        return "default"
    }
  }

  const getVerificationLabel = (status: string) => {
    switch (status) {
      case "verified":
        return "Verificado"
      case "suspicious":
        return "Sospechoso"
      case "failed":
        return "Falló Verificación"
      case "processing":
        return "Procesando"
      default:
        return "Sin Verificar"
    }
  }

  // Mock AI verification function - in real app this would call your AI service
  const generateAIVerification = (document: any): AIVerificationResult => {
    const mockResults = [
      {
        isAuthentic: true,
        confidenceScore: 94.5,
        verificationStatus: "verified" as const,
        issues: [],
        recommendations: ["Documento auténtico", "Calidad de imagen excelente"],
        timestamp: new Date().toISOString(),
        aiModel: "DocumentVerifier v2.1",
      },
      {
        isAuthentic: false,
        confidenceScore: 23.8,
        verificationStatus: "suspicious" as const,
        issues: [
          "Posibles alteraciones digitales detectadas",
          "Inconsistencias en la tipografía",
          "Metadatos de imagen sospechosos",
        ],
        recommendations: [
          "Solicitar documento original físico",
          "Verificar con la entidad emisora",
          "Contactar al cliente para aclaraciones",
        ],
        timestamp: new Date().toISOString(),
        aiModel: "DocumentVerifier v2.1",
      },
      {
        isAuthentic: true,
        confidenceScore: 87.2,
        verificationStatus: "verified" as const,
        issues: ["Calidad de imagen ligeramente baja"],
        recommendations: ["Documento auténtico pero considerar solicitar mejor calidad"],
        timestamp: new Date().toISOString(),
        aiModel: "DocumentVerifier v2.1",
      },
    ]

    return mockResults[Math.floor(Math.random() * mockResults.length)]
  }

  const handlePreviewDocument = (document: any) => {
    if (document.url) {
      // Generate AI verification result
      const aiVerification = generateAIVerification(document)

      setPreviewModal({
        isOpen: true,
        document: {
          name: document.name,
          type: "application/pdf",
          url: document.url,
        },
        aiVerification,
      })
    }
  }

  const handleDownloadDocument = (document: any) => {
    if (document.url) {
      const link = document.createElement("a")
      link.href = document.url
      link.download = document.name
      link.click()
    }
  }

  const handleApproveApplication = () => {
    setDecision("approved")
    // Here you would typically make an API call to update the application status
    console.log("Approving application:", application.id)
  }

  const handleRejectApplication = () => {
    setDecision("rejected")
    // Here you would typically make an API call to update the application status
    console.log("Rejecting application:", application.id)
  }

  const handleRequestDocuments = () => {
    // Here you would typically make an API call to request additional documents
    console.log("Requesting documents for application:", application.id)
  }

  const handleSaveComments = () => {
    // Here you would typically make an API call to save comments
    console.log("Saving comments for application:", application.id, comments)
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {getTypeIcon(application.type)}
              <div>
                <h3 className="text-xl font-semibold">
                  {application.typeName} - {application.id}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Solicitud de {application.customerName}</p>
              </div>
            </div>
            <Button size="sm" variant="bordered" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Customer Information */}
              <div className="lg:col-span-1 space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Información del Cliente
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Nombre Completo</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{application.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{application.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Teléfono</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{application.customerPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Ingresos Mensuales</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ${application.applicationData.income?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Situación Laboral</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {application.applicationData.employment}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Score Crediticio</p>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              application.applicationData.creditScore >= 700
                                ? "bg-green-500"
                                : application.applicationData.creditScore >= 600
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${(application.applicationData.creditScore / 850) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{application.applicationData.creditScore}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() => onCallCustomer(application.customerPhone)}
                      startContent={<Phone className="h-4 w-4" />}
                    >
                      Llamar
                    </Button>
                    <Button
                      size="sm"
                      color="success"
                      onClick={() => onWhatsAppCustomer(application.customerPhone)}
                      startContent={<MessageCircle className="h-4 w-4" />}
                    >
                      WhatsApp
                    </Button>
                  </div>
                </div>

                <Divider />

                {/* Application Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Detalles de la Solicitud
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Monto Solicitado</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">${application.amount.toLocaleString()}</p>
                    </div>
                    {application.applicationData.term && (
                      <div>
                        <p className="text-sm font-medium">Plazo</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {application.applicationData.term} meses
                        </p>
                      </div>
                    )}
                    {application.applicationData.purpose && (
                      <div>
                        <p className="text-sm font-medium">Propósito</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {application.applicationData.purpose}
                        </p>
                      </div>
                    )}
                    {application.applicationData.cardType && (
                      <div>
                        <p className="text-sm font-medium">Tipo de Tarjeta</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {application.applicationData.cardType}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">Fecha de Envío</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{application.submittedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Agente Asignado</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{application.assignedAgent}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents and Actions */}
              <div className="lg:col-span-2 space-y-6">
                {/* Documents Section */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Documentos Adjuntos
                  </h4>
                  <div className="space-y-3">
                    {application.documents.map((document: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-sm">{document.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Chip
                                color={getStatusColor(document.status) as any}
                                variant="flat"
                                size="sm"
                                startContent={getStatusIcon(document.status)}
                              >
                                {getStatusLabel(document.status)}
                              </Chip>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {document.url && (
                            <>
                              <Button
                                size="sm"
                                variant="light"
                                color="primary"
                                onClick={() => handlePreviewDocument(document)}
                                startContent={<Eye className="h-4 w-4" />}
                              >
                                Ver
                              </Button>
                              <Button
                                size="sm"
                                variant="light"
                                color="primary"
                                onClick={() => handleDownloadDocument(document)}
                                startContent={<Download className="h-4 w-4" />}
                              >
                                Descargar
                              </Button>
                            </>
                          )}
                          {document.status === "pending" && (
                            <div className="flex gap-1">
                              <Button size="sm" color="success" variant="flat">
                                Aprobar
                              </Button>
                              <Button size="sm" color="danger" variant="flat">
                                Rechazar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Divider />

                {/* Decision Section */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Decisión de la Solicitud</h4>

                  <div className="flex gap-3">
                    <Button
                      color="success"
                      onClick={handleApproveApplication}
                      startContent={<CheckCircle className="h-4 w-4" />}
                    >
                      Aprobar Solicitud
                    </Button>
                    <Button
                      color="danger"
                      onClick={handleRejectApplication}
                      startContent={<XCircle className="h-4 w-4" />}
                    >
                      Rechazar Solicitud
                    </Button>
                    <Button
                      color="warning"
                      onClick={handleRequestDocuments}
                      startContent={<AlertTriangle className="h-4 w-4" />}
                    >
                      Solicitar Documentos
                    </Button>
                  </div>

                  {decision && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Decisión seleccionada: <strong>{decision === "approved" ? "Aprobar" : "Rechazar"}</strong>
                      </p>
                    </div>
                  )}
                </div>

                <Divider />

                {/* Comments Section */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Comentarios del Agente</h4>
                  <Textarea
                    placeholder="Agregue comentarios sobre la solicitud, documentos o decisión tomada..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={4}
                  />
                  <Button color="primary" onClick={handleSaveComments} disabled={!comments.trim()}>
                    Guardar Comentarios
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="bordered" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Document Preview Modal with AI Verification */}
      {previewModal.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5" />
                <div>
                  <h3 className="text-xl font-semibold">Vista de Documento</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{previewModal.document?.name}</p>
                </div>
              </div>
              <Button size="sm" variant="bordered" onClick={() => setPreviewModal({ isOpen: false, document: null })}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Document Preview */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[500px] flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">Vista previa del documento</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{previewModal.document?.name}</p>
                    </div>
                  </div>
                </div>

                {/* AI Verification Panel */}
                <div className="lg:col-span-1 space-y-6">
                  {previewModal.aiVerification && (
                    <>
                      {/* Verification Status */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          Verificación AI
                        </h4>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Estado:</span>
                            <Chip
                              color={getVerificationColor(previewModal.aiVerification.verificationStatus) as any}
                              variant="flat"
                              size="sm"
                              startContent={getVerificationIcon(previewModal.aiVerification.verificationStatus)}
                            >
                              {getVerificationLabel(previewModal.aiVerification.verificationStatus)}
                            </Chip>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Confianza:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    previewModal.aiVerification.confidenceScore >= 80
                                      ? "bg-green-500"
                                      : previewModal.aiVerification.confidenceScore >= 50
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                  style={{ width: `${previewModal.aiVerification.confidenceScore}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">
                                {previewModal.aiVerification.confidenceScore.toFixed(1)}%
                              </span>
                            </div>
                          </div>

                          <div>
                            <span className="text-sm font-medium">Modelo AI:</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {previewModal.aiVerification.aiModel}
                            </p>
                          </div>

                          <div>
                            <span className="text-sm font-medium">Verificado:</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(previewModal.aiVerification.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      {/* Issues Found */}
                      {previewModal.aiVerification.issues.length > 0 && (
                        <div className="space-y-3">
                          <h5 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            Problemas Detectados
                          </h5>
                          <div className="space-y-2">
                            {previewModal.aiVerification.issues.map((issue, index) => (
                              <div
                                key={index}
                                className="p-2 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded text-sm"
                              >
                                {issue}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recommendations */}
                      {previewModal.aiVerification.recommendations.length > 0 && (
                        <div className="space-y-3">
                          <h5 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                            Recomendaciones
                          </h5>
                          <div className="space-y-2">
                            {previewModal.aiVerification.recommendations.map((recommendation, index) => (
                              <div
                                key={index}
                                className="p-2 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded text-sm"
                              >
                                {recommendation}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Divider />

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">Acciones</h5>
                        <div className="flex flex-col gap-2">
                          {previewModal.aiVerification.verificationStatus === "verified" ? (
                            <Button color="success" size="sm" startContent={<CheckCircle className="h-4 w-4" />}>
                              Aceptar Documento
                            </Button>
                          ) : (
                            <>
                              <Button color="danger" size="sm" startContent={<XCircle className="h-4 w-4" />}>
                                Rechazar Documento
                              </Button>
                              <Button color="warning" size="sm" startContent={<AlertTriangle className="h-4 w-4" />}>
                                Solicitar Nuevo Documento
                              </Button>
                            </>
                          )}
                          <Button variant="bordered" size="sm" startContent={<Phone className="h-4 w-4" />}>
                            Contactar Cliente
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
              <Button variant="bordered" onClick={() => setPreviewModal({ isOpen: false, document: null })}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
