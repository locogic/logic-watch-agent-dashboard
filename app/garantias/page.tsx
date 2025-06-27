import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BsHouseLock, BsShield, BsFileEarmark } from "react-icons/bs"

export default function GarantiasPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Garantías</h1>
        <p className="text-muted-foreground">Administra tus garantías y avales</p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Garantías Activas</CardTitle>
            <BsShield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Total de garantías vigentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <BsHouseLock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$350,000</div>
            <p className="text-xs text-muted-foreground">Valor total de garantías</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Revisión</CardTitle>
            <BsFileEarmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30 Ene</div>
            <p className="text-xs text-muted-foreground">Fecha de próxima evaluación</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mis Garantías</CardTitle>
            <CardDescription>Lista de garantías registradas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Propiedad Residencial</p>
                <p className="text-sm text-muted-foreground">Valor: $200,000 | Tipo: Hipotecaria</p>
              </div>
              <Badge variant="secondary">Vigente</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Vehículo 2020</p>
                <p className="text-sm text-muted-foreground">Valor: $150,000 | Tipo: Prendaria</p>
              </div>
              <Badge variant="secondary">Vigente</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Disponibles</CardTitle>
            <CardDescription>Gestión de garantías</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start">
              <BsHouseLock className="mr-2 h-4 w-4" />
              Registrar Nueva Garantía
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BsShield className="mr-2 h-4 w-4" />
              Evaluar Garantía
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BsFileEarmark className="mr-2 h-4 w-4" />
              Documentación
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
