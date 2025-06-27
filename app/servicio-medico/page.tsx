import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BsHospital, BsCalendar, BsPersonCheck } from "react-icons/bs"

export default function ServicioMedicoPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Servicio Médico</h1>
        <p className="text-muted-foreground">Gestiona tus servicios de salud y citas médicas</p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Programadas</CardTitle>
            <BsCalendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Próximas citas médicas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cobertura Activa</CardTitle>
            <BsPersonCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">Cobertura médica vigente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas del Mes</CardTitle>
            <BsHospital className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Consultas realizadas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Citas</CardTitle>
            <CardDescription>Citas médicas programadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Dr. García - Medicina General</p>
                <p className="text-sm text-muted-foreground">15 Dic 2024 - 10:00 AM</p>
              </div>
              <Badge variant="secondary">Confirmada</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Dra. López - Cardiología</p>
                <p className="text-sm text-muted-foreground">20 Dic 2024 - 2:30 PM</p>
              </div>
              <Badge variant="outline">Pendiente</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Servicios Médicos</CardTitle>
            <CardDescription>Acciones disponibles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start">
              <BsCalendar className="mr-2 h-4 w-4" />
              Agendar Cita
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BsHospital className="mr-2 h-4 w-4" />
              Buscar Especialistas
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BsPersonCheck className="mr-2 h-4 w-4" />
              Ver Historial Médico
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
