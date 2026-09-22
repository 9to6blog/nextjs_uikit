"use client";
import { useDemoReady } from "@/lib/use-demo-ready";
import { useId, useState } from "react";
import { Button } from "@9to6/ui/button";
import { Input, Textarea, Field } from "@9to6/ui/input";
import { Label } from "@9to6/ui/label";
import { InputGroup, InputGroupAddon } from "@9to6/ui/input-group";
import { InputOTP } from "@9to6/ui/input-otp";
import { Checkbox } from "@9to6/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@9to6/ui/radio-group";
import { Switch } from "@9to6/ui/switch";
import { Slider } from "@9to6/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "@9to6/ui/select";
import { NativeSelect, NativeSelectOption } from "@9to6/ui/native-select";
import { Combobox } from "@9to6/ui/combobox";
import { Toggle } from "@9to6/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@9to6/ui/toggle-group";
import { SubmitButton } from "@9to6/ui/submit-button";

export function FormsDemo({ name }: { name: string }) {
  useDemoReady(name);
  const id = useId();
  const [selected, setSelected] = useState("next");
  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState("");
  const [range, setRange] = useState([25, 75]);
  const [saved, setSaved] = useState(false);
  switch (name) {
    case "input":
      return (
        <div className="demo-stack">
          <Field htmlFor={id} label="이메일">
            <Input id={id} type="email" placeholder="you@example.com" />
          </Field>
          <Input
            aria-label="비활성 입력"
            disabled
            placeholder="읽기 전용 상태"
          />
          <Input
            aria-label="오류 입력"
            aria-invalid="true"
            placeholder="입력 내용을 확인하세요"
          />
        </div>
      );
    case "field":
      return (
        <Field
          label="프로젝트 이름"
          htmlFor={id}
          description="다른 팀원에게 표시되는 이름입니다."
          error={
            value.length > 0 && value.length < 3
              ? "3자 이상 입력해 주세요."
              : undefined
          }
        >
          <Input
            id={id}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-describedby={`${id}-hint`}
            aria-invalid={value.length > 0 && value.length < 3}
            placeholder="새로운 프로젝트"
          />
        </Field>
      );
    case "label":
      return (
        <div className="demo-stack">
          <Label htmlFor={id}>이름</Label>
          <Input id={id} placeholder="이름을 입력하세요" />
        </div>
      );
    case "textarea":
      return (
        <Field label="소개" htmlFor={id}>
          <Textarea
            id={id}
            placeholder="프로젝트에 대해 이야기해 주세요."
            maxLength={300}
          />
        </Field>
      );
    case "input-group":
      return (
        <InputGroup>
          <InputGroupAddon>https://</InputGroupAddon>
          <Input aria-label="도메인" placeholder="your-site.com" />
          <InputGroupAddon>.com</InputGroupAddon>
        </InputGroup>
      );
    case "input-otp":
      return (
        <div className="demo-stack">
          <Label htmlFor={id}>인증 코드</Label>
          <InputOTP id={id} value={value} onChange={setValue} />
          <p className="demo-note" role="status">
            {value.length === 6
              ? "6자리 입력 완료"
              : "6자리 숫자를 입력하거나 붙여넣으세요."}
          </p>
        </div>
      );
    case "checkbox":
      return (
        <div className="demo-stack">
          <label className="n-choice">
            <Checkbox
              checked={checked}
              onCheckedChange={(v) => setChecked(v === true)}
            />
            이용 약관에 동의합니다.
          </label>
          <label className="n-choice">
            <Checkbox checked="indeterminate" />
            일부 항목 선택
          </label>
          <label className="n-choice">
            <Checkbox disabled />
            사용할 수 없는 옵션
          </label>
        </div>
      );
    case "radio-group":
      return (
        <RadioGroup defaultValue="personal" aria-label="요금제">
          <label className="n-choice">
            <RadioGroupItem value="personal" />
            Personal · 개인 프로젝트
          </label>
          <label className="n-choice">
            <RadioGroupItem value="team" />
            Team · 함께하는 작업
          </label>
          <label className="n-choice">
            <RadioGroupItem value="enterprise" disabled />
            Enterprise · 준비 중
          </label>
        </RadioGroup>
      );
    case "switch":
      return (
        <div className="demo-stack">
          <div className="setting-row">
            <div>
              <label htmlFor={id}>이메일 알림</label>
              <p>새로운 소식을 받아보세요.</p>
            </div>
            <Switch id={id} checked={checked} onCheckedChange={setChecked} />
          </div>
          <div className="setting-row">
            <div>
              <label htmlFor={`${id}-off`}>마케팅 알림</label>
              <p>이 설정은 비활성 상태입니다.</p>
            </div>
            <Switch id={`${id}-off`} disabled />
          </div>
          <p role="status" className="demo-note">
            이메일 알림 {checked ? "켜짐" : "꺼짐"}
          </p>
        </div>
      );
    case "slider":
      return (
        <div className="demo-stack">
          <div className="demo-between">
            <span className="demo-note">범위 선택</span>
            <span className="demo-note">{range.join(" – ")}</span>
          </div>
          <Slider
            value={range}
            onValueChange={setRange}
            thumbLabels={["최솟값", "최댓값"]}
          />
        </div>
      );
    case "select":
      return (
        <Select defaultValue="ko">
          <SelectTrigger aria-label="언어">
            <SelectValue placeholder="언어 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Language</SelectLabel>
              <SelectItem value="ko">한국어</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
              <SelectItem value="de" disabled>
                Deutsch
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    case "native-select":
      return (
        <NativeSelect aria-label="언어">
          <NativeSelectOption value="ko">한국어</NativeSelectOption>
          <NativeSelectOption value="en">English</NativeSelectOption>
          <NativeSelectOption value="ja">日本語</NativeSelectOption>
        </NativeSelect>
      );
    case "combobox":
      return (
        <div className="demo-stack">
          <Combobox
            label="프레임워크"
            value={selected}
            onValueChange={setSelected}
            options={[
              { value: "next", label: "Next.js" },
              { value: "react", label: "React" },
              { value: "remix", label: "Remix" },
              { value: "astro", label: "Astro", disabled: true },
            ]}
          />
          <span role="status" className="demo-note">
            선택: {selected}
          </span>
        </div>
      );
    case "toggle":
      return (
        <Toggle aria-label="굵게">
          <strong>B</strong>
        </Toggle>
      );
    case "toggle-group":
      return (
        <ToggleGroup type="single" defaultValue="left" aria-label="텍스트 정렬">
          <ToggleGroupItem value="left" aria-label="왼쪽 정렬">
            왼쪽
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="가운데 정렬">
            가운데
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="오른쪽 정렬">
            오른쪽
          </ToggleGroupItem>
        </ToggleGroup>
      );
    case "submit-button":
      return (
        <form
          className="demo-stack"
          action={async () => {
            setSaved(false);
            await new Promise((resolve) => setTimeout(resolve, 1200));
            setSaved(true);
          }}
        >
          <Field htmlFor={id} label="프로젝트 이름">
            <Input
              id={id}
              name="project"
              required
              defaultValue="My workspace"
            />
          </Field>
          <div className="demo-row">
            <SubmitButton>변경 사항 저장</SubmitButton>
            <Button type="reset" variant="ghost">
              초기화
            </Button>
          </div>
          <p role="status" className="demo-note">
            {saved
              ? "데모 저장이 완료되었습니다."
              : "이 예제는 브라우저에서 제출 상태를 시연합니다."}
          </p>
        </form>
      );
    default:
      return null;
  }
}
