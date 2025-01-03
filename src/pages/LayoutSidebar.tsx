'use client'

import { Home, Apple, Book, Settings } from 'lucide-react'
import { ConsoleNavbar } from "@/components/consoleNav"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Apple, label: "Meal Planner", href: "/meal-planner" },
  { icon: Book, label: "Nutrition Guide", href: "/nutrition-guide" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export default function LayoutSidebar({
  children,
}: {
  children: React.ReactNode
}) {
  // const [sidebarOpen, setSidebarOpen] = useState(false)

  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <html lang="en">
      <body>
        <SidebarProvider defaultOpen={true}>
          <div className="flex h-screen">
            <Sidebar
              collapsible="icon"
            >
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                        <Apple className="ml-2 mr-2 h-5 w-5" />
                      <span className="font-semibold">Nutritional AI</span>

                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Menu</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {sidebarItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton asChild>
                            <a href={item.href}>
                              <item.icon className="mr-2 h-4 w-4" />
                              <span>{item.label}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <div className="flex flex-col flex-1 overflow-hidden">
              <ConsoleNavbar>
                <SidebarTrigger />
              </ConsoleNavbar>
              <main className="flex-1 overflow-y-auto p-4">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}

