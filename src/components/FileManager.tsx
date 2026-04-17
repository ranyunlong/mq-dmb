import * as React from "react";
import { useTranslation } from "react-i18next";
import { 
  Folder, 
  File, 
  FileText, 
  FileImage, 
  FileVideo, 
  FileAudio, 
  FileCode,
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
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogTitle 
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

interface FileItem {
  id: string;
  name: string;
  type: "folder" | "image" | "video" | "audio" | "document" | "code" | "unknown";
  size?: number; // In bytes
  updatedAt: string;
  owner: string;
  parentId: string | null;
}

const mockFiles: FileItem[] = [
  { id: "1", name: "Marketing Material", type: "folder", updatedAt: "2024-04-16 10:00:00", owner: "Admin", parentId: null },
  { id: "2", name: "System Logs", type: "folder", updatedAt: "2024-04-15 14:20:00", owner: "System", parentId: null },
  { id: "3", name: "Promo_2024_Spring.mp4", type: "video", size: 45000000, updatedAt: "2024-04-16 09:15:00", owner: "Marketing", parentId: "1" },
  { id: "4", name: "Landing_Page_Design.png", type: "image", size: 2400000, updatedAt: "2024-04-14 11:30:00", owner: "Designer", parentId: "1" },
  { id: "5", name: "Device_Config_Template.json", type: "code", size: 4500, updatedAt: "2024-04-13 16:45:00", owner: "Admin", parentId: null },
  { id: "6", name: "Annual_Report_2023.pdf", type: "document", size: 12500000, updatedAt: "2024-03-20 08:00:00", owner: "Finance", parentId: null },
  { id: "7", name: "Background_Track.wav", type: "audio", size: 8200000, updatedAt: "2024-04-12 13:10:00", owner: "Music Dept", parentId: "1" },
  { id: "8", name: "Internal", type: "folder", updatedAt: "2024-04-10 10:00:00", owner: "Admin", parentId: "1" },
];

export function FileManager() {
  const { t } = useTranslation();
  const [currentFolderId, setCurrentFolderId] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [selectedFile, setSelectedFile] = React.useState<FileItem | null>(null);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState("");
  const [files, setFiles] = React.useState<FileItem[]>(mockFiles);

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
      case "document": return <FileText className="h-4 w-4 text-orange-500" />;
      case "code": return <FileCode className="h-4 w-4 text-indigo-500" />;
      default: return <File className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const filteredFiles = files.filter(f => 
    f.parentId === currentFolderId && 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    };
    setFiles([...files, newFolder]);
    setNewFolderName("");
    setIsNewFolderDialogOpen(false);
  };

  const handleDeleteFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const currentFolder = currentFolderId ? files.find(f => f.id === currentFolderId) : null;

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
          
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("Search files in current folder...")}
              className="pl-9 h-9 bg-muted/40 border-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
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
          <Button size="sm" className="gap-2 h-9">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">{t("Upload")}</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Area */}
        <div className="flex-1 overflow-hidden flex flex-col bg-muted/30">
          <ScrollArea className="flex-1">
            <div className="p-6">
              {viewMode === "list" ? (
                <Card className="shadow-none border-none bg-transparent">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-b">
                        <TableHead className="w-[400px]">{t("Name")}</TableHead>
                        <TableHead>{t("Owner")}</TableHead>
                        <TableHead>{t("Updated At")}</TableHead>
                        <TableHead>{t("Size")}</TableHead>
                        <TableHead className="text-right">{t("Actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFiles.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                            <div className="flex flex-col items-center gap-2">
                              <Info className="h-8 w-8 opacity-20" />
                              <p>{t("No files found in this directory")}</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredFiles.map((file) => (
                          <TableRow 
                            key={file.id} 
                            className="group cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => file.type === "folder" ? setCurrentFolderId(file.id) : setSelectedFile(file)}
                          >
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-3">
                                {getFileIcon(file.type)}
                                <span className="truncate max-w-[300px]">{file.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground text-xs">{file.owner}</TableCell>
                            <TableCell className="text-muted-foreground text-xs whitespace-nowrap">{file.updatedAt}</TableCell>
                            <TableCell className="text-muted-foreground text-xs">{formatFileSize(file.size)}</TableCell>
                            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40">
                                  <DropdownMenuItem className="gap-2">
                                    <Download className="h-4 w-4" /> {t("Download")}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2">
                                    <Share2 className="h-4 w-4" /> {t("Share")}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="gap-2 text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteFile(file.id)}
                                  >
                                    <Trash2 className="h-4 w-4" /> {t("Delete")}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {filteredFiles.map((file) => (
                    <Card 
                      key={file.id} 
                      className="group cursor-pointer hover:border-primary transition-all hover:shadow-md"
                      onClick={() => file.type === "folder" ? setCurrentFolderId(file.id) : setSelectedFile(file)}
                    >
                      <CardContent className="p-4 flex flex-col items-center gap-3">
                        <div className={`p-4 rounded-xl transition-colors ${file.type === "folder" ? "bg-blue-50 group-hover:bg-blue-100" : "bg-muted/50 group-hover:bg-muted"}`}>
                          {React.cloneElement(getFileIcon(file.type) as React.ReactElement, { className: "h-8 w-8" })}
                        </div>
                        <div className="text-center w-full">
                          <p className="text-xs font-medium truncate" title={file.name}>{file.name}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{file.type === "folder" ? t("Folder") : formatFileSize(file.size)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
    </div>
  );
}
