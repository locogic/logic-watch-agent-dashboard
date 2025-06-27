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
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserDetailModal } from "@/components/user-detail-modal"

// Mock data for platform users
const mockUsers = [
  {
    id: "USR001",
    name: "María González",
    email: "maria.gonzalez@bancosol.com",
    phone: "+1 (555) 123-4567",
    company: "BancoSol",
    role: "Loan Officer",
    status: "active",
    permissions: ["view_applications", "approve_loans", "contact_customers"],
    lastLogin: "2024-01-15T10:30:00Z",
    createdAt: "2023-06-15T09:00:00Z",
    loginAttempts: 0,
    accountIssues: [],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR002",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@financorp.com",
    phone: "+1 (555) 234-5678",
    company: "FinanCorp",
    role: "Senior Agent",
    status: "active",
    permissions: ["view_applications", "approve_loans", "manage_users", "contact_customers"],
    lastLogin: "2024-01-14T16:45:00Z",
    createdAt: "2023-03-10T14:20:00Z",
    loginAttempts: 0,
    accountIssues: [],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR003",
    name: "Ana Martínez",
    email: "ana.martinez@creditunion.com",
    phone: "+1 (555) 345-6789",
    company: "Credit Union Plus",
    role: "Junior Agent",
    status: "suspended",
    permissions: ["view_applications"],
    lastLogin: "2024-01-10T08:15:00Z",
    createdAt: "2023-09-22T11:30:00Z",
    loginAttempts: 5,
    accountIssues: ["multiple_failed_logins", "suspicious_activity"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR004",
    name: "Roberto Silva",
    email: "roberto.silva@bancosol.com",
    phone: "+1 (555) 456-7890",
    company: "BancoSol",
    role: "Manager",
    status: "active",
    permissions: ["view_applications", "approve_loans", "manage_users", "contact_customers", "admin_access"],
    lastLogin: "2024-01-15T09:20:00Z",
    createdAt: "2022-11-05T10:00:00Z",
    loginAttempts: 0,
    accountIssues: [],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR005",
    name: "Laura Fernández",
    email: "laura.fernandez@quickloans.com",
    phone: "+1 (555) 567-8901",
    company: "QuickLoans Inc",
    role: "Loan Specialist",
    status: "inactive",
    permissions: ["view_applications", "contact_customers"],
    lastLogin: "2023-12-20T14:30:00Z",
    createdAt: "2023-08-12T13:45:00Z",
    loginAttempts: 0,
    accountIssues: ["account_expired"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "USR006",
    name: "Diego Morales",
    email: "diego.morales@financorp.com",
    phone: "+1 (555) 678-9012",
    company: "FinanCorp",
    role: "Risk Analyst",
    status: "pending",
    permissions: [],
    lastLogin: null,
    createdAt: "2024-01-12T16:00:00Z",
    loginAttempts: 0,
    accountIssues: ["pending_verification"],
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

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [companyFilter, setCompanyFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesCompany = companyFilter === "all" || user.company === companyFilter

    return matchesSearch && matchesStatus && matchesCompany
  })

  const companies = [...new Set(mockUsers.map((user) => user.company))]

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === "active").length,
    inactive: mockUsers.filter((u) => u.status === "inactive").length,
    suspended: mockUsers.filter((u) => u.status === "suspended").length,
    pending: mockUsers.filter((u) => u.status === "pending").length,
    withIssues: mockUsers.filter((u) => u.accountIssues.length > 0).length,
  }

  const handleViewUser = (user: (typeof mockUsers)[0]) => {
    setSelectedUser(user)
    setIsDetailModalOpen(true)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
          <p className="text-muted-foreground">Gestiona usuarios de la plataforma y sus permisos</p>
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
                {companies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
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
          <CardTitle>Lista de Usuarios ({filteredUsers.length})</CardTitle>
          <CardDescription>Usuarios registrados en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{user.name}</h3>
                      <Badge variant="outline" className={getStatusColor(user.status)}>
                        {getStatusIcon(user.status)}
                        <span className="ml-1 capitalize">{user.status}</span>
                      </Badge>
                      {user.accountIssues.length > 0 && (
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {user.accountIssues.length} problema{user.accountIssues.length > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {user.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        {user.role}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Último acceso: {formatDate(user.lastLogin)}
                      </div>
                      <div>Permisos: {user.permissions.length}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewUser(user)}>
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
                      <DropdownMenuItem onClick={() => handleViewUser(user)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Usuario
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" />
                        Gestionar Permisos
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar Usuario
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
      {selectedUser && (
        <UserDetailModal user={selectedUser} isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} />
      )}
    </div>
  )
}
