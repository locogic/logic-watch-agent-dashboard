import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/app-sidebar"
import { AppHeader } from "../components/app-header"
import { AppFooter } from "../components/app-footer"
import { HeroUIProvider } from "../components/heroui-provider"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <HeroUIProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <div className="flex min-h-screen flex-col">
                <AppHeader />
                <main className="flex-1">{children}</main>
                <AppFooter />
              </div>
            </SidebarInset>
          </SidebarProvider>
        </HeroUIProvider>
      </body>
    </html>
  )
}
