"use client"

import { useState } from "react"
import {
  UserIcon,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Save,
  Briefcase,
  TrendingUp,
  FileText,
  MessageCircle,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface ClientDetail {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  dateOfBirth: string
  occupation: string
  employer: string
  monthlyIncome: number
  creditScore: number
  accountStatus: string
  customerSince: string
  totalLoans: number
  activeLoans: number
  totalDebt: number
  paymentHistory: string
  riskLevel: string
  lastContact: string | null
  notes: string[]
  avatar: string
}

interface ClientDetailModalProps {
  client: ClientDetail
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

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "low":
      return "bg-green-100 text-green-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "high":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Never"
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const getCreditScoreColor = (score: number) => {
  if (score >= 700) return "text-green-600"
  if (score >= 600) return "text-yellow-600"
  return "text-red-600"
}

const getCreditScoreLabel = (score: number) => {
  if (score >= 700) return "Excelente"
  if (score >= 600) return "Bueno"
  return "Pobre"
}

export function ClientDetailModal({ client, isOpen, onClose }: ClientDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedClient, setEditedClient] = useState(client)
  const [activeTab, setActiveTab] = useState("profile")

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    console.log("Saving client changes:", editedClient)
    setIsEditing(false)
  }

  const mockLoanHistory = [
    {
      id: "L001",
      type: "Préstamo Personal",
      amount: 15000,
      status: "active",
      startDate: "2023-06-15",
      endDate: "2026-06-15",
      monthlyPayment: 450,
      remainingBalance: 12000,
    },
    {
      id: "L002",
      type: "Préstamo Hipotecario",
      amount: 200000,
      status: "active",
      startDate: "2022-01-10",
      endDate: "2042-01-10",
      monthlyPayment: 1200,
      remainingBalance: 185000,
    },
    {
      id: "L003",
      type: "Préstamo Vehicular",
      amount: 25000,
      status: "completed",
      startDate: "2020-03-20",
      endDate: "2023-03-20",
      monthlyPayment: 520,
      remainingBalance: 0,
    },
  ]

  const mockPaymentHistory = [
    { date: "2024-01-15", amount: 1650, status: "paid", description: "Pago mensual combinado" },
    { date: "2023-12-15", amount: 1650, status: "paid", description: "Pago mensual combinado" },
    { date: "2023-11-15", amount: 1650, status: "paid", description: "Pago mensual combinado" },
    { date: "2023-10-15", amount: 1650, status: "late", description: "Pago mensual combinado (5 días tarde)" },
    { date: "2023-09-15", amount: 1650, status: "paid", description: "Pago mensual combinado" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                <AvatarFallback>
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{client.name}</h2>
                <p className="text-sm text-muted-foreground">{client.email}</p>
              </div>
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-1" />
                Llamar
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-1" />
                WhatsApp
              </Button>
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
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "profile"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserIcon className="h-4 w-4 mr-2 inline" />
            Perfil
          </button>
          <button
            onClick={() => setActiveTab("financial")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "financial"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <DollarSign className="h-4 w-4 mr-2 inline" />
            Financiero
          </button>
          <button
            onClick={() => setActiveTab("loans")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "loans"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <CreditCard className="h-4 w-4 mr-2 inline" />
            Préstamos
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "history"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="h-4 w-4 mr-2 inline" />
            Historial
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estado de la Cuenta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(client.accountStatus)}>
                        {getStatusIcon(client.accountStatus)}
                        <span className="ml-1 capitalize">{client.accountStatus}</span>
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Cliente desde:</span>
                        <p className="text-muted-foreground">{formatDate(client.customerSince)}</p>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Último contacto:</span>
                        <p className="text-muted-foreground">{formatDate(client.lastContact)}</p>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Nivel de riesgo:</span>
                        <Badge className={getRiskColor(client.riskLevel)} variant="outline">
                          {client.riskLevel.toUpperCase()}
                        </Badge>
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
                            value={editedClient.name}
                            onChange={(e) => setEditedClient((prev) => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editedClient.email}
                            onChange={(e) => setEditedClient((prev) => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input
                            id="phone"
                            value={editedClient.phone}
                            onChange={(e) => setEditedClient((prev) => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Dirección</Label>
                          <Input
                            id="address"
                            value={editedClient.address}
                            onChange={(e) => setEditedClient((prev) => ({ ...prev, address: e.target.value }))}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{client.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{client.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {client.address}, {client.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{formatDate(client.dateOfBirth)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {client.occupation} en {client.employer}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === "financial" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Score Crediticio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center">
                      <div className="relative w-32 h-32">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={
                              client.creditScore >= 700 ? "#10b981" : client.creditScore >= 600 ? "#f59e0b" : "#ef4444"
                            }
                            strokeWidth="2"
                            strokeDasharray={`${(client.creditScore / 850) * 100}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${getCreditScoreColor(client.creditScore)}`}>
                              {client.creditScore}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {getCreditScoreLabel(client.creditScore)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ingresos Mensuales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{formatCurrency(client.monthlyIncome)}</div>
                      <p className="text-sm text-muted-foreground mt-2">Ingresos declarados</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Deuda Total</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">{formatCurrency(client.totalDebt)}</div>
                      <p className="text-sm text-muted-foreground mt-2">Deuda pendiente</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Resumen Financiero</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Ratio Deuda/Ingresos</Label>
                      <div className="mt-2">
                        <Progress value={(client.totalDebt / (client.monthlyIncome * 12)) * 100} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-1">
                          {((client.totalDebt / (client.monthlyIncome * 12)) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label>Historial de Pagos</Label>
                      <div className="mt-2">
                        <Badge
                          className={
                            client.paymentHistory === "excellent"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {client.paymentHistory === "excellent" ? "Excelente" : "Bueno"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Loans Tab */}
          {activeTab === "loans" && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{client.totalLoans}</div>
                      <p className="text-sm text-muted-foreground">Total Préstamos</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{client.activeLoans}</div>
                      <p className="text-sm text-muted-foreground">Préstamos Activos</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{client.totalLoans - client.activeLoans}</div>
                      <p className="text-sm text-muted-foreground">Préstamos Completados</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Historial de Préstamos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockLoanHistory.map((loan) => (
                      <div key={loan.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{loan.type}</h4>
                            <p className="text-sm text-muted-foreground">ID: {loan.id}</p>
                          </div>
                          <Badge
                            className={
                              loan.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {loan.status === "active" ? "Activo" : "Completado"}
                          </Badge>
                        </div>
                        <div className="grid gap-2 md:grid-cols-4 text-sm">
                          <div>
                            <span className="font-medium">Monto:</span>
                            <p>{formatCurrency(loan.amount)}</p>
                          </div>
                          <div>
                            <span className="font-medium">Pago Mensual:</span>
                            <p>{formatCurrency(loan.monthlyPayment)}</p>
                          </div>
                          <div>
                            <span className="font-medium">Saldo Restante:</span>
                            <p>{formatCurrency(loan.remainingBalance)}</p>
                          </div>
                          <div>
                            <span className="font-medium">Vencimiento:</span>
                            <p>{formatDate(loan.endDate)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <Card>
              <CardHeader>
                <CardTitle>Historial de Pagos</CardTitle>
                <p className="text-sm text-muted-foreground">Últimos pagos realizados</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPaymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{formatDate(payment.date)}</span>
                          <Badge
                            className={
                              payment.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                            }
                          >
                            {payment.status === "paid" ? "Pagado" : "Tardío"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{payment.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(payment.amount)}</div>
                        {payment.status === "paid" ? (
                          <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-orange-600 ml-auto" />
                        )}
                      </div>
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
