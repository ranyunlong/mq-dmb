import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Mail,
  Lock
} from "lucide-react";

import { useTranslation } from "react-i18next";

export function Settings() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">{t("Settings")}</h1>
        <p className="text-muted-foreground">
          {t("Manage your account settings and set e-mail preferences.")}
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {t("Profile")}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            {t("Notifications")}
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t("Security")}
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {t("Account")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("Profile Information")}</CardTitle>
              <CardDescription>
                {t("Update your account's profile information and email address.")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">{t("Name")}</label>
                <Input id="name" defaultValue="Leo Lee" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">{t("Email")}</label>
                <Input id="email" defaultValue="mqleolee@gmail.com" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="bio" className="text-sm font-medium">{t("Bio")}</label>
                <textarea 
                  id="bio" 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t("Tell us a bit about yourself")}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>{t("Save Changes")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("Security Settings")}</CardTitle>
              <CardDescription>
                {t("Manage your password and security preferences.")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span className="font-medium">{t("Change Password")}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t("Update your password to keep your account secure.")}
                  </span>
                </div>
                <Button variant="outline">{t("Update")}</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">{t("Two-Factor Authentication")}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t("Add an extra layer of security to your account.")}
                  </span>
                </div>
                <Button variant="outline">{t("Enable")}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
           <Card>
            <CardHeader>
              <CardTitle>{t("Notification Preferences")}</CardTitle>
              <CardDescription>
                {t("Choose how you want to be notified.")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                 <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">{t("Email Notifications")}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {t("Receive updates and alerts via email.")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
