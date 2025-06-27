import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, Calendar, Edit } from "lucide-react"

export default function PerfilUsuarioPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Perfil de Usuario</h1>
        <p className="text-muted-foreground">Gestiona tu información personal y configuración de cuenta</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Usuario" />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Miembro desde Enero 2020</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">john@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Ciudad de México, México</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Nacimiento: 15/03/1985</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Actualiza tu información de contacto y datos personales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                <Input id="birthDate" type="date" defaultValue="1985-03-15" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" defaultValue="123 Main St, Ciudad de México, México" />
            </div>
            <div className="flex gap-2">
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Actualizar Perfil
              </Button>
              <Button variant="outline">Cambiar Contraseña</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Estado de la Cuenta</CardTitle>
            <CardDescription>Información sobre tu membresía y servicios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estado de Membresía</span>
              <Badge variant="secondary">Activo</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tipo de Cuenta</span>
              <Badge variant="outline">Premium</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Servicios Activos</span>
              <span className="text-sm">7 de 10</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Última Actividad</span>
              <span className="text-sm text-muted-foreground">Hace 2 horas</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuración de Privacidad</CardTitle>
            <CardDescription>Controla la visibilidad de tu información</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Perfil Público</span>
              <Badge variant="destructive">Privado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Notificaciones Email</span>
              <Badge variant="secondary">Habilitado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Notificaciones SMS</span>
              <Badge variant="outline">Deshabilitado</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Configurar Privacidad
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
