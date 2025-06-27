"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload, FileText, Check } from "lucide-react"
import { SelfieCapture } from "./selfie-capture"

interface LoanApplication {
  id: string
  type: string
  amount: number
  term: number
  purpose: string
  income: number
  employment: string
  documents: File[]
  selfie: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
}

interface LoanApplicationFormProps {
  onSubmit: (application: LoanApplication) => void
  onCancel: () => void
}

export function LoanApplicationForm({ onSubmit, onCancel }: LoanApplicationFormProps) {
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    term: "",
    purpose: "",
    income: "",
    employment: "",
  })
  const [documents, setDocuments] = useState<File[]>([])
  const [selfie, setSelfie] = useState<string>("")
  const [dragActive, setDragActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSelfieCapture = (imageData: string) => {
    setSelfie(imageData)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setDocuments((prev) => [...prev, ...newFiles])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setDocuments((prev) => [...prev, ...newFiles])
    }
  }

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newApplication: LoanApplication = {
      id: `#${String(Date.now()).slice(-3)}`,
      type: formData.type,
      amount: Number(formData.amount),
      term: Number(formData.term),
      purpose: formData.purpose,
      income: Number(formData.income),
      employment: formData.employment,
      documents,
      selfie,
      status: "pending",
      createdAt: new Date(),
    }

    onSubmit(newApplication)
    setIsSubmitting(false)
  }

  const isFormValid =
    formData.type &&
    formData.amount &&
    formData.term &&
    formData.purpose &&
    formData.income &&
    formData.employment &&
    selfie // Selfie is now required

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Solicitud de Préstamo</h1>
          <p className="text-muted-foreground">Complete el formulario para solicitar un nuevo préstamo</p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Loan Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Préstamo</CardTitle>
              <CardDescription>Información básica sobre el préstamo solicitado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loan-type">Tipo de Préstamo</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de préstamo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Préstamo Personal</SelectItem>
                    <SelectItem value="hipotecario">Préstamo Hipotecario</SelectItem>
                    <SelectItem value="vehicular">Préstamo Vehicular</SelectItem>
                    <SelectItem value="comercial">Préstamo Comercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Monto Solicitado ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="50000"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="term">Plazo (meses)</Label>
                <Select value={formData.term} onValueChange={(value) => handleInputChange("term", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el plazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="24">24 meses</SelectItem>
                    <SelectItem value="36">36 meses</SelectItem>
                    <SelectItem value="48">48 meses</SelectItem>
                    <SelectItem value="60">60 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Propósito del Préstamo</Label>
                <Textarea
                  id="purpose"
                  placeholder="Describa el propósito del préstamo..."
                  value={formData.purpose}
                  onChange={(e) => handleInputChange("purpose", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Datos sobre su situación financiera</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="income">Ingresos Mensuales ($)</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="5000"
                  value={formData.income}
                  onChange={(e) => handleInputChange("income", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employment">Situación Laboral</Label>
                <Select value={formData.employment} onValueChange={(value) => handleInputChange("employment", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione su situación laboral" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="empleado">Empleado</SelectItem>
                    <SelectItem value="independiente">Trabajador Independiente</SelectItem>
                    <SelectItem value="empresario">Empresario</SelectItem>
                    <SelectItem value="jubilado">Jubilado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selfie Capture */}
        <SelfieCapture onSelfieCapture={handleSelfieCapture} capturedSelfie={selfie} />

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos Requeridos</CardTitle>
            <CardDescription>Adjunte los documentos necesarios para procesar su solicitud</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-950" : "border-gray-300 dark:border-gray-600"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium mb-2">Arrastra archivos aquí o haz clic para seleccionar</p>
              <p className="text-sm text-muted-foreground mb-4">
                Formatos aceptados: PDF, JPG, PNG (máximo 10MB por archivo)
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                Seleccionar Archivos
              </Button>
            </div>

            {documents.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Archivos adjuntos:</h4>
                {documents.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!isFormValid || isSubmitting} className="min-w-[120px]">
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enviando...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Enviar Solicitud
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
