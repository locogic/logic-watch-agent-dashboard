"use client"

import { Card, CardBody, CardHeader } from "@/components/ui/nextui-card"
import { Button } from "@/components/ui/nextui-button"
import { Switch } from "@/components/ui/nextui-switch"
import { Select, SelectItem } from "@/components/ui/nextui-select"
import { Chip } from "@/components/ui/nextui-chip"
import { Divider } from "@/components/ui/nextui-divider"
import { DocumentPreviewModal } from "@/components/document-preview-modal"
import { DocumentInfoModal } from "@/components/document-info-modal"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Key,
  Smartphone,
  Sun,
  Moon,
  Monitor,
  FileText,
  Eye,
  Download,
  Info,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

// Mock document data
const personalDocuments = [
  {
    id: 1,
    name: "Cédula de Identidad",
    status: "Aprobado" as const,
    uploadDate: "2024-01-15",
    reviewDate: "2024-01-16",
    reviewer: "Ana García",
    isValid: true,
    expiryDate: "2029-01-15",
    fileSize: "2.3 MB",
    fileType: "PDF",
    url: "/placeholder.svg?height=600&width=400&text=Cédula+de+Identidad",
    comments: "Documento válido y legible. Todos los datos coinciden con la información registrada.",
  },
  {
    id: 2,
    name: "Comprobante de Ingresos",
    status: "En Revisión" as const,
    uploadDate: "2024-01-20",
    isValid: true,
    fileSize: "1.8 MB",
    fileType: "PDF",
    url: "/placeholder.svg?height=600&width=400&text=Comprobante+de+Ingresos",
  },
  {
    id: 3,
    name: "Certificado de Trabajo",
    status: "Rechazado" as const,
    uploadDate: "2024-01-18",
    reviewDate: "2024-01-19",
    reviewer: "Carlos López",
    isValid: false,
    fileSize: "1.2 MB",
    fileType: "PDF",
    url: "/placeholder.svg?height=600&width=400&text=Certificado+de+Trabajo",
    comments: "El documento presenta inconsistencias en las fechas. Por favor, solicite una nueva versión actualizada.",
  },
  {
    id: 4,
    name: "Comprobante de Domicilio",
    status: "Aprobado" as const,
    uploadDate: "2024-01-10",
    reviewDate: "2024-01-11",
    reviewer: "María Rodríguez",
    isValid: true,
    fileSize: "0.9 MB",
    fileType: "PDF",
    url: "/placeholder.svg?height=600&width=400&text=Comprobante+de+Domicilio",
    comments: "Documento válido. La dirección coincide con la información registrada.",
  },
]

export default function ConfiguracionPage() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean
    document: any
  }>({
    isOpen: false,
    document: null,
  })
  const [infoModal, setInfoModal] = useState<{
    isOpen: boolean
    document: any
  }>({
    isOpen: false,
    document: null,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = theme === "system" ? systemTheme : theme

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

  const handlePreview = (document: any) => {
    setPreviewModal({
      isOpen: true,
      document: {
        name: document.name,
        type: document.fileType === "PDF" ? "application/pdf" : "image/jpeg",
        url: document.url,
      },
    })
  }

  const handleDownload = (document: any) => {
    const link = document.createElement("a")
    link.href = document.url
    link.download = document.name
    link.click()
  }

  const handleInfo = (document: any) => {
    setInfoModal({
      isOpen: true,
      document,
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Personaliza tu experiencia y gestiona la configuración de tu cuenta
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Bell className="h-5 w-5" />
            <div>
              <h3 className="text-lg font-semibold">Notificaciones</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Configura cómo y cuándo recibir notificaciones</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Notificaciones por Email</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Recibir actualizaciones por correo electrónico
                </p>
              </div>
              <Switch defaultChecked color="primary" />
            </div>

            <Divider />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Notificaciones SMS</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Recibir alertas por mensaje de texto</p>
              </div>
              <Switch color="primary" />
            </div>

            <Divider />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Notificaciones Push</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Notificaciones en el navegador</p>
              </div>
              <Switch defaultChecked color="primary" />
            </div>

            <Divider />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Emails de Marketing</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Ofertas y promociones especiales</p>
              </div>
              <Switch color="primary" />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Shield className="h-5 w-5" />
            <div>
              <h3 className="text-lg font-semibold">Seguridad</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Configuración de seguridad y privacidad</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Autenticación de Dos Factores</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Seguridad adicional para tu cuenta</p>
              </div>
              <Switch color="success" />
            </div>

            <Divider />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Alertas de Inicio de Sesión</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Notificar sobre nuevos accesos</p>
              </div>
              <Switch defaultChecked color="success" />
            </div>

            <Divider />

            <div className="space-y-2">
              <p className="text-sm font-medium">Tiempo de Sesión</p>
              <Select defaultSelectedKeys={["30"]} className="max-w-xs" size="sm">
                <SelectItem key="15" value="15">
                  15 minutos
                </SelectItem>
                <SelectItem key="30" value="30">
                  30 minutos
                </SelectItem>
                <SelectItem key="60" value="60">
                  1 hora
                </SelectItem>
                <SelectItem key="120" value="120">
                  2 horas
                </SelectItem>
              </Select>
            </div>

            <Button variant="bordered" className="w-full" startContent={<Key className="h-4 w-4" />}>
              Cambiar Contraseña
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Palette className="h-5 w-5" />
            <div>
              <h3 className="text-lg font-semibold">Apariencia</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Personaliza la interfaz de usuario</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium">Tema</p>
              <div className="flex gap-2">
                <Button
                  variant={theme === "light" ? "solid" : "bordered"}
                  color={theme === "light" ? "primary" : "default"}
                  size="sm"
                  startContent={<Sun className="h-4 w-4" />}
                  onClick={() => setTheme("light")}
                >
                  Claro
                </Button>
                <Button
                  variant={theme === "dark" ? "solid" : "bordered"}
                  color={theme === "dark" ? "primary" : "default"}
                  size="sm"
                  startContent={<Moon className="h-4 w-4" />}
                  onClick={() => setTheme("dark")}
                >
                  Oscuro
                </Button>
                <Button
                  variant={theme === "system" ? "solid" : "bordered"}
                  color={theme === "system" ? "primary" : "default"}
                  size="sm"
                  startContent={<Monitor className="h-4 w-4" />}
                  onClick={() => setTheme("system")}
                >
                  Sistema
                </Button>
              </div>
              {theme === "system" && (
                <p className="text-xs text-gray-500 dark:text-gray-400">Usando tema {currentTheme} del sistema</p>
              )}
            </div>

            <Divider />

            <div className="space-y-2">
              <p className="text-sm font-medium">Idioma</p>
              <Select defaultSelectedKeys={["es"]} className="max-w-xs" size="sm">
                <SelectItem key="es" value="es">
                  Español
                </SelectItem>
                <SelectItem key="en" value="en">
                  English
                </SelectItem>
                <SelectItem key="pt" value="pt">
                  Português
                </SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Moneda</p>
              <Select defaultSelectedKeys={["usd"]} className="max-w-xs" size="sm">
                <SelectItem key="usd" value="usd">
                  USD ($)
                </SelectItem>
                <SelectItem key="eur" value="eur">
                  EUR (€)
                </SelectItem>
                <SelectItem key="mxn" value="mxn">
                  MXN ($)
                </SelectItem>
              </Select>
            </div>

            <Divider />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Modo Compacto</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Interfaz más densa</p>
              </div>
              <Switch color="secondary" />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Smartphone className="h-5 w-5" />
            <div>
              <h3 className="text-lg font-semibold">Dispositivos</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gestiona los dispositivos conectados</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-sm">MacBook Pro</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Último acceso: Hace 2 horas</p>
              </div>
              <Chip color="success" variant="flat" size="sm">
                Actual
              </Chip>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-sm">iPhone 14</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Último acceso: Hace 1 día</p>
              </div>
              <div className="flex gap-2 items-center">
                <Chip variant="bordered" size="sm">
                  Móvil
                </Chip>
                <Button size="sm" variant="bordered" color="danger">
                  Desconectar
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-sm">Chrome - Windows</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Último acceso: Hace 3 días</p>
              </div>
              <div className="flex gap-2 items-center">
                <Chip variant="bordered" size="sm">
                  Web
                </Chip>
                <Button size="sm" variant="bordered" color="danger">
                  Desconectar
                </Button>
              </div>
            </div>

            <Button color="danger" variant="solid" className="w-full">
              Cerrar Sesión en Todos los Dispositivos
            </Button>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <Settings className="h-5 w-5" />
          <div>
            <h3 className="text-lg font-semibold">Configuración Avanzada</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Opciones adicionales de configuración</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="bordered">Exportar Datos</Button>
            <Button variant="bordered">Importar Configuración</Button>
            <Button variant="bordered">Restablecer Configuración</Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950/20">
            <div>
              <p className="font-medium text-red-800 dark:text-red-400">Eliminar Cuenta</p>
              <p className="text-sm text-red-600 dark:text-red-500">Esta acción no se puede deshacer</p>
            </div>
            <Button color="danger" variant="solid">
              Eliminar Cuenta
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Modals */}
      <DocumentPreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({ isOpen: false, document: null })}
        document={previewModal.document}
      />

      <DocumentInfoModal
        isOpen={infoModal.isOpen}
        onClose={() => setInfoModal({ isOpen: false, document: null })}
        document={infoModal.document}
      />
    </div>
  )
}
