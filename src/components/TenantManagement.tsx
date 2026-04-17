import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Building, MoreHorizontal, Power, PowerOff, CheckCircle2, Clock } from "lucide-react";

interface Tenant {
  id: string;
  name: string;
  domain: string;
  status: "enabled" | "disabled";
  isActivated: boolean;
  disableReason?: string;
  createdAt: string;
}

const initialTenants: Tenant[] = [
  { id: "1", name: "Acme Corp", domain: "acme.com", status: "enabled", isActivated: true, createdAt: "2024-01-01" },
  { id: "2", name: "Globex Ltd", domain: "globex.io", status: "disabled", isActivated: true, disableReason: "Overdue payment", createdAt: "2024-02-15" },
  { id: "3", name: "Soylent Inc", domain: "soylent.com", status: "enabled", isActivated: false, createdAt: "2024-03-10" },
];

export function TenantManagement() {
  const { t } = useTranslation();
  const [tenants, setTenants] = React.useState<Tenant[]>(initialTenants);
  const [selectedTenant, setSelectedTenant] = React.useState<Tenant | null>(null);
  const [reason, setReason] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleToggleStatus = (tenant: Tenant) => {
    if (tenant.status === "enabled") {
      setSelectedTenant(tenant);
      setReason("");
      setIsDialogOpen(true);
    } else {
      setTenants(tenants.map(t => 
        t.id === tenant.id ? { ...t, status: "enabled", disableReason: undefined } : t
      ));
    }
  };

  const handleToggleActivation = (tenant: Tenant) => {
    setTenants(tenants.map(t => 
      t.id === tenant.id ? { ...t, isActivated: !t.isActivated } : t
    ));
  };

  const confirmDisable = () => {
    if (selectedTenant) {
      setTenants(tenants.map(t => 
        t.id === selectedTenant.id ? { ...t, status: "disabled", disableReason: reason } : t
      ));
      setIsDialogOpen(false);
      setSelectedTenant(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">{t("Tenant Management")}</h1>
        <p className="text-muted-foreground">{t("Manage your platform tenants and their configurations.")}</p>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("Tenants")}</TableHead>
              <TableHead>{t("Domain")}</TableHead>
              <TableHead>{t("Activation Status")}</TableHead>
              <TableHead>{t("Status")}</TableHead>
              <TableHead>{t("Reason")}</TableHead>
              <TableHead className="text-right">{t("Actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    {tenant.name}
                  </div>
                </TableCell>
                <TableCell>{tenant.domain}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {tenant.isActivated ? (
                      <Badge variant="outline" className="gap-1 border-green-500 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-3 w-3" />
                        {t("Activated")}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1 border-amber-500 text-amber-600 dark:text-amber-400">
                        <Clock className="h-3 w-3" />
                        {t("Pending Activation")}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={tenant.status === "enabled" ? "default" : "destructive"}>
                    {tenant.status === "enabled" ? t("Enabled") : t("Disabled")}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-muted-foreground italic">
                  {tenant.disableReason || "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleToggleActivation(tenant)}
                    >
                      {tenant.isActivated ? t("Disabled") : t("Activate")}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleToggleStatus(tenant)}
                    >
                      {tenant.status === "enabled" ? (
                        <><PowerOff className="h-4 w-4 text-destructive" /> {t("Disabled")}</>
                      ) : (
                        <><Power className="h-4 w-4 text-primary" /> {t("Enabled")}</>
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Disable Reason")}</DialogTitle>
            <DialogDescription>
              {t("Please provide a reason for disabling")} <strong>{selectedTenant?.name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">{t("Reason")}</Label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t("e.g. Violation of terms, Overdue payment...")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t("Cancel")}</Button>
            <Button variant="destructive" onClick={confirmDisable} disabled={!reason.trim()}>
              {t("Save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
