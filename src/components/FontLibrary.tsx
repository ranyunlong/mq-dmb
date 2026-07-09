import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Type,
  Search,
  Upload,
  ShieldAlert,
  MoreVertical,
  Download,
  Trash2,
  Info,
  X,
  File as FileIcon,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontItem } from "@/types";

const ACCEPTED_FONT_EXTENSIONS = ".ttf,.otf,.woff,.woff2";

const mockFonts: FontItem[] = [
  {
    id: "1",
    name: "Source Han Sans",
    fileName: "SourceHanSans-Regular.otf",
    format: "OTF",
    size: 16800000,
    foundry: "Adobe / Google",
    styleCount: 7,
    uploader: "Admin",
    uploadedAt: "2024-04-16 10:00:00",
    status: "active",
    tags: ["sans-serif", "cjk"],
  },
  {
    id: "2",
    name: "Roboto",
    fileName: "Roboto-Regular.ttf",
    format: "TTF",
    size: 168000,
    foundry: "Google",
    styleCount: 12,
    uploader: "Designer",
    uploadedAt: "2024-04-15 14:20:00",
    status: "active",
    tags: ["sans-serif", "latin"],
  },
  {
    id: "3",
    name: "Alibaba PuHuiTi",
    fileName: "AlibabaPuHuiTi-Bold.ttf",
    format: "TTF",
    size: 8400000,
    foundry: "Alibaba",
    styleCount: 5,
    uploader: "Marketing",
    uploadedAt: "2024-04-14 11:30:00",
    status: "active",
    tags: ["sans-serif", "cjk"],
  },
  {
    id: "4",
    name: "Noto Serif",
    fileName: "NotoSerif-Regular.woff2",
    format: "WOFF2",
    size: 92000,
    foundry: "Google",
    styleCount: 4,
    uploader: "Admin",
    uploadedAt: "2024-04-12 13:10:00",
    status: "disabled",
    tags: ["serif", "latin"],
  },
];

export function FontLibrary() {
  const { t } = useTranslation();
  const [fonts, setFonts] = React.useState<FontItem[]>(mockFonts);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = React.useState(false);
  const [stagedFiles, setStagedFiles] = React.useState<File[]>([]);
  const [copyrightAck, setCopyrightAck] = React.useState(false);

  const formatFileSize = (bytes: number) => {
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const detectFormat = (fileName: string): FontItem["format"] => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "otf":
        return "OTF";
      case "woff":
        return "WOFF";
      case "woff2":
        return "WOFF2";
      default:
        return "TTF";
    }
  };

  const filteredFonts = React.useMemo(() => {
    return fonts.filter((f) => {
      const q = searchQuery.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.fileName.toLowerCase().includes(q) ||
        (f.foundry?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [fonts, searchQuery]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).filter((f) =>
      /\.(ttf|otf|woff2?|)$/i.test(f.name)
    );
    setStagedFiles((prev) => [...prev, ...dropped]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStagedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeStagedFile = (index: number) => {
    setStagedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const resetUploadDialog = () => {
    setStagedFiles([]);
    setCopyrightAck(false);
  };

  const handlePerformUpload = () => {
    if (stagedFiles.length === 0 || !copyrightAck) return;

    const newFonts: FontItem[] = stagedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name.replace(/\.(ttf|otf|woff2?)$/i, ""),
      fileName: file.name,
      format: detectFormat(file.name),
      size: file.size,
      uploader: "Admin",
      uploadedAt: new Date().toISOString().replace("T", " ").split(".")[0],
      status: "active",
      tags: [],
    }));

    setFonts([...newFonts, ...fonts]);
    setIsUploadDialogOpen(false);
    resetUploadDialog();
  };

  const handleDeleteFont = (id: string) => {
    setFonts(fonts.filter((f) => f.id !== id));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* Toolbar */}
      <div className="border-b bg-card h-16 shrink-0 flex items-center justify-between px-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Type className="h-4 w-4 text-primary" />
            <span>{t("Font Library")}</span>
          </div>
          <div className="h-8 w-[1px] bg-border mx-2" />
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("Search fonts by name or foundry...")}
              className="pl-9 h-9 bg-muted/40 border-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Button size="sm" className="gap-2 h-9" onClick={() => setIsUploadDialogOpen(true)}>
          <Upload className="h-4 w-4" />
          <span className="hidden sm:inline">{t("Upload Font")}</span>
        </Button>
      </div>

      <ScrollArea className="flex-1 bg-muted/30">
        <div className="p-6 space-y-6">
          {/* Copyright disclaimer banner */}
          <div className="flex gap-3 rounded-xl border border-amber-300/60 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
            <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                {t("Font Copyright Notice")}
              </p>
              <p className="text-xs leading-relaxed text-amber-700/90 dark:text-amber-200/80">
                {t("Font Copyright Disclaimer")}
              </p>
            </div>
          </div>

          {/* Font grid */}
          {filteredFonts.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-muted-foreground gap-2">
              <Info className="h-8 w-8 opacity-20" />
              <p>{t("No fonts found")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFonts.map((font) => (
                <Card
                  key={font.id}
                  className="group hover:border-primary transition-all hover:shadow-md relative overflow-hidden"
                >
                  <CardContent className="p-0">
                    {/* Preview area */}
                    <div className="h-28 flex items-center justify-center bg-muted/40 border-b relative">
                      <span className="text-4xl font-medium tracking-tight text-foreground/80 select-none">
                        Aa 字体
                      </span>
                      <Badge
                        variant="outline"
                        className="absolute top-2 left-2 text-[9px] h-4 font-mono font-normal px-1.5 bg-background/80"
                      >
                        {font.format}
                      </Badge>
                      {font.status === "disabled" && (
                        <Badge
                          variant="secondary"
                          className="absolute top-2 right-2 text-[9px] h-4 font-normal px-1.5"
                        >
                          {t("Disabled")}
                        </Badge>
                      )}
                    </div>
                    {/* Meta */}
                    <div className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate" title={font.name}>
                            {font.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate" title={font.fileName}>
                            {font.fileName}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={(props) => (
                              <Button
                                {...props}
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 shrink-0 -mr-1 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            )}
                          />
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem className="gap-2">
                              <Download className="h-4 w-4" /> {t("Download")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="gap-2 text-destructive focus:text-destructive"
                              onClick={() => handleDeleteFont(font.id)}
                            >
                              <Trash2 className="h-4 w-4" /> {t("Delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span className="truncate">{font.foundry || t("Unknown foundry")}</span>
                        <span className="shrink-0">{formatFileSize(font.size)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Upload Dialog */}
      <Dialog
        open={isUploadDialogOpen}
        onOpenChange={(open) => {
          setIsUploadDialogOpen(open);
          if (!open) resetUploadDialog();
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("Upload Font")}</DialogTitle>
            <DialogDescription>
              {t("Supported formats: TTF, OTF, WOFF, WOFF2.")}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-2">
            <div
              className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-muted/20 hover:bg-muted/30 hover:border-primary/50 transition-all cursor-pointer group"
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              onClick={() => document.getElementById("font-upload-input")?.click()}
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Upload className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{t("Click or drag fonts to upload")}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("Supported formats: TTF, OTF, WOFF, WOFF2.")}
                </p>
              </div>
              <input
                id="font-upload-input"
                type="file"
                multiple
                accept={ACCEPTED_FONT_EXTENSIONS}
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            {stagedFiles.length > 0 && (
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground">
                  {t("Selected Files")} ({stagedFiles.length})
                </Label>
                <ScrollArea className="h-28 border rounded-lg bg-muted/10 p-2">
                  <div className="space-y-2">
                    {stagedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-2 rounded-md bg-background border text-xs"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          <span className="truncate">{file.name}</span>
                          <span className="text-[10px] text-muted-foreground shrink-0">
                            ({formatFileSize(file.size)})
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => removeStagedFile(idx)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Copyright disclaimer + required acknowledgement */}
            <div className="rounded-lg border border-amber-300/60 bg-amber-50 p-3 dark:border-amber-500/30 dark:bg-amber-500/10">
              <div className="flex gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-amber-700/90 dark:text-amber-200/80">
                  {t("Font Copyright Disclaimer")}
                </p>
              </div>
              <label className="mt-3 flex items-start gap-2 cursor-pointer">
                <Checkbox
                  checked={copyrightAck}
                  onCheckedChange={(checked) => setCopyrightAck(checked === true)}
                  className="mt-0.5"
                />
                <span className="text-xs font-medium text-amber-800 dark:text-amber-300">
                  {t("I confirm I have legally purchased or am authorized to use these fonts, and accept sole liability for any copyright dispute.")}
                </span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsUploadDialogOpen(false);
                resetUploadDialog();
              }}
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handlePerformUpload}
              disabled={stagedFiles.length === 0 || !copyrightAck}
              className="gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              {t("Upload & Finish")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
