import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LuStethoscope } from "react-icons/lu"
import { BsCalendar, BsPersonCheck } from "react-icons/bs"

export default function ServicioOdontologicoPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Servicio Odontológico</h1>
        <p className="text-muted-foreground">Gestiona tus servicios dentales y tratamientos</p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Dentales</CardTitle>
            <BsCalendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Próximas citas programadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tratamientos Activos</CardTitle>
            <LuStethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Tratamientos en curso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Consulta</CardTitle>
            <BsPersonCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Nov</div>
            <p className="text-xs text-muted-foreground">Fecha de última visita</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Citas Dentales</CardTitle>
            <CardDescription>Citas odontológicas programadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Dr. Martínez - Limpieza Dental</p>
                <p className="text-sm text-muted-foreground">18 Dic 2024 - 9:00 AM</p>
              </div>
              <Badge variant="secondary">Confirmada</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Dra. Rodríguez - Ortodoncia</p>
                <p className="text-sm text-muted-foreground">25 Dic 2024 - 11:00 AM</p>
              </div>
              <Badge variant="outline">Pendiente</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Servicios Dentales</CardTitle>
            <CardDescription>Acciones disponibles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start">
              <BsCalendar className="mr-2 h-4 w-4" />
              Agendar Cita Dental
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <LuStethoscope className="mr-2 h-4 w-4" />
              Ver Tratamientos
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BsPersonCheck className="mr-2 h-4 w-4" />
              Historial Dental
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
