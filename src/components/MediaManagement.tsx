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
  Maximize2,
  Settings2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { MediaItem, MediaMode, ScreenOrientation, AspectRatio, MediaStatus } from "@/types";
import { INITIAL_MEDIA_ITEMS } from "@/constants";

export function MediaManagement() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [items, setItems] = React.useState<MediaItem[]>(INITIAL_MEDIA_ITEMS);
  const [currentFolderId, setCurrentFolderId] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // Dialog States
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = React.useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = React.useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [isLogsExpanded, setIsLogsExpanded] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<MediaItem | null>(null);
  const [selectedItem, setSelectedItem] = React.useState<MediaItem | null>(null);
  
  // Form States
  const [formData, setFormData] = React.useState<Partial<MediaItem>>({
    mode: "image",
    orientation: "landscape",
    aspectRatio: "16:9",
  });
  const [customWidth, setCustomWidth] = React.useState("");
  const [customHeight, setCustomHeight] = React.useState("");
  const [folderName, setFolderName] = React.useState("");
  const [tagInput, setTagInput] = React.useState("");

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
    const ratio = formData.aspectRatio === "custom" ? `${customWidth}:${customHeight}` : formData.aspectRatio;
    const searchParams = new URLSearchParams({
      mode: formData.mode || "image",
      orientation: formData.orientation || "landscape",
      ratio: ratio || "16:9",
      parentId: currentFolderId || "",
      tags: (formData.tags || []).join(",")
    });
    
    navigate(`/media-editor?${searchParams.toString()}`);
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
      mode: "image",
      orientation: "landscape",
      aspectRatio: "16:9",
      tags: [],
    });
    setCustomWidth("");
    setCustomHeight("");
    setTagInput("");
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
      case "video_editor": return <Clock className="h-4 w-4" />;
      default: return <ImageIcon className="h-4 w-4" />;
    }
  };

  const getStatusConfig = (status?: MediaStatus) => {
    switch (status) {
      case "processing":
        return {
          label: t("Processing"),
          icon: RefreshCw,
          color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
          animate: "animate-spin"
        };
      case "distributing":
        return {
          label: t("CDN Distributing"),
          icon: Zap,
          color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
          animate: "animate-pulse"
        };
      case "failed":
        return {
          label: t("Processing Failed"),
          icon: AlertCircle,
          color: "text-red-500 bg-red-500/10 border-red-500/20",
          animate: ""
        };
      case "published":
        return {
          label: t("Published"),
          icon: CheckCircle2,
          color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
          animate: ""
        };
      default:
        return null;
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter(t => t !== tag)
    });
  };

  const handleUpdateItemTags = (id: string, tags: string[]) => {
    setItems(items.map(item => item.id === id ? { ...item, tags } : item));
    if (selectedItem?.id === id) {
      setSelectedItem({ ...selectedItem, tags });
    }
  };

  const handleItemClick = (item: MediaItem) => {
    if (item.type === "folder") {
      setCurrentFolderId(item.id);
    } else {
      setSelectedItem(item);
      setIsDetailsDialogOpen(true);
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
              onClick={() => handleItemClick(item)}
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
                    {/* Mode Badge - Top Left */}
                    <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground border-none hover:bg-primary shadow-sm text-[9px] px-1.5 h-4 font-bold tracking-wider uppercase">
                      {item.mode}
                    </Badge>

                    {/* Status Badge - Bottom Right */}
                    {item.status && (
                      <div className={cn(
                        "absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded border backdrop-blur-md text-[8px] font-bold uppercase tracking-tight",
                        getStatusConfig(item.status)?.color
                      )}>
                        {React.createElement(getStatusConfig(item.status)!.icon, { 
                          className: cn("h-2.5 w-2.5", getStatusConfig(item.status)!.animate) 
                        })}
                        {getStatusConfig(item.status)?.label}
                      </div>
                    )}
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
                <TableHead>{t("Status")}</TableHead>
                <TableHead>{t("Updated")}</TableHead>
                <TableHead className="text-right">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow 
                  key={item.id} 
                  className="cursor-pointer group"
                  onClick={() => handleItemClick(item)}
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
                      <Badge variant="secondary" className="font-bold capitalize text-[10px] bg-primary/10 text-primary border-none">
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
                  <TableCell>
                    {item.type === "content" && item.status ? (
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold",
                        getStatusConfig(item.status)?.color
                      )}>
                        {React.createElement(getStatusConfig(item.status)!.icon, { 
                          className: cn("h-3 w-3", getStatusConfig(item.status)!.animate) 
                        })}
                        {getStatusConfig(item.status)?.label}
                      </div>
                    ) : "-"}
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

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={(open) => {
        setIsDetailsDialogOpen(open);
        if (!open) setIsLogsExpanded(false);
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              {t("Media Details")}
            </DialogTitle>
            <DialogDescription>
              {t("View complete configuration and publishing status for this media content.")}
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="grid gap-6 py-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 bg-muted/40 rounded-xl border">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">{t("Current Status")}</span>
                    <div className={cn(
                      "flex items-center gap-2 text-sm font-bold",
                      getStatusConfig(selectedItem.status)?.color.split(' ')[0]
                    )}>
                      {getStatusConfig(selectedItem.status) && React.createElement(getStatusConfig(selectedItem.status)!.icon, { 
                        className: cn("h-4 w-4", getStatusConfig(selectedItem.status)!.animate) 
                      })}
                      {getStatusConfig(selectedItem.status)?.label || t("Unknown")}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-wrap gap-1 max-w-[150px] justify-end">
                      {selectedItem.tags?.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[9px] h-4 bg-primary/10 text-primary border-none lowercase px-1.5 font-bold">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 gap-2 text-xs font-bold"
                      onClick={() => setIsLogsExpanded(!isLogsExpanded)}
                    >
                      <ChevronDown className={cn("h-3 w-3 transition-transform", isLogsExpanded && "rotate-180")} />
                      {t("Processing Log")}
                    </Button>
                    <Badge variant="outline" className="px-3 py-1 font-mono text-xs uppercase border-primary/20 text-primary">
                      {selectedItem.id}
                    </Badge>
                  </div>
                </div>

                {/* Collapsible Processing Logs */}
                <AnimatePresence>
                  {isLogsExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-xl border bg-muted/20 overflow-hidden">
                        <ScrollArea className="h-[120px] p-1">
                          <div className="p-3 space-y-2">
                            {selectedItem.logs && selectedItem.logs.length > 0 ? (
                              selectedItem.logs.map((log, idx) => (
                                <div key={idx} className="flex gap-3 text-[11px] leading-tight group">
                                  <span className="font-mono text-primary/60 shrink-0 select-none">[{log.timestamp}]</span>
                                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">{log.message}</span>
                                </div>
                              ))
                            ) : (
                              <div className="flex flex-col items-center justify-center py-6 text-muted-foreground opacity-50">
                                <Clock className="h-6 w-6 stroke-[1.5] mb-2" />
                                <p>{t("No logs recorded")}</p>
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 p-3 rounded-lg bg-card border shadow-sm">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("Mode")}</Label>
                  <div className="flex items-center gap-2 font-semibold capitalize text-sm">
                    {getModeIcon(selectedItem.mode)}
                    {selectedItem.mode}
                  </div>
                </div>
                <div className="space-y-1.5 p-3 rounded-lg bg-card border shadow-sm">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("Orientation")}</Label>
                  <div className="flex items-center gap-2 font-semibold capitalize text-sm">
                    <Maximize2 className={cn("h-4 w-4 text-primary", selectedItem.orientation === "landscape" && "rotate-90")} />
                    {t(selectedItem.orientation!)}
                  </div>
                </div>
                <div className="space-y-1.5 p-3 rounded-lg bg-card border shadow-sm">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("Aspect Ratio")}</Label>
                  <div className="flex items-center gap-2 font-semibold text-sm font-mono">
                    <Settings2 className="h-4 w-4 text-primary" />
                    {selectedItem.aspectRatio}
                  </div>
                </div>
                <div className="space-y-1.5 p-3 rounded-lg bg-card border shadow-sm">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("Updated At")}</Label>
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    {new Date(selectedItem.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Tags Section */}
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{t("Tags")}</Label>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-3 rounded-xl border bg-muted/20">
                  {selectedItem.tags && selectedItem.tags.length > 0 ? (
                    selectedItem.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1 py-1 hover:bg-destructive/10 hover:text-destructive cursor-pointer group" onClick={() => handleUpdateItemTags(selectedItem.id, selectedItem.tags!.filter(t => t !== tag))}>
                        {tag}
                        <Plus className="h-3 w-3 rotate-45" />
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground italic px-1">{t("No tags added")}</span>
                  )}
                  <div className="flex items-center gap-2 ml-auto">
                    <Input 
                      placeholder={t("Add tag...")} 
                      className="h-7 text-xs w-24"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleUpdateItemTags(selectedItem.id, [...(selectedItem.tags || []), tagInput.trim()]);
                          setTagInput("");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {selectedItem.status === "published" && (
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                      <Zap className="h-4 w-4" />
                      CDN Edge Link
                    </div>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[9px] uppercase">Active</Badge>
                  </div>
                  <div className="bg-white/50 p-2 rounded border border-emerald-500/10 flex items-center justify-between gap-2 overflow-hidden">
                    <code className="text-[10px] truncate text-muted-foreground">https://cdn.ais.immersive.com/v1/content/{selectedItem.id}</code>
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 hover:bg-emerald-500/10">
                      <ExternalLink className="h-3 w-3 text-emerald-600" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="sm:justify-between flex items-center">
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>{t("Close")}</Button>
            <div className="flex items-center gap-2">
              <Button variant="secondary" className="gap-2">
                <Edit className="h-4 w-4" />
                {t("Edit")}
              </Button>
              <Button 
                disabled={selectedItem?.status === "processing"} 
                className="gap-2"
                onClick={() => setIsPreviewOpen(true)}
              >
                <Play className="h-4 w-4" />
                {t("Preview")}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent 
          showCloseButton={false}
          className={cn(
            "p-0 overflow-hidden border-none bg-black/95",
            selectedItem?.orientation === "landscape" ? "sm:max-w-4xl" : "sm:max-w-md"
          )}
        >
          <div className="relative group">
            {selectedItem && (
              <div className={cn(
                "relative bg-black flex items-center justify-center",
                selectedItem.orientation === "landscape" ? "aspect-video" : "aspect-[9/16]"
              )}>
                {selectedItem.status === "published" ? (
                  <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${selectedItem.id}/1920/1080`} 
                      alt={selectedItem.name}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                      <div className="flex items-center gap-3">
                        {getModeIcon(selectedItem.mode)}
                        <h2 className="text-white text-xl font-bold">{selectedItem.name}</h2>
                      </div>
                      <p className="text-white/60 text-sm mt-1">{selectedItem.aspectRatio} | {selectedItem.orientation}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-white/40">
                    <div className="relative">
                      <Settings2 className="h-16 w-16 animate-spin duration-[3s]" />
                      <Clock className="h-6 w-6 absolute bottom-0 right-0 animate-pulse text-primary" />
                    </div>
                    <p className="font-bold tracking-widest uppercase text-xs">{t("Synthesizing Content...")}</p>
                  </div>
                )}
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-4 right-4 h-10 w-10 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md"
                  onClick={() => setIsPreviewOpen(false)}
                >
                  <Plus className="h-5 w-5 rotate-45" />
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

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
        <DialogContent className="sm:max-w-[660px]">
          <DialogHeader>
            <DialogTitle>{t("Create Media Content")}</DialogTitle>
            <DialogDescription>
              {t("Configure your media output properties and enter the design editor.")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-6 px-1">
            {/* Mode Selection */}
            <div className="grid gap-3">
              <Label className="text-sm font-semibold">{t("Mode")}</Label>
              <RadioGroup 
                value={formData.mode} 
                onValueChange={(v) => setFormData({...formData, mode: v as MediaMode})}
                className="flex flex-wrap gap-4"
              >
                {[
                  { id: "carousel", icon: Layout, label: "Carousel" },
                  { id: "video", icon: Play, label: "Video" },
                  { id: "image", icon: ImageIcon, label: "Image" },
                  { id: "video_editor", icon: Clock, label: "Video Editor" },
                  { id: "webpage", icon: Globe, label: "Webpage" }
                ].map((m) => (
                  <div key={m.id} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors w-[180px]">
                    <RadioGroupItem value={m.id} id={`mode-${m.id}`} />
                    <Label htmlFor={`mode-${m.id}`} className="flex-1 cursor-pointer flex items-center gap-2 text-xs font-semibold">
                      <m.icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="truncate">{t(m.label)}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Orientation Selection */}
            <div className="grid gap-3">
              <Label className="text-sm font-semibold">{t("Orientation")}</Label>
              <RadioGroup 
                value={formData.orientation} 
                onValueChange={(v) => setFormData({...formData, orientation: v as ScreenOrientation})}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors w-[180px]">
                  <RadioGroupItem value="landscape" id="orient-land" />
                  <Label htmlFor="orient-land" className="flex-1 cursor-pointer flex items-center gap-2 text-xs font-semibold">
                    <Maximize2 className="h-4 w-4 rotate-90 text-primary shrink-0" />
                    <span>{t("Landscape")}</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors w-[180px]">
                  <RadioGroupItem value="portrait" id="orient-port" />
                  <Label htmlFor="orient-port" className="flex-1 cursor-pointer flex items-center gap-2 text-xs font-semibold">
                    <Maximize2 className="h-4 w-4 text-primary shrink-0" />
                    <span>{t("Portrait")}</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Tags for Creation */}
            <div className="grid gap-3">
              <Label className="text-sm font-semibold">{t("Tags")}</Label>
              <div className="flex flex-wrap gap-2 min-h-[50px] p-4 rounded-xl border bg-muted/20">
                {formData.tags?.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1 py-1.5 px-3">
                    {tag}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 hover:bg-transparent" 
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <Plus className="h-3 w-3 rotate-45" />
                    </Button>
                  </Badge>
                ))}
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder={t("Add tag...")} 
                    className="h-9 w-32"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button variant="outline" size="sm" onClick={(e) => { e.preventDefault(); handleAddTag(); }}>{t("Add")}</Button>
                </div>
              </div>
            </div>

            {/* Ratio Selection */}
            <div className="grid gap-3">
              <Label className="text-sm font-semibold">{t("Display Ratio")}</Label>
              <div className="space-y-4">
                <RadioGroup 
                  value={formData.aspectRatio} 
                  onValueChange={(v) => setFormData({...formData, aspectRatio: v as AspectRatio})}
                  className="flex flex-wrap gap-4"
                >
                  {["16:9", "4:3", "1:1", "9:16", "21:9", "custom"].map((r) => (
                    <div key={r} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors w-[110px]">
                      <RadioGroupItem value={r} id={`ratio-${r}`} />
                      <Label htmlFor={`ratio-${r}`} className="flex-1 cursor-pointer text-xs font-semibold text-center">
                        {r === "custom" ? t("Custom") : r}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                {formData.aspectRatio === "custom" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 bg-muted/30 p-4 rounded-xl border border-dashed"
                  >
                    <div className="grid gap-1.5 flex-1">
                      <Label htmlFor="custom-width" className="text-[10px] uppercase font-bold text-muted-foreground">{t("Width")}</Label>
                      <Input 
                        id="custom-width"
                        placeholder="1920"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(e.target.value)}
                        className="h-9 font-mono"
                        type="number"
                      />
                    </div>
                    <div className="flex items-center mt-6 text-muted-foreground">
                      <span className="font-bold">:</span>
                    </div>
                    <div className="grid gap-1.5 flex-1">
                      <Label htmlFor="custom-height" className="text-[10px] uppercase font-bold text-muted-foreground">{t("Height")}</Label>
                      <Input 
                        id="custom-height"
                        placeholder="1080"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(e.target.value)}
                        className="h-9 font-mono"
                        type="number"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="p-4 bg-primary/5 rounded-lg flex items-start gap-3 border border-primary/10">
              <Settings2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-[10px] text-muted-foreground uppercase leading-relaxed font-medium tracking-wider">
                {t("Advanced design settings will be available in the next step. Orientation and ratio constraints will define your canvas size.")}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>{t("Cancel")}</Button>
            <Button onClick={handleCreateContent} className="px-8">{t("Create")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
