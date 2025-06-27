"use client"

import { useState } from "react"
import { Card, CardBody, CardHeader } from "@/components/ui/nextui-card"
import { Button } from "@/components/ui/nextui-button"
import { Chip } from "@/components/ui/nextui-chip"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ApplicationDetailModal } from "@/components/application-detail-modal"
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  CreditCard,
  DollarSign,
  Calendar,
  Phone,
  MessageCircle,
  FileText,
  Eye,
} from "lucide-react"

// Sample application data
const applications = [
  {
    id: "LP-2024-001",
    type: "loan",
    typeName: "Préstamo Personal",
    customerName: "María González",
    customerEmail: "maria.gonzalez@email.com",
    customerPhone: "+1 (555) 123-4567",
    amount: 25000,
    status: "pending",
    priority: "normal",
    submittedDate: "2024-01-15",
    lastUpdate: "2024-01-15",
    assignedAgent: "Ana García",
    documents: [
      { name: "Cédula de Identidad", status: "approved", url: "/placeholder.svg" },
      { name: "Comprobante de Ingresos", status: "pending", url: "/placeholder.svg" },
      { name: "Comprobante de Domicilio", status: "approved", url: "/placeholder.svg" },
    ],
    applicationData: {
      purpose: "Consolidación de deudas",
      term: 24,
      income: 4500,
      employment: "Empleado",
      creditScore: 720,
    },
  },
  {
    id: "TC-2024-002",
    type: "credit_card",
    typeName: "Tarjeta de Crédito",
    customerName: "Carlos Mendoza",
    customerEmail: "carlos.mendoza@email.com",
    customerPhone: "+1 (555) 987-6543",
    amount: 15000,
    status: "under_review",
    priority: "high",
    submittedDate: "2024-01-14",
    lastUpdate: "2024-01-16",
    assignedAgent: "Roberto Silva",
    documents: [
      { name: "Cédula de Identidad", status: "approved", url: "/placeholder.svg" },
      { name: "Comprobante de Ingresos", status: "rejected", url: "/placeholder.svg" },
      { name: "Estados de Cuenta", status: "pending", url: "/placeholder.svg" },
    ],
    applicationData: {
      cardType: "Platinum",
      income: 6000,
      employment: "Independiente",
      creditScore: 680,
    },
  },
  {
    id: "LP-2024-003",
    type: "loan",
    typeName: "Préstamo Hipotecario",
    customerName: "Ana Rodríguez",
    customerEmail: "ana.rodriguez@email.com",
    customerPhone: "+1 (555) 456-7890",
    amount: 150000,
    status: "approved",
    priority: "normal",
    submittedDate: "2024-01-10",
    lastUpdate: "2024-01-16",
    assignedAgent: "María López",
    documents: [
      { name: "Cédula de Identidad", status: "approved", url: "/placeholder.svg" },
      { name: "Comprobante de Ingresos", status: "approved", url: "/placeholder.svg" },
      { name: "Avalúo de Propiedad", status: "approved", url: "/placeholder.svg" },
    ],
    applicationData: {
      purpose: "Compra de vivienda",
      term: 240,
      income: 8500,
      employment: "Empleado",
      creditScore: 780,
    },
  },
  {
    id: "TC-2024-004",
    type: "credit_card",
    typeName: "Tarjeta de Crédito",
    customerName: "Roberto Silva",
    customerEmail: "roberto.silva@email.com",
    customerPhone: "+1 (555) 321-0987",
    amount: 8000,
    status: "rejected",
    priority: "low",
    submittedDate: "2024-01-12",
    lastUpdate: "2024-01-16",
    assignedAgent: "Patricia Ruiz",
    documents: [
      { name: "Cédula de Identidad", status: "approved", url: "/placeholder.svg" },
      { name: "Comprobante de Ingresos", status: "rejected", url: "/placeholder.svg" },
    ],
    applicationData: {
      cardType: "Gold",
      income: 2500,
      employment: "Empleado",
      creditScore: 580,
    },
  },
  {
    id: "LP-2024-005",
    type: "loan",
    typeName: "Préstamo Vehicular",
    customerName: "Patricia López",
    customerEmail: "patricia.lopez@email.com",
    customerPhone: "+1 (555) 654-3210",
    amount: 45000,
    status: "documents_required",
    priority: "high",
    submittedDate: "2024-01-13",
    lastUpdate: "2024-01-15",
    assignedAgent: "Carlos Mendez",
    documents: [
      { name: "Cédula de Identidad", status: "approved", url: "/placeholder.svg" },
      { name: "Comprobante de Ingresos", status: "pending", url: "/placeholder.svg" },
      { name: "Cotización del Vehículo", status: "missing", url: "" },
    ],
    applicationData: {
      purpose: "Compra de vehículo",
      term: 60,
      income: 5200,
      employment: "Empleado",
      creditScore: 710,
    },
  },
]

export default function SolicitudesPage() {
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Filter applications based on search and filters
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    const matchesType = typeFilter === "all" || app.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "under_review":
        return <Clock className="h-4 w-4" />
      case "documents_required":
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
      case "under_review":
        return "primary"
      case "documents_required":
        return "warning"
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
      case "under_review":
        return "En Revisión"
      case "documents_required":
        return "Documentos Requeridos"
      case "pending":
        return "Pendiente"
      default:
        return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger"
      case "normal":
        return "primary"
      case "low":
        return "default"
      default:
        return "default"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "loan":
        return <DollarSign className="h-4 w-4" />
      case "credit_card":
        return <CreditCard className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application)
    setIsModalOpen(true)
  }

  const handleCallCustomer = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleWhatsAppCustomer = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "")
    window.open(`https://wa.me/${cleanPhone}`, "_blank")
  }

  // Calculate statistics
  const totalApplications = applications.length
  const pendingApplications = applications.filter(
    (app) => app.status === "pending" || app.status === "under_review",
  ).length
  const approvedToday = applications.filter(
    (app) => app.status === "approved" && app.lastUpdate === "2024-01-16",
  ).length
  const documentsRequired = applications.filter((app) => app.status === "documents_required").length

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Solicitudes</h1>
        <p className="text-default-500">Gestiona y revisa todas las solicitudes de préstamos y tarjetas de crédito</p>
      </div>

      {/* Stats Cards */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <Card className="border-none shadow-sm">
          <CardBody className="gap-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Total Solicitudes</p>
              <FileText className="h-4 w-4 text-default-500" />
            </div>
            <div className="text-2xl font-bold">{totalApplications}</div>
            <p className="text-xs text-default-500">Todas las solicitudes</p>
          </CardBody>
        </Card>

        <Card className="border-none shadow-sm">
          <CardBody className="gap-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Pendientes</p>
              <Clock className="h-4 w-4 text-default-500" />
            </div>
            <div className="text-2xl font-bold">{pendingApplications}</div>
            <p className="text-xs text-default-500">Requieren revisión</p>
          </CardBody>
        </Card>

        <Card className="border-none shadow-sm">
          <CardBody className="gap-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Aprobadas Hoy</p>
              <CheckCircle className="h-4 w-4 text-default-500" />
            </div>
            <div className="text-2xl font-bold">{approvedToday}</div>
            <p className="text-xs text-default-500">Procesadas hoy</p>
          </CardBody>
        </Card>

        <Card className="border-none shadow-sm">
          <CardBody className="gap-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Documentos Pendientes</p>
              <AlertTriangle className="h-4 w-4 text-default-500" />
            </div>
            <div className="text-2xl font-bold">{documentsRequired}</div>
            <p className="text-xs text-default-500">Requieren documentos</p>
          </CardBody>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-default-500" />
          <Input
            placeholder="Buscar por nombre o ID de solicitud..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Estados</SelectItem>
            <SelectItem value="pending">Pendiente</SelectItem>
            <SelectItem value="under_review">En Revisión</SelectItem>
            <SelectItem value="approved">Aprobado</SelectItem>
            <SelectItem value="rejected">Rechazado</SelectItem>
            <SelectItem value="documents_required">Documentos Requeridos</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Tipos</SelectItem>
            <SelectItem value="loan">Préstamos</SelectItem>
            <SelectItem value="credit_card">Tarjetas de Crédito</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="bordered" color="default">
          <Filter className="mr-2 h-4 w-4" />
          Más Filtros
        </Button>
      </div>

      {/* Applications List */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <FileText className="h-5 w-5" />
          <div>
            <h3 className="text-lg font-semibold">Lista de Solicitudes</h3>
            <p className="text-sm text-default-500">
              {filteredApplications.length} de {totalApplications} solicitudes
            </p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          {filteredApplications.map((application) => (
            <div
              key={application.id}
              className="flex items-center justify-between p-4 border border-default-200 rounded-lg hover:bg-default-50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                  {getTypeIcon(application.type)}
                  <div>
                    <p className="font-medium text-sm">{application.customerName}</p>
                    <p className="text-xs text-default-500">
                      {application.id} • {application.typeName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium">${application.amount.toLocaleString()}</p>
                  <p className="text-xs text-default-500">Monto</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <p className="text-xs">{application.submittedDate}</p>
                  </div>
                  <p className="text-xs text-default-500">Enviado</p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-xs font-medium">{application.assignedAgent}</p>
                  <p className="text-xs text-default-500">Agente</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {application.priority === "high" && (
                  <Chip color={getPriorityColor(application.priority)} variant="flat" size="sm">
                    Alta Prioridad
                  </Chip>
                )}

                <Chip
                  color={getStatusColor(application.status) as any}
                  variant="flat"
                  size="sm"
                  startContent={getStatusIcon(application.status)}
                >
                  {getStatusLabel(application.status)}
                </Chip>

                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="light"
                    color="primary"
                    onClick={() => handleViewApplication(application)}
                    startContent={<Eye className="h-4 w-4" />}
                  >
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {filteredApplications.length === 0 && (
            <div className="text-center py-8 text-default-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No se encontraron solicitudes que coincidan con los filtros</p>
              <p className="text-sm">Intenta ajustar los criterios de búsqueda</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Application Detail Modal */}
      <ApplicationDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        application={selectedApplication}
        onCallCustomer={handleCallCustomer}
        onWhatsAppCustomer={handleWhatsAppCustomer}
      />
    </div>
  )
}
