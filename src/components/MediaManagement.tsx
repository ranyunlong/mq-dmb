import * as React from "react";
import { useTranslation } from "react-i18next";
import { 
  Monitor, 
  Layout, 
  Play, 
  Image as ImageIcon, 
  Globe, 
  ChevronRight, 
  Folder, 
  Grid, 
  List as ListIcon, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  FolderPlus,
  ArrowLeft,
  ChevronDown,
  ExternalLink,
  Info,
  Clock,
  Maximize2
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MediaItem, MediaMode, ScreenOrientation, AspectRatio } from "@/types";
import { INITIAL_MEDIA_ITEMS } from "@/constants";

export function MediaManagement() {
  const { t } = useTranslation();
  const [items, setItems] = React.useState<MediaItem[]>(INITIAL_MEDIA_ITEMS);
  const [currentFolderId, setCurrentFolderId] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // Dialog States
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<MediaItem | null>(null);
  
  // Form States
  const [formData, setFormData] = React.useState<Partial<MediaItem>>({
    name: "",
    mode: "image",
    orientation: "landscape",
    aspectRatio: "16:9",
    designId: "",
  });
  const [folderName, setFolderName] = React.useState("");

  // Navigation
  const currentItems = items.filter(item => item.parentId === currentFolderId);
  const filteredItems = currentItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const breadcrumbs = React.useMemo(() => {
    const list: { id: string | null; name: string }[] = [{ id: null, name: t("Root") }];
    let tempId = currentFolderId;
    const path = [];
    while (tempId) {
      const folder = items.find(i => i.id === tempId && i.type === "folder");
      if (folder) {
        path.unshift({ id: folder.id, name: folder.name });
        tempId = folder.parentId;
      } else {
        tempId = null;
      }
    }
    return [...list, ...path];
  }, [currentFolderId, items, t]);

  const handleCreateContent = () => {
    const newItem: MediaItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || "Untitled Media",
      type: "content",
      mode: formData.mode as MediaMode,
      orientation: formData.orientation as ScreenOrientation,
      aspectRatio: formData.aspectRatio as AspectRatio,
      designId: formData.designId,
      parentId: currentFolderId,
      updatedAt: new Date().toISOString(),
    };
    setItems([...items, newItem]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleCreateFolder = () => {
    const newFolder: MediaItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: folderName || "New Folder",
      type: "folder",
      parentId: currentFolderId,
      updatedAt: new Date().toISOString(),
    };
    setItems([...items, newFolder]);
    setIsFolderDialogOpen(false);
    setFolderName("");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      mode: "image",
      orientation: "landscape",
      aspectRatio: "16:9",
      designId: "",
    });
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const getModeIcon = (mode?: MediaMode) => {
    switch (mode) {
      case "carousel": return <Layout className="h-4 w-4" />;
      case "video": return <Play className="h-4 w-4" />;
      case "image": return <ImageIcon className="h-4 w-4" />;
      case "webpage": return <Globe className="h-4 w-4" />;
      default: return <ImageIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">{t("Media Management")}</h1>
          <p className="text-muted-foreground">
            {t("Manage your immersive media content, carousels, and interactive layouts.")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsFolderDialogOpen(true)}>
            <FolderPlus className="mr-2 h-4 w-4" />
            {t("New Folder")}
          </Button>
          <Button size="sm" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("Create Content")}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <div className="flex items-center gap-1 text-sm bg-muted/40 p-1 rounded-md overflow-x-auto no-scrollbar whitespace-nowrap">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.id || "root"}>
                {idx > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />}
                <button 
                  onClick={() => setCurrentFolderId(crumb.id)}
                  className={cn(
                    "px-2 py-1 rounded hover:bg-muted transition-colors shrink-0",
                    currentFolderId === crumb.id ? "font-bold text-foreground" : "text-muted-foreground"
                  )}
                >
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t("Search media...")}
              className="pl-8 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center border rounded-md p-1 bg-muted/20">
            <Button 
              variant={viewMode === "grid" ? "secondary" : "ghost"} 
              size="icon" 
              className="h-7 w-7"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "secondary" : "ghost"} 
              size="icon" 
              className="h-7 w-7"
              onClick={() => setViewMode("list")}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className={cn(
                "group relative border rounded-xl overflow-hidden bg-card hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md",
                item.type === "folder" ? "p-4" : "p-0"
              )}
              onClick={() => item.type === "folder" && setCurrentFolderId(item.id)}
            >
              {item.type === "folder" ? (
                <div className="flex flex-col items-center justify-center gap-2 aspect-square">
                  <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                    <Folder className="h-10 w-10 text-primary" fill="currentColor" fillOpacity={0.1} />
                  </div>
                  <span className="font-medium text-sm text-center truncate w-full">{item.name}</span>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className={cn(
                    "aspect-video bg-muted flex items-center justify-center relative group-hover:bg-muted/80 transition-colors",
                    item.orientation === "portrait" && "aspect-[3/4]"
                  )}>
                    {getModeIcon(item.mode)}
                    <Badge className="absolute top-2 left-2 bg-background/80 text-foreground border-none hover:bg-background/80 backdrop-blur-sm text-[10px] px-1.5 h-4">
                      {item.mode?.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-xs truncate">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{item.aspectRatio} | {item.orientation}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger render={(props) => (
                          <Button {...props} variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        )} />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            {t("Edit")}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4" />
                            {t("Delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center gap-4 text-muted-foreground border-2 border-dashed rounded-xl bg-muted/5">
              <div className="p-4 bg-muted/20 rounded-full">
                <Monitor className="h-8 w-8 opacity-20" />
              </div>
              <p className="text-sm">{t("No items found in this folder")}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="border rounded-xl bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Name")}</TableHead>
                <TableHead>{t("Mode")}</TableHead>
                <TableHead>{t("Orientation")}</TableHead>
                <TableHead>{t("Aspect Ratio")}</TableHead>
                <TableHead>{t("Updated")}</TableHead>
                <TableHead className="text-right">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow 
                  key={item.id} 
                  className="cursor-pointer group"
                  onClick={() => item.type === "folder" && setCurrentFolderId(item.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.type === "folder" ? (
                        <Folder className="h-4 w-4 text-primary fill-primary/10" />
                      ) : (
                        getModeIcon(item.mode)
                      )}
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.type === "content" ? (
                      <Badge variant="secondary" className="font-normal capitalize text-[10px]">
                        {item.mode}
                      </Badge>
                    ) : "-"}
                  </TableCell>
                  <TableCell className="capitalize text-xs text-muted-foreground">
                    {item.type === "content" ? t(item.orientation!) : "-"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono">
                    {item.type === "content" ? item.aspectRatio : "-"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={(props) => (
                        <Button {...props} variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      )} />
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          {t("Edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
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
      )}

      {/* New Folder Dialog */}
      <Dialog open={isFolderDialogOpen} onOpenChange={setIsFolderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("Create Folder")}</DialogTitle>
            <DialogDescription>
              {t("Organize your media content with a virtual directory.")}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="folder-name">{t("Folder Name")}</Label>
            <Input 
              id="folder-name" 
              placeholder={t("e.g. Campaign Alpha")} 
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFolderDialogOpen(false)}>{t("Cancel")}</Button>
            <Button onClick={handleCreateFolder}>{t("Create")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Content Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
        setIsCreateDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("Create Media Content")}</DialogTitle>
            <DialogDescription>
              {t("Configure your media output properties and link a design.")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label htmlFor="media-name">{t("Content Name")}</Label>
              <Input 
                id="media-name" 
                placeholder={t("e.g. Interactive Storefront Window")}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>{t("Mode")}</Label>
                <Select 
                  value={formData.mode} 
                  onValueChange={(v) => setFormData({...formData, mode: v as MediaMode})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carousel">{t("Carousel")}</SelectItem>
                    <SelectItem value="video">{t("Video")}</SelectItem>
                    <SelectItem value="image">{t("Image")}</SelectItem>
                    <SelectItem value="webpage">{t("Webpage")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>{t("Orientation")}</Label>
                <Select 
                  value={formData.orientation}
                  onValueChange={(v) => setFormData({...formData, orientation: v as ScreenOrientation})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landscape">{t("Landscape")}</SelectItem>
                    <SelectItem value="portrait">{t("Portrait")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>{t("Display Ratio")}</Label>
                <Select 
                  value={formData.aspectRatio}
                  onValueChange={(v) => setFormData({...formData, aspectRatio: v as AspectRatio})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16:9">16:9</SelectItem>
                    <SelectItem value="4:3">4:3</SelectItem>
                    <SelectItem value="1:1">1:1</SelectItem>
                    <SelectItem value="9:16">9:16</SelectItem>
                    <SelectItem value="custom">{t("Custom")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>{t("Design Template")}</Label>
                <Select 
                  value={formData.designId}
                  onValueChange={(v) => setFormData({...formData, designId: v})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select .design file")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="design-1">Main_Billboard.design</SelectItem>
                    <SelectItem value="design-2">Retail_Display.design</SelectItem>
                    <SelectItem value="design-3">Social_Post_A.design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 bg-muted/40 rounded-lg flex items-start gap-3">
              <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-[10px] text-muted-foreground uppercase leading-relaxed font-medium">
                {t("Media content represents a published instance of a design with specific hardware constraints. Changing orientation may affect how the design is rendered on target devices.")}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>{t("Cancel")}</Button>
            <Button onClick={handleCreateContent}>{t("Create")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
