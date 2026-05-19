import * as React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Monitor,
  Music,
  Video,
  Search,
  Tag,
  Settings,
  Activity,
  MessageSquare,
  Cpu,
  Thermometer,
  HardDrive,
  Network,
  Power,
  RefreshCw,
  Camera,
  MonitorPlay,
  Moon,
  Sun,
  Maximize,
  Volume2,
  Usb,
  Terminal,
  ChevronRight,
  ChevronDown,
  Building,
  FolderTree,
  MoreVertical,
  Trash2,
  AlertCircle,
  Plus,
  X,
  Check,
  Layers,
  Link,
  Unlink,
} from "lucide-react";

// Types
interface CertificateDetail {
  cn: string;
  o: string;
  ou?: string;
  c?: string;
  validUntil: string;
}

interface Device {
  id: string;
  name: string;
  type: "media" | "music";
  orgId: string;
  orgName: string;
  tags: string[];
  status: "online" | "offline";
  groupId?: string;
  basicInfo: {
    os: string;
    version: string;
    brand: string;
    model: string;
  };
  config: DeviceConfig;
  lastHeartbeat: string;
  serialNumber: string;
  certificates?: {
    intermediateCa: CertificateDetail;
    clientCert: CertificateDetail;
  };
}

interface DeviceConfig {
  ip: string;
  nic: string;
  subnet: string;
  dns: string;
  schedulePower: string;
  bgImage: string;
  heartbeatInterval: number;
  orientation: "0" | "90" | "180" | "270";
  time: string;
  brightness: number;
  volume: number;
  usbEnabled: boolean;
  remoteLock: boolean;
  debugMode: boolean;
}

interface MqttMessage {
  id: string;
  topic: string;
  payload: string;
  timestamp: string;
  direction: "in" | "out";
}

interface Screen {
  id: string;
  deviceId: string;
  deviceName: string;
  tags: string[];
  status: "online" | "offline";
  resolution: string;
  validity: string;
  screenshot: string;
}

// Mock Data
const mockStats = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}:00`,
  cpu: Math.floor(Math.random() * 40) + 20,
  temp: Math.floor(Math.random() * 20) + 40,
  memory: Math.floor(Math.random() * 30) + 50,
  disk: 45,
  netIn: Math.floor(Math.random() * 100),
  netOut: Math.floor(Math.random() * 50),
}));

const mockDevices: Device[] = [
  {
    id: "DEV-001",
    name: "Lobby Display 01",
    type: "media",
    orgId: "7",
    orgName: "Shanghai Flagship Store",
    tags: ["Lobby", "4K", "Promo"],
    status: "online",
    groupId: "GRP-MAIN",
    basicInfo: {
      os: "Android 11",
      version: "v2.4.5",
      brand: "Samsung",
      model: "QM55R",
    },
    config: {
      ip: "192.168.1.101",
      nic: "eth0",
      subnet: "255.255.255.0",
      dns: "8.8.8.8",
      schedulePower: "08:00 - 22:00",
      bgImage: "https://picsum.photos/seed/lobby/1920/1080",
      heartbeatInterval: 30,
      orientation: "0",
      time: "2024-04-16 10:00:00",
      brightness: 80,
      volume: 50,
      usbEnabled: true,
      remoteLock: false,
      debugMode: false,
    },
    lastHeartbeat: "2024-04-16 10:05:23",
    serialNumber: "SN-LOB-001-X9",
    certificates: {
      intermediateCa: {
        cn: "Intermediate CA G1",
        o: "Global Security",
        ou: "Trust Services",
        c: "US",
        validUntil: "2028-12-31",
      },
      clientCert: {
        cn: "DEV-001.devices.internal",
        o: "Global Security",
        ou: "IT",
        c: "US",
        validUntil: "2025-04-15",
      },
    },
  },
  {
    id: "DEV-002",
    name: "Cafe Background Music",
    type: "music",
    orgId: "7",
    orgName: "Shanghai Flagship Store",
    tags: ["Cafe", "Audio"],
    status: "offline",
    basicInfo: {
      os: "Linux Embedded",
      version: "v1.2.0",
      brand: "Bose",
      model: "ESP-880",
    },
    config: {
      ip: "192.168.1.102",
      nic: "eth0",
      subnet: "255.255.255.0",
      dns: "8.8.8.8",
      schedulePower: "07:00 - 23:00",
      bgImage: "",
      heartbeatInterval: 60,
      orientation: "0",
      time: "2024-04-16 10:00:00",
      brightness: 0,
      volume: 65,
      usbEnabled: false,
      remoteLock: true,
      debugMode: false,
    },
    lastHeartbeat: "2024-04-16 10:04:12",
    serialNumber: "SN-CAF-002-Y2",
    certificates: {
      intermediateCa: {
        cn: "Intermediate CA G1",
        o: "Global Security",
        ou: "Trust Services",
        c: "US",
        validUntil: "2028-12-31",
      },
      clientCert: {
        cn: "DEV-002.devices.internal",
        o: "Global Security",
        ou: "IT",
        c: "US",
        validUntil: "2025-03-20",
      },
    },
  },
];

const mockMqttMessages: MqttMessage[] = [
  { id: "1", topic: "device/DEV-001/cmd", payload: '{"action": "reboot"}', timestamp: "2024-04-16 10:00:01", direction: "out" },
  { id: "2", topic: "device/DEV-001/status", payload: '{"status": "online", "ip": "192.168.1.101"}', timestamp: "2024-04-16 10:00:05", direction: "in" },
  { id: "3", topic: "device/DEV-001/config", payload: '{"brightness": 80}', timestamp: "2024-04-16 10:01:20", direction: "out" },
];

const mockScreens: Screen[] = [
  {
    id: "SCR-101",
    deviceId: "DEV-001",
    deviceName: "Lobby Display 01",
    tags: ["Main", "4K"],
    status: "online",
    resolution: "3840x2160",
    validity: "2025-12-31",
    screenshot: "https://picsum.photos/seed/screen1/400/225"
  },
  {
    id: "SCR-102",
    deviceId: "DEV-001",
    deviceName: "Lobby Display 01",
    tags: ["Extended", "HD"],
    status: "online",
    resolution: "1920x1080",
    validity: "2025-12-31",
    screenshot: "https://picsum.photos/seed/screen102/400/225"
  },
  {
    id: "SCR-201",
    deviceId: "DEV-002",
    deviceName: "Cafe Background Music",
    tags: ["Audio-Only"],
    status: "offline",
    resolution: "N/A",
    validity: "2024-10-15",
    screenshot: "https://picsum.photos/seed/screen2/400/225"
  }
];

const mockOrgs = [
  { id: "root", name: "Root Organization", parentId: null },
  { id: "sh", name: "Shanghai Branch", parentId: "root" },
  { id: "7", name: "Shanghai Flagship Store", parentId: "sh" },
  { id: "bj", name: "Beijing Branch", parentId: "root" },
  { id: "bj-01", name: "Beijing CBD Store", parentId: "bj" },
];

export function DeviceManagement() {
  const { t } = useTranslation();
  const [data, setData] = React.useState<Device[]>(mockDevices);
  const [screens] = React.useState<Screen[]>(mockScreens);
  const [viewDimension, setViewDimension] = React.useState<"device" | "screen">("device");
  const [selectedDevice, setSelectedDevice] = React.useState<Device | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  
  // Organization Cascading State
  const [selectedOrgPath, setSelectedOrgPath] = React.useState<string[]>([]);
  const selectedOrg = selectedOrgPath.length > 0 ? selectedOrgPath[selectedOrgPath.length - 1] : null;
  const [newTag, setNewTag] = React.useState("");
  const [groupInput, setGroupInput] = React.useState("");
  const [isRemoteAssistanceOpen, setIsRemoteAssistanceOpen] = React.useState(false);
  const [screenshotLoading, setScreenshotLoading] = React.useState(false);
  const [activeScreenIndex, setActiveScreenIndex] = React.useState(0);
  const [screenshotUrl, setScreenshotUrl] = React.useState(`https://picsum.photos/seed/device-${Date.now()}/1280/720`);

  const refreshScreenshot = () => {
    setScreenshotLoading(true);
    setTimeout(() => {
      setScreenshotUrl(`https://picsum.photos/seed/device-${activeScreenIndex}-${Date.now()}/1280/720`);
      setScreenshotLoading(false);
    }, 1000);
  };

  const handleUpdateGroup = (deviceId: string, groupId: string | undefined) => {
    const updatedDevices = data.map(d => {
      if (d.id === deviceId) {
        return { ...d, groupId: groupId?.trim() || undefined };
      }
      return d;
    });
    setData(updatedDevices);
    setGroupInput("");
  };

  const handleAddTag = (deviceId: string) => {
    if (!newTag.trim()) return;
    const updatedDevices = data.map(d => {
      if (d.id === deviceId && !d.tags.includes(newTag.trim())) {
        return { ...d, tags: [...d.tags, newTag.trim()] };
      }
      return d;
    });
    setData(updatedDevices);
    setNewTag("");
  };

  const handleRemoveTag = (deviceId: string, tagToRemove: string) => {
    const updatedDevices = data.map(d => {
      if (d.id === deviceId) {
        return { ...d, tags: d.tags.filter(t => t !== tagToRemove) };
      }
      return d;
    });
    setData(updatedDevices);
  };

  // Helper to get all sub-org IDs recursively
  const getSubOrgIds = React.useCallback((orgId: string): string[] => {
    const ids = [orgId];
    const children = mockOrgs.filter(o => o.parentId === orgId);
    children.forEach(child => {
      ids.push(...getSubOrgIds(child.id));
    });
    return ids;
  }, []);

  const selectedOrgIds = React.useMemo(() => {
    if (!selectedOrg) return null;
    return getSubOrgIds(selectedOrg);
  }, [selectedOrg, getSubOrgIds]);

  const filteredDevices = React.useMemo(() => data.filter(d => 
    (d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!selectedOrgIds || selectedOrgIds.includes(d.orgId)) &&
    (selectedTags.length === 0 || selectedTags.every(tag => d.tags.includes(tag)))
  ), [data, searchQuery, selectedOrgIds, selectedTags]);

  const filteredScreens = React.useMemo(() => screens.filter(s => 
    (s.id.toLowerCase().includes(searchQuery.toLowerCase()) || s.deviceName.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!selectedOrgIds || selectedOrgIds.includes(data.find(d => d.id === s.deviceId)?.orgId || "")) &&
    (selectedTags.length === 0 || selectedTags.every(tag => s.tags.includes(tag)))
  ), [screens, data, searchQuery, selectedOrgIds, selectedTags]);

  const currentDevice = React.useMemo(() => 
    selectedDevice ? data.find(d => d.id === selectedDevice.id) : null
  , [data, selectedDevice]);

  // Helper for cascading orgs
  const getOrgLevel = (parentId: string | null) => mockOrgs.filter(o => o.parentId === parentId);

  const allTags = React.useMemo(() => {
    const deviceTags = data.flatMap(d => d.tags);
    const screenTags = screens.flatMap(s => s.tags);
    return Array.from(new Set([...deviceTags, ...screenTags])).sort();
  }, [data, screens]);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Main Content: Device List */}
      <div className="flex-1 flex flex-col bg-muted/30">
        <div className="px-4 py-3 border-b bg-card space-y-3">
          <div className="flex flex-wrap items-center gap-4">
            <Tabs 
              value={viewDimension} 
              onValueChange={(v) => setViewDimension(v as "device" | "screen")}
              className="w-auto"
            >
              <TabsList className="h-9">
                <TabsTrigger value="device" className="text-xs px-4">{t("Devices")}</TabsTrigger>
                <TabsTrigger value="screen" className="text-xs px-4">{t("Screens")}</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">{t("Organization")}:</span>
              <Popover>
                <PopoverTrigger 
                  className={cn(buttonVariants({ variant: "outline" }), "h-8 justify-between text-xs min-w-[180px] px-3 font-normal")}
                >
                  <div className="flex items-center gap-2 truncate max-w-[240px]">
                    <Building className="h-3.5 w-3.5 shrink-0 opacity-50" />
                    <span className="truncate">
                      {selectedOrgPath.length > 0 
                        ? selectedOrgPath.map(id => mockOrgs.find(o => o.id === id)?.name).join(" / ")
                        : t("All Organizations")
                      }
                    </span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-50 ml-2" />
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[280px]" align="start">
                  <Command>
                    <CommandInput placeholder={t("Search Organization...")} className="h-8 text-xs" />
                    <CommandList className="max-h-[300px]">
                      <CommandEmpty className="py-2 text-xs">{t("No organization found.")}</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => setSelectedOrgPath([])}
                          className="text-xs flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Building className="h-3.5 w-3.5" />
                            {t("All Organizations")}
                          </div>
                          {selectedOrgPath.length === 0 && <Check className="h-3 w-3" />}
                        </CommandItem>
                      </CommandGroup>
                      
                      <div className="border-t">
                        {/* Nested Selection Logic */}
                        {(() => {
                           // This is a simplified tree view for the Cascader
                           // If more complex nesting is needed, a recursive component would be better
                           return mockOrgs.filter(o => o.parentId === null).map(rootOrg => (
                             <React.Fragment key={rootOrg.id}>
                               <CommandItem
                                 onSelect={() => setSelectedOrgPath([rootOrg.id])}
                                 className="text-xs flex items-center justify-between pl-4"
                               >
                                 <div className="flex items-center gap-2">
                                   <FolderTree className="h-3.5 w-3.5" />
                                   {rootOrg.name}
                                 </div>
                                 {selectedOrg === rootOrg.id && <Check className="h-3 w-3" />}
                               </CommandItem>
                               {mockOrgs.filter(o => o.parentId === rootOrg.id).map(subOrg => (
                                 <React.Fragment key={subOrg.id}>
                                   <CommandItem
                                     onSelect={() => setSelectedOrgPath([rootOrg.id, subOrg.id])}
                                     className="text-xs flex items-center justify-between pl-8"
                                   >
                                     <div className="flex items-center gap-2">
                                       <ChevronRight className="h-3 w-3 opacity-30" />
                                       {subOrg.name}
                                     </div>
                                     {selectedOrg === subOrg.id && <Check className="h-3 w-3" />}
                                   </CommandItem>
                                   {mockOrgs.filter(o => o.parentId === subOrg.id).map(grandChild => (
                                     <CommandItem
                                       key={grandChild.id}
                                       onSelect={() => setSelectedOrgPath([rootOrg.id, subOrg.id, grandChild.id])}
                                       className="text-xs flex items-center justify-between pl-12"
                                     >
                                       <div className="flex items-center gap-2">
                                         <ChevronRight className="h-3 w-3 opacity-30" />
                                         {grandChild.name}
                                       </div>
                                       {selectedOrg === grandChild.id && <Check className="h-3 w-3" />}
                                     </CommandItem>
                                   ))}
                                 </React.Fragment>
                               ))}
                             </React.Fragment>
                           ));
                        })()}
                      </div>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-0 bg-muted/20 rounded-md overflow-hidden ml-2 border border-transparent focus-within:ring-1 focus-within:ring-primary/20 focus-within:border-primary/20 transition-all">
              <Popover>
                <PopoverTrigger className="h-8 border-none bg-transparent text-xs w-[120px] rounded-none focus:ring-0 shadow-none px-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <span className="truncate">
                    {selectedTags.length === 0 ? t("All Tags") : `${t("Tags")}: ${selectedTags.length}`}
                  </span>
                  <ChevronDown className="h-3 w-3 opacity-50 ml-1" />
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[200px]" align="start">
                  <Command>
                    <CommandInput placeholder={t("Search Tags...")} className="h-8 text-xs" />
                    <CommandList>
                      <CommandEmpty className="py-2 text-xs">{t("No tags found.")}</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => setSelectedTags([])}
                          className="text-xs flex items-center gap-2"
                        >
                          <Checkbox checked={selectedTags.length === 0} readOnly />
                          {t("All Tags")}
                        </CommandItem>
                        {allTags.map(tag => (
                          <CommandItem
                            key={tag}
                            onSelect={() => {
                              setSelectedTags(prev => 
                                prev.includes(tag) 
                                  ? prev.filter(t => t !== tag) 
                                  : [...prev, tag]
                              );
                            }}
                            className="text-xs flex items-center gap-2"
                          >
                            <Checkbox checked={selectedTags.includes(tag)} readOnly />
                            {tag}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="h-4 w-[1px] bg-border/50 mx-1 shrink-0" />
              <div className="relative flex-1 min-w-[160px]">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder={viewDimension === "device" ? t("Search devices...") : t("Search screens...")}
                  className="pl-9 h-8 text-xs bg-transparent border-none focus-visible:ring-0 shadow-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                {t("Tags")}
              </Button>
              <Button size="sm" className="h-8 gap-1.5 text-xs">
                <RefreshCw className="h-3.5 w-3.5" />
                {t("Refresh")}
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          {viewDimension === "device" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDevices.map((device) => (
                <Card 
                  key={device.id} 
                  className="cursor-pointer hover:border-primary transition-colors group relative"
                  onClick={() => setSelectedDevice(device)}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant={device.status === "online" ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">
                        {device.status === "online" ? t("Online") : t("Offline")}
                      </Badge>
                      <div className="text-[10px] text-muted-foreground font-mono">{device.id}</div>
                    </div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {device.type === "media" ? <Video className="h-4 w-4 text-blue-500" /> : <Music className="h-4 w-4 text-purple-500" />}
                      <span className="truncate">{device.name}</span>
                    </CardTitle>
                    <div className="flex items-center justify-between mt-1">
                      <CardDescription className="text-xs truncate flex-1">{device.orgName}</CardDescription>
                      {device.groupId && (
                        <Badge variant="outline" className="text-[9px] h-4 px-1 gap-1 border-primary/30 text-primary bg-primary/5 shrink-0 ml-2">
                          <Layers className="h-2.5 w-2.5" />
                          {device.groupId}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {device.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px] font-normal">
                          {tag}
                        </Badge>
                      ))}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-5 w-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDevice(device);
                        }}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] text-muted-foreground border-t pt-3">
                      <div>{t("Model")}: {device.basicInfo.model}</div>
                      <div>{t("Client Version")}: {device.basicInfo.version}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredScreens.map((screen) => (
                <Card key={screen.id} className="overflow-hidden border-2 hover:border-primary transition-all group">
                  <div className="aspect-video relative bg-muted group-hover:brightness-75 transition-all cursor-pointer">
                    <img 
                      src={screen.screenshot} 
                      alt={screen.id} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={screen.status === "online" ? "default" : "secondary"} className="text-[10px]">
                        {screen.status === "online" ? t("Online") : t("Offline")}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="sm" className="gap-2 font-bold shadow-lg">
                        <Maximize className="h-4 w-4" />
                        {t("View Full Screenshot")}
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-[10px] text-primary font-bold tracking-widest uppercase">{t("Screen Number")}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">{screen.id}</div>
                    </div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <MonitorPlay className="h-4 w-4 text-blue-500" />
                      <span className="truncate">{screen.id}</span>
                    </CardTitle>
                    <div className="mt-2 space-y-1">
                      <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{t("Belongs to Device")}</div>
                      <CardDescription className="text-xs truncate font-semibold text-foreground flex items-center gap-1">
                         <Cpu className="h-3 w-3" />
                         {screen.deviceName}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="grid grid-cols-2 gap-4 border-t pt-4">
                      <div className="space-y-1">
                        <div className="text-[9px] text-muted-foreground uppercase font-bold">{t("Resolution")}</div>
                        <div className="text-xs font-mono font-bold">{screen.resolution}</div>
                      </div>
                      <div className="space-y-1 text-right">
                        <div className="text-[9px] text-muted-foreground uppercase font-bold">{t("Registration Validity")}</div>
                        <div className="text-xs font-bold text-amber-600">{screen.validity}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {screen.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[9px] font-normal bg-primary/5 text-primary border-none">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Device Detail Dialog */}
      <Dialog open={!!selectedDevice} onOpenChange={(open) => !open && setSelectedDevice(null)}>
        <DialogContent className="max-w-[98vw] lg:max-w-6xl w-full h-[90vh] flex flex-col p-0 overflow-hidden">
          {currentDevice && (
            <>
              <DialogHeader className="p-4 md:p-6 pb-2 border-b shrink-0">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg shrink-0 ${currentDevice.type === 'media' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                      {currentDevice.type === 'media' ? <Video className="h-5 w-5 md:h-6 md:w-6" /> : <Music className="h-5 w-5 md:h-6 md:w-6" />}
                    </div>
                    <div className="min-w-0">
                      <DialogTitle className="text-lg md:text-2xl truncate">{currentDevice.name}</DialogTitle>
                      <DialogDescription className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs md:text-sm">
                        <Badge variant="outline" className="font-mono text-[10px] md:text-xs">{currentDevice.id}</Badge>
                        <span className="flex items-center gap-1 text-muted-foreground"><Building className="h-3 w-3" /> {currentDevice.orgName}</span>
                        <Badge variant={currentDevice.status === "online" ? "default" : "secondary"} className="text-[10px] h-5">
                          {currentDevice.status === "online" ? t("Online") : t("Offline")}
                        </Badge>
                        {currentDevice.groupId && (
                          <Badge variant="outline" className="text-[10px] h-5 gap-1 border-primary/30 text-primary bg-primary/5">
                            <Layers className="h-3 w-3" />
                            {t("Group")}: {currentDevice.groupId}
                          </Badge>
                        )}
                      </DialogDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {currentDevice.groupId && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 px-2 md:px-3 gap-1 md:gap-2 text-xs md:text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleUpdateGroup(currentDevice.id, undefined)}
                      >
                        <Unlink className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">{t("Ungroup")}</span>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="h-8 px-2 md:px-3 gap-1 md:gap-2 text-xs md:text-sm">
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{t("Refresh")}</span>
                    </Button>
                    <Button variant="destructive" size="sm" className="h-8 px-2 md:px-3 gap-1 md:gap-2 text-xs md:text-sm">
                      <Power className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{t("Reboot")}</span>
                    </Button>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
                <div className="px-4 md:px-6 border-b bg-muted/10 shrink-0">
                  <TabsList className="bg-transparent h-12 gap-4 md:gap-8 overflow-x-auto no-scrollbar justify-start">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-medium text-xs md:text-sm whitespace-nowrap">{t("Overview")}</TabsTrigger>
                    <TabsTrigger value="config" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-medium text-xs md:text-sm whitespace-nowrap">{t("Configuration")}</TabsTrigger>
                    <TabsTrigger value="mqtt" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-medium text-xs md:text-sm whitespace-nowrap">{t("MQTT History")}</TabsTrigger>
                    <TabsTrigger value="remote" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-medium text-xs md:text-sm whitespace-nowrap">{t("Remote Control")}</TabsTrigger>
                  </TabsList>
                </div>

                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-4 md:p-8">
                      <TabsContent value="overview" className="mt-0 space-y-8">
                        {/* Tags Section */}
                        <div className="space-y-3">
                          <h3 className="text-sm font-semibold flex items-center gap-2">
                            <Tag className="h-4 w-4 text-primary" />
                            {t("Tags")}
                          </h3>
                          <div className="flex flex-wrap gap-2 items-center p-4 border rounded-xl bg-muted/5">
                            {currentDevice.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="gap-1 pr-1.5 py-1">
                                {tag}
                                <button 
                                  onClick={() => handleRemoveTag(currentDevice.id, tag)}
                                  className="hover:bg-muted rounded-full p-0.5 transition-colors"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                            <div className="flex items-center gap-2 ml-2">
                              <Input 
                                placeholder={t("Add Tag")} 
                                className="h-8 w-32 text-xs"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddTag(currentDevice.id)}
                              />
                              <Button size="sm" className="h-8 w-8 p-0" onClick={() => handleAddTag(currentDevice.id)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Basic Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                          {[
                            { label: t("OS Type"), value: currentDevice.basicInfo.os, icon: Monitor },
                            { label: t("Client Version"), value: currentDevice.basicInfo.version, icon: Terminal },
                            { label: t("Brand"), value: currentDevice.basicInfo.brand, icon: Building },
                            { label: t("Model"), value: currentDevice.basicInfo.model, icon: Settings },
                            { label: t("IP Address"), value: currentDevice.config.ip, icon: Network },
                            { label: t("Serial Number"), value: currentDevice.serialNumber, icon: Activity },
                          ].map((item, i) => (
                            <div key={i} className="p-4 border rounded-xl bg-card shadow-sm flex flex-col justify-center min-w-0">
                              <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground mb-1.5">
                                <item.icon className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate">{item.label}</span>
                              </div>
                              <div className="font-semibold text-xs md:text-sm truncate" title={item.value}>{item.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                          <Card className="shadow-sm">
                            <CardHeader className="p-4 pb-0">
                              <CardTitle className="text-xs md:text-sm font-semibold flex items-center gap-2">
                                <Cpu className="h-4 w-4 text-blue-500" />
                                {t("CPU Usage")} & {t("Temperature")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 h-[200px] md:h-[250px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockStats}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                  <XAxis dataKey="time" hide />
                                  <YAxis hide />
                                  <RechartsTooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                  />
                                  <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={3} dot={false} animationDuration={1000} />
                                  <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={3} dot={false} animationDuration={1000} />
                                </LineChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>

                          <Card className="shadow-sm">
                            <CardHeader className="p-4 pb-0">
                              <CardTitle className="text-xs md:text-sm font-semibold flex items-center gap-2">
                                <Activity className="h-4 w-4 text-green-500" />
                                {t("Memory Usage")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 h-[200px] md:h-[250px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockStats}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                  <XAxis dataKey="time" hide />
                                  <YAxis hide />
                                  <RechartsTooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                  />
                                  <Area type="monotone" dataKey="memory" stroke="#22c55e" strokeWidth={3} fill="url(#colorMem)" fillOpacity={1} />
                                  <defs>
                                    <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                                    </linearGradient>
                                  </defs>
                                </AreaChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>

                          <Card className="shadow-sm">
                            <CardHeader className="p-4 pb-0">
                              <CardTitle className="text-xs md:text-sm font-semibold flex items-center gap-2">
                                <HardDrive className="h-4 w-4 text-amber-500" />
                                {t("Disk Usage")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 h-[200px] md:h-[250px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockStats}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                  <XAxis dataKey="time" hide />
                                  <YAxis hide />
                                  <RechartsTooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                  />
                                  <Area type="monotone" dataKey="disk" stroke="#f59e0b" strokeWidth={3} fill="url(#colorDisk)" fillOpacity={1} />
                                  <defs>
                                    <linearGradient id="colorDisk" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                    </linearGradient>
                                  </defs>
                                </AreaChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>

                          <Card className="shadow-sm md:col-span-2 xl:col-span-3">
                            <CardHeader className="p-4 pb-0">
                              <CardTitle className="text-xs md:text-sm font-semibold flex items-center gap-2">
                                <Network className="h-4 w-4 text-indigo-500" />
                                {t("Network IO")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 h-[200px] md:h-[250px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={mockStats}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                  <XAxis dataKey="time" hide />
                                  <YAxis hide />
                                  <RechartsTooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                  />
                                  <Line type="monotone" dataKey="netIn" stroke="#6366f1" strokeWidth={3} dot={false} />
                                  <Line type="monotone" dataKey="netOut" stroke="#a855f7" strokeWidth={3} dot={false} />
                                </LineChart>
                              </ResponsiveContainer>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent value="config" className="mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          <Card className="shadow-sm">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Network className="h-4 w-4 text-primary" /> {t("Network Settings")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <Label className="text-[10px] md:text-xs text-muted-foreground">{t("IP Address")}</Label>
                                  <div className="text-xs md:text-sm font-medium">{currentDevice.config.ip}</div>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-[10px] md:text-xs text-muted-foreground">{t("NIC Name")}</Label>
                                  <div className="text-xs md:text-sm font-medium">{currentDevice.config.nic}</div>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Subnet Mask")}</Label>
                                  <div className="text-xs md:text-sm font-medium">{currentDevice.config.subnet}</div>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-[10px] md:text-xs text-muted-foreground">{t("DNS")}</Label>
                                  <div className="text-xs md:text-sm font-medium">{currentDevice.config.dns}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="shadow-sm">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Settings className="h-4 w-4 text-primary" /> {t("System Settings")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Schedule Power")}</Label>
                                  <div className="text-xs md:text-sm font-medium">{currentDevice.config.schedulePower}</div>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Heartbeat Interval")}</Label>
                                  <div className="text-xs md:text-sm font-medium">{currentDevice.config.heartbeatInterval}s</div>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Screen Orientation")}</Label>
                                  <div className="text-xs md:text-sm font-medium">{currentDevice.config.orientation}°</div>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Device Time")}</Label>
                                  <div className="text-xs md:text-sm font-medium">{currentDevice.config.time}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="shadow-sm">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Activity className="h-4 w-4 text-primary" /> {t("Hardware Status")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Brightness")}</Label>
                                  <div className="text-xs md:text-sm font-medium">{currentDevice.config.brightness}%</div>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Volume")}</Label>
                                  <div className="text-xs md:text-sm font-medium">{currentDevice.config.volume}%</div>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-[10px] md:text-xs text-muted-foreground">{t("USB Port")}</Label>
                                  <div>
                                    <Badge variant={currentDevice.config.usbEnabled ? "default" : "secondary"} className="text-[10px] h-5">
                                      {currentDevice.config.usbEnabled ? t("Enabled") : t("Disabled")}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Remote Control Lock")}</Label>
                                  <div>
                                    <Badge variant={currentDevice.config.remoteLock ? "default" : "secondary"} className="text-[10px] h-5">
                                      {currentDevice.config.remoteLock ? t("Locked") : t("Unlocked")}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="shadow-sm sm:col-span-2 lg:col-span-3">
                            <CardHeader className="pb-3 border-b mb-6">
                              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Link className="h-4 w-4 text-primary" /> {t("Certificates")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-12">
                              {(() => {
                                const deviceScreens = screens.filter(s => s.deviceId === currentDevice.id);
                                return deviceScreens.map((screen, idx) => (
                                  <div key={screen.id} className="space-y-6">
                                    <div className="flex items-center gap-3">
                                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                        {idx + 1}
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-bold flex items-center gap-2">
                                          {t("Screen")} {idx + 1} {t("Certificate")}
                                        </h4>
                                        <p className="text-[10px] text-muted-foreground font-mono">{screen.id}</p>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 border-l-2 border-muted border-dashed ml-4">
                                      <div className="space-y-3">
                                        <Label className="text-[12px] md:text-sm font-semibold text-primary">{t("Intermediate CA Certificate")}</Label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 p-4 rounded-xl border bg-muted/5">
                                          <div className="space-y-1 overflow-hidden">
                                            <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Common Name (CN)")}</Label>
                                            <div className="text-xs md:text-sm font-medium truncate" title={currentDevice.certificates?.intermediateCa.cn}>{currentDevice.certificates?.intermediateCa.cn}</div>
                                          </div>
                                          <div className="space-y-1 overflow-hidden">
                                            <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Organization (O)")}</Label>
                                            <div className="text-xs md:text-sm font-medium truncate" title={currentDevice.certificates?.intermediateCa.o}>{currentDevice.certificates?.intermediateCa.o}</div>
                                          </div>
                                          <div className="space-y-1 overflow-hidden">
                                            <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Unit (OU)")}</Label>
                                            <div className="text-xs md:text-sm font-medium truncate" title={currentDevice.certificates?.intermediateCa.ou}>{currentDevice.certificates?.intermediateCa.ou}</div>
                                          </div>
                                          <div className="space-y-1 overflow-hidden">
                                            <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Country (C)")}</Label>
                                            <div className="text-xs md:text-sm font-medium truncate" title={currentDevice.certificates?.intermediateCa.c || "US"}>{currentDevice.certificates?.intermediateCa.c || "US"}</div>
                                          </div>
                                          <div className="space-y-1 sm:col-span-2 border-t pt-2 mt-1">
                                            <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Valid Until")}</Label>
                                            <div className="text-xs md:text-sm font-medium text-amber-600">{currentDevice.certificates?.intermediateCa.validUntil}</div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-3">
                                        <Label className="text-[12px] md:text-sm font-semibold text-primary">{t("Client Certificate")}</Label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 p-4 rounded-xl border bg-muted/5">
                                          <div className="space-y-1 overflow-hidden">
                                            <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Common Name (CN)")}</Label>
                                            <div className="text-xs md:text-sm font-medium truncate" title={`${screen.id}.cert.internal`}>{screen.id}.cert.internal</div>
                                          </div>
                                          <div className="space-y-1 overflow-hidden">
                                            <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Organization (O)")}</Label>
                                            <div className="text-xs md:text-sm font-medium truncate" title={currentDevice.certificates?.clientCert.o}>{currentDevice.certificates?.clientCert.o}</div>
                                          </div>
                                          <div className="space-y-1 overflow-hidden">
                                            <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Unit (OU)")}</Label>
                                            <div className="text-xs md:text-sm font-medium truncate" title={currentDevice.certificates?.clientCert.ou}>{currentDevice.certificates?.clientCert.ou}</div>
                                          </div>
                                          <div className="space-y-1 overflow-hidden">
                                            <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Country (C)")}</Label>
                                            <div className="text-xs md:text-sm font-medium truncate" title={currentDevice.certificates?.clientCert.c || "US"}>{currentDevice.certificates?.clientCert.c || "US"}</div>
                                          </div>
                                          <div className="space-y-1 sm:col-span-2 border-t pt-2 mt-1">
                                            <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Valid Until")}</Label>
                                            <div className="text-xs md:text-sm font-medium text-amber-600">{currentDevice.certificates?.clientCert.validUntil}</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ));
                              })()}
                            </CardContent>
                          </Card>

                          <Card className="shadow-sm sm:col-span-2 lg:col-span-3">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Terminal className="h-4 w-4 text-primary" /> {t("Other Information")}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                              <div className="space-y-1">
                                <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Debug Mode")}</Label>
                                <div>
                                  <Badge variant={currentDevice.config.debugMode ? "destructive" : "secondary"} className="text-[10px] h-5">
                                    {currentDevice.config.debugMode ? t("Enabled") : t("Disabled")}
                                  </Badge>
                                </div>
                              </div>
                              <div className="space-y-1 sm:col-span-2">
                                <Label className="text-[10px] md:text-xs text-muted-foreground">{t("Background Image")}</Label>
                                <div className="text-xs md:text-sm truncate text-blue-500 hover:underline cursor-pointer flex items-center gap-2">
                                  <Monitor className="h-3.5 w-3.5 shrink-0" />
                                  <span className="truncate">{currentDevice.config.bgImage || t("None")}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent value="mqtt" className="mt-0">
                        <Card className="shadow-sm overflow-hidden">
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader className="bg-muted/50">
                                <TableRow>
                                  <TableHead className="w-[100px] md:w-[120px] text-xs">{t("Direction")}</TableHead>
                                  <TableHead className="text-xs">{t("Topic")}</TableHead>
                                  <TableHead className="text-xs">{t("Payload")}</TableHead>
                                  <TableHead className="text-right text-xs">{t("Time")}</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {mockMqttMessages.map((msg) => (
                                  <TableRow key={msg.id} className="hover:bg-muted/30 transition-colors">
                                    <TableCell>
                                      <Badge variant={msg.direction === 'in' ? 'secondary' : 'default'} className="gap-1.5 font-medium text-[10px] h-5">
                                        {msg.direction === 'in' ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3 rotate-90" />}
                                        {t(msg.direction.toUpperCase())}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-[10px] md:text-xs font-medium text-primary whitespace-nowrap">{msg.topic}</TableCell>
                                    <TableCell className="font-mono text-[10px] md:text-xs max-w-[200px] md:max-w-[500px] truncate bg-muted/20 rounded px-2 py-1">{msg.payload}</TableCell>
                                    <TableCell className="text-right text-[10px] md:text-xs text-muted-foreground font-medium whitespace-nowrap">{msg.timestamp}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </Card>
                      </TabsContent>

                      <TabsContent value="remote" className="mt-0">
                        {currentDevice.status === "offline" && (
                          <div className="mb-6 p-4 border border-destructive/20 bg-destructive/5 rounded-xl flex items-center gap-3 text-destructive">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <div className="text-sm font-medium">
                              {t("Device is currently offline. Remote control and configuration updates are unavailable.")}
                            </div>
                          </div>
                        )}

                        <div className={`space-y-6 mb-8 ${currentDevice.status === "offline" ? "opacity-50 pointer-events-none grayscale-[0.5]" : ""}`}>
                          {/* Top Row: Screenshot and Power Control */}
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                            {/* Screenshot Section (2/3 width on lg) */}
                            <div className="lg:col-span-2 space-y-4">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h3 className="text-sm md:text-base font-bold flex items-center gap-2 text-primary">
                                  <Camera className="h-5 w-5" /> {t("Screen Screenshot")}
                                </h3>

                                <div className="flex items-center gap-4">
                                  {/* Screen Switcher */}
                                  <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
                                    {[0, 1].map((idx) => (
                                      <Button
                                        key={idx}
                                        variant={activeScreenIndex === idx ? "secondary" : "ghost"}
                                        size="sm"
                                        className={cn(
                                          "h-7 px-3 text-[10px] font-bold uppercase tracking-wider transition-all",
                                          activeScreenIndex === idx ? "bg-background shadow-sm" : "text-muted-foreground"
                                        )}
                                        onClick={() => {
                                          setActiveScreenIndex(idx);
                                          setScreenshotUrl(`https://picsum.photos/seed/device-${idx}-${Date.now()}/1280/720`);
                                        }}
                                      >
                                        <MonitorPlay className="h-3 w-3 mr-1.5" />
                                        {t("Screen")} {idx + 1}
                                      </Button>
                                    ))}
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="h-8 px-3 gap-2"
                                      onClick={refreshScreenshot}
                                      disabled={screenshotLoading}
                                    >
                                      <RefreshCw className={`h-3.5 w-3.5 ${screenshotLoading ? 'animate-spin' : ''}`} />
                                      {t("Refresh")}
                                    </Button>
                                    <Button 
                                      variant="default" 
                                      size="sm" 
                                      className="h-8 px-3 gap-2 bg-primary hover:bg-primary/90"
                                      onClick={() => setIsRemoteAssistanceOpen(true)}
                                    >
                                      <MonitorPlay className="h-3.5 w-3.5" />
                                      {t("Remote Assistance")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              
                              <Card className="overflow-hidden border-2 border-muted/20 bg-muted/5 group relative aspect-video flex items-center justify-center">
                                {screenshotLoading ? (
                                  <div className="flex flex-col items-center gap-2">
                                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">{t("Capturing screen...")}</p>
                                  </div>
                                ) : (
                                  <img 
                                    src={screenshotUrl} 
                                    alt="Device Screenshot" 
                                    className="w-full h-full object-contain"
                                    referrerPolicy="no-referrer"
                                  />
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                  <Button size="sm" variant="secondary" className="gap-2" onClick={() => window.open(screenshotUrl, '_blank')}>
                                    <Maximize className="h-4 w-4" />
                                    {t("Expand")}
                                  </Button>
                                </div>
                              </Card>
                            </div>

                            {/* Power & System Control (1/3 width on lg) */}
                            <div className="lg:col-span-1 space-y-4 flex flex-col">
                              <h3 className="text-sm md:text-base font-bold flex items-center gap-2 text-primary">
                                <Power className="h-5 w-5" /> {t("Power & System Control")}
                              </h3>
                              <div className="grid gap-4 p-4 md:p-6 border rounded-xl bg-card shadow-sm flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5 min-w-0 pr-4">
                                    <Label className="text-xs md:text-sm font-semibold truncate block">{t("Schedule Power")}</Label>
                                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">{t("Configure automatic power on/off schedules")}</p>
                                  </div>
                                  <Button variant="outline" size="sm" className="px-3 md:px-4 h-8 text-xs shrink-0">{t("Set")}</Button>
                                </div>
                                <div className="flex items-center justify-between border-t pt-4">
                                  <div className="space-y-0.5 min-w-0 pr-4">
                                    <Label className="text-xs md:text-sm font-semibold truncate block">{t("Upgrade Client")}</Label>
                                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">{t("Push latest software version to device")}</p>
                                  </div>
                                  <Button variant="outline" size="sm" className="gap-2 px-3 md:px-4 h-8 text-xs shrink-0"><RefreshCw className="h-3.5 w-3.5" /> {t("Upgrade")}</Button>
                                </div>
                                <div className="flex items-center justify-between border-t pt-4">
                                  <div className="space-y-0.5 min-w-0 pr-4">
                                    <Label className="text-xs md:text-sm font-semibold truncate block">{t("Disk Cleanup")}</Label>
                                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">{t("Remove temporary files and cache")}</p>
                                  </div>
                                  <Button variant="outline" size="sm" className="gap-2 px-3 md:px-4 h-8 text-xs shrink-0 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /> {t("Clean")}</Button>
                                </div>
                                <div className="flex items-center justify-between border-t pt-4">
                                  <div className="space-y-0.5 min-w-0 pr-4">
                                    <Label className="text-xs md:text-sm font-semibold truncate block">{t("Time Sync")}</Label>
                                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">{t("Synchronize system clock with NTP server")}</p>
                                  </div>
                                  <Button variant="outline" size="sm" className="gap-2 px-3 md:px-4 h-8 text-xs shrink-0"><RefreshCw className="h-3.5 w-3.5" /> {t("Sync")}</Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Row: Display and Security (1:1) */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                            <div className="space-y-4 flex flex-col">
                              <h3 className="text-sm md:text-base font-bold flex items-center gap-2 text-primary">
                                <Settings className="h-5 w-5" /> {t("Display & Audio Control")}
                              </h3>
                              <div className="grid gap-6 p-4 md:p-6 border rounded-xl bg-card shadow-sm flex-1">
                                <div className="flex items-center justify-between gap-4">
                                  <div className="space-y-0.5 min-w-0 pr-4">
                                    <Label className="text-xs md:text-sm font-semibold flex items-center gap-2 truncate"><Sun className="h-4 w-4" /> {t("Brightness")}</Label>
                                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">{t("Adjust screen backlight intensity")}</p>
                                  </div>
                                  <div className="flex items-center gap-3 w-1/3 min-w-[100px]">
                                    <Slider defaultValue={[currentDevice.config.brightness]} max={100} step={1} className="flex-1" />
                                    <span className="text-xs font-bold text-primary w-8 text-right shrink-0">{currentDevice.config.brightness}%</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between gap-4 border-t pt-6">
                                  <div className="space-y-0.5 min-w-0 pr-4">
                                    <Label className="text-xs md:text-sm font-semibold flex items-center gap-2 truncate"><Volume2 className="h-4 w-4" /> {t("Volume")}</Label>
                                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">{t("Control system audio output level")}</p>
                                  </div>
                                  <div className="flex items-center gap-3 w-1/3 min-w-[100px]">
                                    <Slider defaultValue={[currentDevice.config.volume]} max={100} step={1} className="flex-1" />
                                    <span className="text-xs font-bold text-primary w-8 text-right shrink-0">{currentDevice.config.volume}%</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between border-t pt-6">
                                  <div className="space-y-0.5 min-w-0 pr-4">
                                    <Label className="text-xs md:text-sm font-semibold block">{t("Screen Orientation")}</Label>
                                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">{t("Set the display rotation angle")}</p>
                                  </div>
                                  <Select defaultValue={currentDevice.config.orientation}>
                                    <SelectTrigger className="h-9 w-28 md:w-32 text-xs shrink-0">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="0" className="text-xs">{t("0° (Landscape)")}</SelectItem>
                                      <SelectItem value="90" className="text-xs">{t("90° (Portrait)")}</SelectItem>
                                      <SelectItem value="180" className="text-xs">{t("180° (Landscape Inv)")}</SelectItem>
                                      <SelectItem value="270" className="text-xs">{t("270° (Portrait Inv)")}</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex items-center justify-between border-t pt-6">
                                  <div className="space-y-0.5 min-w-0 pr-4">
                                    <Label className="text-xs md:text-sm font-semibold block">{t("Heartbeat Interval")}</Label>
                                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">{t("How often device reports status")}</p>
                                  </div>
                                  <Select defaultValue={currentDevice.config.heartbeatInterval.toString()}>
                                    <SelectTrigger className="h-9 w-28 md:w-32 text-xs shrink-0">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="30" className="text-xs">{t("30s (Real-time)")}</SelectItem>
                                      <SelectItem value="60" className="text-xs">{t("60s (Standard)")}</SelectItem>
                                      <SelectItem value="300" className="text-xs">{t("300s (Power Save)")}</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4 flex flex-col">
                              <h3 className="text-sm md:text-base font-bold flex items-center gap-2 text-primary">
                                <AlertCircle className="h-5 w-5" /> {t("Security & Toggles")}
                              </h3>
                              <div className="grid gap-4 p-4 md:p-6 border rounded-xl bg-card shadow-sm flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5 min-w-0 pr-4">
                                    <Label className="text-xs md:text-sm font-semibold flex items-center gap-2 truncate"><Usb className="h-4 w-4" /> {t("USB Port")}</Label>
                                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">{t("Enable or disable physical USB ports")}</p>
                                  </div>
                                  <Switch defaultChecked={currentDevice.config.usbEnabled} className="scale-75 md:scale-100 shrink-0" />
                                </div>
                                <div className="flex items-center justify-between border-t pt-4">
                                  <div className="space-y-0.5 min-w-0 pr-4">
                                    <Label className="text-xs md:text-sm font-semibold flex items-center gap-2 truncate"><Monitor className="h-4 w-4" /> {t("Remote Control Lock")}</Label>
                                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">{t("Disable IR remote control input")}</p>
                                  </div>
                                  <Switch defaultChecked={currentDevice.config.remoteLock} className="scale-75 md:scale-100 shrink-0" />
                                </div>
                                <div className="flex items-center justify-between border-t pt-4">
                                  <div className="space-y-0.5 min-w-0 pr-4">
                                    <Label className="text-xs md:text-sm font-semibold flex items-center gap-2 truncate"><Terminal className="h-4 w-4" /> {t("Debug Mode")}</Label>
                                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">{t("Enable ADB and system logging")}</p>
                                  </div>
                                  <Switch defaultChecked={currentDevice.config.debugMode} className="scale-75 md:scale-100 shrink-0" />
                                </div>
                                <div className="flex items-center justify-between border-t pt-4">
                                  <div className="space-y-0.5 min-w-0 pr-4">
                                    <Label className="text-xs md:text-sm font-semibold flex items-center gap-2 truncate"><Power className="h-4 w-4" /> {t("Sleep/Wake")}</Label>
                                    <p className="text-[10px] md:text-xs text-muted-foreground truncate">{t("Toggle device low-power sleep mode")}</p>
                                  </div>
                                  <Switch className="scale-75 md:scale-100 shrink-0" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </div>
                  </ScrollArea>
                </div>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Remote Assistance Dialog */}
      <Dialog open={isRemoteAssistanceOpen} onOpenChange={setIsRemoteAssistanceOpen}>
        <DialogContent className="max-w-[98vw] lg:max-w-6xl w-full h-[90vh] flex flex-col p-0 overflow-hidden bg-zinc-950 border-zinc-800">
          <DialogHeader className="p-4 border-b border-zinc-800 bg-zinc-900 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                  <MonitorPlay className="h-5 w-5" />
                </div>
                <div>
                  <DialogTitle className="text-zinc-100">{t("Remote Assistance Sessions")}</DialogTitle>
                  <DialogDescription className="text-zinc-400">
                    {selectedDevice?.name} ({selectedDevice?.id})
                  </DialogDescription>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-full">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-medium text-zinc-300">{t("Session Active")}</span>
                </div>
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" onClick={() => setIsRemoteAssistanceOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 relative bg-zinc-900 overflow-hidden flex items-center justify-center p-4">
            {/* Mock Remote Desktop Container */}
            <div className="relative w-full h-full max-w-5xl aspect-video bg-black rounded-lg border border-zinc-700 shadow-2xl overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/remote-assist-screen/1920/1080" 
                alt="Remote Screen" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay for mouse simulation */}
              <div className="absolute inset-0 cursor-crosshair" />

              {/* Status Bar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-zinc-900/90 rounded-full border border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center gap-4 mr-4 border-r border-zinc-700 pr-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                    <Maximize className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-[10px] font-mono text-zinc-400">
                  Bitrate: 4.2 Mbps | Latency: 42ms | FPS: 30
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-zinc-800 bg-zinc-900 shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" className="gap-2 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border-zinc-700">
                <Terminal className="h-4 w-4" />
                {t("Shell Console")}
              </Button>
              <Button size="sm" variant="secondary" className="gap-2 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border-zinc-700">
                <FolderTree className="h-4 w-4" />
                {t("File Manager")}
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100" onClick={() => setIsRemoteAssistanceOpen(false)}>
                {t("Close Connection")}
              </Button>
              <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                {t("Terminate Session")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
