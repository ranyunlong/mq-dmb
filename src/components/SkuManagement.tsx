import * as React from "react";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import { 
  Package, 
  Plus, 
  Upload, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ChevronRight,
  Info,
  Check,
  X,
  Boxes,
  FileSpreadsheet,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SKU } from "@/types";
import { INITIAL_SKUS } from "@/constants";

export function SkuManagement() {
  const { t } = useTranslation();
  const [skus, setSkus] = React.useState<SKU[]>(INITIAL_SKUS);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // Dialog States
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = React.useState(false);
  const [editingSku, setEditingSku] = React.useState<SKU | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Form States
  const [formData, setFormData] = React.useState<Omit<SKU, 'id'>>({
    name: "",
    code: "",
    subSkuIds: []
  });
  const [importing, setImporting] = React.useState(false);

  const downloadTemplate = () => {
    const templateData = [
      { "Name": "Product Name (e.g. Cotton T-Shirt)", "Code": "Unique Code (e.g. SKU-001)", "SubSkuCodes": "Comma separated codes (e.g. PART-A,PART-B)" },
      { "Name": "Bundle Pack", "Code": "BUN-01", "SubSkuCodes": "SKU-001" }
    ];
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SKU Template");
    XLSX.writeFile(wb, "sku_import_template.xlsx");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws) as any[];

        const newSkus: SKU[] = [];
        data.forEach((item) => {
          if (!item.Name || !item.Code) return;
          
          const subSkuCodes = item.SubSkuCodes ? String(item.SubSkuCodes).split(",").map((s: string) => s.trim()) : [];
          
          newSkus.push({
            id: Math.random().toString(36).substr(2, 9),
            name: String(item.Name),
            code: String(item.Code),
            subSkuIds: skus.filter(s => subSkuCodes.includes(s.code)).map(s => s.id)
          });
        });

        if (newSkus.length > 0) {
          setSkus(prev => [...prev, ...newSkus]);
          setIsImportDialogOpen(false);
          alert(`Successfully imported ${newSkus.length} SKUs`);
        } else {
          alert("No valid data found in Excel file.");
        }
      } catch (error) {
        console.error(error);
        alert("Error parsing Excel file.");
      } finally {
        setImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsBinaryString(file);
  };
  const [subSkuSearchQuery, setSubSkuSearchQuery] = React.useState("");

  const filteredSkus = skus.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableSubSkus = skus
    .filter(s => s.id !== editingSku?.id)
    .filter(s => !formData.subSkuIds.includes(s.id))
    .filter(s => 
      s.name.toLowerCase().includes(subSkuSearchQuery.toLowerCase()) || 
      s.code.toLowerCase().includes(subSkuSearchQuery.toLowerCase())
    );

  const selectedSubSkus = skus.filter(s => formData.subSkuIds.includes(s.id));

  const handleOpenAdd = () => {
    setEditingSku(null);
    setFormData({ name: "", code: "", subSkuIds: [] });
    setSubSkuSearchQuery("");
    setIsAddDialogOpen(true);
  };

  const handleOpenEdit = (sku: SKU) => {
    setEditingSku(sku);
    setFormData({ name: sku.name, code: sku.code, subSkuIds: sku.subSkuIds });
    setSubSkuSearchQuery("");
    setIsAddDialogOpen(true);
  };

  const handleSave = () => {
    if (editingSku) {
      setSkus(skus.map(s => s.id === editingSku.id ? { ...s, ...formData } : s));
    } else {
      setSkus([...skus, { ...formData, id: Math.random().toString(36).substr(2, 9) }]);
    }
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setSkus(skus.filter(s => s.id !== id).map(s => ({
      ...s,
      subSkuIds: s.subSkuIds.filter(sid => sid !== id)
    })));
  };

  const toggleSubSku = (id: string) => {
    setFormData(prev => ({
      ...prev,
      subSkuIds: prev.subSkuIds.includes(id)
        ? prev.subSkuIds.filter(sid => sid !== id)
        : [...prev.subSkuIds, id]
    }));
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">{t("SKU Management")}</h1>
          <p className="text-muted-foreground">
            {t("Define and manage product SKUs and their hierarchical relationships.")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsImportDialogOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            {t("Batch Import")}
          </Button>
          <Button size="sm" onClick={handleOpenAdd}>
            <Plus className="mr-2 h-4 w-4" />
            {t("Add SKU")}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={t("Search by name or code...")}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">{t("Code")}</TableHead>
              <TableHead>{t("Name")}</TableHead>
              <TableHead>{t("Sub SKUs")}</TableHead>
              <TableHead className="text-right">{t("Actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSkus.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-3 py-12">
                    <div className="p-4 bg-muted rounded-full">
                      <Package className="h-10 w-10 text-muted-foreground/30" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-muted-foreground">{t("No SKUs found")}</p>
                      <p className="text-xs text-muted-foreground/60">{t("Try adjusting your search or add a new SKU.")}</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredSkus.map((sku) => (
                <TableRow key={sku.id}>
                  <TableCell className="font-mono font-medium">{sku.code}</TableCell>
                  <TableCell>{sku.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5">
                      {sku.subSkuIds.length > 0 ? (
                        sku.subSkuIds.map(sid => {
                          const sub = skus.find(s => s.id === sid);
                          return sub ? (
                            <Badge key={sid} variant="secondary" className="px-2 py-0 text-[10px] font-mono">
                              {sub.code}
                            </Badge>
                          ) : null;
                        })
                      ) : (
                        <span className="text-muted-foreground/40 italic">---</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={(props) => (
                        <Button {...props} variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">{t("Open menu")}</span>
                        </Button>
                      )} />
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2" onClick={() => handleOpenEdit(sku)}>
                          <Edit className="h-4 w-4" />
                          {t("Edit")}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(sku.id)}>
                          <Trash2 className="h-4 w-4" />
                          {t("Delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingSku ? t("Edit SKU") : t("Add SKU")}</DialogTitle>
            <DialogDescription>
              {t("Fill in the SKU details and select any component sub-SKUs.")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sku-name">{t("SKU Name")}</Label>
                <Input 
                  id="sku-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("e.g. Cotton T-Shirt")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sku-code">{t("SKU Code")}</Label>
                <Input 
                  id="sku-code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder={t("e.g. SKU-001")}
                  className="font-mono"
                />
              </div>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center justify-between border-b pb-2">
                <Label className="text-sm font-semibold">{t("Sub SKUs")}</Label>
                <Badge variant="secondary" className="font-normal text-[10px]">
                  {t("Selected")}: {formData.subSkuIds.length}
                </Badge>
              </div>

              {/* Sub-SKU Search and Add Area */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder={t("Search and add sub-SKUs...")}
                    className="pl-9 h-9 text-xs bg-muted/20"
                    value={subSkuSearchQuery}
                    onChange={(e) => setSubSkuSearchQuery(e.target.value)}
                  />
                </div>
                
                {subSkuSearchQuery && (
                  <div className="border rounded-md bg-background shadow-lg overflow-hidden max-h-[160px] flex flex-col">
                    <ScrollArea className="flex-1">
                      <div className="p-2 space-y-1">
                        {availableSubSkus.length === 0 ? (
                          <div className="p-4 text-center text-xs text-muted-foreground font-italic">
                            {t("No SKUs found matching search")}
                          </div>
                        ) : (
                          availableSubSkus.map(s => (
                            <div key={s.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors">
                              <div className="min-w-0 flex-1 pr-4">
                                <p className="text-[11px] font-mono font-bold leading-none">{s.code}</p>
                                <p className="text-[10px] text-muted-foreground truncate mt-0.5">{s.name}</p>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-6 px-2 text-[10px] gap-1 shrink-0" 
                                onClick={() => {
                                  toggleSubSku(s.id);
                                  setSubSkuSearchQuery("");
                                }}
                              >
                                <Plus className="h-3 w-3" />
                                {t("Add")}
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>

              {/* Selected List Area */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 mb-1">
                   <div className="h-px bg-muted flex-1" />
                   <span className="text-[10px] font-mono uppercase text-muted-foreground bg-background px-2">{t("Selected List")}</span>
                   <div className="h-px bg-muted flex-1" />
                </div>
                
                <div className="border rounded-md bg-muted/5">
                  <ScrollArea className={cn(selectedSubSkus.length > 0 ? "h-[180px]" : "h-[100px]")}>
                    <div className="p-3 space-y-2">
                      {selectedSubSkus.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-6 text-muted-foreground/30 gap-2">
                          <Info className="h-5 w-5" />
                          <p className="text-[10px] uppercase tracking-widest">{t("No sub-SKUs selected")}</p>
                        </div>
                      ) : (
                        selectedSubSkus.map(s => (
                          <div 
                            key={s.id}
                            className="flex items-center justify-between p-2 rounded-lg border bg-background shadow-sm group hover:border-destructive/30 transition-all"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-mono font-bold leading-none">{s.code}</p>
                              <p className="text-[10px] text-muted-foreground truncate mt-0.5">{s.name}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/5" 
                              onClick={() => toggleSubSku(s.id)}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>{t("Cancel")}</Button>
            <Button onClick={handleSave}>{t("Save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Batch Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              {t("Batch Import")}
            </DialogTitle>
            <DialogDescription>
              {t("Import Instructions")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 bg-muted/5 gap-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <FileSpreadsheet className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold">{t("Upload your spreadsheet")}</p>
                <p className="text-xs text-muted-foreground">{t("Supported format: .xlsx, .xls")}</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="gap-2 h-10" 
                  onClick={downloadTemplate}
                >
                  <Download className="h-4 w-4" />
                  {t("Download Template")}
                </Button>
                <Button 
                  className="gap-2 h-10 px-6 shadow-lg shadow-primary/20"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={importing}
                >
                  <Upload className="h-4 w-4" />
                  {importing ? t("Importing...") : t("Select File")}
                </Button>
              </div>
            </div>

            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 flex items-start gap-3">
              <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">{t("Integration Note")}</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed uppercase">
                  {t("Sub-SKUs are automatically linked if their unique identifies (Code) match existing database records. Invalid codes will be ignored.")}
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsImportDialogOpen(false)}>{t("Cancel")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const DropdownMenuSeparator = () => <div className="h-px bg-muted mx-1 my-1" />;
