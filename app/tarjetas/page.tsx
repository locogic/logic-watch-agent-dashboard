import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BsCreditCard, BsGraphUp, BsWallet } from "react-icons/bs"

export default function TarjetasPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Tarjetas</h1>
        <p className="text-muted-foreground">Gestiona tus tarjetas de crédito y débito</p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarjetas Activas</CardTitle>
            <BsCreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Total de tarjetas vigentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Límite Total</CardTitle>
            <BsWallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$85,000</div>
            <p className="text-xs text-muted-foreground">Límite de crédito disponible</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consumo del Mes</CardTitle>
            <BsGraphUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">Gastos del mes actual</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mis Tarjetas</CardTitle>
            <CardDescription>Lista de tarjetas registradas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Visa Gold ****0002</p>
                <p className="text-sm text-muted-foreground">Límite: $50,000 | Disponible: $37,550</p>
              </div>
              <Badge variant="secondary">Activa</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">MasterCard Platinum ****0223</p>
                <p className="text-sm text-muted-foreground">Límite: $35,000 | Disponible: $22,550</p>
              </div>
              <Badge variant="secondary">Activa</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Servicios de Tarjetas</CardTitle>
            <CardDescription>Operaciones disponibles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start">
              <BsCreditCard className="mr-2 h-4 w-4" />
              Solicitar Nueva Tarjeta
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BsGraphUp className="mr-2 h-4 w-4" />
              Ver Movimientos
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BsWallet className="mr-2 h-4 w-4" />
              Pagar Tarjeta
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
