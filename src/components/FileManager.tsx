import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { 
  Folder, 
  File, 
  FileImage, 
  FileVideo, 
  FileAudio, 
  Search, 
  Upload, 
  Plus, 
  MoreVertical, 
  Download, 
  Trash2, 
  Share2,
  ChevronRight,
  FolderPlus,
  ArrowUp,
  Grid,
  List as ListIcon,
  Info,
  ExternalLink,
  ChevronLeft,
  Filter,
  RefreshCw,
  FolderTree,
  X,
  Copy,
  Scissors,
  ClipboardPaste,
  CheckSquare,
  Square,
  Palette,
  Boxes
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { FileItem, SKU } from "@/types";
import { INITIAL_SKUS } from "@/constants";

const mockFiles: FileItem[] = [
  { id: "1", name: "Marketing Material", type: "folder", updatedAt: "2024-04-16 10:00:00", owner: "Admin", parentId: null, tags: ["marketing", "2024"] },
  { id: "2", name: "Assets", type: "folder", updatedAt: "2024-04-15 14:20:00", owner: "System", parentId: null, tags: ["system"] },
  { 
    id: "3", 
    name: "Promo_2024_Spring.mp4", 
    type: "video", 
    size: 45000000, 
    updatedAt: "2024-04-16 09:15:00", 
    owner: "Marketing", 
    parentId: "1", 
    status: "approved",
    approver: "John Super",
    approvedAt: "2024-04-16 11:30:00",
    duration: "00:02:15",
    bitrate: "8 Mbps",
    fps: 24,
    codec: "H.264",
    tags: ["promo", "video", "spring"],
    skuId: "1"
  },
  { 
    id: "4", 
    name: "Landing_Page_Design.png", 
    type: "image", 
    size: 2400000, 
    updatedAt: "2024-04-14 11:30:00", 
    owner: "Designer", 
    parentId: "1", 
    status: "pending",
    tags: ["web", "design"],
    skuId: "3"
  },
  { 
    id: "7", 
    name: "Background_Track.wav", 
    type: "audio", 
    size: 8200000, 
    updatedAt: "2024-04-12 13:10:00", 
    owner: "Music Dept", 
    parentId: "1", 
    status: "rejected",
    approver: "Alice Admin",
    approvedAt: "2024-04-12 15:00:00",
    duration: "00:04:30",
    bitrate: "1411 kbps",
    codec: "PCM",
    tags: ["music", "background"]
  },
  { id: "8", name: "Internal", type: "folder", updatedAt: "2024-04-10 10:00:00", owner: "Admin", parentId: "1", tags: ["private"] },
  { 
    id: "9", 
    name: "New_Campaign_Shot.jpg", 
    type: "image", 
    size: 1200000, 
    updatedAt: "2024-04-17 10:00:00", 
    owner: "Marketing", 
    parentId: "1", 
    status: "uploading",
    tags: ["new", "campaign"]
  },
  { 
    id: "10", 
    name: "Corrupted_File.mp4", 
    type: "video", 
    size: 0, 
    updatedAt: "2024-04-17 10:05:00", 
    owner: "Admin", 
    parentId: null, 
    status: "failed",
    tags: ["error"]
  },
];

export function FileManager() {
  const { t } = useTranslation();
  const [currentFolderId, setCurrentFolderId] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterType, setFilterType] = React.useState<string>("all");
  const [filterOwner, setFilterOwner] = React.useState("");
  const [filterApprover, setFilterApprover] = React.useState("");
  const [filterTag, setFilterTag] = React.useState("");
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = React.useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = React.useState(false);
  const [stagedFiles, setStagedFiles] = React.useState<File[]>([]);
  const [uploadGlobalTags, setUploadGlobalTags] = React.useState<string[]>([]);
  const [newUploadTagInput, setNewUploadTagInput] = React.useState("");
  const [autoSubmitApproval, setAutoSubmitApproval] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [selectedFile, setSelectedFile] = React.useState<FileItem | null>(null);
  const [newTagInput, setNewTagInput] = React.useState("");
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState("");
  const [files, setFiles] = React.useState<FileItem[]>(mockFiles);
  const [clipboard, setClipboard] = React.useState<{ id: string[]; isCut: boolean } | null>(null);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  const formatFileSize = (bytes?: number) => {
    if (bytes === undefined) return "--";
    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const getFileIcon = (type: FileItem["type"]) => {
    switch (type) {
      case "folder": return <Folder className="h-4 w-4 text-blue-500 fill-blue-500/20" />;
      case "image": return <FileImage className="h-4 w-4 text-emerald-500" />;
      case "video": return <FileVideo className="h-4 w-4 text-purple-500" />;
      case "audio": return <FileAudio className="h-4 w-4 text-pink-500" />;
      default: return <File className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status?: FileItem["status"]) => {
    if (!status) return null;
    switch (status) {
      case "uploading":
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-200 text-[10px] h-4 font-normal px-1.5">{t("Uploading")}</Badge>;
      case "failed":
        return <Badge variant="destructive" className="text-[10px] h-4 font-normal px-1.5">{t("Upload Failed")}</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-200 text-[10px] h-4 font-normal px-1.5">{t("Pending Approval")}</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="bg-orange-500/10 text-orange-600 border-orange-200 text-[10px] h-4 font-normal px-1.5">{t("Approval Rejected")}</Badge>;
      case "approved":
        return <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-[10px] h-4 font-normal px-1.5">{t("Approved")}</Badge>;
      default:
        return null;
    }
  };

  const renderStatusCorner = (status?: FileItem["status"]) => {
    if (!status) return null;
    
    const config: Record<string, { color: string; textColor: string; text: string }> = {
      uploading: { color: "bg-blue-500", textColor: "text-white", text: t("Uploading") },
      failed: { color: "bg-red-500", textColor: "text-white", text: t("Failed") },
      pending: { color: "bg-yellow-500", textColor: "text-yellow-950", text: t("Pending") },
      rejected: { color: "bg-orange-500", textColor: "text-white", text: t("Rejected") },
      approved: { color: "bg-emerald-500", textColor: "text-white", text: t("Approved") },
    };
    
    const { color, textColor, text } = config[status] || { color: "bg-gray-500", textColor: "text-white", text: "" };
    
    return (
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none rounded-tr-lg z-20">
        <div className={`absolute top-2 -right-6 w-20 transform rotate-45 ${color} ${textColor} py-0.5 text-[8px] font-bold text-center shadow-[0_1px_2px_rgba(0,0,0,0.1)] uppercase tracking-wider`}>
          {text}
        </div>
      </div>
    );
  };

  const filteredFiles = React.useMemo(() => {
    return files
      .filter(f => {
        const matchesParent = f.parentId === currentFolderId;
        const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === "all" || f.type === filterType;
        const matchesOwner = !filterOwner || f.owner.toLowerCase().includes(filterOwner.toLowerCase());
        const matchesApprover = !filterApprover || (f.approver && f.approver.toLowerCase().includes(filterApprover.toLowerCase()));
        const matchesTag = !filterTag || (f.tags && f.tags.some(t => t.toLowerCase().includes(filterTag.toLowerCase())));
        
        return matchesParent && matchesSearch && matchesType && matchesOwner && matchesApprover && matchesTag;
      })
      .sort((a, b) => {
        // Folders first
        if (a.type === "folder" && b.type !== "folder") return -1;
        if (a.type !== "folder" && b.type === "folder") return 1;
        // Then by name
        return a.name.localeCompare(b.name);
      });
  }, [files, currentFolderId, searchQuery]);

  const breadcrumbs = React.useMemo(() => {
    const crumbs = [];
    let currentId = currentFolderId;
    while (currentId) {
      const folder = files.find(f => f.id === currentId);
      if (folder) {
        crumbs.unshift(folder);
        currentId = folder.parentId;
      } else {
        break;
      }
    }
    return crumbs;
  }, [currentFolderId, files]);

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    const newFolder: FileItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: newFolderName.trim(),
      type: "folder",
      updatedAt: new Date().toISOString().replace('T', ' ').split('.')[0],
      owner: "Admin",
      parentId: currentFolderId,
      tags: []
    };
    setFiles([...files, newFolder]);
    setNewFolderName("");
    setIsNewFolderDialogOpen(false);
  };

  const handleAddTag = () => {
    if (!selectedFile || !newTagInput.trim()) return;
    const tag = newTagInput.trim().toLowerCase();
    
    // Check if tag already exists
    if (selectedFile.tags?.includes(tag)) {
      setNewTagInput("");
      return;
    }

    const updatedFiles = files.map(f => {
      if (f.id === selectedFile.id) {
        const updatedTags = [...(f.tags || []), tag];
        return { ...f, tags: updatedTags };
      }
      return f;
    });

    setFiles(updatedFiles);
    setSelectedFile({ ...selectedFile, tags: [...(selectedFile.tags || []), tag] });
    setNewTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (!selectedFile) return;

    const updatedFiles = files.map(f => {
      if (f.id === selectedFile.id) {
        const updatedTags = (f.tags || []).filter(t => t !== tagToRemove);
        return { ...f, tags: updatedTags };
      }
      return f;
    });

    setFiles(updatedFiles);
    setSelectedFile({ 
      ...selectedFile, 
      tags: (selectedFile.tags || []).filter(t => t !== tagToRemove) 
    });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setStagedFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setStagedFiles(prev => [...prev, ...selected]);
    }
  };

  const handlePerformUpload = () => {
    if (stagedFiles.length === 0) return;

    const newFiles: FileItem[] = stagedFiles.map(file => {
      const type = file.type.startsWith('image/') ? 'image' : 
                   file.type.startsWith('video/') ? 'video' : 
                   file.type.startsWith('audio/') ? 'audio' : 'image';
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: type as any,
        size: file.size,
        updatedAt: new Date().toISOString().replace('T', ' ').split('.')[0],
        owner: "Admin",
        parentId: currentFolderId,
        tags: [...uploadGlobalTags],
        status: autoSubmitApproval ? "pending" : undefined
      };
    });

    setFiles([...files, ...newFiles]);
    setStagedFiles([]);
    setUploadGlobalTags([]);
    setIsUploadDialogOpen(false);
  };

  const removeStagedFile = (index: number) => {
    setStagedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
    if (clipboard?.id.includes(id)) {
      setClipboard(prev => prev ? { ...prev, id: prev.id.filter(i => i !== id) } : null);
    }
    const newSelected = new Set(selectedIds);
    newSelected.delete(id);
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = () => {
    const idsToRemove = Array.from(selectedIds);
    setFiles(files.filter(f => !selectedIds.has(f.id)));
    if (clipboard) {
      setClipboard({
        ...clipboard,
        id: clipboard.id.filter(id => !selectedIds.has(id))
      });
    }
    setSelectedIds(new Set());
  };

  const handleCopy = (id: string | string[]) => {
    const ids = Array.isArray(id) ? id : [id];
    setClipboard({ id: ids, isCut: false });
  };

  const handleCut = (id: string | string[]) => {
    const ids = Array.isArray(id) ? id : [id];
    setClipboard({ id: ids, isCut: true });
  };

  const handlePaste = (targetParentId: string | null) => {
    if (!clipboard || clipboard.id.length === 0) return;

    const sourceItems = files.filter(f => clipboard.id.includes(f.id));
    
    if (clipboard.isCut) {
      // Move operation
      setFiles(files.map(f => clipboard.id.includes(f.id) ? { ...f, parentId: targetParentId, updatedAt: new Date().toISOString().replace('T', ' ').split('.')[0] } : f));
      setClipboard(null);
    } else {
      // Copy operation
      const newItems = sourceItems.map(item => ({
        ...item,
        id: Math.random().toString(36).substr(2, 9),
        parentId: targetParentId,
        name: `${item.name} (Copy)`,
        updatedAt: new Date().toISOString().replace('T', ' ').split('.')[0],
      }));
      setFiles([...files, ...newItems]);
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredFiles.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredFiles.map(f => f.id)));
    }
  };

  const currentFolder = currentFolderId ? files.find(f => f.id === currentFolderId) : null;

  const handleResetFilters = () => {
    setFilterType("all");
    setFilterOwner("");
    setFilterApprover("");
    setFilterTag("");
    setSearchQuery("");
  };

  const handleAddUploadTag = () => {
    if (!newUploadTagInput.trim()) return;
    if (!uploadGlobalTags.includes(newUploadTagInput.trim().toLowerCase())) {
      setUploadGlobalTags([...uploadGlobalTags, newUploadTagInput.trim().toLowerCase()]);
    }
    setNewUploadTagInput("");
  };

  const handleRemoveUploadTag = (tagToRemove: string) => {
    setUploadGlobalTags(uploadGlobalTags.filter(t => t !== tagToRemove));
  };

  const activeFilterCount = React.useMemo(() => {
    let count = 0;
    if (filterType !== "all") count++;
    if (filterOwner.trim()) count++;
    if (filterApprover.trim()) count++;
    if (filterTag.trim()) count++;
    return count;
  }, [filterType, filterOwner, filterApprover, filterTag]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* Toolbar */}
      <div className="border-b bg-card h-16 shrink-0 flex items-center justify-between px-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setCurrentFolderId(currentFolder?.parentId || null)}
              disabled={!currentFolderId}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1 text-sm font-medium">
              <span 
                className="cursor-pointer hover:text-primary transition-colors pr-1"
                onClick={() => setCurrentFolderId(null)}
              >
                {t("Files")}
              </span>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.id}>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground mx-0.5" />
                  <span 
                    className={`cursor-pointer hover:text-primary transition-colors ${idx === breadcrumbs.length - 1 ? "text-primary font-bold" : ""}`}
                    onClick={() => setCurrentFolderId(crumb.id)}
                  >
                    {crumb.name}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="h-8 w-[1px] bg-border mx-2" />
          
          <div className="flex items-center gap-3 w-full max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("Search by name...")}
                className="pl-9 h-9 bg-muted/40 border-none w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Dialog open={isAdvancedSearchOpen} onOpenChange={setIsAdvancedSearchOpen}>
              <DialogTrigger render={(props) => (
                <Button 
                  {...props} 
                  variant={activeFilterCount > 0 ? "secondary" : "ghost"} 
                  size="sm" 
                  className={`h-9 gap-2 whitespace-nowrap ${activeFilterCount > 0 ? "text-primary border-primary/20" : "text-muted-foreground hover:text-primary"}`}
                >
                  <Filter className="h-4 w-4" />
                  {t("Advanced Search")}
                  {activeFilterCount > 0 && (
                    <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px] bg-primary text-primary-foreground">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              )} />
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t("Advanced Search")}</DialogTitle>
                  <DialogDescription>
                    {t("Filter files by multiple criteria for more precise results.")}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>{t("Media Type")}</Label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="h-10 bg-muted/20 border-border">
                        <SelectValue placeholder={t("Select Type")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("All Types")}</SelectItem>
                        <SelectItem value="image">{t("Image")}</SelectItem>
                        <SelectItem value="video">{t("Video")}</SelectItem>
                        <SelectItem value="audio">{t("Audio")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="uploader-filter">{t("Uploader")}</Label>
                    <Input
                      id="uploader-filter"
                      placeholder={t("Filter by uploader...")}
                      className="h-10 bg-muted/20 border-border"
                      value={filterOwner}
                      onChange={(e) => setFilterOwner(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="approver-filter">{t("Approver")}</Label>
                    <Input
                      id="approver-filter"
                      placeholder={t("Filter by approver...")}
                      className="h-10 bg-muted/20 border-border"
                      value={filterApprover}
                      onChange={(e) => setFilterApprover(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="tag-filter">{t("Tag")}</Label>
                    <Input
                      id="tag-filter"
                      placeholder={t("Filter by tag...")}
                      className="h-10 bg-muted/20 border-border"
                      value={filterTag}
                      onChange={(e) => setFilterTag(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter className="flex items-center justify-between sm:justify-between">
                  <Button variant="ghost" className="text-muted-foreground" onClick={handleResetFilters}>
                    {t("Reset All")}
                  </Button>
                  <Button onClick={() => setIsAdvancedSearchOpen(false)}>{t("Close")}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5 mr-2 animate-in fade-in slide-in-from-right-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 gap-2 text-xs"
                onClick={() => handleCopy(Array.from(selectedIds))}
              >
                <Copy className="h-3.5 w-3.5" />
                {t("Copy")}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 gap-2 text-xs"
                onClick={() => handleCut(Array.from(selectedIds))}
              >
                <Scissors className="h-3.5 w-3.5" />
                {t("Cut")}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 gap-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleBulkDelete}
              >
                <Trash2 className="h-3.5 w-3.5" />
                {t("Delete")}
              </Button>
              <div className="w-[1px] h-4 bg-border mx-1" />
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-xs text-muted-foreground"
                onClick={() => setSelectedIds(new Set())}
              >
                <X className="h-3.5 w-3.5 mr-1" />
                {t("Clear")}
              </Button>
            </div>
          )}

          <div className="flex items-center bg-muted/50 rounded-lg p-0.5 mr-2">
            <Button 
              variant={viewMode === "list" ? "secondary" : "ghost"} 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "grid" ? "secondary" : "ghost"} 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="gap-2 h-9" onClick={() => setIsNewFolderDialogOpen(true)}>
            <FolderPlus className="h-4 w-4" />
            <span className="hidden sm:inline">{t("New Folder")}</span>
          </Button>
          <Link to="/asset-design">
            <Button variant="outline" size="sm" className="gap-2 h-9 text-primary hover:text-primary-foreground hover:bg-primary border-primary/20">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">{t("New Asset")}</span>
            </Button>
          </Link>
          <Button size="sm" className="gap-2 h-9" onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">{t("Upload")}</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Area */}
        <div className="flex-1 overflow-hidden flex flex-col bg-muted/30">
          <ScrollArea className="flex-1">
            <div className="p-6 h-full" onContextMenu={(e) => {
              // Only trigger background context menu if not clicking an item
              if (e.target === e.currentTarget) {
                // Background context menu could be implemented here as well
              }
            }}>
              {viewMode === "list" ? (
                <Card className="shadow-none border-none bg-transparent h-full">
                  <ContextMenu>
                    <ContextMenuTrigger
                      render={(props) => (
                        <div {...props} className="min-h-full">
                          <Table>
                            <TableHeader>
                              <TableRow className="hover:bg-transparent border-b">
                                <TableHead className="w-12 px-4">
                                  <Checkbox 
                                    checked={filteredFiles.length > 0 && selectedIds.size === filteredFiles.length}
                                    onCheckedChange={toggleSelectAll}
                                  />
                                </TableHead>
                                <TableHead className="w-[400px]">{t("File Name")}</TableHead>
                                <TableHead>{t("Owner")}</TableHead>
                                <TableHead>{t("Status")}</TableHead>
                                <TableHead>{t("Updated At")}</TableHead>
                                <TableHead>{t("Size")}</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredFiles.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={6} className="h-48 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center gap-2">
                                      <Info className="h-8 w-8 opacity-20" />
                                      <p>{t("No files found in this directory")}</p>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ) : (
                                filteredFiles.map((file) => (
                                  <React.Fragment key={file.id}>
                                    <ContextMenu>
                                      <ContextMenuTrigger
                                        render={(triggerProps) => (
                                          <TableRow 
                                            {...triggerProps}
                                            className={`group cursor-pointer hover:bg-muted/50 transition-colors ${selectedIds.has(file.id) ? "bg-primary/5 hover:bg-primary/10" : ""}`}
                                            onClick={() => file.type === "folder" ? setCurrentFolderId(file.id) : setSelectedFile(file)}
                                          >
                                            <TableCell className="px-4" onClick={(e) => e.stopPropagation()}>
                                              <Checkbox 
                                                checked={selectedIds.has(file.id)}
                                                onCheckedChange={() => toggleSelect(file.id)}
                                              />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                              <div className="flex items-center gap-3">
                                                {getFileIcon(file.type)}
                                                <span className="truncate max-w-[300px]">{file.name}</span>
                                              </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-xs">{file.owner}</TableCell>
                                            <TableCell>{getStatusBadge(file.status)}</TableCell>
                                            <TableCell className="text-muted-foreground text-xs whitespace-nowrap">{file.updatedAt}</TableCell>
                                            <TableCell className="text-muted-foreground text-xs">{formatFileSize(file.size)}</TableCell>
                                          </TableRow>
                                        )}
                                      />
                                      <ContextMenuContent className="w-40">
                                        <DropdownMenuItem className="gap-2" onClick={() => setSelectedFile(file)}>
                                          <Info className="h-4 w-4" /> {t("Properties")}
                                        </DropdownMenuItem>
                                        <ContextMenuSeparator />
                                        <DropdownMenuItem className="gap-2" onClick={() => handleCopy(file.id)}>
                                          <Copy className="h-4 w-4" /> {t("Copy")}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="gap-2" onClick={() => handleCut(file.id)}>
                                          <Scissors className="h-4 w-4" /> {t("Cut")}
                                        </DropdownMenuItem>
                                        <ContextMenuSeparator />
                                        <DropdownMenuItem className="gap-2">
                                          <Download className="h-4 w-4" /> {t("Download")}
                                        </DropdownMenuItem>
                                        <ContextMenuSeparator />
                                        <DropdownMenuItem 
                                          className="gap-2 text-destructive focus:text-destructive"
                                          onClick={() => handleDeleteFile(file.id)}
                                        >
                                          <Trash2 className="h-4 w-4" /> {t("Delete")}
                                        </DropdownMenuItem>
                                      </ContextMenuContent>
                                    </ContextMenu>
                                  </React.Fragment>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    />
                    <ContextMenuContent className="w-40">
                      <DropdownMenuItem 
                        className="gap-2" 
                        disabled={!clipboard}
                        onClick={() => handlePaste(currentFolderId)}
                      >
                        <ClipboardPaste className="h-4 w-4" /> {t("Paste")}
                      </DropdownMenuItem>
                      <ContextMenuSeparator />
                      <DropdownMenuItem className="gap-2" onClick={() => setIsNewFolderDialogOpen(true)}>
                        <FolderPlus className="h-4 w-4" /> {t("New Folder")}
                      </DropdownMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </Card>
              ) : (
                <div className="h-full">
                  <ContextMenu>
                    <ContextMenuTrigger
                      render={(props) => (
                        <div {...props} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 min-h-full items-start content-start">
                          {filteredFiles.map((file) => (
                            <React.Fragment key={file.id}>
                              <ContextMenu>
                                <ContextMenuTrigger
                                  render={(triggerProps) => (
                                    <Card 
                                      {...triggerProps}
                                      className={`group cursor-pointer hover:border-primary transition-all hover:shadow-md relative overflow-hidden ${selectedIds.has(file.id) ? "border-primary ring-1 ring-primary/50" : ""}`}
                                      onClick={() => file.type === "folder" ? setCurrentFolderId(file.id) : setSelectedFile(file)}
                                    >
                                      {renderStatusCorner(file.status)}
                                      <div 
                                        className={`absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity ${selectedIds.has(file.id) ? "opacity-100" : ""}`}
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Checkbox 
                                          checked={selectedIds.has(file.id)}
                                          onCheckedChange={() => toggleSelect(file.id)}
                                        />
                                      </div>
                                      <CardContent className="p-4 flex flex-col items-center gap-3 relative">
                                        <div className={`p-4 rounded-xl transition-colors ${file.type === "folder" ? "bg-blue-50 group-hover:bg-blue-100" : "bg-muted/50 group-hover:bg-muted"}`}>
                                          {React.cloneElement(getFileIcon(file.type) as React.ReactElement, { className: "h-8 w-8" })}
                                        </div>
                                        <div className="text-center w-full">
                                          <p className="text-xs font-medium truncate" title={file.name}>{file.name}</p>
                                          <div className="mt-1 flex flex-wrap justify-center gap-1 overflow-hidden h-4">
                                            {file.tags?.slice(0, 2).map(tag => (
                                              <span key={tag} className="text-[8px] px-1 rounded-sm bg-muted text-muted-foreground uppercase">{tag}</span>
                                            ))}
                                            {(file.tags?.length || 0) > 2 && <span className="text-[8px] text-muted-foreground">...</span>}
                                          </div>
                                          <p className="text-[10px] text-muted-foreground mt-0.5">{file.type === "folder" ? t("Folder") : formatFileSize(file.size)}</p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}
                                />
                                <ContextMenuContent className="w-40">
                                  <DropdownMenuItem className="gap-2" onClick={() => setSelectedFile(file)}>
                                    <Info className="h-4 w-4" /> {t("Properties")}
                                  </DropdownMenuItem>
                                  <ContextMenuSeparator />
                                  <DropdownMenuItem className="gap-2" onClick={() => handleCopy(file.id)}>
                                    <Copy className="h-4 w-4" /> {t("Copy")}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2" onClick={() => handleCut(file.id)}>
                                    <Scissors className="h-4 w-4" /> {t("Cut")}
                                  </DropdownMenuItem>
                                  <ContextMenuSeparator />
                                  <DropdownMenuItem className="gap-2">
                                    <Download className="h-4 w-4" /> {t("Download")}
                                  </DropdownMenuItem>
                                  <ContextMenuSeparator />
                                  <DropdownMenuItem 
                                    className="gap-2 text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteFile(file.id)}
                                  >
                                    <Trash2 className="h-4 w-4" /> {t("Delete")}
                                  </DropdownMenuItem>
                                </ContextMenuContent>
                              </ContextMenu>
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                    />
                    <ContextMenuContent className="w-40">
                      <DropdownMenuItem 
                        className="gap-2" 
                        disabled={!clipboard}
                        onClick={() => handlePaste(currentFolderId)}
                      >
                        <ClipboardPaste className="h-4 w-4" /> {t("Paste")}
                      </DropdownMenuItem>
                      <ContextMenuSeparator />
                      <DropdownMenuItem className="gap-2" onClick={() => setIsNewFolderDialogOpen(true)}>
                        <FolderPlus className="h-4 w-4" /> {t("New Folder")}
                      </DropdownMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                  {filteredFiles.length === 0 && (
                    <div className="col-span-full h-48 flex flex-col items-center justify-center text-muted-foreground gap-2">
                      <Info className="h-8 w-8 opacity-20" />
                      <p>{t("No files found")}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Info Sidebar */}
        {selectedFile && (
          <div className="w-80 border-l bg-card hidden xl:flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                {t("File Information")}
              </h3>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSelectedFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="p-8 rounded-2xl bg-muted/50 border border-muted flex items-center justify-center">
                  {React.cloneElement(getFileIcon(selectedFile.type) as React.ReactElement, { className: "h-16 w-16" })}
                </div>
                <div className="text-center w-full">
                  <h4 className="font-bold text-base break-words" title={selectedFile.name}>{selectedFile.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 capitalize">{selectedFile.type}</p>
                </div>
              </div>

              {selectedFile.skuId && (
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{t("Linked SKU")}</span>
                     <Boxes className="h-3.5 w-3.5 text-primary" />
                  </div>
                  {(() => {
                    const sku = INITIAL_SKUS.find(s => s.id === selectedFile.skuId);
                    return sku ? (
                      <div className="space-y-1">
                        <p className="text-sm font-bold font-mono tracking-tight">{sku.code}</p>
                        <p className="text-xs text-muted-foreground">{sku.name}</p>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">{t("SKU data missing")}</p>
                    );
                  })()}
                </div>
              )}

              <div className="space-y-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-y-4 text-xs">
                  <div className="text-muted-foreground">{t("Owner")}</div>
                  <div className="text-right font-medium">{selectedFile.owner}</div>
                  
                  <div className="text-muted-foreground">{t("Last Modified")}</div>
                  <div className="text-right font-medium">{selectedFile.updatedAt}</div>
                  
                  <div className="text-muted-foreground">{t("Size")}</div>
                  <div className="text-right font-medium">{formatFileSize(selectedFile.size)}</div>
                  
                  <div className="text-muted-foreground">{t("Permission")}</div>
                  <div className="text-right font-medium"><Badge variant="outline" className="text-[9px] h-4 font-normal">Read/Write</Badge></div>

                  <div className="text-muted-foreground">{t("Status")}</div>
                  <div className="text-right font-medium">{getStatusBadge(selectedFile.status)}</div>

                  {selectedFile.approver && (
                    <>
                      <div className="text-muted-foreground">{t("Approver")}</div>
                      <div className="text-right font-medium">{selectedFile.approver}</div>
                      <div className="text-muted-foreground">{t("Approval Time")}</div>
                      <div className="text-right font-medium">{selectedFile.approvedAt}</div>
                    </>
                  )}

                  {(selectedFile.type === "video" || selectedFile.type === "audio") && (
                    <>
                      <div className="text-muted-foreground">{t("Duration")}</div>
                      <div className="text-right font-medium">{selectedFile.duration || "--"}</div>
                      <div className="text-muted-foreground">{t("Codec")}</div>
                      <div className="text-right font-medium">{selectedFile.codec || "--"}</div>
                      <div className="text-muted-foreground">{t("Bitrate")}</div>
                      <div className="text-right font-medium">{selectedFile.bitrate || "--"}</div>
                      {selectedFile.type === "video" && (
                        <>
                          <div className="text-muted-foreground">{t("FPS")}</div>
                          <div className="text-right font-medium">{selectedFile.fps || "--"}</div>
                        </>
                      )}
                    </>
                  )}

                  <div className="text-muted-foreground">{t("Tags")}</div>
                  <div className="text-right">
                    <div className="flex flex-wrap justify-end gap-1">
                      {selectedFile.tags?.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[9px] h-4 font-normal group relative overflow-hidden pr-5">
                          {tag}
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleRemoveTag(tag); }}
                            className="absolute right-0 top-0 bottom-0 px-1 bg-destructive/10 hover:bg-destructive/20 text-destructive border-l border-destructive/10 transition-colors"
                          >
                            <X className="h-2 w-2" />
                          </button>
                        </Badge>
                      )) || <span className="text-muted-foreground text-xs italic">{t("No tags")}</span>}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-1">
                    <Input 
                      placeholder={t("Add Tag...")}
                      className="h-7 text-[10px] bg-muted/40 border-none px-2"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleAddTag}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-6">
                <Button className="w-full gap-2 h-10">
                  <Download className="h-4 w-4" />
                  {t("Download")}
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="gap-2 h-10">
                    <Share2 className="h-4 w-4" />
                    {t("Share")}
                  </Button>
                  <Button variant="outline" className="gap-2 h-10 text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                    {t("Delete")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Folder Dialog */}
      <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("New Folder")}</DialogTitle>
            <DialogDescription>
              {t("Create a new directory in current folder.")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="folder-name">{t("Folder Name")}</Label>
              <Input
                id="folder-name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder={t("e.g. Assets")}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewFolderDialogOpen(false)}>{t("Cancel")}</Button>
            <Button onClick={handleCreateFolder}>{t("Create")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("Upload Files")}</DialogTitle>
            <DialogDescription>
              {t("Select or drag files here to upload to the current folder.")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div 
              className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-muted/20 hover:bg-muted/30 hover:border-primary/50 transition-all cursor-pointer group"
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              onClick={() => document.getElementById('file-upload-input')?.click()}
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Upload className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{t("Click or drag files to upload")}</p>
                <p className="text-xs text-muted-foreground mt-1">{t("Support multiple files")}</p>
              </div>
              <input 
                id="file-upload-input" 
                type="file" 
                multiple 
                className="hidden" 
                onChange={handleFileSelect}
              />
            </div>

            {stagedFiles.length > 0 && (
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground">{t("Selected Files")} ({stagedFiles.length})</Label>
                <ScrollArea className="h-32 border rounded-lg bg-muted/10 p-2">
                  <div className="space-y-2">
                    {stagedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-md bg-background border text-xs">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <File className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          <span className="truncate">{file.name}</span>
                          <span className="text-[10px] text-muted-foreground shrink-0">({formatFileSize(file.size)})</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeStagedFile(idx)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="upload-tags">{t("Add Tags to All Files")}</Label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {uploadGlobalTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="gap-1 pl-2 pr-1 h-6">
                      {tag}
                      <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-transparent" onClick={() => handleRemoveUploadTag(tag)}>
                        <X className="h-2.5 w-2.5" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    id="upload-tags"
                    placeholder={t("Enter tag and press Add")}
                    value={newUploadTagInput}
                    onChange={(e) => setNewUploadTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddUploadTag()}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" onClick={handleAddUploadTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/10">
                <div className="space-y-0.5">
                  <Label className="text-sm">{t("Submit for Approval Immediately")}</Label>
                  <p className="text-xs text-muted-foreground">{t("Automatically set status to 'Pending' after upload")}</p>
                </div>
                <Switch 
                  checked={autoSubmitApproval}
                  onCheckedChange={setAutoSubmitApproval}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsUploadDialogOpen(false); setStagedFiles([]); }}>{t("Cancel")}</Button>
            <Button onClick={handlePerformUpload} disabled={stagedFiles.length === 0}>
              {t("Upload & Finish")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
