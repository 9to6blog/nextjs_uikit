"use client";
import { useSettings } from "./app-shell";
import { Button } from "@9to6/ui/button";
import { Field, Input } from "@9to6/ui/input";
import { Badge } from "@9to6/ui/badge";
export function ThemeStudio() {
  const { settings, update } = useSettings();
  return (
    <section className="theme-studio">
      <div className="studio-settings">
        <h2>Theme studio</h2>
        <div className="studio-setting">
          <span>Appearance</span>
          <div className="demo-row">
            {(["light", "dark", "system"] as const).map((theme) => (
              <Button
                key={theme}
                size="sm"
                variant={settings.theme === theme ? "primary" : "outline"}
                aria-pressed={settings.theme === theme}
                onClick={() => update({ theme })}
              >
                {theme}
              </Button>
            ))}
          </div>
        </div>
        <div className="studio-setting">
          <span>Accent color</span>
          <div className="demo-row">
            {(["blue", "violet", "teal"] as const).map((accent) => (
              <Button
                key={accent}
                size="sm"
                variant={settings.accent === accent ? "primary" : "outline"}
                aria-pressed={settings.accent === accent}
                onClick={() => update({ accent })}
              >
                {accent}
              </Button>
            ))}
          </div>
        </div>
        <div className="studio-setting">
          <span>Density</span>
          <div className="demo-row">
            {(["comfortable", "compact"] as const).map((density) => (
              <Button
                key={density}
                size="sm"
                variant={settings.density === density ? "primary" : "outline"}
                aria-pressed={settings.density === density}
                onClick={() => update({ density })}
              >
                {density}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="studio-live">
        <Badge tone="success" dot>
          Live preview
        </Badge>
        <h3>Good design feels natural.</h3>
        <p>설정을 바꾸면 이 사이트 전체에 적용됩니다.</p>
        <Field label="프로젝트 이름" htmlFor="theme-project">
          <Input id="theme-project" placeholder="My workspace" />
        </Field>
        <div className="demo-row">
          <Button>시작하기</Button>
          <Button variant="outline">나중에</Button>
        </div>
      </div>
    </section>
  );
}
