"use client";
import { Icon } from "@9to6/ui/icons";
import { useState } from "react";
import { ArrowUpRight, Plus, Check, SlidersHorizontal } from "lucide-react";
import { Button } from "@9to6/ui/button";
import { Badge } from "@9to6/ui/badge";
import { Switch } from "@9to6/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@9to6/ui/tabs";
import { Avatar, AvatarFallback } from "@9to6/ui/avatar";
import { Progress } from "@9to6/ui/progress";
import { useSettings } from "./app-shell";
export function HomePlayground() {
  const { settings, update } = useSettings();
  const [enabled, setEnabled] = useState(true);
  const [saved, setSaved] = useState(false);
  return (
    <div className="hero-playground">
      <div className="playground-bar">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>your-workspace.tsx</span>
        <Badge>Live preview</Badge>
      </div>
      <div className="playground-content">
        <div className="workspace-title">
          <div className="workspace-icon">
            <SlidersHorizontal size={20} />
          </div>
          <div>
            <h2>Your workspace</h2>
            <p>조금 더 당신답게.</p>
          </div>
          <ArrowUpRight className="workspace-arrow" size={18} />
        </div>
        <Tabs defaultValue="overview">
          <TabsList aria-label="워크스페이스">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="workspace-row">
              <div className="demo-row">
                <Avatar>
                  <AvatarFallback>DH</AvatarFallback>
                </Avatar>
                <div>
                  <strong>Design system</strong>
                  <p>Your next great idea</p>
                </div>
              </div>
              <Badge tone="success" dot>
                Active
              </Badge>
            </div>
            <div className="workspace-progress">
              <div>
                <span>Project progress</span>
                <span>{saved ? "100" : "72"}%</span>
              </div>
              <Progress label="프로젝트 예시 진행률" value={saved ? 100 : 72} />
            </div>
            <div className="setting-row">
              <div>
                <label htmlFor="hero-notification">Smart notifications</label>
                <p>중요한 순간을 놓치지 않도록.</p>
              </div>
              <Switch
                id="hero-notification"
                checked={enabled}
                onCheckedChange={setEnabled}
              />
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="workspace-setting-panel">
              <strong>Make it yours.</strong>
              <p>아래 색상 팔레트에서 테마를 바꿔 보세요.</p>
              <Button
                variant="outline"
                onClick={() =>
                  update({
                    density:
                      settings.density === "compact"
                        ? "comfortable"
                        : "compact",
                  })
                }
              >
                밀도:{" "}
                {settings.density === "compact" ? "Compact" : "Comfortable"}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="activity">
            <div className="workspace-setting-panel">
              <Badge tone="accent">Just now</Badge>
              <strong>Ready for your next idea.</strong>
              <p>직접 조작하며 컴포넌트의 상태를 확인하세요.</p>
            </div>
          </TabsContent>
        </Tabs>
        <div className="workspace-actions">
          <Button variant="outline" onClick={() => setSaved(false)}>
            <Plus /> New project
          </Button>
          <Button onClick={() => setSaved(true)}>
            {saved ? (
              <>
                <Check /> Saved
              </>
            ) : (
              <>
                Save changes <ArrowUpRight />
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="playground-footer">
        <span>Make it yours</span>
        <div className="theme-swatches" aria-label="강조 색상">
          {(["black", "blue", "violet", "teal"] as const).map((accent) => (
            <button
              type="button"
              key={accent}
              data-accent={accent}
              aria-label={`${accent} 강조 색상`}
              aria-pressed={settings.accent === accent}
              onClick={() => update({ accent })}
            >
              {settings.accent === accent && <Check size={12} />}
            </button>
          ))}
        </div>
        <span className="playground-hint">Go on, give it a click.</span>
      </div>
      <div className="floating-note">
        <Icon name="arrow-up-right" /> 작은 움직임, 더 나은 경험
      </div>
    </div>
  );
}
