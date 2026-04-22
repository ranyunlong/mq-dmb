import * as React from "react";
import { useTranslation } from "react-i18next";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  ChevronRight, 
  ArrowRight,
  List as ListIcon,
  Grid,
  CalendarDays,
  Target,
  History,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
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
  DropdownMenuTrigger,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  Schedule, 
  ScheduleStatus, 
  SchedulePublishStatus, 
  RepeatType, 
  MediaItem 
} from "@/types";
import { INITIAL_SCHEDULES, INITIAL_MEDIA_ITEMS } from "@/constants";

export function ScheduleManagement() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [schedules, setSchedules] = React.useState<Schedule[]>(INITIAL_SCHEDULES);
  const [mediaItems] = React.useState<MediaItem[]>(INITIAL_MEDIA_ITEMS);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = React.useState(false);
  const [selectedSchedule, setSelectedSchedule] = React.useState<Schedule | null>(null);

  const filteredSchedules = schedules.filter(s => 
    s.mediaName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusConfig = (status: ScheduleStatus) => {
    switch (status) {
      case "valid": return { label: t("Valid"), color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", icon: CheckCircle2 };
      case "cancelled": return { label: t("Cancelled"), color: "text-red-500 bg-red-500/10 border-red-500/20", icon: AlertCircle };
      case "overridden": return { label: t("Overridden"), color: "text-amber-500 bg-amber-500/10 border-amber-500/20", icon: Info };
      case "expired": return { label: t("Expired"), color: "text-slate-500 bg-slate-500/10 border-slate-500/20", icon: Clock };
      default: return { label: status, color: "text-muted-foreground bg-muted", icon: Info };
    }
  };

  const getPublishStatusConfig = (status: SchedulePublishStatus) => {
    switch (status) {
      case "publishing": return { label: t("Publishing"), color: "text-blue-500 bg-blue-500/10 border-blue-500/20", icon: RefreshCw, animate: "animate-spin" };
      case "completed": return { label: t("Completed"), color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", icon: CheckCircle2, animate: "" };
      default: return { label: status, color: "text-muted-foreground bg-muted", icon: RefreshCw, animate: "" };
    }
  };

  const calculateProgress = (start: string, end: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const now = new Date().getTime();
    
    if (now < startTime) return 0;
    if (now > endTime) return 100;
    
    return Math.round(((now - startTime) / (endTime - startTime)) * 100);
  };

  const handleDelete = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">{t("Schedule Management")}</h1>
          <p className="text-muted-foreground">
            {t("Plan and manage the publication lifecycle of your media content across regions.")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => navigate("/schedules/create")}>
            <Plus className="mr-2 h-4 w-4" />
            {t("Create Schedule")}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t("Search schedules, publishers, or tags...")}
              className="pl-8 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedules.map((schedule) => (
            <div 
              key={schedule.id}
              className="group relative border rounded-2xl overflow-hidden bg-card hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col"
              onClick={() => { setSelectedSchedule(schedule); setIsDetailsDialogOpen(true); }}
            >
              {/* Card Header with Status Badge */}
              <div className="p-5 border-b bg-muted/10 relative">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors line-clamp-1">{schedule.mediaName}</h3>
                    <div className="flex items-center gap-2">
                       <Badge variant="outline" className="text-[10px] font-mono h-5 bg-background">{schedule.id}</Badge>
                       <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{t(schedule.repeat)}</span>
                    </div>
                  </div>
                  <Badge className={cn("border-none text-[10px] uppercase font-bold", getStatusConfig(schedule.status).color)}>
                    {getStatusConfig(schedule.status).label}
                  </Badge>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1">
                {/* Time Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground font-bold uppercase">{t("Schedule Progress")}</span>
                    <span className="font-mono font-bold text-primary">{calculateProgress(schedule.startTime, schedule.endTime)}%</span>
                  </div>
                  <Progress value={calculateProgress(schedule.startTime, schedule.endTime)} className="h-1.5" />
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-medium">
                    <span>{new Date(schedule.startTime).toLocaleDateString()}</span>
                    <ArrowRight className="h-3 w-3 opacity-30" />
                    <span>{new Date(schedule.endTime).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">{t("Publisher")}</span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <User className="h-3.5 w-3.5 text-primary" />
                      {schedule.publisher}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">{t("Published")}</span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {new Date(schedule.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {schedule.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[9px] h-4.5 bg-primary/5 text-primary border-none lowercase px-2">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Card Footer with Publish Status */}
              <div className="p-4 border-t bg-muted/5 mt-auto">
                 <div className={cn(
                   "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-bold",
                   getPublishStatusConfig(schedule.publishStatus).color
                 )}>
                   {React.createElement(getPublishStatusConfig(schedule.publishStatus).icon, { 
                     className: cn("h-3.5 w-3.5", getPublishStatusConfig(schedule.publishStatus).animate) 
                   })}
                   {getPublishStatusConfig(schedule.publishStatus).label}
                   <div className="ml-auto font-mono opacity-80">
                     {schedule.completedTargets}/{schedule.totalTargets}
                   </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-2xl bg-card overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="font-bold">{t("Schedule Information")}</TableHead>
                <TableHead className="font-bold">{t("Time Window")}</TableHead>
                <TableHead className="font-bold">{t("Progress")}</TableHead>
                <TableHead className="font-bold text-center">{t("Repeat")}</TableHead>
                <TableHead className="font-bold">{t("Publish Status")}</TableHead>
                <TableHead className="font-bold">{t("Status")}</TableHead>
                <TableHead className="text-right font-bold">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow 
                  key={schedule.id} 
                  className="cursor-pointer group hover:bg-muted/10"
                  onClick={() => { setSelectedSchedule(schedule); setIsDetailsDialogOpen(true); }}
                >
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-sm group-hover:text-primary transition-colors">{schedule.mediaName}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{schedule.publisher}</span>
                        <div className="flex gap-1">
                          {schedule.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-[8px] h-3.5 lowercase px-1.5 opacity-60">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5 text-xs text-muted-foreground font-medium">
                      <span>{new Date(schedule.startTime).toLocaleString()}</span>
                      <span className="opacity-40">→</span>
                      <span>{new Date(schedule.endTime).toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell className="w-[180px]">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-muted-foreground uppercase">{t("Progress")}</span>
                        <span className="text-primary">{calculateProgress(schedule.startTime, schedule.endTime)}%</span>
                      </div>
                      <Progress value={calculateProgress(schedule.startTime, schedule.endTime)} className="h-1.5" />
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-bold text-[10px] uppercase text-muted-foreground italic">
                    {t(schedule.repeat)}
                  </TableCell>
                  <TableCell>
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold",
                      getPublishStatusConfig(schedule.publishStatus).color
                    )}>
                      {React.createElement(getPublishStatusConfig(schedule.publishStatus).icon, { 
                        className: cn("h-3 w-3", getPublishStatusConfig(schedule.publishStatus).animate) 
                      })}
                      {getPublishStatusConfig(schedule.publishStatus).label}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("border-none text-[10px] uppercase font-bold", getStatusConfig(schedule.status).color)}>
                      {getStatusConfig(schedule.status).label}
                    </Badge>
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
                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(schedule.id)}>
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
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] gap-0 p-0 overflow-hidden rounded-3xl">
          {selectedSchedule && (
            <div className="flex flex-col h-full max-h-[90vh]">
              {/* Detail Header */}
              <div className="p-8 bg-muted/20 border-b relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] font-mono h-5 border-primary/20 text-primary uppercase">Schedule #{selectedSchedule.id}</Badge>
                      <Badge className={cn("border-none text-[10px] uppercase font-bold", getStatusConfig(selectedSchedule.status).color)}>
                        {getStatusConfig(selectedSchedule.status).label}
                      </Badge>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight mt-2">{selectedSchedule.mediaName}</h2>
                  </div>
                  <div className={cn(
                    "flex flex-col items-end gap-1.5 p-3 rounded-2xl border bg-card/50 backdrop-blur-sm",
                    getPublishStatusConfig(selectedSchedule.publishStatus).color
                  )}>
                    <div className="flex items-center gap-2 font-black text-sm uppercase italic tracking-widest">
                       {React.createElement(getPublishStatusConfig(selectedSchedule.publishStatus).icon, { 
                         className: cn("h-4 w-4", getPublishStatusConfig(selectedSchedule.publishStatus).animate) 
                       })}
                       {getPublishStatusConfig(selectedSchedule.publishStatus).label}
                    </div>
                    <div className="font-mono text-xl font-black">
                      {Math.round((selectedSchedule.completedTargets / selectedSchedule.totalTargets) * 100)}%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-1.5 p-3 bg-card border rounded-2xl shadow-sm">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("Publisher")}</Label>
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <User className="h-4 w-4 text-primary" />
                      {selectedSchedule.publisher}
                    </div>
                  </div>
                  <div className="space-y-1.5 p-3 bg-card border rounded-2xl shadow-sm">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("Published At")}</Label>
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      {new Date(selectedSchedule.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="space-y-1.5 p-3 bg-card border rounded-2xl shadow-sm">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("Repetition")}</Label>
                    <div className="flex items-center gap-2 font-bold text-sm capitalize">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      {t(selectedSchedule.repeat)}
                    </div>
                  </div>
                  <div className="space-y-1.5 p-3 bg-card border rounded-2xl shadow-sm">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">{t("Targets")}</Label>
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Target className="h-4 w-4 text-primary" />
                      {selectedSchedule.totalTargets} {t("Units")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Content */}
              <ScrollArea className="flex-1">
                <div className="p-8 space-y-8">
                  {/* Execution Progress & Areas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary"><History className="h-4 w-4" /></div>
                        <h3 className="font-bold text-sm uppercase tracking-wider">{t("Deployment Batches")}</h3>
                      </div>
                      <div className="p-6 border rounded-3xl bg-muted/10 space-y-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs font-bold uppercase text-muted-foreground">
                            <span>{t("Plan Coverage")}</span>
                            <span className="text-foreground">{selectedSchedule.completedTargets} / {selectedSchedule.totalTargets}</span>
                          </div>
                          <Progress value={(selectedSchedule.completedTargets / selectedSchedule.totalTargets) * 100} className="h-2.5 rounded-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                             <div className="text-[10px] uppercase font-bold text-emerald-600 mb-1">{t("Successful")}</div>
                             <div className="text-xl font-black text-emerald-700">{selectedSchedule.completedTargets}</div>
                           </div>
                           <div className="p-3 bg-slate-500/5 border border-slate-500/10 rounded-2xl">
                             <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">{t("Pending")}</div>
                             <div className="text-xl font-black text-slate-700">{selectedSchedule.totalTargets - selectedSchedule.completedTargets}</div>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary"><MapPin className="h-4 w-4" /></div>
                        <h3 className="font-bold text-sm uppercase tracking-wider">{t("Release Areas")}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedSchedule.areas.map(area => (
                          <Badge key={area} variant="outline" className="px-3 py-2 rounded-xl bg-card font-bold border-muted-foreground/10">
                            {area}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-2 mt-4">
                         <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                           <Info className="h-4 w-4" /> {t("Tags")}
                         </h3>
                         <div className="flex flex-wrap gap-2">
                           {selectedSchedule.tags.map(tag => (
                             <Badge key={tag} className="bg-primary/10 text-primary border-none hover:bg-primary/20 cursor-default">
                               {tag}
                             </Badge>
                           ))}
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Publish Logs */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                        <History className="h-4 w-4 font-bold" /> {t("Publishing Logs")}
                      </h3>
                      <Badge variant="secondary" className="font-mono text-[10px]">{selectedSchedule.publishLogs?.length} ENTRIES</Badge>
                    </div>
                    <div className="border rounded-3xl overflow-hidden bg-card shadow-inner">
                      <div className="p-4 space-y-3">
                        {selectedSchedule.publishLogs?.map((log, idx) => (
                          <div key={idx} className="flex gap-4 text-xs group border-b border-muted last:border-0 pb-3 last:pb-0">
                            <span className="font-mono text-muted-foreground shrink-0 select-none">[{log.timestamp}]</span>
                            <div className="space-y-1">
                               <Badge variant="outline" className="text-[8px] h-3.5 px-1 uppercase border-primary/30 text-primary font-bold">{log.stage}</Badge>
                               <p className="text-muted-foreground font-medium group-hover:text-foreground transition-colors">{log.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <DialogFooter className="p-6 border-t bg-muted/30">
                <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)} className="rounded-xl">{t("Close")}</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
