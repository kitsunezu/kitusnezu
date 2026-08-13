"use client";

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Boxes,
  Cloud,
  GitBranch,
  Laptop,
  Network,
  Package,
  Rocket,
  Route,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";
import { useTranslations } from "next-intl";

type LaneTone = "delivery" | "traffic" | "observe";

interface DiagramStep {
  title: string;
  detail: string;
  icon: LucideIcon;
}

interface HomelabLaneProps {
  title: string;
  description: string;
  icon: LucideIcon;
  steps: DiagramStep[];
  tone: LaneTone;
}

const toneStyles: Record<
  LaneTone,
  { icon: string; connector: string; marker: string }
> = {
  delivery: {
    icon: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    connector: "text-orange-600/60 dark:text-orange-300/60",
    marker: "bg-orange-500",
  },
  traffic: {
    icon: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
    connector: "text-sky-600/60 dark:text-sky-300/60",
    marker: "bg-sky-500",
  },
  observe: {
    icon: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    connector: "text-emerald-600/60 dark:text-emerald-300/60",
    marker: "bg-emerald-500",
  },
};

function FlowConnector({ tone }: { tone: LaneTone }) {
  return (
    <li
      aria-hidden="true"
      className={`flex h-8 shrink-0 flex-col items-center justify-center xl:h-auto xl:w-8 xl:flex-row ${toneStyles[tone].connector}`}
    >
      <span className="h-3 w-px bg-current xl:h-px xl:w-3" />
      <ArrowDown className="h-4 w-4 xl:hidden" strokeWidth={1.75} />
      <ArrowRight
        className="hidden h-4 w-4 xl:block"
        strokeWidth={1.75}
      />
    </li>
  );
}

function HomelabNode({ step, tone }: { step: DiagramStep; tone: LaneTone }) {
  const Icon = step.icon;

  return (
    <li className="min-w-0 flex-1">
      <div className="group flex min-h-20 items-center gap-3 rounded-lg border border-border/70 bg-card/85 p-3 shadow-sm backdrop-blur-md transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md xl:min-h-32 xl:flex-col xl:items-start xl:p-4">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${toneStyles[tone].icon}`}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        <span className="min-w-0 xl:mt-auto">
          <span className="block text-sm font-semibold leading-5 text-foreground">
            {step.title}
          </span>
          <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
            {step.detail}
          </span>
        </span>
      </div>
    </li>
  );
}

function HomelabLane({
  title,
  description,
  icon: LaneIcon,
  steps,
  tone,
}: HomelabLaneProps) {
  return (
    <div className="grid gap-4 py-6 first:pt-0 last:pb-0 xl:grid-cols-[9.5rem_minmax(0,1fr)] xl:gap-6">
      <div className="flex items-start gap-3 xl:block">
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background/70">
          <span
            aria-hidden="true"
            className={`absolute -left-px top-2 h-6 w-0.5 rounded-full ${toneStyles[tone].marker}`}
          />
          <LaneIcon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 xl:mt-3">
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <ol className="flex min-w-0 flex-col xl:flex-row xl:items-stretch">
        {steps.map((step, index) => (
          <FragmentWithConnector
            key={step.title}
            step={step}
            tone={tone}
            showConnector={index < steps.length - 1}
          />
        ))}
      </ol>
    </div>
  );
}

function FragmentWithConnector({
  step,
  tone,
  showConnector,
}: {
  step: DiagramStep;
  tone: LaneTone;
  showConnector: boolean;
}) {
  return (
    <>
      <HomelabNode step={step} tone={tone} />
      {showConnector && <FlowConnector tone={tone} />}
    </>
  );
}

export function HomelabDiagram() {
  const t = useTranslations("about");

  const lanes: HomelabLaneProps[] = [
    {
      title: t("homelab.lanes.delivery.title"),
      description: t("homelab.lanes.delivery.description"),
      icon: Rocket,
      tone: "delivery",
      steps: [
        {
          title: t("homelab.nodes.local.title"),
          detail: t("homelab.nodes.local.detail"),
          icon: Laptop,
        },
        {
          title: "GitHub Actions",
          detail: t("homelab.nodes.actions.detail"),
          icon: GitBranch,
        },
        {
          title: "GHCR",
          detail: t("homelab.nodes.registry.detail"),
          icon: Package,
        },
        {
          title: "Portainer",
          detail: t("homelab.nodes.portainer.detail"),
          icon: SlidersHorizontal,
        },
        {
          title: t("homelab.nodes.workloads.title"),
          detail: t("homelab.nodes.workloads.delivery_detail"),
          icon: Boxes,
        },
      ],
    },
    {
      title: t("homelab.lanes.traffic.title"),
      description: t("homelab.lanes.traffic.description"),
      icon: ShieldCheck,
      tone: "traffic",
      steps: [
        {
          title: t("homelab.nodes.visitors.title"),
          detail: t("homelab.nodes.visitors.detail"),
          icon: UserRound,
        },
        {
          title: "Cloudflare Edge",
          detail: t("homelab.nodes.edge.detail"),
          icon: Cloud,
        },
        {
          title: "Cloudflare Tunnel",
          detail: t("homelab.nodes.tunnel.detail"),
          icon: Network,
        },
        {
          title: "Nginx Proxy Manager",
          detail: t("homelab.nodes.proxy.detail"),
          icon: Route,
        },
        {
          title: t("homelab.nodes.workloads.title"),
          detail: t("homelab.nodes.workloads.traffic_detail"),
          icon: Boxes,
        },
      ],
    },
    {
      title: t("homelab.lanes.observe.title"),
      description: t("homelab.lanes.observe.description"),
      icon: Activity,
      tone: "observe",
      steps: [
        {
          title: "Unraid",
          detail: t("homelab.nodes.host.detail"),
          icon: Server,
        },
        {
          title: t("homelab.nodes.workloads.title"),
          detail: t("homelab.nodes.workloads.observe_detail"),
          icon: Boxes,
        },
        {
          title: "SigNoz",
          detail: t("homelab.nodes.signoz.detail"),
          icon: Activity,
        },
      ],
    },
  ];

  return (
    <figure aria-labelledby="homelab-infrastructure-title">
      <figcaption className="mb-6 flex flex-col gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
            <Server className="h-3.5 w-3.5" aria-hidden="true" />
            {t("homelab.eyebrow")}
          </p>
          <h3
            id="homelab-infrastructure-title"
            className="mt-2 text-2xl font-semibold text-foreground"
          >
            {t("homelab_caption")}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {t("homelab.subtitle")}
          </p>
        </div>
      </figcaption>

      <div className="divide-y divide-border/70">
        {lanes.map((lane) => (
          <HomelabLane key={lane.tone} {...lane} />
        ))}
      </div>
    </figure>
  );
}
