import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  ChevronRight, 
  ChevronDown, 
  Users, 
  User as UserIcon, 
  Trash2, 
  Edit2,
  FolderTree,
  Building
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Department {
  id: string;
  name: string;
  code: string;
  type: "tenant" | "country" | "region" | "store" | "other";
  manager: string;
  parentId: string | null;
  children?: Department[];
}

const initialData: Department[] = [
  {
    id: "1",
    name: "Acme Corp (Tenant)",
    code: "TEN-001",
    type: "tenant",
    manager: "John Doe",
    parentId: null,
    children: [
      {
        id: "2",
        name: "China Division",
        code: "CN-01",
        type: "country",
        manager: "Alice Smith",
        parentId: "1",
        children: [
          {
            id: "4",
            name: "East China Region",
            code: "CN-EC-01",
            type: "region",
            manager: "Bob Wilson",
            parentId: "2",
            children: [
              {
                id: "7",
                name: "Shanghai Flagship Store",
                code: "SH-FS-01",
                type: "store",
                manager: "Grace Hopper",
                parentId: "4",
              }
            ]
          },
        ],
      },
      {
        id: "3",
        name: "USA Division",
        code: "US-01",
        type: "country",
        manager: "David Lee",
        parentId: "1",
      },
    ],
  },
];

export function OrganizationManagement() {
  const { t } = useTranslation();
  const [data, setData] = React.useState<Department[]>(initialData);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set(["1", "2", "4"]));
  
  const [newDept, setNewDept] = React.useState({
    name: "",
    code: "",
    type: "other" as Department["type"],
    manager: "",
    parentId: ""
  });

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const getAllDepartments = (depts: Department[]): { id: string, name: string }[] => {
    let list: { id: string, name: string }[] = [];
    depts.forEach(d => {
      list.push({ id: d.id, name: d.name });
      if (d.children) {
        list = [...list, ...getAllDepartments(d.children)];
      }
    });
    return list;
  };

  const allDepts = getAllDepartments(data);

  const handleAddDepartment = () => {
    console.log("Adding department:", newDept);
    setIsAddDialogOpen(false);
    setNewDept({ name: "", code: "", type: "other", manager: "", parentId: "" });
  };

  const getTypeBadge = (type: Department["type"]) => {
    switch (type) {
      case "tenant": return <Badge variant="default" className="bg-slate-700 hover:bg-slate-800">{t("Tenant")}</Badge>;
      case "country": return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">{t("Country")}</Badge>;
      case "region": return <Badge variant="default" className="bg-purple-500 hover:bg-purple-600">{t("Region")}</Badge>;
      case "store": return <Badge variant="default" className="bg-green-500 hover:bg-green-600">{t("Store")}</Badge>;
      default: return null;
    }
  };

  const renderDepartment = (dept: Department, level: number = 0) => {
    const isExpanded = expandedIds.has(dept.id);
    const hasChildren = dept.children && dept.children.length > 0;

    return (
      <div key={dept.id} className="flex flex-col">
        <div 
          className={`group flex items-center py-2 px-3 rounded-lg hover:bg-accent transition-colors cursor-pointer ${level === 0 ? 'bg-muted font-semibold border-l-4 border-primary' : ''}`}
          style={{ marginLeft: `${level * 24}px` }}
          onClick={() => hasChildren && toggleExpand(dept.id)}
        >
          <div className="flex items-center gap-2 flex-1">
            {hasChildren ? (
              isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />
            ) : (
              <div className="w-4" />
            )}
            {dept.type === "tenant" ? (
              <Building className="h-4 w-4 text-primary" />
            ) : (
              <FolderTree className={`h-4 w-4 ${level === 0 ? 'text-primary' : 'text-muted-foreground'}`} />
            )}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span>{dept.name}</span>
                <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                  {dept.code}
                </span>
                {getTypeBadge(dept.type)}
              </div>
            </div>
            <Badge variant="outline" className="ml-auto font-normal text-xs gap-1">
              <UserIcon className="h-3 w-3" />
              {dept.manager}
            </Badge>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="flex flex-col">
            {dept.children!.map(child => renderDepartment(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">{t("Organization Management")}</h1>
          <p className="text-muted-foreground">{t("Manage your organization hierarchy starting from the Tenant level.")}</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t("Add Department")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("Add Department")}</DialogTitle>
              <DialogDescription>{t("Create a new department in your organization tree.")}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">{t("Department Name")}</Label>
                  <Input 
                    id="name" 
                    value={newDept.name} 
                    onChange={(e) => setNewDept({...newDept, name: e.target.value})}
                    placeholder={t("e.g. Engineering")} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">{t("Code")}</Label>
                  <Input 
                    id="code" 
                    value={newDept.code} 
                    onChange={(e) => setNewDept({...newDept, code: e.target.value})}
                    placeholder={t("e.g. DEPT-001")} 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">{t("Type")}</Label>
                  <Select 
                    value={newDept.type} 
                    onValueChange={(val: Department["type"]) => setNewDept({...newDept, type: val})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="other">{t("Other")}</SelectItem>
                      <SelectItem value="country">{t("Country")}</SelectItem>
                      <SelectItem value="region">{t("Region")}</SelectItem>
                      <SelectItem value="store">{t("Store")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="manager">{t("Manager")}</Label>
                  <Input 
                    id="manager" 
                    value={newDept.manager} 
                    onChange={(e) => setNewDept({...newDept, manager: e.target.value})}
                    placeholder={t("e.g. Jane Smith")} 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="parent">{t("Parent Department")}</Label>
                <Select 
                  value={newDept.parentId} 
                  onValueChange={(val) => setNewDept({...newDept, parentId: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("Tenant")} />
                  </SelectTrigger>
                  <SelectContent>
                    {allDepts.map(d => (
                      <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>{t("Cancel")}</Button>
              <Button onClick={handleAddDepartment}>{t("Save")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {t("Organization Structure")}
            </CardTitle>
            <CardDescription>{t("Hierarchical view of your departments.")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1 border rounded-lg p-2 bg-card/50">
              {data.map(dept => renderDepartment(dept))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("Quick Stats")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">{t("Total Departments")}</span>
              <span className="text-xl font-bold">{allDepts.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">{t("Total Employees")}</span>
              <span className="text-xl font-bold">128</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">{t("Avg. Dept Size")}</span>
              <span className="text-xl font-bold">21</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
