import * as React from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Plus, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  Sparkles, 
  X, 
  Save, 
  Undo,
  BadgeAlert,
  Terminal,
  Clock,
  Settings,
  Tv,
  HelpCircle,
  Trash2,
  Eye,
  EyeOff,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Schedule } from "@/types";
import { INITIAL_SCHEDULES } from "@/constants";

import { Timeline, TimelineState } from "@xzdarcy/react-timeline-editor";
import "@xzdarcy/react-timeline-editor/dist/react-timeline-editor.css";
import { AutoSizer, Grid, List, ScrollSync } from "react-virtualized";
import "react-virtualized/styles.css";



// Interface matched structurally from react-timeline-editor
interface TimelineAction {
  id: string;
  start: number;
  end: number;
  effectId: string;
  name?: string;
}

interface TimelineRow {
  id: string;
  actions: TimelineAction[];
}

interface TimelineEffect {
  id: string;
  name: string;
}

export function ScheduleEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Load existing schedules from localStorage or INITIAL_SCHEDULES
  const [schedules, setSchedules] = React.useState<Schedule[]>(() => {
    const saved = localStorage.getItem("schedules");
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULES;
  });

  const schedule = React.useMemo(() => schedules.find(s => s.id === id), [schedules, id]);

  const AVAILABLE_CONTENTS = React.useMemo(() => [
    { id: "c1", name: "元气森林夏季推广.mp4", type: "video" },
    { id: "c2", name: "必胜客新品海报.png", type: "image" },
    { id: "c3", name: "商场紧急广播须知.txt", type: "notice" },
    { id: "c4", name: "默认循环播放源", type: "default" },
    { id: "c5", name: "客流热力导引H5组件", type: "interactive" },
  ], []);

  // Sync scroll DOM container for left track header and right timeline editor
  const domRef = React.useRef<HTMLDivElement>(null);
  const timelineState = React.useRef<TimelineState | null>(null);

  // Primary scheduling states loaded from target schedule
  const [timelineData, setTimelineData] = React.useState<TimelineRow[]>([]);
  const [screens, setScreens] = React.useState<string[]>(["1#", "2#", "3#", "4#", '5#', '6#', '7#']);
  const [screenSchedules, setScreenSchedules] = React.useState<Record<string, Record<number, string>>>({});
  const [zoom, setZoom] = React.useState<number>(1.2);
  const [containerWidth, setContainerWidth] = React.useState<number>(1000);
  const [screenToDelete, setScreenToDelete] = React.useState<string | null>(null);
  const [addScreenModalOpen, setAddScreenModalOpen] = React.useState<boolean>(false);
  const [newScreenName, setNewScreenName] = React.useState<string>("");
  const [addScreenError, setAddScreenError] = React.useState<string>("");
  const [hiddenScreens, setHiddenScreens] = React.useState<Record<string, boolean>>({});
  const [previewTime, setPreviewTime] = React.useState<number>(0);

  // Date management state & customized dropdown variables
  const [selectedDate, setSelectedDate] = React.useState<string>("2026-06-10");
  const [showDatePicker, setShowDatePicker] = React.useState<boolean>(false);
  const [calendarMonth, setCalendarMonth] = React.useState<Date>(() => new Date(2026, 5, 10)); // June 2026
  const [screenSchedulesByDate, setScreenSchedulesByDate] = React.useState<Record<string, {
    screens: string[];
    screenSchedules: Record<string, Record<number, string>>;
  }>>({});
  const [scheduleDrawerOpen, setScheduleDrawerOpen] = React.useState<boolean>(false);

  // Mapped effects record for the timeline component
  const timelineEffects: Record<string, TimelineEffect> = React.useMemo(() => ({
    c1: { id: "c1", name: "元气森林夏季推广.mp4" },
    c2: { id: "c2", name: "必胜客新品海报.png" },
    c3: { id: "c3", name: "商场紧急广播须知.txt" },
    c4: { id: "c4", name: "默认循环播放源" },
    c5: { id: "c5", name: "客流热力导引H5组件" },
    OFF: { id: "OFF", name: "熄屏关闭 / OFF" }
  }), []);

  // Helper converter: convert local raw state (screens & schedules map) to TimelineRow array
  const convertToTimelineData = React.useCallback((
    screensList: string[], 
    schedulesMap: Record<string, Record<number, string>>
  ): TimelineRow[] => {
    return screensList.map((screen) => {
      const sched = schedulesMap[screen] || {};
      const actions: TimelineAction[] = [];
      
      let currentContent = sched[0] || "OFF";
      let start = 0;
      let actionCounter = 0;
      
      for (let hour = 1; hour <= 24; hour++) {
        const content = hour < 24 ? (sched[hour] || "OFF") : null;
        
        if (content !== currentContent || hour === 24) {
          const fileContent = AVAILABLE_CONTENTS.find(c => c.name === currentContent);
          const effectId = fileContent ? fileContent.id : "OFF";
          
          if (effectId !== "OFF") {
            actions.push({
              id: `${screen}_action_${actionCounter++}`,
              start,
              end: hour,
              effectId: effectId,
              name: currentContent
            });
          }
          
          currentContent = content || "OFF";
          start = hour;
        }
      }
      
      return {
        id: screen,
        actions
      };
    });
  }, [AVAILABLE_CONTENTS]);

  // Helper converter: convert TimelineRow array back to raw states for back-compatibility
  const convertFromTimelineData = React.useCallback((
    data: TimelineRow[]
  ): {
    screensList: string[];
    schedulesMap: Record<string, Record<number, string>>;
  } => {
    const screensList: string[] = [];
    const schedulesMap: Record<string, Record<number, string>> = {};
    
    data.forEach((row) => {
      const screen = row.id;
      screensList.push(screen);
      
      const sched: Record<number, string> = {};
      // Preset full 24h as OFF
      for (let h = 0; h < 24; h++) {
        sched[h] = "OFF";
      }
      
      // Map actions onto the 24 hour grid
      row.actions.forEach((action) => {
        const fileContent = AVAILABLE_CONTENTS.find(c => c.id === action.effectId);
        const mediaName = fileContent ? fileContent.name : "OFF";
        
        const startHour = Math.max(0, Math.min(23, Math.floor(action.start)));
        const endHour = Math.max(1, Math.min(24, Math.ceil(action.end)));
        
        for (let h = startHour; h < endHour; h++) {
          sched[h] = mediaName;
        }
      });
      
      schedulesMap[screen] = sched;
    });
    
    return {
      screensList,
      schedulesMap
    };
  }, [AVAILABLE_CONTENTS]);

  // Handle timeline modification state update
  const handleTimelineChange = (newData: TimelineRow[]) => {
    setTimelineData(newData);
    const { screensList, schedulesMap } = convertFromTimelineData(newData);
    setScreens(screensList);
    setScreenSchedules(schedulesMap);
  };

  // Initialize from schedule data
  React.useEffect(() => {
    if (schedule) {
      const dbSchedulesByDate = schedule.screenSchedulesByDate || {};
      setScreenSchedulesByDate(dbSchedulesByDate);

      const savedDate = schedule.selectedDate || "2026-06-10";
      setSelectedDate(savedDate);

      const [y, m, d] = savedDate.split("-").map(Number);
      if (y && m) {
        setCalendarMonth(new Date(y, m - 1, d || 1));
      }

      const activeData = dbSchedulesByDate[savedDate] || {
        screens: schedule.screens || ["1#", "2#", "3#", "4#", "5#", "6#", "7#"],
        screenSchedules: schedule.screenSchedules || {}
      };

      let activeScreens = [...activeData.screens];
      let activeSchedules = { ...activeData.screenSchedules };
      
      // Beautiful default seeds if empty
      if (Object.keys(activeSchedules).length === 0) {
        activeSchedules = {
          "1#": { 8: "元气森林夏季推广.mp4", 9: "元气森林夏季推广.mp4", 10: "元气森林夏季推广.mp4", 11: "元气森林夏季推广.mp4", 12: "默认循环播放源", 13: "默认循环播放源", 14: "默认循环播放源", 15: "默认循环播放源", 16: "默认循环播放源", 17: "默认循环播放源", 18: "必胜客新品海报.png", 19: "必胜客新品海报.png", 20: "必胜客新品海报.png", 21: "必胜客新品海报.png" },
          "2#": { 9: "必胜客新品海报.png", 10: "必胜客新品海报.png", 11: "必胜客新品海报.png", 12: "必胜客新品海报.png", 13: "必胜客新品海报.png", 14: "必胜客新品海报.png", 15: "客流热力导引H5组件", 16: "客流热力导引H5组件", 17: "客流热力导引H5组件", 18: "客流热力导引H5组件", 19: "客流热力导引H5组件", 20: "客流热力导引H5组件" },
          "3#": { 10: "商场紧急广播须知.txt", 11: "商场紧急广播须知.txt", 12: "商场紧急广播须知.txt", 13: "商场紧急广播须知.txt", 14: "元气森林夏季推广.mp4", 15: "元气森林夏季推广.mp4", 16: "元气森林夏季推广.mp4", 17: "元气森林夏季推广.mp4", 18: "元气森林夏季推广.mp4", 19: "元气森林夏季推广.mp4" },
          "4#": { 0: "默认循环播放源", 1: "默认循环播放源", 2: "默认循环播放源", 3: "默认循环播放源", 4: "默认循环播放源", 5: "默认循环播放源", 6: "默认循环播放源", 7: "默认循环播放源", 8: "默认循环播放源", 9: "默认循环播放源", 10: "默认循环播放源", 11: "默认循环播放源", 12: "默认循环播放源", 13: "默认循环播放源", 14: "默认循环播放源", 15: "默认循环播放源", 16: "默认循环播放源", 17: "默认循环播放源", 18: "默认循环播放源", 19: "默认循环播放源", 20: "默认循环播放源", 21: "默认循环播放源", 22: "默认循环播放源", 23: "默认循环播放源" },
          "5#": { 8: "客流热力导引H5组件", 9: "客流热力导引H5组件", 10: "客流热力导引H5组件", 11: "客流热力导引H5组件", 13: "元气森林夏季推广.mp4", 14: "元气森林夏季推广.mp4", 15: "元气森林夏季推广.mp4", 16: "元气森林夏季推广.mp4", 17: "元气森林夏季推广.mp4", 18: "元气森林夏季推广.mp4" },
          "6#": { 7: "必胜客新品海报.png", 8: "必胜客新品海报.png", 9: "必胜客新品海报.png", 10: "必胜客新品海报.png", 11: "默认循环播放源", 12: "默认循环播放源", 13: "默认循环播放源", 14: "默认循环播放源", 15: "默认循环播放源", 16: "默认循环播放源", 17: "默认循环播放源", 18: "默认循环播放源" },
          "7#": { 10: "元气森林夏季推广.mp4", 11: "元气森林夏季推广.mp4", 12: "元气森林夏季推广.mp4", 13: "元气森林夏季推广.mp4", 14: "元气森林夏季推广.mp4", 15: "元气森林夏季推广.mp4", 18: "商场紧急广播须知.txt", 19: "商场紧急广播须知.txt", 20: "商场紧急广播须知.txt", 21: "商场紧急广播须知.txt" }
        };
      } else {
        activeScreens.forEach(screen => {
          if (!activeSchedules[screen]) {
            activeSchedules[screen] = {};
          }
        });
      }

      setScreens(activeScreens);
      setScreenSchedules(activeSchedules);

      const initialData = convertToTimelineData(activeScreens, activeSchedules);
      setTimelineData(initialData);
    }
  }, [schedule, convertToTimelineData]);

  // Handle date switching
  const handleDateChange = (newDate: string) => {
    if (!schedule) return;

    // 1. Snapshot the current timeline states (which represents the old selectedDate)
    const updatedByDate = {
      ...screenSchedulesByDate,
      [selectedDate]: {
        screens,
        screenSchedules
      }
    };
    
    setScreenSchedulesByDate(updatedByDate);
    setSelectedDate(newDate);

    // 2. Fetch the target data for the new date
    const targetData = updatedByDate[newDate] || {
      screens: schedule.screens || ["1#", "2#", "3#", "4#", "5#", "6#", "7#"],
      screenSchedules: schedule.screenSchedules && Object.keys(schedule.screenSchedules).length > 0
                       ? schedule.screenSchedules
                       : {
                           "1#": { 8: "元气森林夏季推广.mp4", 9: "元气森林夏季推广.mp4", 10: "元气森林夏季推广.mp4", 11: "元气森林夏季推广.mp4", 12: "默认循环播放源", 13: "默认循环播放源", 14: "默认循环播放源", 15: "默认循环播放源", 16: "默认循环播放源", 17: "默认循环播放源", 18: "必胜客新品海报.png", 19: "必胜客新品海报.png", 20: "必胜客新品海报.png", 21: "必胜客新品海报.png" },
                           "2#": { 9: "必胜客新品海报.png", 10: "必胜客新品海报.png", 11: "必胜客新品海报.png", 12: "必胜客新品海报.png", 13: "必胜客新品海报.png", 14: "必胜客新品海报.png", 15: "客流热力导引H5组件", 16: "客流热力导引H5组件", 17: "客流热力导引H5组件", 18: "客流热力导引H5组件", 19: "客流热力导引H5组件", 20: "客流热力导引H5组件" },
                           "3#": { 10: "商场紧急广播须知.txt", 11: "商场紧急广播须知.txt", 12: "商场紧急广播须知.txt", 13: "商场紧急广播须知.txt", 14: "元气森林夏季推广.mp4", 15: "元气森林夏季推广.mp4", 16: "元气森林夏季推广.mp4", 17: "元气森林夏季推广.mp4", 18: "元气森林夏季推广.mp4", 19: "元气森林夏季推广.mp4" },
                           "4#": { 0: "默认循环播放源", 1: "默认循环播放源", 2: "默认循环播放源", 3: "默认循环播放源", 4: "默认循环播放源", 5: "默认循环播放源", 6: "默认循环播放源", 7: "默认循环播放源", 8: "默认循环播放源", 9: "默认循环播放源", 10: "默认循环播放源", 11: "默认循环播放源", 12: "默认循环播放源", 13: "默认循环播放源", 14: "默认循环播放源", 15: "默认循环播放源", 16: "默认循环播放源", 17: "默认循环播放源", 18: "默认循环播放源", 19: "默认循环播放源", 20: "默认循环播放源", 21: "默认循环播放源", 22: "默认循环播放源", 23: "默认循环播放源" },
                           "5#": { 8: "客流热力导引H5组件", 9: "客流热力导引H5组件", 10: "客流热力导引H5组件", 11: "客流热力导引H5组件", 13: "元气森林夏季推广.mp4", 14: "元气森林夏季推广.mp4", 15: "元气森林夏季推广.mp4", 16: "元气森林夏季推广.mp4", 17: "元气森林夏季推广.mp4", 18: "元气森林夏季推广.mp4" },
                           "6#": { 7: "必胜客新品海报.png", 8: "必胜客新品海报.png", 9: "必胜客新品海报.png", 10: "必胜客新品海报.png", 11: "默认循环播放源", 12: "默认循环播放源", 13: "默认循环播放源", 14: "默认循环播放源", 15: "默认循环播放源", 16: "默认循环播放源", 17: "默认循环播放源", 18: "默认循环播放源" },
                           "7#": { 10: "元气森林夏季推广.mp4", 11: "元气森林夏季推广.mp4", 12: "元气森林夏季推广.mp4", 13: "元气森林夏季推广.mp4", 14: "元气森林夏季推广.mp4", 15: "元气森林夏季推广.mp4", 18: "商场紧急广播须知.txt", 19: "商场紧急广播须知.txt", 20: "商场紧急广播须知.txt", 21: "商场紧急广播须知.txt" }
                         }
    };

    setScreens(targetData.screens);
    setScreenSchedules(targetData.screenSchedules);

    const initialData = convertToTimelineData(targetData.screens, targetData.screenSchedules);
    setTimelineData(initialData);
  };

  // Render beautiful calendar monthly grid
  const renderCalendar = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth(); // 0-indexed

    const weekDays = [
      t("Su") || "日", 
      t("Mo") || "一", 
      t("Tu") || "二", 
      t("We") || "三", 
      t("Th") || "四", 
      t("Fr") || "五", 
      t("Sa") || "六"
    ];

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const handlePrevMonth = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCalendarMonth(new Date(year, month - 1, 1));
    };

    const handleNextMonth = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCalendarMonth(new Date(year, month + 1, 1));
    };

    const handleSelectDay = (day: number) => {
      const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      handleDateChange(formattedDate);
      setShowDatePicker(false);
    };

    const daysGrid = [];
    for (let i = 0; i < firstDayIndex; i++) {
      daysGrid.push(<div key={`empty-${i}`} className="h-5.5 w-5.5" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const formattedValue = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isSelected = formattedValue === selectedDate;
      daysGrid.push(
        <button
          key={`day-${day}`}
          type="button"
          onClick={() => handleSelectDay(day)}
          className={cn(
            "h-5.5 w-5.5 rounded text-[10px] font-black transition-all flex items-center justify-center border-none cursor-pointer",
            isSelected 
              ? "bg-primary text-primary-foreground scale-105 font-black shadow-sm" 
              : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
          )}
        >
          {day}
        </button>
      );
    }

    const monthNames = [
      t("Jan") || "一月", t("Feb") || "二月", t("Mar") || "三月", t("Apr") || "四月", 
      t("May") || "五月", t("Jun") || "六月", t("Jul") || "七月", t("Aug") || "八月", 
      t("Sep") || "九月", t("Oct") || "十月", t("Nov") || "十一月", t("Dec") || "十二月"
    ];

    return (
      <div className="space-y-2 select-none" onClick={(e) => e.stopPropagation()}>
        {/* Calendar Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-1 text-[10px]">
          <button 
            type="button" 
            onClick={handlePrevMonth} 
            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white border-none transition-colors"
          >
            &lt;
          </button>
          <span className="font-extrabold text-zinc-200">{year}年 {monthNames[month]}</span>
          <button 
            type="button" 
            onClick={handleNextMonth} 
            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white border-none transition-colors"
          >
            &gt;
          </button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-1 text-center font-bold text-[9px] text-zinc-500 mb-1">
          {weekDays.map((d, index) => (
            <div key={index}>{d}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {daysGrid}
        </div>
      </div>
    );
  };

  // Track responsive client width to self-adapt timeline tracks
  React.useEffect(() => {
    const handleResize = () => {
      if (domRef.current) {
        setContainerWidth(domRef.current.clientWidth || 1000);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle addition of a new screen triggering the custom modal
  const handleAddScreen = () => {
    // Determine the next suffix logically (e.g., matching standard sequence like 8#, 9# etc.)
    const numericIds = timelineData
      .map(row => parseInt(row.id.replace("#", ""), 10))
      .filter(n => !isNaN(n));
      
    const nextNum = numericIds.length > 0 ? Math.max(...numericIds) + 1 : screens.length + 1;
    const defaultSuggestion = `${nextNum}#`;

    setNewScreenName(defaultSuggestion);
    setAddScreenError("");
    setAddScreenModalOpen(true);
  };

  const confirmAddScreen = () => {
    const trimmed = newScreenName.trim();
    if (!trimmed) {
      setAddScreenError("屏幕号/名称不可为空！");
      return;
    }

    // Duplicate check in both timeline rows and global screen list
    const isDuplicate = timelineData.some(row => row.id.trim().toLowerCase() === trimmed.toLowerCase()) ||
                        screens.some(s => s.trim().toLowerCase() === trimmed.toLowerCase());
                        
    if (isDuplicate) {
      setAddScreenError(`屏幕号/名称 "${trimmed}" 已存在，请勿重复添加！`);
      return;
    }

    const newRow: TimelineRow = {
      id: trimmed,
      actions: []
    };

    const nextData = [...timelineData, newRow];
    handleTimelineChange(nextData);
    setAddScreenModalOpen(false);
    setNewScreenName("");
    setAddScreenError("");
  };

  // Handle removal of a screen
  const handleDeleteScreen = (screenId: string) => {
    const nextData = timelineData.filter(row => row.id !== screenId);
    handleTimelineChange(nextData);
  };

  const [editingCell, setEditingCell] = React.useState<{
    screen: string;
    start: number;
    end: number;
    content: string;
    id: string;
  } | null>(null);

  // Save changes locally and navigate back
  const handleSave = () => {
    if (!schedule) return;

    // Snapshot current active day state
    const finalByDate = {
      ...screenSchedulesByDate,
      [selectedDate]: {
        screens,
        screenSchedules
      }
    };

    const updatedSchedules = schedules.map(s => {
      if (s.id === id) {
        return {
          ...s,
          screens,
          screenSchedules,
          selectedDate,
          screenSchedulesByDate: finalByDate
        };
      }
      return s;
    });
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
    navigate("/schedules");
  };

  if (!schedule) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] p-6 space-y-4">
        <BadgeAlert className="h-12 w-12 text-destructive animate-pulse" />
        <h2 className="text-xl font-bold">{t("Schedule not found") || "未找到目标日程计划"}</h2>
        <Button onClick={() => navigate("/schedules")} variant="outline" className="rounded-xl">
          {t("Back to list") || "返回日程列表"}
        </Button>
      </div>
    );
  }

  // Calculate scaling parameters
  const headerWidth = 180;
  const hourWidth = React.useMemo(() => {
    const minHourWidth = Math.round(90 * zoom);
    const availableWidth = containerWidth - headerWidth - 16;
    if (availableWidth > 0 && 24 * minHourWidth < availableWidth) {
      return Math.floor(availableWidth / 24);
    }
    return minHourWidth;
  }, [zoom, containerWidth, headerWidth]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8fafc] dark:bg-zinc-950 transition-colors relative">
      
      {/* Upper Navigation Bar */}
      <div className="border-b bg-card px-4 py-4 md:px-6 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/schedules")}
            className="rounded-xl hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20 uppercase font-bold">
                ID: {schedule.id}
              </Badge>
              <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-foreground">
                {schedule.mediaName || schedule.name || "未命名"}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/schedules")} 
            className="rounded-xl font-bold h-10 px-4 text-xs gap-1.5"
          >
            <Undo className="h-4 w-4" />
            <span>{t("Cancel") || "取消"}</span>
          </Button>
          <Button 
            onClick={handleSave} 
            className="rounded-xl font-black h-10 px-5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 shadow-md shadow-emerald-600/10 active:scale-95 transition-all"
          >
            <Save className="h-4 w-4" />
            <span>{t("Save Changes") || "保存修改"}</span>
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 relative">
        <div className="w-full h-full p-4 md:p-6 pb-20 space-y-6 relative">
          
          {/* UNIFIED MONITOR & TIMELINE SYSTEM CONSOLE */}
          <div className="border h-full rounded-lg border-[#1e2025] bg-[#0c0d0f] overflow-hidden relative shadow-2xl flex flex-1 flex-col">
            
            {/* 32px height Consolidated Title Bar */}
            <div className="h-[32px] bg-[#0c0d0f] border-b border-[#1e2025] px-3 flex items-center justify-between text-xs text-zinc-350 font-medium select-none shrink-0 gap-3">
                
                {/* Left Panel title & calendar date selection */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-zinc-400 font-extrabold text-[11px] tracking-wide shrink-0">
                    <Tv className="h-3.5 w-3.5 text-primary" />
                    <span>联动播控排期</span>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setScheduleDrawerOpen(true)}
                    className="h-6 w-6 rounded text-zinc-400 hover:text-primary hover:bg-zinc-800/50 border-none"
                    title="插入日程"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  
                  <div className="h-4 w-[1px] bg-zinc-800 shrink-0" />
                  
                  {/* Clickable Date Display */}
                  <div className="relative shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDatePicker(prev => !prev);
                      }}
                      className="h-6 px-2 text-[10px] font-black text-zinc-200 hover:text-white bg-zinc-900 border border-zinc-805/80 hover:bg-zinc-800 rounded flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Calendar className="h-3 w-3 text-primary shrink-0" />
                      <span>{selectedDate}</span>
                    </Button>

                    {/* Floating Dropdown Calendar */}
                    {showDatePicker && (
                      <div className="absolute left-0 top-7 z-50 bg-[#16171b] border border-zinc-805/90 rounded-lg shadow-2xl p-3 w-56 animate-in fade-in slide-in-from-top-1 duration-150">
                        {renderCalendar()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Panel timeline configurations: cursor time, zoom, and add screen */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Cursor Time display */}
                  <div className="flex items-center gap-1.5 text-zinc-300 bg-zinc-900/90 px-2 py-0.5 rounded border border-zinc-800/80 font-mono text-[9.5px]">
                    <Clock className="h-3 w-3 text-primary animate-pulse shrink-0" />
                    <span className="text-zinc-500 font-bold">光标:</span>
                    <span className="font-extrabold text-primary">{String(previewTime).padStart(2, "0")}:00</span>
                  </div>

                  {/* Zoom controls */}
                  <div className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800/80 px-1 py-0.5 rounded h-6">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded p-0 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border-none disabled:opacity-30 flex items-center justify-center cursor-pointer"
                      onClick={() => setZoom(prev => Math.max(prev - 0.15, 0.6))}
                      disabled={zoom <= 0.6}
                      title="缩小时间轴"
                    >
                      <ZoomOut className="h-3 w-3" />
                    </Button>
                    <span className="font-mono text-[9px] w-9 text-center text-primary font-black select-none">
                      {Math.round(zoom * 100)}%
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded p-0 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border-none disabled:opacity-30 flex items-center justify-center cursor-pointer"
                      onClick={() => setZoom(prev => Math.min(prev + 0.15, 2.0))}
                      disabled={zoom >= 2.0}
                      title="放大时间轴"
                    >
                      <ZoomIn className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Add Screen button */}
                  <Button 
                    type="button"
                    onClick={handleAddScreen}
                    className="h-5.5 gap-1 text-[9.5px] font-black bg-primary text-primary-foreground hover:bg-primary/90 rounded px-2"
                  >
                    <Plus className="h-2.5 w-2.5 shrink-0" />
                    <span>添加屏幕</span>
                  </Button>
                </div>
            </div>

              {/* Seamless Screen Previews Region */}
            <div className="p-4 bg-[#0c0d0f] border-b border-[#1e2025] flex-1">
              <div className="overflow-y-auto pr-1 select-none scrollbar-thin scrollbar-thumb-zinc-850 scrollbar-track-transparent">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
                  {timelineData.filter(item => !hiddenScreens[item.id]).length === 0 ? (
                    <div className="col-span-full py-6 text-center bg-zinc-900/40 rounded-xl border border-zinc-800/45 p-4 flex flex-col items-center justify-center space-y-1.5">
                      <Tv className="h-5 w-5 text-zinc-500" />
                      <p className="text-[11px] font-black text-zinc-400">{t("All terminal screens are currently toggled hidden") || "所有屏幕终端均已被隐藏预览"}</p>
                      <p className="text-[9px] text-zinc-650">{t("Click the 'Eye' icon on the left timeline row headers to reveal") || "点击下方时间轴左侧各屏幕前的眼睛图标即可重新显示"}</p>
                    </div>
                  ) : (
                    timelineData.map((item) => {
                      const isHidden = hiddenScreens[item.id];
                      if (isHidden) return null;

                      // Find what is playing at previewTime
                      const currentPlayingName = screenSchedules[item.id]?.[previewTime] || "OFF";
                      const mediaItem = AVAILABLE_CONTENTS.find(c => c.name === currentPlayingName);
                      const isOff = currentPlayingName === "OFF";

                      return (
                        <div 
                          key={`preview_${item.id}`} 
                          className="flex flex-col space-y-2 animate-in fade-in duration-200"
                        >
                          {/* 16:9 Screen container */}
                          <div className="aspect-video w-full rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden relative shadow-md group">
                            
                            {/* Simulation Inner Screen */}
                            {isOff ? (
                              <div className="absolute inset-0 bg-[#0a0a0c] flex flex-col items-center justify-center p-3 text-center select-none animate-in fade-in">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-ping absolute top-2 right-2" />
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600 absolute top-2 right-2" />
                                <Tv className="h-5 w-5 text-zinc-800 mb-1.5" />
                                <span className="text-[9px] font-mono font-bold text-zinc-650 tracking-wider">熄屏 / OFF</span>
                              </div>
                            ) : (
                              <div className="absolute inset-0 flex flex-col justify-between p-3 select-none overflow-hidden relative">
                                {/* Visual Background Pattern based on Media Type */}
                                {mediaItem?.type === "video" && (
                                  <>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/90 to-teal-900/60 opacity-95" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />
                                    <div className="absolute bottom-1 right-2 w-full flex justify-end gap-1 opacity-60">
                                      <span className="text-[8px] font-mono text-emerald-400">VIDEO</span>
                                    </div>
                                  </>
                                )}

                                {mediaItem?.type === "image" && (
                                  <>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/95 to-amber-900/60 opacity-95" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
                                    <div className="absolute bottom-1 right-2 w-full flex justify-end gap-1 opacity-60">
                                      <span className="text-[8px] font-mono text-amber-500">POSTER</span>
                                    </div>
                                  </>
                                )}

                                {mediaItem?.type === "notice" && (
                                  <>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-red-950/95 to-rose-900/60 opacity-95 border border-red-500/10" />
                                    <div className="absolute bottom-1 right-2 w-full flex justify-end gap-1 opacity-60">
                                      <span className="text-[8px] font-mono text-rose-400">NOTICE</span>
                                    </div>
                                  </>
                                )}

                                {mediaItem?.type === "interactive" && (
                                  <>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0a051d] to-[#12052c] opacity-95" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent" />
                                    <div className="absolute bottom-1 right-2 w-full flex justify-end gap-1 opacity-65">
                                      <span className="text-[8px] font-mono text-cyan-400">H5 APP</span>
                                    </div>
                                  </>
                                )}

                                {mediaItem?.type === "default" && (
                                  <>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-zinc-800 opacity-95" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
                                    <div className="absolute bottom-1 right-2 w-full flex justify-end gap-1 opacity-50">
                                      <span className="text-[8px] font-mono text-zinc-500">STREAM</span>
                                    </div>
                                  </>
                                )}

                                {/* Content Display inside Screen */}
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                  <div className="flex justify-between items-center w-full">
                                    <span className="text-[8px] font-black text-white/60 bg-black/55 px-1.5 py-0.5 rounded border border-white/5 uppercase font-mono">{mediaItem?.type || "unknown"}</span>
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  </div>

                                  <div className="my-auto py-1 text-center">
                                    <p className="text-[10px] md:text-[11px] font-black text-white tracking-tight leading-snug line-clamp-2 px-1 text-shadow-md">
                                      {currentPlayingName}
                                    </p>
                                  </div>

                                  <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden shrink-0">
                                    <div className="h-full bg-primary animate-pulse" style={{ width: '60%' }} />
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Calendar button for chart modal */}
                            <button
                              onClick={() => setScheduleDrawerOpen(true)}
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                              title="View schedule chart"
                            >
                              <Calendar className="h-4 w-4 text-white" />
                            </button>
                          </div>

                          {/* Beneath caption label */}
                          <span className="text-[10.5px] text-center font-extrabold text-[#71717a] dark:text-zinc-400 truncate block leading-none">
                            {item.id} 屏幕
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

              {/* Timeline flex layout with height exactly matches custom timeline editor rows */}
              <div className="flex h-[240px] relative shrink-0">
              
                {/* Left sticky column holding screens */}
                <div
                  className="w-[180px] border-r border-[#1d1e21] bg-[#101114] overflow-y-hidden select-none flex flex-col shrink-0"
                >
                {/* corner category tag - height matches time area (32px) + edit area margin top (10px) = 42px exactly */}
                <div className="h-[32px] bg-[#131417] border-b border-zinc-800/80 px-4 flex items-center gap-1.5 shrink-0">
                  <Terminal className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-black text-zinc-300 tracking-wider">终端屏幕</span>
                </div>
                
                {/* List of row titles mapped from timeline rows */}
                <div 
                  ref={domRef} 
                  style={{ overflow: 'overlay' }}
                  onScroll={(e) => {
                    const target = e.target as HTMLDivElement;
                    timelineState.current?.setScrollTop(target.scrollTop);
                  }} 
                  className="mt-[8px] px-[10px] timeline-list flex-1 overflow-y-hidden flex flex-col"
                >
                  {timelineData.map((item) => (
                    <div 
                      key={item.id} 
                      className="h-[32px] group timeline-list-item flex items-center justify-center border-zinc-805/10 hover:bg-[#111215]/40 transition-colors shrink-0" 
                    >
                      <div className="p-[2.5px] w-full bg-[#1b1c20] hover:bg-[#202127] border-zinc-800/60 px-2 py-0.5 flex items-center justify-between shadow-lg transition-colors rounded-sm gap-1">
                        <div className="flex items-center gap-1 min-w-0 flex-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-5 w-5 rounded-md p-0 shrink-0 transition-colors border-none hover:bg-zinc-850",
                              hiddenScreens[item.id] 
                                ? "text-zinc-500 hover:text-zinc-300" 
                                : "text-primary hover:text-primary/80"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              setHiddenScreens(prev => ({
                                ...prev,
                                [item.id]: !prev[item.id]
                              }));
                            }}
                            title={hiddenScreens[item.id] ? "显示预览" : "隐藏预览"}
                          >
                            {hiddenScreens[item.id] ? (
                              <EyeOff className="h-3.5 w-3.5" />
                            ) : (
                              <Eye className="h-3.5 w-3.5" />
                            )}
                          </Button>
                          <span className={cn(
                            "text-xs font-black truncate transition-all",
                            hiddenScreens[item.id] ? "text-zinc-500 line-through opacity-60" : "text-zinc-100"
                          )}>
                            {item.id} 屏幕
                          </span> 
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 opacity-0 group-hover:opacity-100 rounded-md hover:bg-red-500/20 hover:text-red-400 text-zinc-400 p-0 shrink-0 transition-all border-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            setScreenToDelete(item.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 opacity-0 group-hover:opacity-100 rounded-md hover:bg-primary/20 hover:text-primary text-zinc-400 p-0 shrink-0 transition-all border-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            setScheduleDrawerOpen(true);
                          }}
                          title="View schedule chart"
                        >
                          <Calendar className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side react-timeline-editor container */}
              <div className="flex-1 bg-[#0c0d0f] relative overflow-hidden flex flex-col">
                <Timeline 
                  ref={timelineState}
                  onChange={handleTimelineChange}
                  editorData={timelineData}
                  effects={timelineEffects}
                  scale={1}
                  scaleWidth={hourWidth}
                  rowHeight={32}
                  minScaleCount={24}
                  maxScaleCount={24}
                  scaleSplitCount={1}
                  gridSnap={true}
                  getScaleRender={(v) => `${String(Math.floor(v)).padStart(2, "0")}:00`}
                  onCursorDrag={(time) => {
                    const hour = Math.min(23, Math.max(0, Math.floor(time)));
                    setPreviewTime(hour);
                  }}
                  onClickTimeArea={(time) => {
                    const hour = Math.min(23, Math.max(0, Math.floor(time)));
                    setPreviewTime(hour);
                    return true;
                  }}
                  onScroll={({ scrollTop }) => {
                    if (domRef.current) {
                      domRef.current.scrollTop = scrollTop;
                    }
                  }}
                  // onClickAction={(e, { action, row }) => {
                  //   const matchedName = AVAILABLE_CONTENTS.find(c => c.id === action.effectId)?.name || "OFF";
                  //   setEditingCell({
                  //     screen: row.id,
                  //     start: action.start,
                  //     end: action.end,
                  //     content: matchedName,
                  //     id: action.id
                  //   });
                  // }}
                  getActionRender={(action) => {
                    const isOff = action.effectId === "OFF";
                    const mediaName = AVAILABLE_CONTENTS.find(c => c.id === action.effectId)?.name || "OFF";
                    return (
                      <div className="h-full flex flex-col justify-center text-left pl-3 truncate w-full pr-1.5 transition-colors select-none">
                        <span className="text-[10px] font-extrabold text-white truncate tracking-wide leading-tight">
                          {isOff ? "熄屏关闭 / OFF" : mediaName}
                        </span>
                        {!isOff && (
                          <span className="text-[8.5px] font-medium text-zinc-300/90 font-mono tracking-tight mt-0.5 leading-none">
                            {String(Math.floor(action.start)).padStart(2, "0")}:00 - {String(Math.floor(action.end)).padStart(2, "0")}:00
                          </span>
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Schedule Insertion Drawer - slides from right */}
        {scheduleDrawerOpen && (
          <>
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50  z-40 animate-in fade-in duration-200"
              onClick={() => setScheduleDrawerOpen(false)}
            />
            {/* Drawer panel */}
            <div className="absolute top-0 right-0 h-full w-[80%] bg-card border-l border-border shadow-2xl z-50 animate-in slide-in-from-right duration-300 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-sm font-black uppercase tracking-wide flex items-center gap-2">
                  <Plus className="h-4 w-4 text-primary" />
                  插入日程
                </h3>
                <button
                  onClick={() => setScheduleDrawerOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden p-4">
                {(() => {
                  const DATE_COL_WIDTH = 200;
                  const HOUR_COL_WIDTH = 56;
                  const HEADER_HEIGHT = 40;
                  const HOUR_ROW_HEIGHT = 64;

                  // Generate dates for 1 month (from selectedDate)
                  const generateMonthDates = () => {
                    const result: string[] = [];
                    const baseDate = new Date(selectedDate);
                    const year = baseDate.getFullYear();
                    const month = baseDate.getMonth();
                    const firstDay = new Date(year, month, 1);
                    const lastDay = new Date(year, month + 2, 0);
                    for (let d = firstDay.getDate(); d <= lastDay.getDate(); d++) {
                      const date = new Date(year, month, d);
                      const y = date.getFullYear();
                      const m = String(date.getMonth() + 1).padStart(2, '0');
                      const day = String(date.getDate()).padStart(2, '0');
                      result.push(`${y}-${m}-${day}`);
                    }
                    return result;
                  };

                  const dates = Object.keys(screenSchedulesByDate).sort().length > 0
                    ? Object.keys(screenSchedulesByDate).sort()
                    : generateMonthDates();
 

                  const TOTAL_WIDTH = dates.length * DATE_COL_WIDTH;
                  const TOTAL_HEIGHT = 24 * HOUR_ROW_HEIGHT;

                  // Get day of week in Chinese
                  const getDayName = (dateStr: string) => {
                    const [y, m, d] = dateStr.split('-').map(Number);
                    const date = new Date(y, m - 1, d);
                    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
                    return days[date.getDay()];
                  };

                  // Get content color
                  const getContentColor = (content: string) => {
                    if (content === "OFF") return "bg-zinc-100 dark:bg-zinc-800";
                    const mediaItem = AVAILABLE_CONTENTS.find(c => c.name === content);
                    switch (mediaItem?.type) {
                      case "video": return "bg-emerald-600";
                      case "image": return "bg-amber-600";
                      case "notice": return "bg-red-600";
                      case "interactive": return "bg-cyan-600";
                      case "default": return "bg-zinc-500";
                      default: return "bg-zinc-300 dark:bg-zinc-600";
                    }
                  };

                  // Cell renderers
                  const cornerCellRenderer = () => (
                    <div className="flex items-center justify-center bg-background border-b border-r border-border" style={{ width: HOUR_COL_WIDTH, height: HEADER_HEIGHT }}>
                      <span className="text-[10px] font-black text-muted-foreground uppercase">时间</span>
                    </div>
                  );

                  const dateCellRenderer = ({ columnIndex, style, key  }: { columnIndex: number; style: React.CSSProperties; key: string}) => {
 
                    const date = dates[columnIndex];
                    return (
                      <div key={key} className="flex flex-col items-center justify-center border-b border-r border-border bg-background/80" style={style}>
                        <span className="text-[11px] font-bold text-muted-foreground">{date}</span>
                        <span className="text-[10px] font-black text-muted-foreground/70">{getDayName(date)}</span>
                      </div>
                    );
                  };

                  const hourRowRenderer = ({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => (
                    <div key={key} className="flex items-center bg-background border-b border-r border-border" style={style}>
                      <span className="text-[11px] font-mono font-bold text-muted-foreground ml-2">
                        {String(index).padStart(2, '0')}:00
                      </span>
                    </div>
                  );

                  const contentCellRenderer = ({ columnIndex, rowIndex, style, key }: { columnIndex: number; rowIndex: number; style: React.CSSProperties; key: string}) => {
                    const date = dates[columnIndex];
                    const hour = rowIndex;
                    const dayData = screenSchedulesByDate[date];
                    const screenSched = dayData?.screenSchedules || {};
                    const firstScreenId = Object.keys(screenSched)[0] || '';
                    const content = screenSched[firstScreenId]?.[hour] || "OFF";
                    return (
                      <div
                       key={key} 
                        className={cn(
                          "flex items-center justify-center text-center cursor-default border-b border-r border-border",
                          getContentColor(content)
                        )}
                        style={style} 
                      >
                        {content !== "OFF" && (
                          <span className="text-[10px] font-bold text-white truncate px-1">
                            {content.split('.')[0]}
                          </span>
                        )}
                      </div>
                    );
                  };

                  return (
                    <div className="w-full h-full border rounded-xl bg-background/50 overflow-hidden">
                      <ScrollSync>
                        {({ onScroll, scrollLeft, scrollTop }) => (
                          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            {/* Corner cell - fixed top-left */}
                            <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 3 }}>
                              <Grid 
                                width={HOUR_COL_WIDTH}
                                height={HEADER_HEIGHT}
                                columnWidth={HOUR_COL_WIDTH}
                                rowHeight={HEADER_HEIGHT}
                                columnCount={1}
                                rowCount={1}
                                cellRenderer={cornerCellRenderer}
                              />
                            </div>
                             

                            <AutoSizer>
                              {({width, height}) => (
                                <div>
                                  <div style={{ position: 'absolute', left: 0, top: HEADER_HEIGHT, zIndex: 1 }}>
                                  <Grid
                                    overscanRowCount={14}
                                        overscanColumnCount={7}
                                    scrollTop={scrollTop} 
                                    width={HOUR_COL_WIDTH}
                                    height={height}
                                    columnWidth={HOUR_COL_WIDTH}
                                    rowHeight={HOUR_ROW_HEIGHT}
                                    columnCount={1}
                                    rowCount={24}
                                    cellRenderer={({ key, rowIndex, style }) => hourRowRenderer({ index: rowIndex, key, style })}
                                  />
                                </div>
                                    {/* Header row - scrolls horizontally */}
                                    <div style={{ position: 'absolute', left: HOUR_COL_WIDTH, top: 0, zIndex: 2,  }}>
                                      <Grid 
                                       overscanRowCount={1}
                                        overscanColumnCount={7}
                                        scrollLeft={scrollLeft}
                                        onScroll={onScroll} 
                                        width={width}
                                        height={HEADER_HEIGHT}
                                        columnWidth={DATE_COL_WIDTH}
                                        rowHeight={HEADER_HEIGHT}
                                        columnCount={dates.length}
                                        rowCount={1}
                                        cellRenderer={dateCellRenderer}
                                      />
                                    </div>
                                    {/* Left column - scrolls vertically */}
                                  
                                    {/* Main content - scrolls both */}
                                    <div style={{ position: 'absolute', left: HOUR_COL_WIDTH, top: HEADER_HEIGHT }}>
                                      <Grid
                                        overscanRowCount={14}
                                        overscanColumnCount={7}
                                        onScroll={onScroll}
                                        scrollTop={scrollTop} 
                                        width={width}
                                        height={height}
                                        columnWidth={DATE_COL_WIDTH}
                                        rowHeight={HOUR_ROW_HEIGHT}
                                        columnCount={dates.length}
                                        rowCount={24}
                                        cellRenderer={contentCellRenderer}
                                      />
                                    </div>
                                </div>
                              )}
                            </AutoSizer>
                          </div>
                        )}
                      </ScrollSync>
                    </div>
                  );
                })()}
              </div>
            </div>
          </>
        )}
      </ScrollArea>

      {/* COMPREHENSIVE MODAL BLOCK EDITOR FOR CHOSEN TIMELINE ACTION SCALE */}
      {editingCell && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-card border w-full max-w-md rounded-[24px] shadow-2xl p-6 relative space-y-4">
            
            <button 
              onClick={() => setEditingCell(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </button>
            
            <h3 className="text-sm font-black uppercase text-foreground tracking-wide flex items-center gap-2 border-b pb-3">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span>智能多媒体播控排期编辑</span>
            </h3>
            
            <div className="space-y-3 bg-muted/20 p-3.5 rounded-2xl border text-xs">
              <div className="flex justify-between items-center text-zinc-400">
                <span>选定屏幕轨道:</span>
                <span className="font-extrabold text-foreground bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md">屏幕 {editingCell.screen}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase font-black block mb-1">开始时刻 (0-23)</label>
                  <select 
                    value={editingCell.start}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= editingCell.end) {
                        setEditingCell(prev => prev ? { ...prev, start: val, end: Math.min(24, val + 1) } : null);
                      } else {
                        setEditingCell(prev => prev ? { ...prev, start: val } : null);
                      }
                    }}
                    className="w-full bg-background border rounded-lg px-2 py-1.5 text-xs font-bold"
                  >
                    {Array.from({ length: 24 }).map((_, h) => (
                      <option key={h} value={h}>{String(h).padStart(2, "0")}:00</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase font-black block mb-1">结束时刻 (1-24)</label>
                  <select 
                    value={editingCell.end}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val <= editingCell.start) {
                        setEditingCell(prev => prev ? { ...prev, end: val, start: Math.max(0, val - 1) } : null);
                      } else {
                        setEditingCell(prev => prev ? { ...prev, end: val } : null);
                      }
                    }}
                    className="w-full bg-background border rounded-lg px-2 py-1.5 text-xs font-bold"
                  >
                    {Array.from({ length: 24 }).map((_, h) => {
                      const hourVal = h + 1;
                      return <option key={hourVal} value={hourVal}>{String(hourVal).padStart(2, "0")}:00</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <Label className="text-[10px] font-black uppercase text-muted-foreground/80 block">多媒体素材 & 播放源</Label>
              <div className="grid grid-cols-1 gap-1.5 max-h-[220px] overflow-y-auto pr-1">
                {AVAILABLE_CONTENTS.map(c => {
                  const isSelected = editingCell.content === c.name;

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
                        setEditingCell(prev => prev ? { ...prev, content: c.name } : null);
                      }}
                    >
                      <span className="truncate pr-2">{c.name}</span>
                      <span className="text-[8.5px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted text-zinc-500 tracking-wider shrink-0">{c.type}</span>
                    </button>
                  );
                })}

                <button
                  type="button"
                  className={cn(
                    "p-2.5 rounded-xl border font-black text-center transition-all mt-1.5",
                    editingCell.content === "OFF"
                      ? "bg-red-500/10 border-red-500 text-red-500"
                      : "border-red-500/20 text-red-500 hover:bg-red-500/5"
                  )}
                  onClick={() => {
                    setEditingCell(prev => prev ? { ...prev, content: "OFF" } : null);
                  }}
                >
                  熄屏 / OFF (不播放)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setEditingCell(null)}
                className="rounded-xl font-bold h-9 text-xs"
              >
                取消
              </Button>
              <Button 
                size="sm"
                onClick={() => {
                  if (editingCell) {
                    const mediaItem = AVAILABLE_CONTENTS.find(c => c.name === editingCell.content);
                    const effectId = mediaItem ? mediaItem.id : "OFF";
                    const updatedData = timelineData.map((row) => {
                      if (row.id === editingCell.screen) {
                        return {
                          ...row,
                          actions: row.actions.map((action) => {
                            if (action.id === editingCell.id) {
                              return {
                                ...action,
                                start: editingCell.start,
                                end: editingCell.end,
                                effectId: effectId,
                                name: editingCell.content
                              };
                            }
                            return action;
                          })
                        };
                      }
                      return row;
                    });
                    handleTimelineChange(updatedData);
                    setEditingCell(null);
                  }
                }}
                className="rounded-[14px] font-bold h-9 text-xs bg-primary text-primary-foreground hover:bg-primary/95"
              >
                确认播控更改
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* SCREEN DELETION CONFIRMATION MODAL */}
      {screenToDelete && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-card border w-full max-w-sm rounded-[24px] shadow-2xl p-6 relative space-y-4">
            
            <button 
              onClick={() => setScreenToDelete(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="flex items-center gap-3 text-red-500">
              <div className="p-3 bg-red-500/10 rounded-full">
                <Trash2 className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-foreground text-sm">{t("Confirm Removal") || "确认移除屏幕终端？"}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{t("This will delete all its schedule track cells.") || "该控制区域及所有计划都会被同步移除。"}</p>
              </div>
            </div>

            <div className="p-3 bg-muted/20 border rounded-2xl text-center">
              <span className="text-xs font-black text-foreground">目标终端: </span>
              <kbd className="text-xs font-mono font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md ml-1">{screenToDelete} 屏幕</kbd>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setScreenToDelete(null)}
                className="rounded-xl font-bold h-9 text-xs"
              >
                取消
              </Button>
              <Button 
                size="sm"
                onClick={() => {
                  if (screenToDelete) {
                    handleDeleteScreen(screenToDelete);
                    setScreenToDelete(null);
                  }
                }}
                className="rounded-[14px] font-bold h-9 text-xs bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/10"
              >
                确认移除
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* ADD SCREEN TERMINAL MODAL */}
      {addScreenModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-card border w-full max-w-sm rounded-[24px] shadow-2xl p-6 relative space-y-4">
            
            <button 
              onClick={() => setAddScreenModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="flex items-center gap-3 text-primary">
              <div className="p-3 bg-primary/10 rounded-full">
                <Plus className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-foreground text-sm">{t("Add Screen Terminal") || "添加屏幕终端"}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{t("Add a new screen track to the timeline") || "在排期时间轴上增加一条全新的屏幕轨道"}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-muted-foreground block">{t("Screen Number / Name") || "新屏幕标识号 / 终端名称"}</label>
              <input
                type="text"
                value={newScreenName}
                onChange={(e) => {
                  setNewScreenName(e.target.value);
                  setAddScreenError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    confirmAddScreen();
                  }
                }}
                placeholder="例如: 8# 或 户外屏幕-A"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-xl px-3 py-2 text-sm text-foreground placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-inner"
                autoFocus
              />
              {addScreenError && (
                <p className="text-[10px] text-red-500 font-bold font-mono tracking-wide bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-md mt-1 animate-pulse">
                  ⚠️ {addScreenError}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setAddScreenModalOpen(false)}
                className="rounded-xl font-bold h-9 text-xs"
              >
                取消
              </Button>
              <Button 
                size="sm"
                onClick={confirmAddScreen}
                className="rounded-[14px] font-bold h-9 text-xs bg-primary hover:bg-primary/95 text-primary-foreground shadow-xs"
              >
                确认添加
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
