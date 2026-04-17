import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  Monitor,
  Building,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

const data = [
  { name: "Mon", total: 1200, active: 800 },
  { name: "Tue", total: 2100, active: 1500 },
  { name: "Wed", total: 1800, active: 1200 },
  { name: "Thu", total: 2400, active: 1900 },
  { name: "Fri", total: 1700, active: 1300 },
  { name: "Sat", total: 3200, active: 2500 },
  { name: "Sun", total: 2800, active: 2100 },
];

const deviceStatusData = [
  { name: "Online", value: 45, color: "var(--chart-2)" },
  { name: "Offline", value: 12, color: "var(--chart-5)" },
  { name: "Maintenance", value: 5, color: "var(--chart-3)" },
];

const orgDistribution = [
  { name: "Shanghai", value: 40 },
  { name: "Beijing", value: 30 },
  { name: "Guangzhou", value: 20 },
  { name: "Shenzhen", value: 10 },
];

export function Dashboard() {
  const { t } = useTranslation();

  const translatedDeviceStatusData = deviceStatusData.map(item => ({
    ...item,
    name: t(item.name)
  }));

  const translatedOrgDistribution = orgDistribution.map(item => ({
    ...item,
    name: t(item.name)
  }));
  
  const stats = [
    {
      title: t("Total Devices"),
      value: "62",
      description: t("+4 from last week"),
      icon: Monitor,
      trend: "up",
      color: "text-blue-500"
    },
    {
      title: t("Active Organizations"),
      value: "12",
      description: t("Across 4 regions"),
      icon: Building,
      trend: "up",
      color: "text-purple-500"
    },
    {
      title: t("System Health"),
      value: "99.9%",
      description: t("Optimal performance"),
      icon: Activity,
      trend: "up",
      color: "text-emerald-500"
    },
    {
      title: t("Security Alerts"),
      value: "0",
      description: t("No threats detected"),
      icon: ShieldCheck,
      trend: "down",
      color: "text-amber-500"
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("Dashboard")}</h1>
        <p className="text-muted-foreground">
          {t("Real-time overview of your device network and organization status.")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-card to-muted/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-emerald-500" />
                  )}
                  {t(stat.description)}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>{t("Device Connectivity Trend")}</CardTitle>
            <CardDescription>
              {t("Daily active devices vs total registered devices.")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--muted-foreground)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="var(--muted-foreground)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--card)", 
                      borderColor: "var(--border)",
                      borderRadius: "var(--radius)",
                      color: "var(--foreground)"
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="var(--primary)" 
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="active" 
                    stroke="var(--chart-2)" 
                    fillOpacity={1} 
                    fill="url(#colorActive)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>{t("Device Status")}</CardTitle>
            <CardDescription>
              {t("Current connectivity distribution.")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={translatedDeviceStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {translatedDeviceStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {deviceStatusData.map((item) => (
                <div key={item.name} className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-medium">{t(item.name)}</span>
                  </div>
                  <span className="text-lg font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>{t("Regional Distribution")}</CardTitle>
            <CardDescription>
              {t("Devices per organization region.")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={translatedOrgDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="var(--muted-foreground)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>{t("Recent System Events")}</CardTitle>
            <CardDescription>
              {t("Latest logs from the device network.")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { event: "Device DEV-001 Online", time: "2 mins ago", type: "success", icon: CheckCircle2 },
                { event: "Config Push: GRP-MAIN", time: "15 mins ago", type: "info", icon: Clock },
                { event: "Device DEV-042 Offline", time: "1 hour ago", type: "error", icon: XCircle },
                { event: "New Organization Added", time: "3 hours ago", type: "success", icon: Building },
                { event: "System Backup Completed", time: "5 hours ago", type: "info", icon: CheckCircle2 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`p-2 rounded-full ${
                    item.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                    item.type === 'error' ? 'bg-rose-500/10 text-rose-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{t(item.event)}</p>
                    <p className="text-xs text-muted-foreground">{t(item.time)}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase">
                    {t(item.type)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
