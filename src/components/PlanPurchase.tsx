import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Check, User, Building2, ShoppingCart, Calendar, History, RotateCcw, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PricingPlan {
  id: string;
  name: string;
  type: "individual" | "enterprise";
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

interface Order {
  id: string;
  planName: string;
  type: "individual" | "enterprise";
  orderDate: string;
  expiryDate: string;
  status: "unpaid" | "paid" | "refunded" | "cancelled";
  price: string;
  devices: number;
  years?: number;
}

const availablePlans: PricingPlan[] = [
  {
    id: "1",
    name: "Basic Individual",
    type: "individual",
    price: 1,
    period: "per Day/Device",
    description: "Flexible daily billing for personal use.",
    features: ["Single device support", "Basic cloud storage", "Email support"],
  },
  {
    id: "2",
    name: "Pro Individual",
    type: "individual",
    price: 2,
    period: "per Day/Device",
    description: "Advanced features for power users.",
    features: ["Up to 3 devices", "Advanced analytics", "Priority support"],
    isPopular: true,
  },
  {
    id: "3",
    name: "Standard Enterprise",
    type: "enterprise",
    price: 365,
    period: "per Year/Device",
    description: "Stable annual billing for small businesses.",
    features: ["Unlimited devices", "Team management", "SLA guarantee", "API access"],
  },
  {
    id: "4",
    name: "Premium Enterprise",
    type: "enterprise",
    price: 500,
    period: "per Year/Device",
    description: "Full-featured solution for large organizations.",
    features: ["Everything in Standard", "Dedicated manager", "Custom integration", "On-site training"],
  },
];

const initialOrders: Order[] = [
  {
    id: "ORD-2024-001",
    planName: "Pro Individual",
    type: "individual",
    orderDate: "2024-01-15",
    expiryDate: "2024-02-15",
    status: "paid",
    price: "¥60",
    devices: 1,
  },
  {
    id: "ORD-2024-002",
    planName: "Standard Enterprise",
    type: "enterprise",
    orderDate: "2024-04-01",
    expiryDate: "2025-04-01",
    status: "unpaid",
    price: "¥3650",
    devices: 10,
    years: 1,
  },
  {
    id: "ORD-2023-085",
    planName: "Basic Individual",
    type: "individual",
    orderDate: "2023-12-01",
    expiryDate: "2024-01-01",
    status: "cancelled",
    price: "¥31",
    devices: 1,
  },
];

export function PlanPurchase() {
  const { t } = useTranslation();
  const [orders, setOrders] = React.useState<Order[]>(initialOrders);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<PricingPlan | null>(null);
  const [deviceCount, setDeviceCount] = React.useState(1);
  const [yearsCount, setYearsCount] = React.useState(1);

  const handlePurchaseClick = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setDeviceCount(1);
    setYearsCount(1);
    setIsPurchaseDialogOpen(true);
  };

  const confirmPurchase = () => {
    if (!selectedPlan) return;
    
    const newOrder: Order = {
      id: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      planName: selectedPlan.name,
      type: selectedPlan.type,
      orderDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + (selectedPlan.type === 'enterprise' ? yearsCount : 0))).toISOString().split('T')[0],
      status: "unpaid",
      price: `¥${selectedPlan.price * deviceCount * (selectedPlan.type === 'enterprise' ? yearsCount : 30)}`, // Simple calc
      devices: deviceCount,
      years: selectedPlan.type === 'enterprise' ? yearsCount : undefined,
    };

    setOrders([newOrder, ...orders]);
    setIsPurchaseDialogOpen(false);
  };

  const handleRefund = (orderId: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: "refunded" } : o));
  };

  const handleCancel = (orderId: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: "cancelled" } : o));
  };

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "paid": return <Badge variant="default">{t("Paid")}</Badge>;
      case "unpaid": return <Badge variant="outline" className="border-amber-500 text-amber-600">{t("Unpaid")}</Badge>;
      case "refunded": return <Badge variant="secondary">{t("Refunded")}</Badge>;
      case "cancelled": return <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">{t("Cancelled")}</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">{t("Plan Purchase")}</h1>
        <p className="text-muted-foreground">{t("Select a plan that fits your needs or view your purchase history.")}</p>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="available" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            {t("Available Plans")}
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-2">
            <History className="h-4 w-4" />
            {t("My Orders")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {availablePlans.map((plan) => (
              <Card key={plan.id} className={`relative flex flex-col ${plan.isPopular ? 'border-primary shadow-lg' : ''}`}>
                {plan.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1">
                    {t("Most Popular")}
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="font-normal">
                      {plan.type === "individual" ? (
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {t("Individual Plan")}</span>
                      ) : (
                        <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {t("Enterprise Plan")}</span>
                      )}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{t(plan.name)}</CardTitle>
                  <CardDescription className="min-h-[40px]">{t(plan.description)}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-col mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">¥{plan.price}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{t(plan.period)}</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-medium">{t("Features")}:</p>
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        {t(feature)}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant={plan.isPopular ? "default" : "outline"} className="w-full gap-2" onClick={() => handlePurchaseClick(plan)}>
                    <ShoppingCart className="h-4 w-4" />
                    {t("Purchase")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Order ID")}</TableHead>
                  <TableHead>{t("Pricing Plans")}</TableHead>
                  <TableHead>{t("Price")}</TableHead>
                  <TableHead>{t("Order Date")}</TableHead>
                  <TableHead>{t("Expiry Date")}</TableHead>
                  <TableHead>{t("Status")}</TableHead>
                  <TableHead className="text-right">{t("Actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{t(order.planName)}</span>
                        <span className="text-xs text-muted-foreground">
                          {order.devices} {t("Device Quantity")} {order.years ? `| ${order.years} ${t("Purchase Duration (Years)")}` : ""}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {order.orderDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {order.expiryDate}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      {order.status === "paid" && (
                        <Button variant="ghost" size="sm" className="gap-1 text-amber-600" onClick={() => handleRefund(order.id)}>
                          <RotateCcw className="h-3 w-3" /> {t("Refund")}
                        </Button>
                      )}
                      {order.status === "unpaid" && (
                        <Button variant="ghost" size="sm" className="gap-1 text-destructive" onClick={() => handleCancel(order.id)}>
                          <XCircle className="h-3 w-3" /> {t("Cancel Order")}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isPurchaseDialogOpen} onOpenChange={setIsPurchaseDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("Purchase")} - {selectedPlan?.name}</DialogTitle>
            <DialogDescription>
              {t("Billing Model")}: {selectedPlan && t(selectedPlan.period)}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="devices" className="text-right">
                {t("Device Quantity")}
              </Label>
              <Input
                id="devices"
                type="number"
                min="1"
                value={deviceCount}
                onChange={(e) => setDeviceCount(parseInt(e.target.value) || 1)}
                className="col-span-3"
              />
            </div>
            {selectedPlan?.type === "enterprise" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="years" className="text-right">
                  {t("Purchase Duration (Years)")}
                </Label>
                <Input
                  id="years"
                  type="number"
                  min="1"
                  value={yearsCount}
                  onChange={(e) => setYearsCount(parseInt(e.target.value) || 1)}
                  className="col-span-3"
                />
              </div>
            )}
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-medium">{t("Total Price")}:</span>
              <span className="text-2xl font-bold text-primary">
                ¥{selectedPlan ? (selectedPlan.price * deviceCount * (selectedPlan.type === 'enterprise' ? yearsCount : 30)) : 0}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPurchaseDialogOpen(false)}>{t("Cancel")}</Button>
            <Button onClick={confirmPurchase}>{t("Confirm Purchase")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
