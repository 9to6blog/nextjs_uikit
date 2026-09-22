"use client";
import dynamic from "next/dynamic";
import type { Group } from "@/lib/catalog";
const demos = {
  core: dynamic(() => import("@/demos/core").then((m) => m.CoreDemo)),
  forms: dynamic(() => import("@/demos/forms").then((m) => m.FormsDemo)),
  navigation: dynamic(() =>
    import("@/demos/navigation").then((m) => m.NavigationDemo),
  ),
  overlays: dynamic(() =>
    import("@/demos/overlays").then((m) => m.OverlaysDemo),
  ),
  data: dynamic(() => import("@/demos/data").then((m) => m.DataDemo)),
  advanced: dynamic(() =>
    import("@/demos/advanced").then((m) => m.AdvancedDemo),
  ),
  chat: dynamic(() => import("@/demos/chat").then((m) => m.ChatDemo)),
  motion: dynamic(() => import("@/demos/motion").then((m) => m.MotionDemo)),
};
export function DemoHost({ name, group }: { name: string; group: Group }) {
  const Demo = demos[group];
  return (
    <div className="demo-host" data-demo={name}>
      <Demo name={name} />
    </div>
  );
}
