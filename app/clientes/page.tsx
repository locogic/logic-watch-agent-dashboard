"use client"

import { useState } from "react"
import {
  Search,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  Mail,
  Calendar,
  Shield,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Phone,
  MessageCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClientDetailModal } from "@/components/client-detail-modal"

// Mock data for platform clients
const mockClients = [
  {
    id: "CLI001",
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+1 (555) 123-4567",
    address: "Calle Principal 123",
    city: "Madrid",
    country: "España",
    dateOfBirth: "1985-03-15",
    occupation: "Ingeniera",
    employer: "Tech Solutions SA",
    monthlyIncome: 4500,
    creditScore: 750,
    accountStatus: "active",
    customerSince: "2022-01-15",
    totalLoans: 2,
    activeLoans: 1,
    totalDebt: 25000,
    paymentHistory: "excellent",
    riskLevel: "low",
    lastContact: "2024-01-10T14:30:00Z",
    notes: ["Cliente preferencial", "Historial de pagos excelente"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CLI002",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    phone: "+1 (555) 234-5678",
    address: "Avenida Libertad 456",
    city: "Barcelona",
    country: "España",
    dateOfBirth: "1978-07-22",
    occupation: "Contador",
    employer: "Contabilidad Moderna",
    monthlyIncome: 3800,
    creditScore: 680,
    accountStatus: "active",
    customerSince: "2021-08-20",
    totalLoans: 3,
    activeLoans: 2,
    totalDebt: 45000,
    paymentHistory: "good",
    riskLevel: "medium",
    lastContact: "2024-01-08T11:15:00Z",
    notes: ["Solicita refinanciamiento"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CLI003",
    name: "Ana Martínez",
    email: "ana.martinez@email.com",
    phone: "+1 (555) 345-6789",
    address: "Plaza Mayor 789",
    city: "Valencia",
    country: "España",
    dateOfBirth: "1990-11-08",
    occupation: "Diseñadora",
    employer: "Estudio Creativo",
    monthlyIncome: 2800,
    creditScore: 580,
    accountStatus: "suspended",
    customerSince: "2023-03-10",
    totalLoans: 1,
    activeLoans: 1,
    totalDebt: 15000,
    paymentHistory: "poor",
    riskLevel: "high",
    lastContact: "2023-12-15T16:45:00Z",
    notes: ["Pagos atrasados", "Requiere seguimiento"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CLI004",
    name: "Roberto Silva",
    email: "roberto.silva@email.com",
    phone: "+1 (555) 456-7890",
    address: "Calle Nueva 321",
    city: "Sevilla",
    country: "España",
    dateOfBirth: "1982-05-30",
    occupation: "Gerente",
    employer: "Empresa Líder SA",
    monthlyIncome: 5200,
    creditScore: 720,
    accountStatus: "active",
    customerSince: "2020-11-05",
    totalLoans: 4,
    activeLoans: 2,
    totalDebt: 35000,
    paymentHistory: "excellent",
    riskLevel: "low",
    lastContact: "2024-01-12T09:30:00Z",
    notes: ["Cliente VIP", "Interesado en préstamo hipotecario"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CLI005",
    name: "Laura Fernández",
    email: "laura.fernandez@email.com",
    phone: "+1 (555) 567-8901",
    address: "Paseo del Río 654",
    city: "Bilbao",
    country: "España",
    dateOfBirth: "1987-09-12",
    occupation: "Doctora",
    employer: "Hospital Central",
    monthlyIncome: 6000,
    creditScore: 780,
    accountStatus: "active",
    customerSince: "2019-06-18",
    totalLoans: 2,
    activeLoans: 1,
    totalDebt: 180000,
    paymentHistory: "excellent",
    riskLevel: "low",
    lastContact: "2024-01-14T13:20:00Z",
    notes: ["Préstamo hipotecario activo"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "inactive":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "suspended":
      return "bg-red-100 text-red-800 border-red-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="h-4 w-4" />
    case "inactive":
      return <XCircle className="h-4 w-4" />
    case "suspended":
      return <AlertTriangle className="h-4 w-4" />
    case "pending":
      return <Clock className="h-4 w-4" />
    default:
      return <XCircle className="h-4 w-4" />
  }
}

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Never"
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [companyFilter, setCompanyFilter] = useState("all")
  const [selectedClient, setSelectedClient] = useState<(typeof mockClients)[0] | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.accountStatus === statusFilter
    const matchesCity = companyFilter === "all" || client.city === companyFilter

    return matchesSearch && matchesStatus && matchesCity
  })

  const cities = [...new Set(mockClients.map((client) => client.city))]

  const stats = {
    total: mockClients.length,
    active: mockClients.filter((c) => c.accountStatus === "active").length,
    inactive: mockClients.filter((c) => c.accountStatus === "inactive").length,
    suspended: mockClients.filter((c) => c.accountStatus === "suspended").length,
    pending: mockClients.filter((c) => c.accountStatus === "pending").length,
    withIssues: mockClients.filter((c) => c.riskLevel === "high").length,
  }

  const handleViewClient = (client: (typeof mockClients)[0]) => {
    setSelectedClient(client)
    setIsDetailModalOpen(true)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">Gestiona Clientes de la plataforma y sus permisos</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactivos</CardTitle>
            <XCircle className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspendidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Con Problemas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.withIssues}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, email o empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
                <SelectItem value="suspended">Suspendido</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
              </SelectContent>
            </Select>
            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las empresas</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes ({filteredClients.length})</CardTitle>
          <CardDescription>Clientes registrados en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                    <AvatarFallback>
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{client.name}</h3>
                      <Badge variant="outline" className={getStatusColor(client.accountStatus)}>
                        {getStatusIcon(client.accountStatus)}
                        <span className="ml-1 capitalize">{client.accountStatus}</span>
                      </Badge>
                      <Badge variant="outline" className={getRiskColor(client.riskLevel)}>
                        {client.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {client.city}
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Score: {client.creditScore}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Cliente desde: {formatDate(client.customerSince)}
                      </div>
                      <div>Préstamos activos: {client.activeLoans}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Llamar
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleViewClient(client)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Detalles
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewClient(client)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Cliente
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" />
                        Gestionar Cuenta
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Suspender Cliente
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Detail Modal */}
      {selectedClient && (
        <ClientDetailModal
          client={selectedClient}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </div>
  )
}
