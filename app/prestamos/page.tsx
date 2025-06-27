"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BsCashCoin, BsCalculator, BsFileText } from "react-icons/bs"
import { LoanApplicationForm } from "@/components/loan-application-form"
import { Calendar, DollarSign } from "lucide-react"

interface Loan {
  id: string
  title: string
  amount: number
  term: number
  status: "active" | "pending" | "completed"
  type: string
  monthlyPayment?: number
  nextPayment?: string
}

export default function PrestamosPage() {
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: "#001",
      title: "Préstamo Personal #001",
      amount: 50000,
      term: 24,
      status: "active",
      type: "personal",
      monthlyPayment: 2291,
      nextPayment: "15 Dic",
    },
    {
      id: "#002",
      title: "Préstamo Hipotecario #002",
      amount: 75000,
      term: 36,
      status: "active",
      type: "hipotecario",
      monthlyPayment: 2291,
      nextPayment: "20 Dic",
    },
  ])

  const handleNewLoanApplication = (application: any) => {
    const newLoan: Loan = {
      id: application.id,
      title: `${application.type.charAt(0).toUpperCase() + application.type.slice(1)} ${application.id}`,
      amount: application.amount,
      term: application.term,
      status: "pending",
      type: application.type,
    }

    setLoans((prev) => [...prev, newLoan])
    setShowApplicationForm(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="secondary">Activo</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pendiente</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      personal: "Préstamo Personal",
      hipotecario: "Préstamo Hipotecario",
      vehicular: "Préstamo Vehicular",
      comercial: "Préstamo Comercial",
    }
    return types[type] || type
  }

  if (showApplicationForm) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
        <LoanApplicationForm onSubmit={handleNewLoanApplication} onCancel={() => setShowApplicationForm(false)} />
      </div>
    )
  }

  const activeLoans = loans.filter((loan) => loan.status === "active").length
  const totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0)
  const nextPaymentDate = loans
    .filter((loan) => loan.nextPayment)
    .sort((a, b) => new Date(a.nextPayment!).getTime() - new Date(b.nextPayment!).getTime())[0]?.nextPayment

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Préstamos</h1>
        <p className="text-muted-foreground">Gestiona tus préstamos y solicitudes</p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Préstamos Activos</CardTitle>
            <BsCashCoin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeLoans}</div>
            <p className="text-xs text-muted-foreground">Total de préstamos vigentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monto Total</CardTitle>
            <BsCalculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Suma de todos los préstamos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Pago</CardTitle>
            <BsFileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nextPaymentDate || "N/A"}</div>
            <p className="text-xs text-muted-foreground">Fecha del próximo vencimiento</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mis Préstamos</CardTitle>
            <CardDescription>Lista de préstamos activos y pendientes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loans.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BsCashCoin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No tienes préstamos registrados</p>
                <p className="text-sm">Solicita tu primer préstamo para comenzar</p>
              </div>
            ) : (
              loans.map((loan) => (
                <div key={loan.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">
                        {getTypeLabel(loan.type)} {loan.id}
                      </p>
                      {getStatusBadge(loan.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />${loan.amount.toLocaleString()}
                      </span>
                      <span>Cuotas: {loan.term}</span>
                      {loan.monthlyPayment && <span>Cuota: ${loan.monthlyPayment.toLocaleString()}</span>}
                      {loan.nextPayment && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {loan.nextPayment}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Operaciones frecuentes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" onClick={() => setShowApplicationForm(true)}>
              <BsCashCoin className="mr-2 h-4 w-4" />
              Solicitar Nuevo Préstamo
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BsCalculator className="mr-2 h-4 w-4" />
              Calcular Cuotas
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BsFileText className="mr-2 h-4 w-4" />
              Ver Historial de Pagos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
