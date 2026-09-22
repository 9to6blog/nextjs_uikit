"use client";
import { Icon } from "@9to6/ui/icons";
import { useState, type CSSProperties } from "react";
import { Slider } from "@9to6/ui/slider";
import { Switch } from "@9to6/ui/switch";
import { Button } from "@9to6/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@9to6/ui/tabs";
import { useSettings } from "./app-shell";
export function MotionStudio() {
  const { settings, update } = useSettings();
  const [duration, setDuration] = useState([240]);
  const [position, setPosition] = useState(false);
  return (
    <section className="motion-studio">
      <div
        className="motion-canvas"
        style={{ "--n-duration-normal": `${duration[0]}ms` } as CSSProperties}
      >
        <div className="motion-orbit">
          <div className="motion-orbit-track" />
          <div className="motion-object" data-moved={position}>
            <span>N</span>
          </div>
          <span className="motion-point point-start">A</span>
          <span className="motion-point point-end">B</span>
        </div>
        <Button variant="outline" onClick={() => setPosition((p) => !p)}>
          움직임 재생 <Icon name="arrow-up-right" />
        </Button>
        <Tabs defaultValue="one">
          <TabsList aria-label="모션 탭">
            <TabsTrigger value="one">Overview</TabsTrigger>
            <TabsTrigger value="two">Details</TabsTrigger>
            <TabsTrigger value="three">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="one">
            <p className="demo-note">활성 표시가 자연스럽게 이어집니다.</p>
          </TabsContent>
          <TabsContent value="two">
            <p className="demo-note">속도를 조절하며 차이를 확인하세요.</p>
          </TabsContent>
          <TabsContent value="three">
            <p className="demo-note">설정은 동작을 바꾸지 않습니다.</p>
          </TabsContent>
        </Tabs>
      </div>
      <div className="motion-controls">
        <span className="eyebrow">TUNE THE FEELING</span>
        <h2>Every millisecond matters.</h2>
        <div className="studio-setting">
          <div className="demo-between">
            <span>Duration</span>
            <strong>{duration[0]} ms</strong>
          </div>
          <Slider
            value={duration}
            min={80}
            max={700}
            step={20}
            onValueChange={setDuration}
            thumbLabels={["애니메이션 시간"]}
          />
        </div>
        <div className="setting-row">
          <div>
            <label htmlFor="reduce-motion">모션 줄이기</label>
            <p>정보와 기능은 그대로.</p>
          </div>
          <Switch
            id="reduce-motion"
            checked={settings.motion === "reduced"}
            onCheckedChange={(value) =>
              update({ motion: value ? "reduced" : "full" })
            }
          />
        </div>
        <p className="demo-note">
          시스템에서 모션 감소가 켜져 있다면 이 설정과 관계없이 움직임을
          줄입니다.
        </p>
      </div>
    </section>
  );
}
