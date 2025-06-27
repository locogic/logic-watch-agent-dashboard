"use client"

import { useState } from "react"
import {
  UserIcon,
  Mail,
  Phone,
  Building2,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Save,
  Key,
  History,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

interface UserDetail {
  id: string
  name: string
  email: string
  phone: string
  company: string
  role: string
  status: string
  permissions: string[]
  lastLogin: string | null
  createdAt: string
  loginAttempts: number
  accountIssues: string[]
  avatar: string
}

interface UserDetailModalProps {
  user: UserDetail
  isOpen: boolean
  onClose: () => void
}

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
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const getIssueDescription = (issue: string) => {
  const descriptions: { [key: string]: string } = {
    multiple_failed_logins: "Múltiples intentos de inicio de sesión fallidos",
    suspicious_activity: "Actividad sospechosa detectada",
    account_expired: "Cuenta expirada",
    pending_verification: "Verificación pendiente",
    permission_violation: "Violación de permisos",
    security_breach: "Posible brecha de seguridad",
  }
  return descriptions[issue] || issue
}

const availablePermissions = [
  { id: "view_applications", name: "Ver Solicitudes", description: "Puede ver todas las solicitudes" },
  { id: "approve_loans", name: "Aprobar Préstamos", description: "Puede aprobar o rechazar préstamos" },
  { id: "contact_customers", name: "Contactar Clientes", description: "Puede contactar a los clientes" },
  { id: "manage_users", name: "Gestionar Usuarios", description: "Puede gestionar otros usuarios" },
  { id: "admin_access", name: "Acceso Administrativo", description: "Acceso completo al sistema" },
  { id: "view_reports", name: "Ver Reportes", description: "Puede ver reportes y estadísticas" },
  { id: "export_data", name: "Exportar Datos", description: "Puede exportar información" },
]

export function UserDetailModal({ user, isOpen, onClose }: UserDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)
  const [activeTab, setActiveTab] = useState("details")

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    console.log("Saving user changes:", editedUser)
    setIsEditing(false)
  }

  const handlePermissionToggle = (permissionId: string) => {
    setEditedUser((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }))
  }

  const mockLoginHistory = [
    { date: "2024-01-15T10:30:00Z", ip: "192.168.1.100", location: "Madrid, España", success: true },
    { date: "2024-01-14T16:45:00Z", ip: "192.168.1.100", location: "Madrid, España", success: true },
    { date: "2024-01-14T09:20:00Z", ip: "192.168.1.100", location: "Madrid, España", success: true },
    { date: "2024-01-13T14:15:00Z", ip: "10.0.0.50", location: "Barcelona, España", success: false },
    { date: "2024-01-13T14:10:00Z", ip: "10.0.0.50", location: "Barcelona, España", success: false },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </DialogTitle>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm">
                    <Save className="h-4 w-4 mr-1" />
                    Guardar
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "details"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserIcon className="h-4 w-4 mr-2 inline" />
            Detalles
          </button>
          <button
            onClick={() => setActiveTab("permissions")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "permissions"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Shield className="h-4 w-4 mr-2 inline" />
            Permisos
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "security"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Key className="h-4 w-4 mr-2 inline" />
            Seguridad
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "history"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <History className="h-4 w-4 mr-2 inline" />
            Historial
          </button>
        </div>

        <div className="space-y-6">
          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              {/* Status and Basic Info */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estado de la Cuenta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(user.status)}>
                        {getStatusIcon(user.status)}
                        <span className="ml-1 capitalize">{user.status}</span>
                      </Badge>
                    </div>

                    {user.accountIssues.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          Problemas Detectados
                        </h4>
                        <div className="space-y-1">
                          {user.accountIssues.map((issue, index) => (
                            <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                              {getIssueDescription(issue)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Último acceso:</span>
                        <p className="text-muted-foreground">{formatDate(user.lastLogin)}</p>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Cuenta creada:</span>
                        <p className="text-muted-foreground">{formatDate(user.createdAt)}</p>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Intentos de login fallidos:</span>
                        <p className="text-muted-foreground">{user.loginAttempts}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Información Personal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nombre Completo</Label>
                          <Input
                            id="name"
                            value={editedUser.name}
                            onChange={(e) => setEditedUser((prev) => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editedUser.email}
                            onChange={(e) => setEditedUser((prev) => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input
                            id="phone"
                            value={editedUser.phone}
                            onChange={(e) => setEditedUser((prev) => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Empresa</Label>
                          <Input
                            id="company"
                            value={editedUser.company}
                            onChange={(e) => setEditedUser((prev) => ({ ...prev, company: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="role">Rol</Label>
                          <Input
                            id="role"
                            value={editedUser.role}
                            onChange={(e) => setEditedUser((prev) => ({ ...prev, role: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="status">Estado</Label>
                          <Select
                            value={editedUser.status}
                            onValueChange={(value) => setEditedUser((prev) => ({ ...prev, status: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Activo</SelectItem>
                              <SelectItem value="inactive">Inactivo</SelectItem>
                              <SelectItem value="suspended">Suspendido</SelectItem>
                              <SelectItem value="pending">Pendiente</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{user.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{user.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{user.role}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Permissions Tab */}
          {activeTab === "permissions" && (
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Permisos</CardTitle>
                <p className="text-sm text-muted-foreground">Configura los permisos y accesos del usuario</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{permission.name}</h4>
                        <p className="text-sm text-muted-foreground">{permission.description}</p>
                      </div>
                      <Switch
                        checked={editedUser.permissions.includes(permission.id)}
                        onCheckedChange={() => handlePermissionToggle(permission.id)}
                        disabled={!isEditing}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Seguridad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Intentos de Login Fallidos</Label>
                      <div className="text-2xl font-bold text-red-600">{user.loginAttempts}</div>
                      <p className="text-sm text-muted-foreground">Máximo permitido: 5</p>
                    </div>
                    <div>
                      <Label>Estado de Autenticación</Label>
                      <div className="flex items-center gap-2 mt-1">
                        {user.loginAttempts < 5 ? (
                          <Badge className="bg-green-100 text-green-800">Seguro</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Bloqueado</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Acciones de Seguridad</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Restablecer Contraseña
                      </Button>
                      <Button variant="outline" size="sm">
                        Desbloquear Cuenta
                      </Button>
                      <Button variant="outline" size="sm">
                        Forzar Cierre de Sesión
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <Card>
              <CardHeader>
                <CardTitle>Historial de Accesos</CardTitle>
                <p className="text-sm text-muted-foreground">Últimos intentos de inicio de sesión</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockLoginHistory.map((login, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{formatDate(login.date)}</span>
                          {login.success ? (
                            <Badge className="bg-green-100 text-green-800">Exitoso</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">Fallido</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          IP: {login.ip} • {login.location}
                        </div>
                      </div>
                      {login.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
