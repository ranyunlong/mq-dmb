import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Shield, 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit,
  Lock,
  UserCheck,
  Settings,
  Monitor,
  Building,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem?: boolean;
}

const permissions: Permission[] = [
  { id: "user_view", name: "View Users", description: "Can view user list", module: "User Management" },
  { id: "user_edit", name: "Edit Users", description: "Can create and edit users", module: "User Management" },
  { id: "role_manage", name: "Manage Roles", description: "Can manage roles and permissions", module: "Role Management" },
  { id: "tenant_manage", name: "Manage Tenants", description: "Can manage tenant information", module: "Tenant Management" },
  { id: "device_view", name: "View Devices", description: "Can view device list", module: "Device Management" },
  { id: "device_control", name: "Control Devices", description: "Can perform remote control actions", module: "Device Management" },
  { id: "org_manage", name: "Manage Organization", description: "Can manage organization structure", module: "Organization" },
];

const initialRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full access to all system features",
    permissions: permissions.map(p => p.id),
    userCount: 2,
    isSystem: true,
  },
  {
    id: "2",
    name: "Tenant Admin",
    description: "Manage users and devices within the tenant",
    permissions: ["user_view", "user_edit", "device_view", "device_control", "org_manage"],
    userCount: 5,
  },
  {
    id: "3",
    name: "Operator",
    description: "Monitor and control devices",
    permissions: ["device_view", "device_control"],
    userCount: 12,
  },
  {
    id: "4",
    name: "Viewer",
    description: "Read-only access to devices and reports",
    permissions: ["device_view"],
    userCount: 20,
  },
];

export function RoleManagement() {
  const { t } = useTranslation();
  const [roles, setRoles] = React.useState<Role[]>(initialRoles);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingRole, setEditingRole] = React.useState<Role | null>(null);
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      setFormData({
        name: role.name,
        description: role.description,
        permissions: role.permissions,
      });
    } else {
      setEditingRole(null);
      setFormData({
        name: "",
        description: "",
        permissions: [],
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveRole = () => {
    if (editingRole) {
      setRoles(roles.map(r => r.id === editingRole.id ? { ...r, ...formData } : r));
    } else {
      const newRole: Role = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        userCount: 0,
      };
      setRoles([...roles, newRole]);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter(r => r.id !== id));
  };

  const togglePermission = (permId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter(id => id !== permId)
        : [...prev.permissions, permId]
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("Role Management")}</h1>
          <p className="text-muted-foreground">
            {t("Define and manage roles and their associated permissions.")}
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" />
          {t("Create Role")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("Search roles...")}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Role Name")}</TableHead>
                <TableHead>{t("Description")}</TableHead>
                <TableHead>{t("Permissions")}</TableHead>
                <TableHead>{t("Users")}</TableHead>
                <TableHead className="text-right">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {t(role.name)}
                      {role.isSystem && (
                        <Badge variant="secondary" className="text-[10px] h-4 px-1">
                          <Lock className="h-2.5 w-2.5 mr-1" />
                          SYSTEM
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {t(role.description)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-[10px]">
                        {role.permissions.length} {t("Permissions")}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                      {role.userCount}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={(props) => (
                        <Button {...props} variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      )} />
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenDialog(role)} className="gap-2">
                          <Edit className="h-4 w-4" /> {t("Edit")}
                        </DropdownMenuItem>
                        {!role.isSystem && (
                          <DropdownMenuItem 
                            onClick={() => handleDeleteRole(role.id)} 
                            className="gap-2 text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" /> {t("Delete")}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[98vw] lg:max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRole ? t("Edit Role") : t("Create Role")}</DialogTitle>
            <DialogDescription>
              {t("Configure the role name, description, and assign permissions.")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("Role Name")}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t("e.g. Administrator")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">{t("Description")}</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t("Describe the responsibilities of this role")}
              />
            </div>
            <div className="grid gap-4">
              <Label>{t("Permissions")}</Label>
              <div className="grid gap-4 border rounded-lg p-4">
                {Array.from(new Set(permissions.map(p => p.module))).map(module => (
                  <div key={module} className="space-y-3">
                    <h4 className="text-sm font-semibold flex items-center gap-2 text-primary">
                      {module === "User Management" && <Users className="h-4 w-4" />}
                      {module === "Role Management" && <Shield className="h-4 w-4" />}
                      {module === "Tenant Management" && <Building className="h-4 w-4" />}
                      {module === "Device Management" && <Monitor className="h-4 w-4" />}
                      {module === "Organization" && <Settings className="h-4 w-4" />}
                      {t(module)}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {permissions.filter(p => p.module === module).map(perm => (
                        <div key={perm.id} className="flex items-start space-x-3 space-y-0">
                          <Checkbox 
                            id={perm.id} 
                            checked={formData.permissions.includes(perm.id)}
                            onCheckedChange={() => togglePermission(perm.id)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor={perm.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {t(perm.name)}
                            </label>
                            <p className="text-xs text-muted-foreground">
                              {t(perm.description)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t("Cancel")}</Button>
            <Button onClick={handleSaveRole}>{t("Save Changes")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
