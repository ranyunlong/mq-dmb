import {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
  Bell,
  LogOut,
  ChevronsUpDown,
  Building2,
  Plus,
  CreditCard,
  Building,
  ShoppingCart,
  Network,
  Monitor,
  FolderTree,
  Package,
  Layout,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Roles",
    url: "/roles",
    icon: Shield,
  },
  {
    title: "Tenant Management",
    url: "/tenants",
    icon: Building,
  },
  {
    title: "Pricing Plans",
    url: "/pricing",
    icon: CreditCard,
  },
  {
    title: "Plan Purchase",
    url: "/purchase",
    icon: ShoppingCart,
  },
  {
    title: "Organization",
    url: "/organization",
    icon: Network,
  },
  {
    title: "Device Management",
    url: "/devices",
    icon: Monitor,
  },
  {
    title: "File Management",
    url: "/files",
    icon: FolderTree,
  },
  {
    title: "SKU Management",
    url: "/skus",
    icon: Package,
  },
  {
    title: "Media Content",
    url: "/media-content",
    icon: Layout,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const tenants = [
  {
    id: "1",
    name: "Acme Corp",
    logo: Building2,
    plan: "Enterprise",
  },
  {
    id: "2",
    name: "Globex Ltd",
    logo: Building2,
    plan: "Pro",
  },
  {
    id: "3",
    name: "Soylent Inc",
    logo: Building2,
    plan: "Free",
  },
];

import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeTenant, setActiveTenant] = React.useState(tenants[0]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 flex items-center justify-center border-b">
        <div className="flex items-center gap-2 px-4 w-full">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-semibold">AdminPro</span>
            <span className="text-xs text-muted-foreground">v1.0.0</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">{t("Main Menu")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={(props) => <Link {...props} to={item.url} />}
                    isActive={location.pathname === item.url}
                    tooltip={t(item.title)}
                  >
                    <item.icon />
                    <span>{t(item.title)}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">{t("Support")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={t("Notifications")}>
                  <Bell />
                  <span>{t("Notifications")}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={(props) => (
                  <SidebarMenuButton
                    {...props}
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <activeTenant.logo className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                      <span className="truncate font-semibold">
                        {activeTenant.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {t(activeTenant.plan)}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                )}
              />
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                align="start"
                side="right"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    {t("Tenants")}
                  </DropdownMenuLabel>
                  {tenants.map((tenant) => (
                    <DropdownMenuItem
                      key={tenant.name}
                      onClick={() => setActiveTenant(tenant)}
                      className="gap-2 p-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-sm border">
                        <tenant.logo className="size-4 shrink-0" />
                      </div>
                      {tenant.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">{t("Add tenant")}</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
