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
import { Plus, Check, CreditCard, User, Building2 } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  type: "individual" | "enterprise";
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const initialPlans: PricingPlan[] = [
  {
    id: "1",
    name: "Basic Individual",
    type: "individual",
    price: "¥1",
    period: "per Day/Device",
    description: "Flexible daily billing for personal use.",
    features: ["Single device support", "Basic cloud storage", "Email support"],
  },
  {
    id: "2",
    name: "Pro Individual",
    type: "individual",
    price: "¥2",
    period: "per Day/Device",
    description: "Advanced features for power users.",
    features: ["Up to 3 devices", "Advanced analytics", "Priority support"],
    isPopular: true,
  },
  {
    id: "3",
    name: "Standard Enterprise",
    type: "enterprise",
    price: "¥365",
    period: "per Year/Device",
    description: "Stable annual billing for small businesses.",
    features: ["Unlimited devices", "Team management", "SLA guarantee", "API access"],
  },
  {
    id: "4",
    name: "Premium Enterprise",
    type: "enterprise",
    price: "¥500",
    period: "per Year/Device",
    description: "Full-featured solution for large organizations.",
    features: ["Everything in Standard", "Dedicated manager", "Custom integration", "On-site training"],
  },
];

export function PricingPlans() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">{t("Pricing Plans")}</h1>
          <p className="text-muted-foreground">{t("Configure and manage your sales packages with different billing models.")}</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("Add Plan")}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {initialPlans.map((plan) => (
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
              <CardTitle className="flex items-center gap-2">
                {t(plan.name)}
              </CardTitle>
              <CardDescription>{t(plan.description)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-col mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
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
              <Button variant={plan.isPopular ? "default" : "outline"} className="w-full">
                {t("Edit Plan")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
