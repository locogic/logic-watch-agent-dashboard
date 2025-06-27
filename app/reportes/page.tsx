import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FaChartLine } from "react-icons/fa"
import { BarChart3, Download, Calendar, TrendingUp, TrendingDown, DollarSign } from "lucide-react"

export default function ReportesPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Reportes</h1>
        <p className="text-muted-foreground">Analiza tu actividad financiera y genera reportes detallados</p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$45,231</div>
            <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos del Mes</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$32,150</div>
            <p className="text-xs text-muted-foreground">-5% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance Neto</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$13,081</div>
            <p className="text-xs text-muted-foreground">Ganancia mensual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes Generados</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <Select defaultValue="monthly">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Semanal</SelectItem>
            <SelectItem value="monthly">Mensual</SelectItem>
            <SelectItem value="quarterly">Trimestral</SelectItem>
            <SelectItem value="yearly">Anual</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tipo de Reporte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los Servicios</SelectItem>
            <SelectItem value="loans">Préstamos</SelectItem>
            <SelectItem value="cards">Tarjetas</SelectItem>
            <SelectItem value="health">Servicios de Salud</SelectItem>
          </SelectContent>
        </Select>

        <Button>
          <FaChartLine className="mr-2 h-4 w-4" />
          Generar Reporte
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Reportes Disponibles</CardTitle>
            <CardDescription>Selecciona el tipo de reporte que necesitas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium">Reporte Financiero Mensual</p>
                  <p className="text-sm text-muted-foreground">Resumen completo de actividad financiera</p>
                </div>
              </div>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Generar
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FaChartLine className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium">Análisis de Préstamos</p>
                  <p className="text-sm text-muted-foreground">Estado y proyecciones de préstamos</p>
                </div>
              </div>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Generar
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="font-medium">Reporte de Servicios de Salud</p>
                  <p className="text-sm text-muted-foreground">Uso de servicios médicos y dentales</p>
                </div>
              </div>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Generar
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="font-medium">Análisis de Gastos por Categoría</p>
                  <p className="text-sm text-muted-foreground">Desglose detallado de gastos</p>
                </div>
              </div>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Generar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reportes Recientes</CardTitle>
            <CardDescription>Historial de reportes generados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Reporte Financiero - Noviembre 2024</p>
                <p className="text-sm text-muted-foreground">Generado: 1 Dic 2024</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">Completado</Badge>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Análisis de Préstamos - Q3 2024</p>
                <p className="text-sm text-muted-foreground">Generado: 15 Nov 2024</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">Completado</Badge>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Reporte de Servicios - Octubre 2024</p>
                <p className="text-sm text-muted-foreground">Generado: 5 Nov 2024</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">Procesando</Badge>
                <Button size="sm" variant="outline" disabled>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Análisis Anual - 2024</p>
                <p className="text-sm text-muted-foreground">Generado: 1 Nov 2024</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">Completado</Badge>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
