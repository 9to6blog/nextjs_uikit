"use client";
import { useState } from "react";
import { Button } from "../button.js";
import { Badge } from "../badge.js";
import { Icon } from "../icons.js";
import { BlockShell, type BlockProps } from "./shared.js";
export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  features: string[];
  recommended?: boolean;
};
export type PricingProps = BlockProps & {
  plans: PricingPlan[];
  currency?: string;
  locale?: string;
  onSelect: (plan: PricingPlan, billing: "monthly" | "yearly") => void;
};
export function Pricing({
  plans,
  currency = "KRW",
  locale = "ko-KR",
  onSelect,
  ...props
}: PricingProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const money = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  return (
    <BlockShell {...props}>
      <div className="n-block-chips" role="group" aria-label="결제 주기">
        <Button
          variant={billing === "monthly" ? "primary" : "ghost"}
          aria-pressed={billing === "monthly"}
          onClick={() => setBilling("monthly")}
        >
          월간 결제
        </Button>
        <Button
          variant={billing === "yearly" ? "primary" : "ghost"}
          aria-pressed={billing === "yearly"}
          onClick={() => setBilling("yearly")}
        >
          연간 결제
        </Button>
      </div>
      <div className="n-block-grid n-block-pricing">
        {plans.map((p) => (
          <article key={p.id} data-recommended={p.recommended}>
            <div className="n-block-row">
              <h3>{p.name}</h3>
              {p.recommended && <Badge>추천</Badge>}
            </div>
            <p>{p.description}</p>
            <div className="n-block-price">
              {money.format(p[billing])}
              <span>/ {billing === "monthly" ? "월" : "년"}</span>
            </div>
            <ul>
              {p.features.map((f) => (
                <li key={f}>
                  <Icon name="check" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={p.recommended ? "primary" : "outline"}
              onClick={() => onSelect(p, billing)}
            >
              {p.name} 선택
            </Button>
          </article>
        ))}
      </div>
    </BlockShell>
  );
}
