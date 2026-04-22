import * as React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Clock, 
  Play, 
  Image as ImageIcon, 
  LayoutTemplate, 
  Component as WidgetIcon,
  Video as VideoIcon,
  FileText,
  Monitor,
  Globe,
  Settings2,
  ChevronRight,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Types for the Editor
interface CarouselItem {
  id: string;
  duration: number;
  content: any; // Simplified for this implementation
}

export function MediaEditor() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const mode = searchParams.get("mode") || "image";
  const orientation = searchParams.get("orientation") || "landscape";
  const ratio = searchParams.get("ratio") || "16:9";
  
  // Editor State
  const [carouselItems, setCarouselItems] = React.useState<CarouselItem[]>([
    { id: "1", duration: 5, content: {} }
  ]);
  const [activeCarouselItemId, setActiveCarouselItemId] = React.useState("1");
  const [timelineVideos, setTimelineVideos] = React.useState<{id: string, name: string}[]>([]);

  // Layout Rendering Logic
  const renderLeftSidebar = () => (
    <div className="w-80 border-r bg-card flex flex-col h-full shrink-0">
      <Tabs defaultValue="presets" className="flex-1 flex flex-col min-h-0">
        <div className="p-4 flex items-center justify-between border-b shrink-0">
          <h2 className="font-bold text-sm">{t("Designer")}</h2>
          <Settings2 className="h-4 w-4 text-muted-foreground" />
        </div>
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-12 p-0 shrink-0">
          <TabsTrigger value="presets" className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            <LayoutTemplate className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="images" className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            <ImageIcon className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            <VideoIcon className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="designs" className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            <FileText className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="widgets" className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            <WidgetIcon className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="presets" className="mt-0 outline-none">
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-video border rounded-md bg-muted/40 hover:border-primary transition-colors cursor-pointer flex flex-col items-center justify-center gap-1 group">
                    <LayoutTemplate className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">{t("Layout")} {i}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="images" className="mt-0 outline-none">
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-square border rounded-md bg-muted/20 hover:border-primary transition-colors cursor-pointer overflow-hidden p-1">
                    <img 
                      src={`https://picsum.photos/seed/img${i}/200/200`} 
                      className="w-full h-full object-cover rounded-sm"
                      referrerPolicy="no-referrer"
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-0 outline-none">
              <div className="grid gap-2">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg border hover:border-primary transition-colors cursor-pointer">
                    <div className="h-12 w-20 bg-black rounded flex items-center justify-center">
                      <Play className="h-4 w-4 text-white fill-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">Promo_Video_{i}.mp4</p>
                      <p className="text-[10px] text-muted-foreground">0:45 | 1080p</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="designs" className="mt-0 outline-none">
              <div className="grid gap-2">
                {["Holiday_Sale", "Welcome_Screen"].map(name => (
                  <div key={name} className="flex items-center gap-3 p-3 rounded-lg border border-dashed hover:border-primary transition-colors cursor-pointer group">
                    <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    <div className="flex-1">
                      <p className="text-xs font-bold">{name}.design</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="widgets" className="mt-0 outline-none">
              <div className="grid grid-cols-2 gap-2">
                {["Webview", "HDMI", "Image", "Text", "Video", "Lottie"].map(w => (
                  <div key={w} className="p-3 border rounded-lg flex flex-col items-center gap-2 hover:bg-muted/50 cursor-pointer transition-colors bg-card group">
                    <WidgetIcon className="h-5 w-5 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{t(w)}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );

  const renderStage = () => (
    <div className="flex-1 bg-muted/60 relative overflow-hidden flex items-center justify-center p-8">
      <div 
        className={cn(
          "bg-white shadow-2xl relative border-4 border-black/5 rounded-lg overflow-hidden transition-all duration-500 flex items-center justify-center",
          orientation === "landscape" ? "w-full max-w-4xl" : "h-full max-h-[80vh]"
        )}
        style={{ aspectRatio: ratio.replace(":", "/") }}
      >
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none opacity-[0.03]">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-black" />
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 text-muted-foreground/20">
          <Monitor className="h-24 w-24" />
          <p className="font-bold text-xl uppercase tracking-widest">{t(mode)} STAGE</p>
        </div>
        <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-[10px] font-mono">
          {ratio} | {orientation.toUpperCase()}
        </div>
      </div>
    </div>
  );

  const renderCarouselBottom = () => (
    <div className="h-48 border-t bg-card shrink-0 flex flex-col min-w-0">
      <div className="px-4 py-2 flex items-center justify-between border-b shrink-0">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Carousel Projects")}</h3>
        <Button size="sm" variant="ghost" className="h-7 text-primary" onClick={() => {
          const newItem = { id: Math.random().toString(36).substr(2, 9), duration: 5, content: {} };
          setCarouselItems([...carouselItems, newItem]);
          setActiveCarouselItemId(newItem.id);
        }}>
          <Plus className="mr-1 h-3 w-3" />
          {t("Add Item")}
        </Button>
      </div>
      <ScrollArea className="flex-1 horizontal-scroll">
        <div className="p-4 flex gap-4 min-h-[140px]">
          {carouselItems.map((item, index) => (
            <div 
              key={item.id}
              onClick={() => setActiveCarouselItemId(item.id)}
              className={cn(
                "relative group flex flex-col gap-2 shrink-0 w-40",
                activeCarouselItemId === item.id ? "opacity-100" : "opacity-60 grayscale hover:grayscale-0 hover:opacity-90"
              )}
            >
              <div className={cn(
                "aspect-video border-2 rounded-lg bg-muted flex items-center justify-center overflow-hidden transition-all",
                activeCarouselItemId === item.id ? "border-primary shadow-lg ring-2 ring-primary/20" : "border-muted group-hover:border-primary/50"
              )}>
                <span className="text-2xl font-black text-muted-foreground/20">{index + 1}</span>
                <Badge className="absolute top-1 right-1 h-5 px-1 bg-black/60 backdrop-blur-md border-none text-[10px]">
                  {item.duration}s
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-1.5 bg-muted/40 rounded-md p-1 border">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <input 
                    type="number"
                    className="w-full bg-transparent text-[10px] font-bold outline-none"
                    value={item.duration}
                    onChange={(e) => {
                      const newItems = [...carouselItems];
                      newItems[index].duration = parseInt(e.target.value) || 0;
                      setCarouselItems(newItems);
                    }}
                  />
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={(e) => {
                  e.stopPropagation();
                  setCarouselItems(carouselItems.filter(i => i.id !== item.id));
                }}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  const renderTimelineBottom = () => (
    <div className="h-64 border-t bg-card shrink-0 flex flex-col">
      <div className="px-4 py-2 border-b flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">{t("Timeline")}</h3>
        <div className="flex items-center gap-2">
           <Button size="sm" variant="outline" className="h-7 text-[10px]">{t("Split")}</Button>
           <Button size="sm" variant="outline" className="h-7 text-[10px]">{t("Join")}</Button>
        </div>
      </div>
      <div className="flex-1 p-4 bg-muted/20 relative">
        <div className="absolute left-64 top-0 bottom-0 w-px bg-primary z-10 shadow-[0_0_10px_rgba(var(--primary),0.5)] flex flex-col items-center">
            <div className="w-3 h-3 bg-primary rotate-45 -mt-1.5" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 h-12 border-y bg-muted/30 relative">
             <div className="w-12 h-full bg-muted border-r flex items-center justify-center shrink-0">
                <VideoIcon className="h-4 w-4 text-muted-foreground" />
             </div>
             <div className="flex-1 flex items-center p-1 overflow-hidden">
                <div className="h-full w-96 bg-primary/20 border-x-2 border-primary rounded flex items-center px-3 relative group">
                   <span className="text-[10px] font-bold text-primary truncate">Retail_Campaign_Video_01.mp4</span>
                   <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-4 bg-primary rounded-full hidden group-hover:block cursor-ew-resize" />
                   <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-4 bg-primary rounded-full hidden group-hover:block cursor-ew-resize" />
                </div>
                <div className="h-full w-48 bg-muted/50 border-x-2 border-muted-foreground/30 rounded flex items-center px-3 ml-2">
                   <span className="text-[10px] text-muted-foreground">Transition: Fade</span>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-4 h-12 border-y bg-muted/30">
            <div className="w-12 h-full bg-muted border-r flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4 text-muted-foreground" />
             </div>
             <div className="flex-1 flex items-center p-1 overflow-hidden">
                <div className="h-full w-full max-w-[400px] ml-64 bg-secondary/30 border-x-2 border-secondary rounded flex items-center px-3">
                   <span className="text-[10px] font-bold text-secondary-foreground uppercase">Overlay Text Widget</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVideoListRight = () => (
    <div className="w-80 border-l bg-card flex flex-col shrink-0">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-bold text-sm uppercase tracking-wider">{t("Video Playlist")}</h2>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="group border rounded-lg p-2 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer flex gap-3">
              <div className="h-14 w-24 bg-black rounded flex items-center justify-center shrink-0">
                <Play className="h-4 w-4 text-white fill-white" />
              </div>
              <div className="flex-1 min-w-0 py-1">
                <p className="text-xs font-bold truncate">Playlist_Video_{i}.mp4</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="h-4 px-1 text-[8px] uppercase">1080p</Badge>
                  <span className="text-[10px] text-muted-foreground font-mono">03:42</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  const renderContent = () => {
    switch (mode) {
      case "carousel":
        return (
          <div className="flex flex-col flex-1 min-w-0 h-full">
            <div className="flex-1 flex min-w-0">
               {renderLeftSidebar()}
               {renderStage()}
            </div>
            {renderCarouselBottom()}
          </div>
        );
      case "video": // Video Mode (Playlist focus)
        return (
          <div className="flex items-stretch flex-1 min-w-0 h-full">
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex-1 flex min-w-0">
                 {/* Logic for Video mode specifically can be specialized */}
                 {renderStage()}
              </div>
            </div>
            {renderVideoListRight()}
          </div>
        );
      case "video_editor": // Assuming a hypothetical "clip/edit" mode or triggered state
         return (
          <div className="flex flex-col flex-1 min-w-0 h-full">
            <div className="flex-1 flex min-w-0">
               {renderStage()}
            </div>
            {renderTimelineBottom()}
          </div>
        );
      default: // image, webpage, or generic
        return (
          <div className="flex items-stretch flex-1 min-w-0 h-full">
            {renderLeftSidebar()}
            {renderStage()}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col z-50 overflow-hidden">
      {/* Editor Header */}
      <header className="h-14 border-b px-4 flex items-center justify-between shrink-0 bg-card z-20">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/media-content")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
             <div className="p-1.5 bg-primary/10 rounded">
                {mode === "carousel" ? <LayoutTemplate className="h-4 w-4 text-primary" /> : mode === "video" ? <Play className="h-4 w-4 text-primary" /> : <ImageIcon className="h-4 w-4 text-primary" />}
             </div>
             <div className="flex flex-col">
               <h1 className="text-xs font-black uppercase tracking-widest leading-none mb-0.5">{mode} DESIGNER</h1>
               <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter opacity-70">
                 {ratio} • {orientation}
               </p>
             </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 bg-muted/40 rounded-lg p-1 mr-4">
             <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase">{t("Preview")}</Button>
             <Separator orientation="vertical" className="h-4" />
             <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold uppercase">{t("Export")}</Button>
          </div>
          <Button size="sm" className="h-9 px-6 bg-primary hover:bg-primary/90 font-bold uppercase tracking-wider shadow-lg shadow-primary/20">
            <Save className="mr-2 h-4 w-4" />
            {t("Save")}
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
}
