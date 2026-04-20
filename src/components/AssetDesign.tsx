import * as React from "react";
import { useTranslation } from "react-i18next";
import { 
  Palette, 
  Image as ImageIcon, 
  Type, 
  Shapes, 
  Layers, 
  Save, 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut, 
  Download,
  ChevronLeft,
  ChevronRight,
  Settings,
  MousePointer2,
  Square,
  Circle,
  Hash,
  FileText,
  Cloud,
  Monitor,
  FileJson,
  Folder,
  ChevronDown,
  FolderTree,
  FolderPlus,
  CheckSquare,
  Grid,
  List as ListIcon,
  Trash2,
  Edit,
  MoreVertical,
  Plus,
  Boxes
} from "lucide-react";
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuSeparator, 
  ContextMenuTrigger 
} from "@/components/ui/context-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { INITIAL_SKUS } from "@/constants";

export function AssetDesign() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [zoom, setZoom] = React.useState(100);

  // Dialog states
  const [isSaveDialogOpen, setIsSaveDialogOpen] = React.useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState("untitled-design");
  const [selectedSkuId, setSelectedSkuId] = React.useState<string | undefined>(undefined);
  const [exportFormat, setExportFormat] = React.useState("png");
  const [exportTarget, setExportTarget] = React.useState<"local" | "cloud">("local");

  // Folder source of truth
  const [folders, setFolders] = React.useState([
    { id: "root", name: "Root", parentId: null },
    { id: "1", name: "Marketing Material", parentId: "root" },
    { id: "2", name: "Assets", parentId: "root" },
    { id: "8", name: "Internal", parentId: "1" },
  ]);

  // Folder selector state
  const [selectedFolderId, setSelectedFolderId] = React.useState("root");
  const [browsingFolderId, setBrowsingFolderId] = React.useState("root");
  const [pickerViewMode, setPickerViewMode] = React.useState<"list" | "grid">("grid");
  
  // Folder action dialogs
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = React.useState(false);
  const [isRenameFolderDialogOpen, setIsRenameFolderDialogOpen] = React.useState(false);
  const [folderToRename, setFolderToRename] = React.useState<{ id: string, name: string } | null>(null);
  const [newFolderName, setNewFolderName] = React.useState("");

  const subFolders = folders.filter(f => f.parentId === browsingFolderId);

  const breadcrumbs = React.useMemo(() => {
    const crumbs = [];
    let currId: string | null = browsingFolderId;
    while (currId) {
      const folder = folders.find(f => f.id === currId);
      if (folder) {
        crumbs.unshift(folder);
        currId = folder.parentId;
      } else {
        break;
      }
    }
    return crumbs;
  }, [browsingFolderId, folders]);

  const handleSave = () => {
    // Mimic saving logic
    console.log(`Saving ${fileName}.design to folder ${selectedFolderId}... Bound to SKU: ${selectedSkuId || 'None'}`);
    setIsSaveDialogOpen(false);
  };

  const handleExport = () => {
    // Mimic export logic
    const targetPath = exportTarget === "cloud" ? `folder ${selectedFolderId}` : "local storage";
    console.log(`Exporting ${fileName}.${exportFormat} to ${targetPath}...`);
    setIsExportDialogOpen(false);
  };

  const openExportDialog = (target: "local" | "cloud") => {
    setExportTarget(target);
    setIsExportDialogOpen(true);
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    const newFolder = {
      id: Math.random().toString(36).substr(2, 9),
      name: newFolderName.trim(),
      parentId: browsingFolderId
    };
    setFolders([...folders, newFolder]);
    setNewFolderName("");
    setIsNewFolderDialogOpen(false);
  };

  const handleRenameFolder = () => {
    if (!folderToRename || !newFolderName.trim()) return;
    setFolders(folders.map(f => 
      f.id === folderToRename.id ? { ...f, name: newFolderName.trim() } : f
    ));
    setFolderToRename(null);
    setNewFolderName("");
    setIsRenameFolderDialogOpen(false);
  };

  const handleDeleteFolder = (id: string) => {
    // Recursive delete or just single
    setFolders(folders.filter(f => f.id !== id));
    if (selectedFolderId === id) setSelectedFolderId("root");
    if (browsingFolderId === id) setBrowsingFolderId("root");
  };

  const FolderPicker = () => (
    <div className="border rounded-lg overflow-hidden flex flex-col bg-muted/20">
      <div className="px-3 py-2 border-b bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[11px] font-medium overflow-x-auto whitespace-nowrap scrollbar-hide flex-1">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.id}>
              {idx > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/50 shrink-0" />}
              <button
                onClick={() => setBrowsingFolderId(crumb.id)}
                className="hover:text-primary transition-colors hover:underline px-1"
              >
                {idx === 0 ? <FolderTree className="h-3.5 w-3.5" /> : crumb.name}
              </button>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-1 border-l pl-2 ml-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => setIsNewFolderDialogOpen(true)}
          >
            <FolderPlus className="h-3.5 w-3.5" />
          </Button>
          <div className="w-[1px] h-3 bg-border mx-1" />
          <Button 
            variant={pickerViewMode === "list" ? "secondary" : "ghost"} 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => setPickerViewMode("list")}
          >
            <ListIcon className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant={pickerViewMode === "grid" ? "secondary" : "ghost"} 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => setPickerViewMode("grid")}
          >
            <Grid className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[220px]">
        <div className={cn("p-2", pickerViewMode === "grid" ? "grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2" : "space-y-0.5")}>
          {subFolders.length === 0 ? (
            <div className={cn(
              "flex flex-col items-center justify-center text-muted-foreground/40 gap-2",
              pickerViewMode === "grid" ? "col-span-full h-[200px]" : "h-[200px]"
            )}>
              <FolderPlus className="h-8 w-8 opacity-20" />
              <span className="text-[10px] uppercase tracking-wider">{t("No subfolders")}</span>
            </div>
          ) : (
            subFolders.map(folder => (
              <React.Fragment key={folder.id}>
                <ContextMenu>
                  <ContextMenuTrigger render={(props) => (
                    <div
                      {...props}
                      className={cn(
                        "transition-colors cursor-pointer group relative",
                        pickerViewMode === "grid" 
                          ? "flex flex-col items-center p-3 rounded-lg border bg-background/50 hover:border-primary/50" 
                          : "flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted",
                        selectedFolderId === folder.id && (pickerViewMode === "grid" ? "border-primary bg-primary/5" : "bg-primary/10")
                      )}
                      onClick={() => setSelectedFolderId(folder.id)}
                      onDoubleClick={() => setBrowsingFolderId(folder.id)}
                    >
                      <div className={cn(
                        "flex items-center overflow-hidden w-full",
                        pickerViewMode === "grid" ? "flex-col gap-2 text-center" : "gap-3"
                      )}>
                        <Folder className={cn(
                          pickerViewMode === "grid" ? "h-10 w-10" : "h-4 w-4 shrink-0",
                          selectedFolderId === folder.id ? "text-primary fill-primary/20" : "text-muted-foreground group-hover:text-primary"
                        )} />
                        <span className={cn(
                          "truncate font-medium",
                          pickerViewMode === "grid" ? "text-xs w-full" : "text-sm",
                          selectedFolderId === folder.id ? "text-primary font-bold" : "text-foreground"
                        )}>{folder.name}</span>
                      </div>
                      
                      {pickerViewMode === "list" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            setBrowsingFolderId(folder.id);
                          }}
                        >
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  )} />
                <ContextMenuContent className="w-40">
                  <ContextMenuItem className="gap-2" onClick={() => {
                    setBrowsingFolderId(folder.id);
                    setSelectedFolderId(folder.id);
                  }}>
                    <FolderTree className="h-4 w-4" />
                    <span>{t("Browse")}</span>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem className="gap-2" onClick={() => {
                    setFolderToRename(folder);
                    setNewFolderName(folder.name);
                    setIsRenameFolderDialogOpen(true);
                  }}>
                    <Edit className="h-4 w-4" />
                    <span>{t("Rename")}</span>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive" className="gap-2" onClick={() => handleDeleteFolder(folder.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span>{t("Delete")}</span>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </React.Fragment>
          ))
          )}
        </div>
      </ScrollArea>
      
      <div className="px-3 py-2 border-t bg-muted/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">{t("Selected")}:</span>
          <span className="text-xs font-semibold text-primary truncate max-w-[200px]">
             {folders.find(f => f.id === selectedFolderId)?.name || "/"}
          </span>
        </div>
        {browsingFolderId !== selectedFolderId && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-[10px] gap-1 px-2 font-bold"
            onClick={() => setSelectedFolderId(browsingFolderId)}
          >
            <CheckSquare className="h-3 w-3" />
            {t("Select Current")}
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-muted/40 font-sans">
      {/* Top Toolbar */}
      <div className="h-14 border-b bg-background flex items-center justify-between px-4 shrink-0 shadow-sm relative z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2 shrink-0 hover:bg-muted font-medium">
            <ChevronLeft className="h-4 w-4" />
            {t("Back")}
          </Button>

          <div className="h-4 w-[1px] bg-border mx-1" />

          {/* File Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1 px-3 font-medium hover:bg-muted")}>
              {t("File")}
              <ChevronDown className="h-3 w-3 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem className="gap-2">
                <Plus className="h-4 w-4" />
                <span>{t("New Design")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2" onClick={() => setIsSaveDialogOpen(true)}>
                <Save className="h-4 w-4" />
                <span>{t("Save")}</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="gap-2">
                  <Download className="h-4 w-4" />
                  <span>{t("Export")}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem className="gap-2" onClick={() => openExportDialog("local")}>
                    <Monitor className="h-4 w-4" />
                    <span>{t("Export to Local")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2" onClick={() => openExportDialog("cloud")}>
                    <Cloud className="h-4 w-4" />
                    <span>{t("Export to Cloud")}</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <Settings className="h-4 w-4" />
                <span>{t("Config")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-4 w-[1px] bg-border mx-1 hidden sm:block" />

          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                  <Undo className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>{t("Undo")}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                  <Redo className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>{t("Redo")}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="h-4 w-[1px] bg-border mx-1 hidden sm:block" />
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom(Math.max(10, zoom - 10))}><ZoomOut className="h-3.5 w-3.5" /></Button>
            <span className="text-[11px] font-medium w-10 text-center">{zoom}%</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom(Math.min(400, zoom + 10))}><ZoomIn className="h-3.5 w-3.5" /></Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Tools */}
        <div className="w-16 md:w-20 border-r bg-background flex flex-col items-center py-4 gap-4 shrink-0">
          <TooltipProvider delay={0}>
            {[
              { icon: MousePointer2, label: "Select" },
              { icon: Shapes, label: "Shapes" },
              { icon: ImageIcon, label: "Image" },
              { icon: Type, label: "Text" },
              { icon: Palette, label: "Color" },
              { icon: Layers, label: "Layers" },
            ].map((tool, i) => (
              <Button key={i} variant={i === 0 ? "secondary" : "ghost"} size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-xl flex-col gap-1">
                <tool.icon className="h-5 w-5" />
                <span className="text-[9px] hidden md:block">{tool.label}</span>
              </Button>
            ))}
          </TooltipProvider>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-muted/20 pattern-grid-lg">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white shadow-2xl rounded-sm ring-1 ring-black/5"
            style={{ 
              width: `${(1080 * zoom) / 100}px`, 
              height: `${(1920 * zoom) / 100}px`,
              maxWidth: '90%',
              maxHeight: '90%'
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/20 italic select-none">
              <div className="text-center">
                <Palette className="h-16 w-16 mx-auto mb-4 opacity-10" />
                <p>{t("Canvas Area")}</p>
                <p className="text-xs not-italic mt-2">1080 x 1920 px</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar: Properties */}
        <div className="w-72 md:w-80 border-l bg-background flex flex-col shrink-0 hidden lg:flex">
          <Tabs defaultValue="properties" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start h-12 bg-transparent border-b rounded-none px-4 gap-4">
              <TabsTrigger value="properties" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0">{t("Properties")}</TabsTrigger>
              <TabsTrigger value="styles" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0">{t("Styles")}</TabsTrigger>
              <TabsTrigger value="config" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0">{t("Config")}</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="flex-1">
              <TabsContent value="properties" className="p-6 m-0 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold">{t("Dimensions")}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">W</Label>
                      <div className="relative">
                        <Input defaultValue="1080" className="h-9 pr-6" />
                        <span className="absolute right-2 top-2.5 text-[10px] text-muted-foreground uppercase">px</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">H</Label>
                      <div className="relative">
                        <Input defaultValue="1920" className="h-9 pr-6" />
                        <span className="absolute right-2 top-2.5 text-[10px] text-muted-foreground uppercase">px</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold">{t("Position")}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">X</Label>
                      <Input defaultValue="0" className="h-9" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Y</Label>
                      <Input defaultValue="0" className="h-9" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">{t("Opacity")}</h4>
                    <span className="text-xs font-mono">100%</span>
                  </div>
                  <Slider defaultValue={[100]} max={100} step={1} />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">{t("Lock Ratio")}</Label>
                      <p className="text-[10px] text-muted-foreground">{t("Maintain aspect ratio while resizing")}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">{t("Snap to Grid")}</Label>
                      <p className="text-[10px] text-muted-foreground">{t("Align elements to visual grid")}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent className="sm:max-w-[850px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Save className="h-5 w-5 text-primary" />
              {t("Save")}
            </DialogTitle>
            <DialogDescription>
              {t("Provide a name for your design. It will be saved as a .design file in your cloud directory.")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="save-filename" className="text-sm font-medium">
                {t("File Name")}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="save-filename"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="flex-1"
                />
                <span className="text-muted-foreground text-sm">.design</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku-binding" className="text-sm font-medium flex items-center gap-2">
                <Boxes className="h-4 w-4 text-muted-foreground" />
                {t("SKU")}
              </Label>
              <Select value={selectedSkuId || "none"} onValueChange={(val) => setSelectedSkuId(val === "none" ? undefined : val)}>
                <SelectTrigger id="sku-binding" className="w-full">
                  <SelectValue placeholder={t("Select a SKU")}>
                    {selectedSkuId && selectedSkuId !== "none" && (
                      <span className="font-mono font-bold text-primary">
                        {INITIAL_SKUS.find(s => s.id === selectedSkuId)?.code}
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" className="text-muted-foreground italic">{t("None")}</SelectItem>
                  {INITIAL_SKUS.map(sku => (
                    <SelectItem key={sku.id} value={sku.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary">{sku.code}</span>
                        <span className="text-xs opacity-60">- {sku.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 pt-2 border-t">
              <Label className="text-sm font-medium">
                {t("Location")}
              </Label>
              <FolderPicker />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
              {t("Cancel")}
            </Button>
            <Button onClick={handleSave}>
              {t("Save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-[850px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              {t("Export")}
            </DialogTitle>
            <DialogDescription>
              {t("Export your design as an image to your chosen destination.")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="export-filename" className="text-sm font-medium">
                {t("File Name")}
              </Label>
              <Input
                id="export-filename"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">{t("Format")}</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("Select format")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG Image</SelectItem>
                  <SelectItem value="jpg">JPG Image</SelectItem>
                  <SelectItem value="webp">WebP Image</SelectItem>
                  <SelectItem value="svg">SVG Vector</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {exportTarget === "cloud" && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("Location")}</Label>
                <FolderPicker />
              </div>
            )}

            <div className="p-3 bg-muted rounded-lg border flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase">{t("Destination")}</span>
              <div className="flex items-center gap-2 text-sm font-semibold">
                {exportTarget === "local" ? (
                  <>
                    <Monitor className="h-4 w-4" />
                    {t("Local")}
                  </>
                ) : (
                  <>
                    <Cloud className="h-4 w-4" />
                    {t("Cloud")}
                  </>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              {t("Cancel")}
            </Button>
            <Button onClick={handleExport}>
              {t("Export")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Folder Dialog */}
      <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
        <DialogContent className="sm:max-w-[325px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderPlus className="h-4 w-4 text-primary" />
              {t("New Folder")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="new-folder-name" className="text-xs font-medium">
                {t("Folder Name")}
              </Label>
              <Input
                id="new-folder-name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder={t("e.g. Assets")}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsNewFolderDialogOpen(false)}>
              {t("Cancel")}
            </Button>
            <Button size="sm" onClick={handleCreateFolder}>
              {t("Create")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Folder Dialog */}
      <Dialog open={isRenameFolderDialogOpen} onOpenChange={setIsRenameFolderDialogOpen}>
        <DialogContent className="sm:max-w-[325px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-4 w-4 text-primary" />
              {t("Rename Folder")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="rename-folder-name" className="text-xs font-medium">
                {t("New Name")}
              </Label>
              <Input
                id="rename-folder-name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsRenameFolderDialogOpen(false)}>
              {t("Cancel")}
            </Button>
            <Button size="sm" onClick={handleRenameFolder}>
              {t("Save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
