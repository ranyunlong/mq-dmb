import * as React from "react";
import { useTranslation } from "react-i18next";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  History,
  Plus,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { cn } from "@/lib/utils";
import { 
  Schedule, 
  RepeatType, 
  MediaItem 
} from "@/types";
import { INITIAL_MEDIA_ITEMS } from "@/constants";

export function ScheduleCreator() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mediaItems] = React.useState<MediaItem[]>(INITIAL_MEDIA_ITEMS);

  // Form States
  const [formData, setFormData] = React.useState<Partial<Schedule>>({
    mediaId: "",
    repeat: "daily",
    status: "valid",
    publishStatus: "publishing",
    weeklyDays: [],
    tags: [],
    areas: []
  });
  const [tagInput, setTagInput] = React.useState("");
  const [areaInput, setAreaInput] = React.useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleAddArea = () => {
    if (areaInput.trim() && !formData.areas?.includes(areaInput.trim())) {
      setFormData({ ...formData, areas: [...(formData.areas || []), areaInput.trim()] });
      setAreaInput("");
    }
  };

  const handleCreate = () => {
    // In a real app, this would be an API call
    console.log("Creating schedule:", formData);
    
    // Simulate navigation back to list
    navigate("/schedules");
  };

  return (
    <div className="flex flex-col h-full bg-muted/20">
      {/* Top Header */}
      <div className="h-16 border-b bg-background flex items-center justify-between px-8 shrink-0 shadow-sm relative z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2 shrink-0 hover:bg-muted font-bold text-xs uppercase tracking-wider">
            <ChevronLeft className="h-4 w-4" />
            {t("Back")}
          </Button>
          <div className="h-4 w-[1px] bg-border mx-2" />
          <h1 className="text-xl font-black italic tracking-tighter uppercase text-primary">{t("New Deployment Plan")}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="rounded-xl font-bold">{t("Cancel")}</Button>
          <Button onClick={handleCreate} className="px-8 h-10 rounded-2xl font-black uppercase tracking-widest">{t("Initiate Release")}</Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto p-12 space-y-12 pb-32">
          {/* Section 1: Content & Metadata */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-primary/10 rounded-xl text-primary"><History className="h-4 w-4" /></div>
               <h2 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">{t("Resource & Tags")}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-card p-10 rounded-[32px] border shadow-sm">
              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t("Select Media")}</Label>
                <Select 
                  value={formData.mediaId} 
                  onValueChange={(v) => setFormData({...formData, mediaId: v})}
                >
                  <SelectTrigger className="h-14 rounded-2xl border-2 bg-muted/5 focus:ring-primary/20 transition-all font-bold">
                    <SelectValue placeholder={t("Choose media content...")} />
                  </SelectTrigger>
                  <SelectContent>
                    {mediaItems.filter(m => m.type === "content").map(m => (
                      <SelectItem key={m.id} value={m.id} className="font-bold">{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t("Plan Tags")}</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder={t("Add tag...")} 
                    className="h-14 rounded-2xl border-2 bg-muted/5 focus:ring-primary/20 font-bold"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} variant="secondary" className="h-14 px-8 rounded-2xl font-bold">{t("Add")}</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags?.map(tag => (
                    <Badge key={tag} className="py-2 px-4 rounded-full flex items-center gap-2 group bg-primary/10 text-primary border-none hover:bg-primary/20 transition-all">
                      <span className="text-xs font-bold">{tag}</span>
                      <Plus className="h-3.5 w-3.5 rotate-45 cursor-pointer opacity-60 hover:opacity-100" onClick={() => setFormData({...formData, tags: formData.tags?.filter(t => t !== tag)})}/>
                    </Badge>
                  ))}
                  {(!formData.tags || formData.tags.length === 0) && (
                    <span className="text-xs text-muted-foreground italic pl-2">{t("No tags added")}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Timing & Frequency */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500"><Clock className="h-4 w-4" /></div>
               <h2 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">{t("Time Window & Frequency")}</h2>
            </div>

            <div className="bg-card p-10 rounded-[32px] border shadow-sm space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t("Start Time")}</Label>
                  <Input 
                    type="datetime-local" 
                    className="h-14 rounded-2xl border-2 bg-muted/5 font-bold"
                    onChange={(e) => setFormData({...formData, startTime: new Date(e.target.value).toISOString()})}
                  />
                </div>
                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t("End Time")}</Label>
                  <Input 
                    type="datetime-local" 
                    className="h-14 rounded-2xl border-2 bg-muted/5 font-bold"
                    onChange={(e) => setFormData({...formData, endTime: new Date(e.target.value).toISOString()})}
                  />
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-dashed">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t("Execution Cycle")}</Label>
                <div className="flex gap-6">
                   <Button 
                    variant={formData.repeat === 'daily' ? 'default' : 'outline'} 
                    className={cn(
                      "h-20 flex-1 rounded-[24px] font-black text-sm space-x-3 border-2 transition-all",
                      formData.repeat === 'daily' ? "shadow-lg shadow-primary/20 scale-[1.02]" : "bg-muted/5"
                    )}
                    onClick={() => setFormData({...formData, repeat: 'daily'})}
                   >
                     <Clock className="h-5 w-5" />
                     <span>{t("Daily Pattern")}</span>
                   </Button>
                   <Button 
                    variant={formData.repeat === 'weekly' ? 'default' : 'outline'} 
                    className={cn(
                      "h-20 flex-1 rounded-[24px] font-black text-sm space-x-3 border-2 transition-all",
                      formData.repeat === 'weekly' ? "shadow-lg shadow-primary/20 scale-[1.02]" : "bg-muted/5"
                    )}
                    onClick={() => setFormData({...formData, repeat: 'weekly'})}
                   >
                     <Calendar className="h-5 w-5" />
                     <span>{t("Weekly Pattern")}</span>
                   </Button>
                </div>

                <AnimatePresence>
                  {formData.repeat === 'weekly' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0, scale: 0.95 }}
                      animate={{ height: "auto", opacity: 1, scale: 1 }}
                      exit={{ height: 0, opacity: 0, scale: 0.95 }}
                      className="overflow-hidden"
                    >
                      <div className="flex justify-between p-8 bg-muted/20 rounded-[24px] border-2 border-dashed border-primary/20">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                          <div key={day} className="flex flex-col items-center gap-3">
                             <span className="text-[11px] font-black uppercase text-muted-foreground/70">{t(day)}</span>
                             <div 
                                className={cn(
                                  "size-10 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all",
                                  formData.weeklyDays?.includes(idx) ? "bg-primary border-primary text-primary-foreground shadow-md" : "bg-background border-muted-foreground/20 hover:border-primary/50"
                                )}
                                onClick={() => {
                                  const days = formData.weeklyDays || [];
                                  const isChecked = days.includes(idx);
                                  setFormData({
                                    ...formData,
                                    weeklyDays: isChecked ? days.filter(d => d !== idx) : [...days, idx]
                                  });
                                }}
                             >
                                <Checkbox 
                                  checked={formData.weeklyDays?.includes(idx)}
                                  className="sr-only"
                                />
                                {formData.weeklyDays?.includes(idx) && <Plus className="size-5 font-black" />}
                             </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Section 3: Regions & Channels */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500"><MapPin className="h-4 w-4" /></div>
               <h2 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">{t("Distribution Areas")}</h2>
            </div>

            <div className="bg-card p-10 rounded-[32px] border shadow-sm space-y-8">
              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{t("Distribution Channels / Areas")}</Label>
                <div className="flex gap-2">
                    <Input 
                      placeholder={t("e.g. Region East, Store #421")} 
                      className="h-14 rounded-2xl border-2 bg-muted/5 focus:ring-primary/20 font-bold"
                      value={areaInput}
                      onChange={(e) => setAreaInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddArea()}
                    />
                    <Button onClick={handleAddArea} variant="secondary" className="h-14 px-8 rounded-2xl font-bold">{t("Add")}</Button>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  {formData.areas?.map(area => (
                    <Badge key={area} className="py-2.5 px-5 rounded-2xl bg-orange-500/5 text-orange-600 border-2 border-orange-500/10 font-black text-xs hover:bg-orange-500/10 transition-all flex items-center gap-2 group shadow-sm">
                      {area}
                      <Plus className="h-4 w-4 rotate-45 cursor-pointer opacity-40 hover:opacity-100" onClick={() => setFormData({...formData, areas: formData.areas?.filter(a => a !== area)})}/>
                    </Badge>
                  ))}
                  {(!formData.areas || formData.areas.length === 0) && (
                    <div className="flex items-center gap-3 text-muted-foreground/40 italic py-4 w-full justify-center border-2 border-dashed rounded-3xl">
                      <MapPin className="size-6 opacity-20" />
                      <span className="text-sm font-bold uppercase tracking-widest">{t("No areas defined")}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Footer (redundant but helpful for long forms) */}
          <div className="flex justify-end gap-4 pt-10 border-t border-dashed">
            <Button variant="ghost" size="lg" onClick={() => navigate(-1)} className="rounded-2xl font-bold px-10">{t("Cancel")}</Button>
            <Button size="lg" onClick={handleCreate} className="px-16 h-16 rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all">
              {t("Initiate Release")}
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
