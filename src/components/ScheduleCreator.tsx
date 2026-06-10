import * as React from "react";
import { useTranslation } from "react-i18next";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  History,
  ChevronLeft,
  Filter,
  Check,
  Search,
  X,
  Tag,
  ChevronRight,
  ChevronDown,
  Building2,
  FolderTree,
  FileVideo,
  ArrowRight,
  CheckCircle2,
  CalendarDays,
  Sparkles,
  Info,
  ZoomIn,
  ZoomOut,
  Plus
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Schedule } from "@/types";
import { INITIAL_SCHEDULES } from "@/constants";

interface StoreAreaItem {
  id: string;
  name: string;
  type: "area" | "store";
  parentAreaId?: string; // e.g. belonging to a region
  screenTags: string[]; // Screen tags of downstream screens
}

const MOCK_STORES_AND_AREAS: StoreAreaItem[] = [
  { id: "area-east", name: "East Region (华东区域)", type: "area", screenTags: ["Main", "4K", "Promo"] },
  { id: "area-north", name: "North Region (华北区域)", type: "area", screenTags: ["Extended", "HD", "Text"] },
  { id: "area-south", name: "South Region (华南区域)", type: "area", screenTags: ["Audio-Only", "Main", "Promo"] },
  { id: "store-sh-flagship", name: "Shanghai Flagship Store (上海旗舰店)", type: "store", parentAreaId: "area-east", screenTags: ["Main", "4K", "Promo"] },
  { id: "store-bj-cbd", name: "Beijing CBD Store (北京CBD店)", type: "store", parentAreaId: "area-north", screenTags: ["Extended", "HD", "Main"] },
  { id: "store-hz-hub", name: "Hangzhou Hub Store (杭州枢纽店)", type: "store", parentAreaId: "area-east", screenTags: ["Main", "Promo"] },
  { id: "store-nj-center", name: "Nanjing Center Store (南京中心店)", type: "store", parentAreaId: "area-east", screenTags: ["4K", "HD"] },
  { id: "store-gz-mall", name: "Guangzhou Mall Store (广州商圈店)", type: "store", parentAreaId: "area-south", screenTags: ["Audio-Only", "Promo"] },
  { id: "store-sz-tech", name: "Shenzhen Tech Store (深圳科技园店)", type: "store", parentAreaId: "area-south", screenTags: ["4K", "Main", "HD"] }
];

const ALL_SCREEN_TAGS = ["Main", "4K", "Promo", "Extended", "HD", "Audio-Only", "Text"];

// Safe math to generate arrays of dates between a range
const getDaysRange = (startStr: string, endStr: string) => {
  const dates: Date[] = [];
  if (!startStr || !endStr) return dates;
  const start = new Date(startStr);
  const end = new Date(endStr);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
    return dates;
  }
  
  const current = new Date(start);
  current.setHours(0, 0, 0, 0);
  const limit = new Date(end);
  limit.setHours(23, 59, 59, 999);
  
  // Guardrail limit to maximum 31 days to avoid infinite/huge render footprints
  let count = 0;
  while (current <= limit && count < 31) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
    count++;
  }
  return dates;
};

const getDateKey = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export function ScheduleCreator() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");

  // Wizard Steps (Step 1, Step 2, and Step 3)
  const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3>(1);

  // Available play resources list
  const AVAILABLE_CONTENTS = React.useMemo(() => [
    { id: "c1", name: "元气森林夏季推广.mp4", type: "video" },
    { id: "c2", name: "必胜客新品海报.png", type: "image" },
    { id: "c3", name: "商场紧急广播须知.txt", type: "notice" },
    { id: "c4", name: "默认循环播放源", type: "default" },
    { id: "c5", name: "客流热力导引H5组件", type: "interactive" },
  ], []);

  // Step 2 Screen-based states
  const [screens, setScreens] = React.useState<string[]>(["1#", "2#", "3#"]);
  const [screenSchedules, setScreenSchedules] = React.useState<Record<string, Record<number, string>>>({});

  // Dynamic initialization / addition of screen schedules
  React.useEffect(() => {
    if (editId) return; // Skip default prepopulation when editing an existing schedule
    setScreenSchedules(prev => {
      const next = { ...prev };
      screens.forEach((scr) => {
        if (!next[scr]) {
          next[scr] = {};
          // Prepopulate beautiful mock items for hours 8..22
          for (let h = 8; h <= 22; h++) {
            if (h % 5 === 0) {
              next[scr][h] = AVAILABLE_CONTENTS[0].name;
            } else if (h % 5 === 2) {
              next[scr][h] = AVAILABLE_CONTENTS[1].name;
            } else if (h % 5 === 4) {
              next[scr][h] = AVAILABLE_CONTENTS[3].name;
            } else {
              next[scr][h] = "OFF";
            }
          }
        }
      });
      return next;
    });
  }, [screens, AVAILABLE_CONTENTS, editId]);

  // Form States consolidated
  const [formData, setFormData] = React.useState<Partial<Schedule>>({
    name: "",
    status: "valid",
    publishStatus: "publishing",
    tags: [],
    areas: []
  });

  const [startDateStr, setStartDateStr] = React.useState("");
  const [endDateStr, setEndDateStr] = React.useState("");

  // Load existing schedule for edit
  React.useEffect(() => {
    if (editId) {
      const saved = localStorage.getItem("schedules");
      const list = saved ? JSON.parse(saved) : INITIAL_SCHEDULES;
      const target = list.find((s: any) => s.id === editId);
      if (target) {
        setFormData({
          name: target.mediaName || target.name || "",
          status: target.status,
          publishStatus: target.publishStatus,
          tags: target.tags || [],
          areas: target.areas || [],
        });
        if (target.startTime) {
          setStartDateStr(target.startTime.slice(0, 10));
        }
        if (target.endTime) {
          setEndDateStr(target.endTime.slice(0, 10));
        }
        if (target.screens) {
          setScreens(target.screens);
        }
        if (target.screenSchedules) {
          setScreenSchedules(target.screenSchedules);
        }
      }
    }
  }, [editId]);

  const handleSaveBasicInfo = () => {
    if (!formData.name?.trim()) {
      alert("请输入计划名称");
      return;
    }
    if (!startDateStr || !endDateStr) {
      alert("请输入有效日期范围");
      return;
    }
    if (!formData.areas || formData.areas.length === 0) {
      alert("请至少选择一个发布的门店/区域范围");
      return;
    }

    const saved = localStorage.getItem("schedules");
    const list = saved ? JSON.parse(saved) : INITIAL_SCHEDULES;

    const updated = list.map((s: any) => {
      if (s.id === editId) {
        return {
          ...s,
          mediaName: formData.name,
          name: formData.name,
          startTime: `${startDateStr}T00:00:00Z`,
          endTime: `${endDateStr}T23:59:59Z`,
          areas: formData.areas || [],
        };
      }
      return s;
    });

    localStorage.setItem("schedules", JSON.stringify(updated));
    navigate("/schedules");
  };

  // Store/Area tree selectors and Search filters
  const [selectedScreenTags, setSelectedScreenTags] = React.useState<string[]>([]);
  const [storeSearchQuery, setStoreSearchQuery] = React.useState("");

  // Grid Active Hours: Record<"YYYY-MM-DD", Array<number (0..23)>>
  const [activeHours, setActiveHours] = React.useState<Record<string, number[]>>({});

  // Step 3 Date-based schedules state
  const [dateSchedules, setDateSchedules] = React.useState<Record<string, Record<number, string>>>({});

  // Expanded regions management
  const [expandedRegions, setExpandedRegions] = React.useState<Record<string, boolean>>({
    "area-east": true,
    "area-north": true,
    "area-south": true,
  });

  // Cell editing popover states
  const [editingCell, setEditingCell] = React.useState<{
    screen?: string;
    dateKey?: string;
    hour: number;
    type: "screen" | "date";
  } | null>(null);

  // Batch insert model state
  const [batchInsertModalOpen, setBatchInsertModalOpen] = React.useState(false);
  const [batchInsertForm, setBatchInsertForm] = React.useState({
    selectedContent: "元气森林夏季推广.mp4",
    startHour: 9,
    endHour: 18,
    targetDaysType: "all" as "all" | "weekdays" | "weekends"
  });

  const [zoom, setZoom] = React.useState<number>(1.0); // 0.6 to 2.0

  // Drag to scroll states
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = React.useState({
    isDragging: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setDragState({
      isDragging: true,
      startX: e.pageX - scrollRef.current.offsetLeft,
      startY: e.pageY - scrollRef.current.offsetTop,
      scrollLeft: scrollRef.current.scrollLeft,
      scrollTop: scrollRef.current.scrollTop
    });
  };

  const handleMouseLeave = () => {
    setDragState(prev => ({ ...prev, isDragging: false }));
  };

  const handleMouseUp = () => {
    setDragState(prev => ({ ...prev, isDragging: false }));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const y = e.pageY - scrollRef.current.offsetTop;
    const walkX = (x - dragState.startX) * 1.5; // Scroll speed multiplier
    const walkY = (y - dragState.startY) * 1.5;
    scrollRef.current.scrollLeft = dragState.scrollLeft - walkX;
    scrollRef.current.scrollTop = dragState.scrollTop - walkY;
  };

  const handleStartDateChange = (val: string) => {
    setStartDateStr(val);
    if (val) {
      setFormData(prev => ({ ...prev, startTime: new Date(val).toISOString() }));
    }
  };

  const handleEndDateChange = (val: string) => {
    setEndDateStr(val);
    if (val) {
      setFormData(prev => ({ ...prev, endTime: new Date(val).toISOString() }));
    }
  };

  const daysList = React.useMemo(() => {
    return getDaysRange(startDateStr, endDateStr);
  }, [startDateStr, endDateStr]);

  // Sync / Initialize full active hours daily whenever date changes
  React.useEffect(() => {
    if (daysList.length > 0) {
      setActiveHours(prev => {
        const next = { ...prev };
        daysList.forEach(day => {
          const key = getDateKey(day);
          if (!next[key]) {
            // Default select all 24 hours
            next[key] = Array.from({ length: 24 }, (_, i) => i);
          }
        });
        return next;
      });

      setDateSchedules(prev => {
        const next = { ...prev };
        daysList.forEach((day, index) => {
          const key = getDateKey(day);
          if (!next[key]) {
            next[key] = {};
            // Prepopulate alternate mock content for hours 9..21
            for (let h = 9; h <= 21; h++) {
              if ((h + index) % 4 === 0) {
                next[key][h] = AVAILABLE_CONTENTS[0].name; // Video
              } else if ((h + index) % 4 === 1) {
                next[key][h] = AVAILABLE_CONTENTS[1].name; // Image
              } else if ((h + index) % 4 === 2) {
                next[key][h] = AVAILABLE_CONTENTS[4].name; // Interactive H5
              } else {
                next[key][h] = AVAILABLE_CONTENTS[3].name; // Default channel
              }
            }
          }
        });
        return next;
      });
    }
  }, [daysList, AVAILABLE_CONTENTS]);

  // Screen layout utility controllers
  const handleAddScreen = (name?: string) => {
    const defaultName = `${screens.length + 1}#`;
    setScreens(prev => [...prev, name || defaultName]);
  };

  const handleUpdateScreenCell = (screen: string, hour: number, contentName: string) => {
    setScreenSchedules(prev => ({
      ...prev,
      [screen]: {
        ...(prev[screen] || {}),
        [hour]: contentName
      }
    }));
  };

  const handleUpdateDateCell = (dateKey: string, hour: number, contentName: string) => {
    setDateSchedules(prev => ({
      ...prev,
      [dateKey]: {
        ...(prev[dateKey] || {}),
        [hour]: contentName
      }
    }));
  };

  const handleBatchInsertAction = () => {
    const { selectedContent, startHour, endHour, targetDaysType } = batchInsertForm;
    setDateSchedules(prev => {
      const next = { ...prev };
      daysList.forEach(day => {
        const key = getDateKey(day);
        const dayOfWeek = day.getDay(); // 0 is Sun, 6 is Sat
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        let matches = true;
        if (targetDaysType === "weekdays" && isWeekend) matches = false;
        if (targetDaysType === "weekends" && !isWeekend) matches = false;

        if (matches) {
          if (!next[key]) next[key] = {};
          const minH = Math.min(startHour, endHour);
          const maxH = Math.max(startHour, endHour);
          for (let h = minH; h <= maxH; h++) {
            next[key][h] = selectedContent;
          }
        }
      });
      return next;
    });
    setBatchInsertModalOpen(false);
  };

  // Screen Tag Toggling filter 
  const handleToggleScreenTag = (tag: string) => {
    setSelectedScreenTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Build Filtered store/regional tree
  const filteredTreeData = React.useMemo(() => {
    const regions = MOCK_STORES_AND_AREAS.filter(item => item.type === "area");
    
    return regions.map(region => {
      const children = MOCK_STORES_AND_AREAS.filter(item => 
        item.type === "store" && 
        item.parentAreaId === region.id
      );

      const filteredChildren = children.filter(child => {
        const matchesSearch = child.name.toLowerCase().includes(storeSearchQuery.toLowerCase());
        const matchesTags = selectedScreenTags.length === 0 || 
          selectedScreenTags.some(tag => child.screenTags.includes(tag));
        return matchesSearch && matchesTags;
      });

      const regionMatchesSearch = region.name.toLowerCase().includes(storeSearchQuery.toLowerCase());
      const regionMatchesTags = selectedScreenTags.length === 0 || 
        selectedScreenTags.some(tag => region.screenTags.includes(tag));

      const isVisible = (regionMatchesSearch && regionMatchesTags) || filteredChildren.length > 0;

      return {
        region,
        filteredChildren,
        isVisible
      };
    }).filter(r => r.isVisible);
  }, [storeSearchQuery, selectedScreenTags]);

  const matchCount = React.useMemo(() => {
    return filteredTreeData.reduce((acc, curr) => {
      return acc + 1 + curr.filteredChildren.length;
    }, 0);
  }, [filteredTreeData]);

  // Hierarchy toggle
  const handleToggleItem = (id: string, type: "area" | "store") => {
    const currentAreas = formData.areas || [];
    
    if (type === "area") {
      const childrenIds = MOCK_STORES_AND_AREAS
        .filter(item => item.type === "store" && item.parentAreaId === id)
        .map(item => item.id);
      
      const isParentSelected = currentAreas.includes(id);
      
      if (isParentSelected) {
        const newAreas = currentAreas.filter(aId => aId !== id && !childrenIds.includes(aId));
        setFormData(prev => ({ ...prev, areas: newAreas }));
      } else {
        const newAreas = Array.from(new Set([...currentAreas, id, ...childrenIds]));
        setFormData(prev => ({ ...prev, areas: newAreas }));
      }
    } else {
      const isSelected = currentAreas.includes(id);
      let newAreas = isSelected 
        ? currentAreas.filter(a => a !== id) 
        : [...currentAreas, id];
      
      const childStore = MOCK_STORES_AND_AREAS.find(item => item.id === id);
      if (childStore?.parentAreaId) {
        const parentId = childStore.parentAreaId;
        const siblingIds = MOCK_STORES_AND_AREAS
          .filter(item => item.type === "store" && item.parentAreaId === parentId)
          .map(item => item.id);
        
        const allSiblingsSelected = siblingIds.every(sId => newAreas.includes(sId));
        
        if (allSiblingsSelected) {
          newAreas = Array.from(new Set([...newAreas, parentId]));
        } else {
          newAreas = newAreas.filter(aId => aId !== parentId);
        }
      }
      
      setFormData(prev => ({ ...prev, areas: newAreas }));
    }
  };

  const toggleRegionExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRegions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAllFiltered = () => {
    const currentAreas = formData.areas || [];
    const allFilteredIds: string[] = [];
    
    filteredTreeData.forEach(item => {
      allFilteredIds.push(item.region.id);
      item.filteredChildren.forEach(child => {
        allFilteredIds.push(child.id);
      });
    });

    const newAreas = Array.from(new Set([...currentAreas, ...allFilteredIds]));
    setFormData(prev => ({ ...prev, areas: newAreas }));
  };

  const handleDeselectAllFiltered = () => {
    const currentAreas = formData.areas || [];
    const allFilteredIds: string[] = [];
    
    filteredTreeData.forEach(item => {
      allFilteredIds.push(item.region.id);
      item.filteredChildren.forEach(child => {
        allFilteredIds.push(child.id);
      });
    });

    const newAreas = currentAreas.filter(id => !allFilteredIds.includes(id));
    setFormData(prev => ({ ...prev, areas: newAreas }));
  };

  // Helper formats for columns
  const getDayFormat = (date: Date) => {
    const isZh = i18n.language === "zh";
    const weekdaysZh = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const weekdaysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    const dayName = isZh ? weekdaysZh[date.getDay()] : weekdaysEn[date.getDay()];
    const dateLabel = `${date.getMonth() + 1}/${date.getDate()}`;
    return { dayName, dateLabel };
  };

  // Grid specific updates
  const handleToggleCell = (dateKey: string, hour: number) => {
    setActiveHours(prev => {
      const current = prev[dateKey] || [];
      const updated = current.includes(hour)
        ? current.filter(h => h !== hour)
        : [...current, hour].sort((a, b) => a - b);
      return { ...prev, [dateKey]: updated };
    });
  };

  // Quick helper select actions for the timeline hours
  const handleAllHoursAllDays = (enable: boolean) => {
    setActiveHours(prev => {
      const next = { ...prev };
      daysList.forEach(day => {
        const key = getDateKey(day);
        next[key] = enable ? Array.from({ length: 24 }, (_, i) => i) : [];
      });
      return next;
    });
  };

  const handleWorkHoursAllDays = () => {
    setActiveHours(prev => {
      const next = { ...prev };
      const workHours = Array.from({ length: 15 }, (_, i) => i + 8); // 8:00 to 22:00
      daysList.forEach(day => {
        const key = getDateKey(day);
        next[key] = workHours;
      });
      return next;
    });
  };

  const handleToggleDayColumn = (dateKey: string) => {
    setActiveHours(prev => {
      const current = prev[dateKey] || [];
      // If any is present, toggle between none and full 24h
      const updated = current.length === 24 ? [] : Array.from({ length: 24 }, (_, i) => i);
      return { ...prev, [dateKey]: updated };
    });
  };

  const handleToggleHourRow = (hour: number) => {
    setActiveHours(prev => {
      const next = { ...prev };
      // Check if this hour is active in all days
      const allActive = daysList.every(day => {
        const key = getDateKey(day);
        return (next[key] || []).includes(hour);
      });

      daysList.forEach(day => {
        const key = getDateKey(day);
        const current = next[key] || [];
        if (allActive) {
          next[key] = current.filter(h => h !== hour);
        } else if (!current.includes(hour)) {
          next[key] = [...current, hour].sort((a, b) => a - b);
        }
      });
      return next;
    });
  };

  // Step Change trigger (Step 1 validation)
  const handleGoToStep2 = () => {
    if (!formData.name?.trim()) {
      alert(t("Please enter a plan name") || "请输入计划名称");
      return;
    }
    if (!startDateStr || !endDateStr) {
      alert(t("Please enter a valid date range") || "请输入有效日期范围");
      return;
    }
    const daysCount = daysList.length;
    if (daysCount === 0) {
      alert(t("Please enter a valid date range") || "请输入有效日期范围");
      return;
    }
    if (!formData.areas || formData.areas.length === 0) {
      alert(t("Please select at least one store or region") || "请至少选择一个目标门店或区域");
      return;
    }

    setCurrentStep(2);
  };

  const handleGoToStep3 = () => {
    setCurrentStep(3);
  };

  const handleCreate = () => {
    const saved = localStorage.getItem("schedules");
    const list = saved ? JSON.parse(saved) : INITIAL_SCHEDULES;

    const newSchedule: Schedule = {
      id: `s${Date.now()}`,
      startTime: startDateStr ? `${startDateStr}T00:00:00Z` : new Date().toISOString(),
      endTime: endDateStr ? `${endDateStr}T23:59:59Z` : new Date(Date.now() + 86400000 * 7).toISOString(),
      mediaId: "m1",
      mediaName: formData.name || "未命名日程",
      name: formData.name || "未命名日程",
      repeat: "daily",
      tags: formData.tags || [],
      status: "valid",
      publishStatus: "publishing",
      areas: formData.areas || [],
      publisher: "Admin User",
      publishedAt: new Date().toISOString(),
      totalTargets: formData.areas?.length || 1,
      completedTargets: 0,
      screens,
      screenSchedules
    };

    const nextList = [newSchedule, ...list];
    localStorage.setItem("schedules", JSON.stringify(nextList));
    navigate("/schedules");
  };

  // Count total play blocks chosen
  const totalActiveSlotsCount = React.useMemo(() => {
    let sum = 0;
    daysList.forEach(day => {
      const key = getDateKey(day);
      sum += (activeHours[key] || []).length;
    });
    return sum;
  }, [daysList, activeHours]);

  return (
    <div className="flex flex-col h-full bg-muted/20">
      {/* Top Header Section */}
      <div className="h-16 border-b bg-background flex items-center justify-between px-8 shrink-0 shadow-sm relative z-50">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              if (currentStep === 3) {
                setCurrentStep(2);
              } else if (currentStep === 2) {
                setCurrentStep(1);
              } else {
                navigate(-1);
              }
            }} 
            className="gap-2 shrink-0 hover:bg-muted font-bold text-xs uppercase tracking-wider"
          >
            <ChevronLeft className="h-4 w-4" />
            {currentStep > 1 ? t("Previous Step") || "上一步" : t("Back")}
          </Button>
          <div className="h-4 w-[1px] bg-border mx-2" />
          <h1 className="text-xl font-black italic tracking-tighter uppercase text-primary">
            {editId ? (t("Edit Basic Info") || "编辑基本信息") : (t("New Deployment Plan") || "全新投播发布日程")}
          </h1>
        </div>

        {/* Wizard Progress Steps Inline Badge */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-muted rounded-full border text-xs font-bold shrink-0">
          <span className={cn(
            "h-5 w-5 rounded-full flex items-center justify-center text-[10px]",
            currentStep === 1 ? "bg-primary text-primary-foreground font-black" : "bg-muted-foreground/20 text-muted-foreground"
          )}>1</span>
          <span className={currentStep === 1 ? "text-primary font-bold animate-pulse" : "text-muted-foreground"}>{t("Configuration") || "配置信息"}</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground/60 mx-1" />
          
          <span className={cn(
            "h-5 w-5 rounded-full flex items-center justify-center text-[10px]",
            currentStep === 2 ? "bg-primary text-primary-foreground font-black" : "bg-muted-foreground/20 text-muted-foreground"
          )}>2</span>
          <span className={currentStep === 2 ? "text-primary font-bold animate-pulse" : "text-muted-foreground"}>{t("Screen Layout") || "屏幕排期"}</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground/60 mx-1" />

          <span className={cn(
            "h-5 w-5 rounded-full flex items-center justify-center text-[10px]",
            currentStep === 3 ? "bg-primary text-primary-foreground font-black" : "bg-muted-foreground/20 text-muted-foreground"
          )}>3</span>
          <span className={currentStep === 3 ? "text-primary font-bold animate-pulse" : "text-muted-foreground"}>{t("Date Layout") || "日期排期"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="rounded-xl font-bold">
            {t("Cancel")}
          </Button>
          {currentStep === 1 ? (
            <Button onClick={handleGoToStep2} className="px-6 h-10 rounded-xl font-black uppercase tracking-wider gap-2">
              <span>{t("Next Step: Screen Schedules") || "下一步：屏幕排期"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : currentStep === 2 ? (
            <Button onClick={handleGoToStep3} className="px-6 h-10 rounded-xl font-black uppercase tracking-wider gap-2">
              <span>{t("Next Step: Daily Grid") || "下一步：日期排期"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleCreate} className="px-8 h-10 rounded-xl font-black uppercase tracking-widest bg-emerald-600 hover:bg-emerald-500 hover:shadow-emerald-500/10">
              {t("Initiate Release") || "开始发布投播"}
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="w-full p-4 md:p-6 pb-20">
          
          <div className="bg-card border rounded-[24px] shadow-sm p-4 md:p-6 lg:p-8 space-y-6">
            
            {/* Header detail banner */}
            <div className="flex justify-between items-start flex-wrap gap-4 border-b pb-6">
              <div>
                <h2 className="text-lg font-black uppercase tracking-tight text-foreground flex items-center gap-2.5">
                  <FolderTree className="h-5 w-5 text-primary" />
                  {t("Deploy Campaign Schedule Form") || "创建日程计划"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {currentStep === 1 
                    ? t("Set your campaign identity, schedule timeframe dates and map region hierarchies.") || "设置计划名称、日期范围、并配置发布 门店/区域范围"
                    : currentStep === 2
                    ? t("Configure screen terminals and schedule fine-grained content timelines individually.") || "屏幕排期视图：针对目标门店的不同终端（1#、2#、3#屏幕）分配特定的播放内容"
                    : t("Verify and adjust dynamic schedules day-by-day with customized contents insertion.") || "日期排期视图：沿横向日期（按天）与纵向时刻（0-24小时）编辑特定播控规则"
                  }
                </p>
              </div>

              {currentStep > 1 && (
                <div className="flex gap-4 p-3 bg-muted/30 border rounded-2xl text-[11px]">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground font-medium">{t("Active Days Range") || "发布周期"}:</span>
                    <span className="font-extrabold text-primary text-sm">{daysList.length} {t("Days") || "天"}</span>
                  </div>
                  <div className="w-[1px] bg-border mx-1" />
                  <div className="flex flex-col">
                    <span className="text-muted-foreground font-medium">{t("Screen Count") || "发布终端数"}:</span>
                    <span className="font-extrabold text-blue-600 text-sm">{screens.length} {t("Screens") || "个屏幕"}</span>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 1 VIEW PLAYER */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Left Column: Basic Details & Time Setup (5 spans) */}
                <div className="lg:col-span-5 space-y-8">
                  
                  {/* 1. Basic Specifications */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <History className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-black uppercase tracking-wider text-muted-foreground/80">
                        {t("Campaign Details") || "计划名称"}
                      </span>
                    </div>

                    <div className="space-y-4 rounded-2xl bg-muted/20 p-5 border border-muted/30">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">
                          {t("Plan Name")} *
                        </Label>
                        <Input 
                          placeholder={t("Enter deployment plan name...")} 
                          className="h-11 rounded-lg border bg-background focus:ring-primary/20 font-bold text-xs"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Scheduling Window */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-500">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-black uppercase tracking-wider text-muted-foreground/80">
                        {t("Date Window") || "日期范围"} *
                      </span>
                    </div>

                    <div className="space-y-4 rounded-2xl bg-muted/20 p-5 border border-muted/30">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-[#0D9488]">
                          {t("Date Range Selection") || "日期选择"}
                        </Label>
                        <div className="flex items-center gap-2 h-11 w-full rounded-lg border bg-background font-bold text-xs px-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                          <input 
                            type="date" 
                            className="bg-transparent border-none outline-none w-full text-center h-full cursor-pointer focus:ring-0 select-none text-foreground"
                            value={startDateStr}
                            onChange={(e) => handleStartDateChange(e.target.value)}
                          />
                          <span className="text-muted-foreground font-medium px-2 shrink-0">至</span>
                          <input 
                            type="date" 
                            className="bg-transparent border-none outline-none w-full text-center h-full cursor-pointer focus:ring-0 select-none text-foreground"
                            value={endDateStr}
                            onChange={(e) => handleEndDateChange(e.target.value)}
                            min={startDateStr}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2.5 bg-background rounded-lg border border-dashed border-border text-[10px] text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 text-primary shrink-0 animate-pulse" />
                        <span>{t("Schedule validity is computed automatically between start and end dates.") || "系统将根据选择的起始和结束日期，自动计算排期的有效天数范围。"}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Beautiful Hierarchical Nodes Tree (7 spans) */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* Section Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-orange-500">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-black uppercase tracking-wider text-muted-foreground/80">
                        {t("Target Store & Region Tree Hierarchy") || "发布 门店/区域范围"} *
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 border border-primary/25 rounded-full text-[10px] font-bold text-primary">
                      <span>{t("Selected")}:</span>
                      <span className="font-extrabold">{ (formData.areas || []).length }</span>
                    </div>
                  </div>

                  {/* FILTERS PANEL */}
                  <div className="space-y-4 p-4 rounded-2xl bg-muted/20 border border-muted/40">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Filter className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground/80">
                          {t("Filter Tree by Device / Screen Tags")}
                        </span>
                      </div>
                      {selectedScreenTags.length >> 0 || selectedScreenTags.length > 0 ? (
                        <Button 
                          variant="ghost" 
                          size="xs" 
                          onClick={() => setSelectedScreenTags([])} 
                          className="h-5 text-[9px] font-bold gap-1 text-red-500 hover:bg-red-500/5 px-1.5"
                        >
                          <X className="h-2.5 w-2.5" />
                          {t("Reset Filter")}
                        </Button>
                      ) : null}
                    </div>

                    {/* Filter Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {ALL_SCREEN_TAGS.map(tag => {
                        const isSelected = selectedScreenTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleToggleScreenTag(tag)}
                            className={cn(
                              "relative px-2.5 py-1 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1 cursor-pointer select-none",
                              isSelected 
                                ? "bg-primary border-primary text-primary-foreground shadow-sm" 
                                : "bg-background border-border text-muted-foreground hover:bg-muted/35"
                            )}
                          >
                            <Tag className={cn("h-2.5 w-2.5", isSelected ? "text-primary-foreground" : "text-muted-foreground")} />
                            <span>{tag}</span>
                            {isSelected && <Check className="h-2.5 w-2.5 ml-0.5" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Search inside stores tree */}
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input 
                        type="text"
                        placeholder={t("Search stores or regions by name...")}
                        className="pl-8 h-9 rounded-lg text-xs bg-background border-border"
                        value={storeSearchQuery}
                        onChange={(e) => setStoreSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Locations list controls */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                        {t("Tree Structure Matches")} ({matchCount})
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="xs" 
                          onClick={handleSelectAllFiltered}
                          className="h-6 text-[9px] font-bold px-2 rounded-md"
                          disabled={matchCount === 0}
                        >
                          {t("Select All")}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="xs" 
                          onClick={handleDeselectAllFiltered}
                          className="h-6 text-[9px] font-bold px-2 rounded-md"
                          disabled={matchCount === 0}
                        >
                          {t("Clear All")}
                        </Button>
                      </div>
                    </div>

                    {/* MAIN HIERARCHICAL TREE COMPONENT */}
                    <div className="border rounded-2xl overflow-hidden divide-y divide-border/60 bg-card">
                      {filteredTreeData.length > 0 ? (
                        filteredTreeData.map(({ region, filteredChildren }) => {
                          const isRegionSelected = (formData.areas || []).includes(region.id);
                          const isExpanded = !!expandedRegions[region.id];
                          
                          return (
                            <div key={region.id} className="flex flex-col">
                              
                              {/* Region / Area Row (Parent level) */}
                              <div 
                                onClick={() => handleToggleItem(region.id, "area")}
                                className={cn(
                                  "flex items-center justify-between p-3 cursor-pointer hover:bg-muted/35 select-none",
                                  isRegionSelected && "bg-primary/5 hover:bg-primary/5"
                                )}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  
                                  {/* Expand/Collapse arrow */}
                                  <button 
                                    type="button"
                                    onClick={(e) => toggleRegionExpand(region.id, e)}
                                    className="p-1 rounded hover:bg-muted/60 transition-colors cursor-pointer shrink-0"
                                  >
                                    {isExpanded ? (
                                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </button>

                                  <Checkbox 
                                    checked={isRegionSelected} 
                                    onCheckedChange={() => handleToggleItem(region.id, "area")}
                                    onClick={(e) => e.stopPropagation()} 
                                  />

                                  <div className="flex items-center gap-2 min-w-0">
                                    <Building2 className="h-4 w-4 text-blue-500 shrink-0" />
                                    <span className={cn(
                                      "text-xs font-black truncate",
                                      isRegionSelected ? "text-primary font-extrabold" : "text-card-foreground"
                                    )}>
                                      {region.name}
                                    </span>
                                    <Badge 
                                      variant="secondary" 
                                      className="text-[8px] uppercase font-bold py-0 h-4 px-1.5 border-none bg-blue-500/10 text-blue-600 dark:bg-blue-500/20"
                                    >
                                      {t("Area")}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-[10px] text-muted-foreground font-medium">
                                    {filteredChildren.length} {t("Stores")}
                                  </span>
                                  {isRegionSelected && (
                                    <div className="h-4.5 w-4.5 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Stores Row container (Child level, indented) */}
                              {isExpanded && filteredChildren.length > 0 && (
                                <div className="bg-muted/10 divide-y divide-border/40 pl-8.5 relative border-t border-border/40">
                                  
                                  {/* Vertical tree bracket guide line */}
                                  <div className="absolute left-[25px] top-0 bottom-4 w-[1px] bg-border/80" />

                                  {filteredChildren.map((child) => {
                                    const isChildSelected = (formData.areas || []).includes(child.id);
                                    return (
                                      <div 
                                        key={child.id}
                                        onClick={() => handleToggleItem(child.id, "store")}
                                        className={cn(
                                          "flex items-center justify-between p-3 pr-4 pl-3.5 cursor-pointer hover:bg-muted/30 transition-colors select-none relative",
                                          isChildSelected && "bg-primary/5 hover:bg-primary/5"
                                        )}
                                      >
                                        {/* Horizontal guide line connector */}
                                        <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-4 h-[1px] bg-border/80" />

                                        <div className="flex items-center gap-2.5 min-w-0">
                                          <Checkbox 
                                            checked={isChildSelected} 
                                            onCheckedChange={() => handleToggleItem(child.id, "store")}
                                            onClick={(e) => e.stopPropagation()} 
                                          />
                                          
                                          <div className="min-w-0">
                                            <div className="flex items-center gap-1.5">
                                              <span className={cn(
                                                "text-xs truncate font-medium",
                                                isChildSelected ? "text-primary font-bold" : "text-card-foreground/80"
                                              )}>
                                                {child.name}
                                              </span>
                                              <Badge 
                                                variant="secondary" 
                                                className="text-[8px] font-bold py-0 h-4 px-1 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 border-none"
                                              >
                                                {t("Store")}
                                              </Badge>
                                            </div>

                                            {/* Mini tag chips */}
                                            <div className="flex flex-wrap gap-1 mt-1">
                                              {child.screenTags.map(tag => (
                                                <span 
                                                  key={tag} 
                                                  className={cn(
                                                    "text-[8px] px-1.5 py-0.2 rounded font-mono font-medium border",
                                                    selectedScreenTags.includes(tag)
                                                      ? "bg-primary/10 border-primary/25 text-primary"
                                                      : "bg-background border-border text-muted-foreground/80"
                                                  )}
                                                >
                                                  {tag}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        </div>

                                        {isChildSelected && (
                                          <div className="h-4.5 w-4.5 bg-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
                                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                                          </div>
                                        )}
                                      </div>
                                                              );
                                   })}
                                 </div>
                               )}
                             </div>
                           );
                         })
                       ) : (
                         <div className="text-center py-10 text-xs text-muted-foreground italic bg-muted/5">
                           {t("No match found for the selected tag and name combination")}
                         </div>
                       )}
                     </div>
                   </div>

                 </div>

               </div>
             )}

             {/* STEP 2: SCREEN LAYOUT VIEW */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Image 2 Header layout matching */}
                <div className="flex justify-between items-center bg-muted/20 border p-4 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 bg-primary rounded-full animate-ping" />
                    <h3 className="text-sm font-black text-foreground">创建日程</h3>
                  </div>
                  <Button 
                    type="button"
                    onClick={() => {
                      const name = prompt("请输入新屏幕名称", `${screens.length + 1}#`);
                      if (name) handleAddScreen(name);
                    }}
                    className="h-9 gap-1.5 text-xs font-black bg-primary text-primary-foreground hover:bg-primary/95"
                  >
                    <Plus className="h-4 w-4" />
                    <span>添加屏幕</span>
                  </Button>
                </div>

                {/* Toolbar for Zoom & Manual Slider Controls wrapper */}
                <div className="flex items-center justify-between p-3.5 bg-muted/30 border rounded-2xl gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                    <span>按住 Shift 配合鼠标滚轮，或在移动端手势滑动，可轻松实现横纵双向滚动巡览。</span>
                  </div>

                  {/* ZOOM MODULE */}
                  <div className="flex items-center gap-3 bg-card px-3 py-1.5 rounded-xl border shadow-sm">
                    <span className="text-[11px] font-bold text-muted-foreground">{t("Grid Size") || "网格缩放"}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-md hover:bg-muted"
                      onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.6))}
                      disabled={zoom <= 0.6}
                    >
                      <ZoomOut className="h-3.5 w-3.5" />
                    </Button>
                    <input
                      type="range"
                      min="0.6"
                      max="2.0"
                      step="0.1"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-24 accent-primary cursor-pointer h-1 rounded bg-muted"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-md hover:bg-muted"
                      onClick={() => setZoom(prev => Math.min(prev + 0.1, 2.0))}
                      disabled={zoom >= 2.0}
                    >
                      <ZoomIn className="h-3.5 w-3.5" />
                    </Button>
                    <span className="font-mono text-[10px] font-bold w-10 text-right text-primary">
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                </div>

                {/* Grid Layout Canvas */}
                <div className="border rounded-2xl bg-card overflow-hidden shadow-sm relative">
                  <div 
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className={cn(
                      "w-full max-h-[calc(100vh-320px)] min-h-[500px] overflow-auto p-4 select-none scroll-smooth custom-horizontal-scrollbar custom-vertical-scrollbar",
                      dragState.isDragging ? "cursor-grabbing" : "cursor-grab"
                    )}
                  >
                    <div className="w-max">
                      <table className="border-collapse table-fixed select-none">
                        {/* THEAD (X-axis: Screens 1#, 2#, 3#...) */}
                        <thead>
                          <tr>
                            {/* Empty corner block */}
                            <th 
                              className="sticky top-0 left-0 z-30 p-3 border-b border-r bg-muted/90 dark:bg-zinc-900 text-center text-[10.5px] font-bold text-muted-foreground select-none"
                              style={{ 
                                width: `${Math.round(100 * zoom)}px`, 
                                minWidth: `${Math.round(100 * zoom)}px` 
                              }}
                            >
                              时刻 (0-24点)
                            </th>
                            
                            {screens.map((screen) => (
                              <th 
                                key={screen}
                                className="sticky top-0 z-20 p-3.5 border-b border-l text-center bg-card/95 dark:bg-zinc-950 backdrop-blur-xs"
                                style={{ 
                                  width: `${Math.round(150 * zoom)}px`, 
                                  minWidth: `${Math.round(150 * zoom)}px` 
                                }}
                              >
                                <div className="flex flex-col items-center justify-center gap-1">
                                  <span className="text-sm font-black text-foreground">{screen} 屏幕</span>
                                  <Badge className="text-[9px] bg-primary/10 text-primary border-none py-0 px-1.5">Terminal</Badge>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>

                        {/* TBODY with 24 Hours segments */}
                        <tbody>
                          {Array.from({ length: 24 }).map((_, hour) => {
                            const hourStr = String(hour).padStart(2, '0') + ":00";
                            return (
                              <tr key={hour} className="hover:bg-muted/10 transition-colors">
                                {/* Time axis label */}
                                <td 
                                  className="sticky left-0 z-10 p-2 border-b border-r text-center font-mono text-[10.5px] font-bold text-muted-foreground bg-muted/90 dark:bg-zinc-900"
                                  style={{
                                    height: `${Math.round(50 * zoom)}px`,
                                    width: `${Math.round(100 * zoom)}px`
                                  }}
                                >
                                  {hourStr}
                                </td>

                                {/* Screen Cells */}
                                {screens.map((screen) => {
                                  const contentName = (screenSchedules[screen] || {})[hour] || "OFF";
                                  const isOff = contentName === "OFF";

                                  return (
                                    <td 
                                      key={`${screen}-${hour}`}
                                      onClick={() => setEditingCell({ screen, hour, type: "screen" })}
                                      className="p-1 border-b border-l text-center align-middle cursor-pointer transition-all hover:bg-primary/5"
                                      style={{
                                        width: `${Math.round(150 * zoom)}px`,
                                        height: `${Math.round(50 * zoom)}px`
                                      }}
                                    >
                                      <div 
                                        className={cn(
                                          "w-full h-full rounded-lg transition-all flex flex-col items-center justify-center font-bold px-2 py-1 justify-between",
                                          isOff
                                            ? "bg-slate-100 dark:bg-slate-800 text-muted-foreground/45 border border-dashed"
                                            : "bg-primary/10 text-primary border border-primary/30"
                                        )}
                                        style={{
                                          fontSize: `${Math.max(9, Math.round(10.5 * zoom))}px`
                                        }}
                                      >
                                        <span className="truncate w-full text-center">
                                          {isOff ? "熄屏/OFF" : contentName}
                                        </span>
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: DATE LAYOUT VIEW */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Image 3 Header layout matching */}
                <div className="flex justify-between items-center bg-muted/20 border p-4 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                    <h3 className="text-sm font-black text-foreground">创建日程</h3>
                  </div>
                  <Button 
                    type="button"
                    onClick={() => setBatchInsertModalOpen(true)}
                    className="h-9 gap-1.5 text-xs font-black bg-emerald-600 text-white hover:bg-emerald-500 shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                    <span>插入内容</span>
                  </Button>
                </div>

                {/* Toolbar for Zoom */}
                <div className="flex items-center justify-between p-3.5 bg-muted/30 border rounded-2xl gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                    <span>X轴为播期天数，Y轴为0-24小时播控特定素材时段。可点击任意时刻单元独立改写它。</span>
                  </div>

                  {/* ZOOM MODULE */}
                  <div className="flex items-center gap-3 bg-card px-3 py-1.5 rounded-xl border shadow-sm">
                    <span className="text-[11px] font-bold text-muted-foreground">{t("Grid Size") || "网格缩放"}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-md hover:bg-muted"
                      onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.6))}
                      disabled={zoom <= 0.6}
                    >
                      <ZoomOut className="h-3.5 w-3.5" />
                    </Button>
                    <input
                      type="range"
                      min="0.6"
                      max="2.0"
                      step="0.1"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-24 accent-primary cursor-pointer h-1 rounded bg-muted"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-md hover:bg-muted"
                      onClick={() => setZoom(prev => Math.min(prev + 0.1, 2.0))}
                      disabled={zoom >= 2.0}
                    >
                      <ZoomIn className="h-3.5 w-3.5" />
                    </Button>
                    <span className="font-mono text-[10px] font-bold w-10 text-right text-primary">
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                </div>

                {/* Grid Layout Canvas */}
                <div className="border rounded-2xl bg-card overflow-hidden shadow-sm relative">
                  <div 
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className={cn(
                      "w-full max-h-[calc(100vh-320px)] min-h-[500px] overflow-auto p-4 select-none scroll-smooth custom-horizontal-scrollbar custom-vertical-scrollbar",
                      dragState.isDragging ? "cursor-grabbing" : "cursor-grab"
                    )}
                  >
                    <div className="w-max">
                      <table className="border-collapse table-fixed select-none">
                        {/* THEAD with Day / Week representation (X-axis) */}
                        <thead>
                          <tr>
                            {/* Empty corner block */}
                            <th 
                              className="sticky top-0 left-0 z-30 p-3 border-b border-r bg-muted/90 dark:bg-zinc-900 text-center text-[10.5px] font-bold text-muted-foreground select-none"
                              style={{ 
                                width: `${Math.round(100 * zoom)}px`, 
                                minWidth: `${Math.round(100 * zoom)}px` 
                              }}
                            >
                              时刻 (0-24点)
                            </th>
                            
                            {daysList.map((day) => {
                              const key = getDateKey(day);
                              // Format header exactly as "3 周一" (Date day number + weekday) 
                              const isZh = i18n.language === "zh";
                              const weekdaysZh = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
                              const weekdaysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                              const dayName = isZh ? weekdaysZh[day.getDay()] : weekdaysEn[day.getDay()];
                              const dateNumber = day.getDate();

                              return (
                                <th 
                                  key={key}
                                  className="sticky top-0 z-20 p-3.5 border-b border-l text-center bg-card/95 dark:bg-zinc-950 backdrop-blur-xs group select-none"
                                  style={{ 
                                    width: `${Math.round(150 * zoom)}px`, 
                                    minWidth: `${Math.round(150 * zoom)}px` 
                                  }}
                                >
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="text-[14px] font-black tracking-tight text-foreground">
                                      {dateNumber} {dayName}
                                    </span>
                                    <span className="text-[9px] text-muted-foreground mt-0.5 font-bold">
                                      {day.getMonth() + 1}月
                                    </span>
                                  </div>
                                </th>
                              );
                            })}
                          </tr>
                        </thead>

                        {/* TBODY with 24 Hours segments */}
                        <tbody>
                          {Array.from({ length: 24 }).map((_, hour) => {
                            const hourStr = String(hour).padStart(2, '0') + ":00";
                            return (
                              <tr key={hour} className="hover:bg-muted/10 transition-colors">
                                {/* Time axis label */}
                                <td 
                                  className="sticky left-0 z-10 p-2 border-b border-r text-center font-mono text-[10.5px] font-bold text-muted-foreground bg-muted/90 dark:bg-zinc-900"
                                  style={{
                                    height: `${Math.round(50 * zoom)}px`,
                                    width: `${Math.round(100 * zoom)}px`
                                  }}
                                >
                                  {hourStr}
                                </td>

                                {/* Day cells value */}
                                {daysList.map(day => {
                                  const key = getDateKey(day);
                                  const contentName = (dateSchedules[key] || {})[hour] || "OFF";
                                  const isOff = contentName === "OFF";

                                  return (
                                    <td 
                                      key={`${key}-${hour}`}
                                      onClick={() => setEditingCell({ dateKey: key, hour, type: "date" })}
                                      className="p-1 border-b border-l text-center align-middle cursor-pointer transition-all hover:bg-emerald-550/5"
                                      style={{
                                        width: `${Math.round(150 * zoom)}px`,
                                        height: `${Math.round(50 * zoom)}px`
                                      }}
                                    >
                                      <div 
                                        className={cn(
                                          "w-full h-full rounded-lg transition-all flex flex-col items-center justify-center font-bold px-2 py-1 justify-between",
                                          isOff 
                                            ? "bg-slate-100 dark:bg-slate-800 text-muted-foreground/45 border border-dashed" 
                                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                        )}
                                        style={{
                                          fontSize: `${Math.max(9, Math.round(10.5 * zoom))}px`
                                        }}
                                      >
                                        <span className="truncate w-full text-center">
                                          {isOff ? "熄屏/OFF" : contentName}
                                        </span>
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODAL / DIALOGS SECTION */}

            {/* Editing Cell Dialog floating element */}
            {editingCell && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center z-50 animate-in fade-in duration-200">
                <div className="bg-card border w-full max-w-sm rounded-[24px] shadow-2xl p-6 relative space-y-4">
                  <button 
                    onClick={() => setEditingCell(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <h3 className="text-sm font-black uppercase text-foreground tracking-wide flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>更改投播资源</span>
                  </h3>
                  
                  <p className="text-[11px] text-muted-foreground leading-relaxed bg-muted/30 p-2.5 rounded-xl border border-dashed">
                     正在配置 {editingCell.hour}:00 播控节点 
                     {editingCell.type === "screen" ? ` 的 [屏幕 ${editingCell.screen}]` : ` 的 [日期 ${editingCell.dateKey}]`} 投放文件
                  </p>

                  <div className="space-y-1.5 text-xs">
                    <Label className="text-[10px] font-black uppercase text-muted-foreground/80">可供播放的多媒体素材</Label>
                    <div className="grid grid-cols-1 gap-1.5">
                      {AVAILABLE_CONTENTS.map(c => {
                        const currentVal = editingCell.type === "screen" 
                          ? (screenSchedules[editingCell.screen!] || {})[editingCell.hour] 
                          : (dateSchedules[editingCell.dateKey!] || {})[editingCell.hour];
                        const isSelected = currentVal === c.name;

                        return (
                          <button
                            key={c.id}
                            type="button"
                            className={cn(
                              "p-2.5 rounded-xl border text-left font-bold transition-all flex items-center justify-between",
                              isSelected 
                                ? "bg-primary/5 border-primary text-primary" 
                                : "bg-background hover:bg-muted/30 border-border text-muted-foreground"
                            )}
                            onClick={() => {
                              if (editingCell.type === "screen") {
                                handleUpdateScreenCell(editingCell.screen!, editingCell.hour, c.name);
                              } else {
                                handleUpdateDateCell(editingCell.dateKey!, editingCell.hour, c.name);
                              }
                              setEditingCell(null);
                            }}
                          >
                            <span>{c.name}</span>
                            <span className="text-[8.5px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{c.type}</span>
                          </button>
                        );
                      })}

                      {/* Explicit clean empty OFF action */}
                      <button
                        type="button"
                        className="p-2.5 rounded-xl border text-left font-black text-red-500 border-red-500/20 hover:bg-red-500/5 transition-all text-center"
                        onClick={() => {
                          if (editingCell.type === "screen") {
                            handleUpdateScreenCell(editingCell.screen!, editingCell.hour, "OFF");
                          } else {
                            handleUpdateDateCell(editingCell.dateKey!, editingCell.hour, "OFF");
                          }
                          setEditingCell(null);
                        }}
                      >
                        熄屏 / OFF (不播放)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Batch Insert Modal */}
            {batchInsertModalOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center z-50 animate-in fade-in duration-200">
                <div className="bg-card border w-full max-w-md rounded-[24px] shadow-2xl p-6 relative space-y-4">
                  <button 
                    onClick={() => setBatchInsertModalOpen(false)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <h3 className="text-sm font-black uppercase text-foreground tracking-wide flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    <span>批量插入内容</span>
                  </h3>
                  
                  <div className="space-y-4 text-xs">
                    {/* Select Content */}
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground/80">选择素材内容</Label>
                      <div className="grid grid-cols-1 gap-1.5 max-h-40 overflow-y-auto pr-1">
                        {AVAILABLE_CONTENTS.map(c => (
                          <button
                            key={c.id}
                            type="button"
                            className={cn(
                              "p-2.5 rounded-xl border text-left font-bold transition-all flex items-center justify-between",
                              batchInsertForm.selectedContent === c.name 
                                ? "bg-emerald-500/10 border-emerald-500 text-emerald-700" 
                                : "bg-background hover:bg-muted/30 border-border text-muted-foreground"
                            )}
                            onClick={() => setBatchInsertForm({...batchInsertForm, selectedContent: c.name})}
                          >
                            <span>{c.name}</span>
                            <span className="text-[8.5px] uppercase font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{c.type}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Start/End Hours range */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-muted-foreground/80">起始时刻 ({batchInsertForm.startHour}:00)</Label>
                        <input 
                          type="range" min="0" max="23" 
                          value={batchInsertForm.startHour} 
                          onChange={e => setBatchInsertForm({...batchInsertForm, startHour: parseInt(e.target.value)})}
                          className="w-full accent-emerald-600 h-1 rounded bg-muted"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-black uppercase text-muted-foreground/80">结束时刻 ({batchInsertForm.endHour}:00)</Label>
                        <input 
                          type="range" min="0" max="23" 
                          value={batchInsertForm.endHour} 
                          onChange={e => setBatchInsertForm({...batchInsertForm, endHour: parseInt(e.target.value)})}
                          className="w-full accent-emerald-600 h-1 rounded bg-muted"
                        />
                      </div>
                    </div>

                    {/* Target Date category filters */}
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground/80">应用具体日期</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "all", name: "全部日期" },
                          { id: "weekdays", name: "仅工作日" },
                          { id: "weekends", name: "仅周末" }
                        ].map(d => (
                          <button
                            key={d.id}
                            type="button"
                            className={cn(
                              "py-2 rounded-xl border text-[11px] font-black transition-all text-center",
                              batchInsertForm.targetDaysType === d.id 
                                ? "bg-emerald-600 border-emerald-600 text-white shadow-sm shadow-emerald-500/15" 
                                : "bg-background hover:bg-muted/35 border-border text-muted-foreground"
                            )}
                            onClick={() => setBatchInsertForm({ ...batchInsertForm, targetDaysType: d.id as any })}
                          >
                            {d.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-4 border-t">
                    <Button variant="ghost" onClick={() => setBatchInsertModalOpen(false)}>取消</Button>
                    <Button onClick={handleBatchInsertAction} className="bg-emerald-600 hover:bg-emerald-500 text-white font-black">
                      批量下发内容
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions Stage controls */}
            <div className="flex justify-between items-center pt-6 mt-6 border-t border-dashed">
              <div>
                {currentStep === 2 ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentStep(1)} 
                    className="rounded-xl font-bold gap-2 text-xs h-10 px-5"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>{t("Back to Step 1") || "返回第一步：基础配置"}</span>
                  </Button>
                ) : currentStep === 3 ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCurrentStep(2)} 
                    className="rounded-xl font-bold gap-2 text-xs h-10 px-5"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>{t("Back to Step 2") || "返回第二步：屏幕配置"}</span>
                  </Button>
                ) : null}
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="ghost" 
                  size="default" 
                  onClick={() => navigate(-1)} 
                  className="rounded-xl font-bold px-6 text-xs h-10"
                >
                  {t("Cancel")}
                </Button>
                
                {currentStep === 1 ? (
                  editId ? (
                    <Button 
                      size="default" 
                      onClick={handleSaveBasicInfo} 
                      className="px-8 h-10 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-400/10 active:scale-95 transition-all gap-2"
                    >
                      <Check className="h-4 w-4" />
                      <span>{t("Save Basic Info") || "保存基本信息"}</span>
                    </Button>
                  ) : (
                    <Button 
                      size="default" 
                      onClick={handleGoToStep2} 
                      className="px-8 h-10 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/5 active:scale-95 transition-all gap-2"
                    >
                      <span>{t("Next Step: Screen Grid") || "下一步：屏幕播控"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )
                ) : currentStep === 2 ? (
                  <Button 
                    size="default" 
                    onClick={handleGoToStep3} 
                    className="px-8 h-10 rounded-xl text-xs font-black uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/5 active:scale-95 transition-all gap-2"
                  >
                    <span>{t("Next Step: Daily Grid") || "下一步：日期播控"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    size="default" 
                    onClick={handleCreate} 
                    className="px-10 h-10 rounded-xl text-xs font-black uppercase tracking-widest bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/10 active:scale-95 transition-all"
                  >
                    {t("Initiate Release") || "开始投播发布"}
                  </Button>
                )}
              </div>
            </div>

          </div>

        </div>
      </ScrollArea>
    </div>
  );
}
