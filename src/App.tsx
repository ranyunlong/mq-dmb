import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { UserManagement } from "@/components/UserManagement";
import { Settings } from "@/components/Settings";
import { TenantManagement } from "@/components/TenantManagement";
import { PricingPlans } from "@/components/PricingPlans";
import { PlanPurchase } from "@/components/PlanPurchase";
import { OrganizationManagement } from "@/components/OrganizationManagement";
import { DeviceManagement } from "@/components/DeviceManagement";
import { RoleManagement } from "@/components/RoleManagement";
import { FileManager } from "@/components/FileManager";
import { AssetDesign } from "@/components/AssetDesign";
import { SkuManagement } from "@/components/SkuManagement";
import { MediaManagement } from "@/components/MediaManagement";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Search, Bell, User, Languages, Moon, Sun, Monitor } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { t, i18n } = useTranslation();
  const { setTheme } = useTheme();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background/95 px-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("Search")}
            className="w-[200px] lg:w-[300px] pl-8 bg-muted/50 border-none h-9"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger render={(props) => (
            <Button {...props} variant="ghost" size="icon">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">{t("Theme")}</span>
            </Button>
          )} />
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2">
              <Sun className="h-4 w-4" /> {t("Light")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2">
              <Moon className="h-4 w-4" /> {t("Dark")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="gap-2">
              <Monitor className="h-4 w-4" /> {t("System")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" onClick={toggleLanguage} title={t("Language")}>
          <Languages className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-primary" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="admin-theme">
      <TooltipProvider>
        <Router>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <SidebarInset>
                <Header />
                <main className="flex-1 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/tenants" element={<TenantManagement />} />
                    <Route path="/pricing" element={<PricingPlans />} />
                    <Route path="/purchase" element={<PlanPurchase />} />
                    <Route path="/organization" element={<OrganizationManagement />} />
                    <Route path="/devices" element={<DeviceManagement />} />
                    <Route path="/roles" element={<RoleManagement />} />
                    <Route path="/files" element={<FileManager />} />
                    <Route path="/asset-design" element={<AssetDesign />} />
                    <Route path="/skus" element={<SkuManagement />} />
                    <Route path="/media-content" element={<MediaManagement />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Dashboard />} />
                  </Routes>
                </main>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </Router>
      </TooltipProvider>
    </ThemeProvider>
  );
}
