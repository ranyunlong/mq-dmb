import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MoreHorizontal, 
  Search, 
  UserPlus, 
  Filter,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 mins ago",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Editor",
    status: "Inactive",
    lastActive: "5 hours ago",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Viewer",
    status: "Active",
    lastActive: "1 day ago",
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Admin",
    status: "Pending",
    lastActive: "Never",
  },
  {
    id: "5",
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "Editor",
    status: "Active",
    lastActive: "10 mins ago",
  },
];

import { useTranslation } from "react-i18next";

export function UserManagement() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">{t("Users")}</h1>
          <p className="text-muted-foreground">
            {t("Manage team")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {t("Export")}
          </Button>
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            {t("Add User")}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("Search")}
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">{t("User")}</TableHead>
              <TableHead>{t("Role")}</TableHead>
              <TableHead>{t("Status")}</TableHead>
              <TableHead>{t("Last Active")}</TableHead>
              <TableHead className="text-right">{t("Actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://picsum.photos/seed/${user.id}/40/40`} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs text-muted-foreground font-normal">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{t(user.role)}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      user.status === "Active" ? "default" : 
                      user.status === "Pending" ? "secondary" : "outline"
                    }
                  >
                    {t(user.status)}
                  </Badge>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">{t("Open menu")}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>
                      <DropdownMenuItem>{t("Edit")}</DropdownMenuItem>
                      <DropdownMenuItem>{t("View permissions")}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        {t("Delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
