import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BsLuggage, BsGeoAlt, BsCalendar } from "react-icons/bs"

export default function TurismoPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Turismo</h1>
        <p className="text-muted-foreground">Planifica y gestiona tus viajes y vacaciones</p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Viajes Programados</CardTitle>
            <BsLuggage className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Próximos viajes planificados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Destinos Visitados</CardTitle>
            <BsGeoAlt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Destinos conocidos este año</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Viaje</CardTitle>
            <BsCalendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22 Dic</div>
            <p className="text-xs text-muted-foreground">Fecha del próximo viaje</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximos Viajes</CardTitle>
            <CardDescription>Viajes programados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Cancún, México</p>
                <p className="text-sm text-muted-foreground">22-29 Dic 2024 | 7 días</p>
              </div>
              <Badge variant="secondary">Confirmado</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Buenos Aires, Argentina</p>
                <p className="text-sm text-muted-foreground">15-22 Ene 2025 | 7 días</p>
              </div>
              <Badge variant="outline">Pendiente</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Servicios de Turismo</CardTitle>
            <CardDescription>Planifica tu próximo viaje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start">
              <BsLuggage className="mr-2 h-4 w-4" />
              Planificar Nuevo Viaje
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BsGeoAlt className="mr-2 h-4 w-4" />
              Explorar Destinos
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BsCalendar className="mr-2 h-4 w-4" />
              Ver Historial de Viajes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
