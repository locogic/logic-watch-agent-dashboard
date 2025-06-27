"use client"

import { Card, CardBody, CardHeader } from "@/components/ui/nextui-card"
import { Button } from "@/components/ui/nextui-button"
import { Chip } from "@/components/ui/nextui-chip"
import { Clock, CheckCircle, XCircle, AlertTriangle, FileText, User } from "lucide-react"

export function MainContent() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Panel de Agente de Préstamos</h1>
        <p className="text-gray-500 dark:text-gray-400">Gestiona y revisa las solicitudes de préstamos pendientes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Solicitudes Pendientes</p>
              <Clock className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Requieren revisión</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Aprobadas Hoy</p>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Solicitudes procesadas</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Rechazadas Hoy</p>
              <XCircle className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">No cumplieron criterios</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Requieren Documentos</p>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="text-2xl font-bold text-yellow-600">5</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Documentación incompleta</p>
          </CardBody>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        {/* Pending Applications */}
        <Card>
          <CardHeader>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Solicitudes Pendientes</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Solicitudes que requieren tu revisión</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-sm">María González</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Préstamo Personal - $25,000</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Recibido: hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Chip color="warning" variant="flat" size="sm">
                  Pendiente
                </Chip>
                <Button size="sm" color="primary">
                  Revisar
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-sm">Carlos Mendoza</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Préstamo Hipotecario - $150,000</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Recibido: hace 4 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Chip color="warning" variant="flat" size="sm">
                  Pendiente
                </Chip>
                <Button size="sm" color="primary">
                  Revisar
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-sm">Ana Rodríguez</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Préstamo Vehicular - $45,000</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Recibido: hace 1 día</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Chip color="danger" variant="flat" size="sm">
                  Urgente
                </Chip>
                <Button size="sm" color="primary">
                  Revisar
                </Button>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="bordered" className="w-full">
                Ver Todas las Solicitudes Pendientes
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">Acciones Rápidas</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Herramientas frecuentes para agentes</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            <Button color="primary" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Revisar Documentos Pendientes
            </Button>
            <Button color="secondary" className="w-full justify-start">
              <CheckCircle className="mr-2 h-4 w-4" />
              Procesar Aprobaciones
            </Button>
            <Button color="secondary" className="w-full justify-start">
              <XCircle className="mr-2 h-4 w-4" />
              Gestionar Rechazos
            </Button>
            <Button color="secondary" className="w-full justify-start">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Solicitar Documentos Faltantes
            </Button>
            <Button color="success" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Contactar Cliente
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Actividad Reciente</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Últimas acciones realizadas en el sistema</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center space-x-4">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Préstamo aprobado para Juan Pérez</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Préstamo Personal #LP-2024-001 - $30,000</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">hace 30 minutos</p>
            </div>
            <Chip color="success" variant="flat" size="sm">
              Aprobado
            </Chip>
          </div>

          <div className="flex items-center space-x-4">
            <XCircle className="h-4 w-4 text-red-500" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Préstamo rechazado para Laura Martín</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Préstamo Hipotecario #LH-2024-015 - Ingresos insuficientes
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">hace 1 hora</p>
            </div>
            <Chip color="danger" variant="flat" size="sm">
              Rechazado
            </Chip>
          </div>

          <div className="flex items-center space-x-4">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Documentos solicitados a Roberto Silva</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Préstamo Vehicular #LV-2024-008 - Comprobante de ingresos
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">hace 2 horas</p>
            </div>
            <Chip color="warning" variant="flat" size="sm">
              Documentos Pendientes
            </Chip>
          </div>

          <div className="flex items-center space-x-4">
            <FileText className="h-4 w-4 text-blue-500" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Documentos recibidos de Patricia López</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Préstamo Personal #LP-2024-012 - Listos para revisión
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">hace 3 horas</p>
            </div>
            <Chip color="primary" variant="flat" size="sm">
              Listo para Revisar
            </Chip>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
