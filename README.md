# NINE UI

Next.js를 위한 독립 UI 라이브러리. Shadcn의 조합 가능한 컴포넌트·소스 소유 방식을 참고하고, 자체 디자인 토큰과 모션 규칙으로 구현합니다.

`packages/ui`의 `@9to6/ui` 패키지와 `apps/docs`의 Next.js 문서·데모 사이트를 함께 관리합니다. 기존 블로그에 대한 수정이나 배포는 포함하지 않습니다.

## 실행

Node.js 22 이상, npm 10 이상이 필요합니다. 현재 개발 및 검증 버전은 lockfile과 `docs/VALIDATION.md`를 확인하세요.

```powershell
npm ci
npm run dev
# http://127.0.0.1:3106
```

```powershell
npm run build
npm run preview
# 실제 production 정적 산출물을 같은 주소에서 확인
```

문서는 `apps/docs/out`으로 정적 출력됩니다. 문서 호스팅에 Node 프로세스나 DB는 필요하지 않습니다. 호스트에 맞는 URL fallback/MIME/cache 설정은 별도 구성하세요. 빌드는 로컬에서 수행합니다.

라이브러리 TypeScript를 수정할 때는 별도 터미널에서 `npm run watch:ui`를 실행하면 개별 모듈과 타입 선언을 계속 갱신합니다. CSS 변경 후에는 `npm run build:ui`, 소스 registry 갱신에는 `npm run registry:build`를 실행하세요. `npm run dev`는 시작할 때 두 산출물을 생성합니다.

## 다른 Next.js 프로젝트에서 사용

아직 npm에 공개 배포하지 않았습니다. `npm install @9to6/ui`를 공개 패키지 설치 명령으로 안내하지 않습니다.

```powershell
# 이 저장소에서
npm run build:ui
npm pack -w @9to6/ui

# 소비 프로젝트에서 생성된 tarball 설치
npm install C:/path/to/9to6-ui-0.1.0.tgz
```

```tsx
// app/layout.tsx
import "@9to6/ui/styles.css";
import { UIProvider } from "@9to6/ui/provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <UIProvider theme="system" accent="blue" motion="full">
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
```

```tsx
import { Button } from "@9to6/ui/button";
import { Card, CardContent } from "@9to6/ui/card";

export default function Welcome() {
  return (
    <Card>
      <CardContent>
        <Button disabled>준비 중</Button>
      </CardContent>
    </Card>
  );
}
```

- Next.js **16**, React/React DOM **19.2 이상 20 미만**이 지원 대상입니다.
- 정적 컴포넌트는 서버에서 사용할 수 있습니다. 이벤트 핸들러나 상태를 쓰는 소비 컴포넌트에는 `"use client"`가 필요합니다.
- `/button`, `/dialog`, `/chart`처럼 개별 import 경로를 권장합니다. 루트 barrel도 제공하지만, 필요한 경로를 명시하면 경계를 더 쉽게 검토할 수 있습니다.
- `Button`의 기본 type은 `button`입니다. 제출에는 `type="submit"` 또는 `SubmitButton`을 명시합니다. `asChild`는 Button API가 아니라 Radix Trigger/Close의 조합 API에서 사용합니다.
- CSS는 `n-` 접두사와 `data-n-ui` 토큰 범위를 사용합니다. Tailwind를 요구하지 않으며 Shadcn/Tailwind 앱과 함께 사용할 수 있습니다.

## 전체 카탈로그 기준

2026-09-22 [Shadcn 공식 카탈로그](https://ui.shadcn.com/docs/components) 64개와 추가 컴포넌트 5개, 총 **69개 문서 항목**입니다. 각 항목에 실제 구현, 실행 예제, 사용 코드, 주요 API, 소스 조회가 연결됩니다.

| 범주            | 컴포넌트                                                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 기본 요소       | Button, Button Group, Badge, Card, Alert, Avatar, Aspect Ratio, Empty, Item, Kbd, Marker, Separator, Skeleton, Spinner, Progress, Typography                       |
| 폼              | Input, Field, Label, Textarea, Input Group, Input OTP, Checkbox, Radio Group, Switch, Slider, Select, Native Select, Combobox, Toggle, Toggle Group, Submit Button |
| 탐색            | Accordion, Breadcrumb, Tabs, Collapsible, Navigation Menu, Pagination, Sidebar, Nav Link, Direction                                                                |
| 오버레이        | Dialog, Alert Dialog, Sheet, Drawer, Popover, Tooltip, Hover Card, Dropdown Menu, Context Menu, Menubar, Command, Toast                                            |
| 데이터·레이아웃 | Calendar, Date Picker, Table, Data Table, Chart, Carousel, Scroll Area, Resizable                                                                                  |
| 추가 고급 요소  | File Upload, Tree, Sortable                                                                                                                                        |
| 대화            | Attachment, Bubble, Message, Message Scroller, Questionnaire                                                                                                       |

카탈로그를 모두 구현했다는 것과 타 라이브러리의 모든 기능·버전·옵션 조합을 지원한다는 것은 다릅니다. 이 릴리스는 **개발용 v0.1**이며, “모든 상황에서 완벽” 또는 “Shadcn보다 모든 면에서 우수”하다는 주장은 하지 않습니다. 상세 기능 범위와 차이는 다음 문서를 확인하세요.

- [지원 범위와 제한](docs/SUPPORT.md)
- [전체 지원을 위한 확장 목록과 완료 기준](docs/ROADMAP.md)
- [검증 결과](docs/VALIDATION.md)
- [아키텍처](docs/ARCHITECTURE.md)

## 테마와 모션

- `theme`: `light | dark | system`
- `accent`: `blue | violet | teal`
- `density`: `comfortable | compact`
- `motion`: `full | reduced`
- CSS 토큰: `--n-accent`, `--n-surface`, `--n-text`, `--n-border`, `--n-radius`, `--n-height` 등.
- 공통 시간: 140 / 240 / 360 ms. `cubic-bezier(.22,1,.36,1)`로 finite easing을 통일합니다.
- 운영체제의 모션 감소 설정을 우선합니다. `useReducedMotion`은 CSS 외 JavaScript 모션에도 같은 정책을 전달합니다.
- 패키지 자체는 localStorage, 원격 API, 인증 또는 분석 서비스에 접근하지 않습니다. 문서 앱만 테마 선호를 로컬에 저장합니다.

## Shadcn source registry

```powershell
npm run build
npm run preview

# 소비 프로젝트에서 실행, 로컬 문서 서버가 켜져 있어야 합니다.
npx shadcn@latest add http://127.0.0.1:3106/r/button.json
```

`npm run dev`도 registry를 생성합니다. 설치 대상은 소비 프로젝트의 `components.json`에 있는 UI alias입니다. 설치된 `nine-ui.css`를 앱 레이아웃에서 한 번 import하세요. UIProvider를 사용하려면 `/r/provider.json`도 추가합니다. 소스 배포 규약은 [Shadcn registry](https://ui.shadcn.com/docs/registry)를 따릅니다.

## 검사

```powershell
npm run format:check
npm run lint
npm run build
npm run typecheck
npx playwright install chromium firefox webkit
npm test
npm run test:package
```

브라우저 테스트는 production 정적 사이트를 사용합니다. 자동화 리포트는 `artifacts/`, `test-results/`, `playwright-report/`에 남으며 Git에는 포함하지 않습니다. GitHub Actions는 수동 실행만 제공합니다.

## 라이선스

자체 코드의 공개 라이선스와 npm 공개 배포는 아직 결정하지 않았습니다. 패키지를 private 상태로 유지합니다. 외부 기반 라이브러리는 해당 라이선스를 따르며, 재배포한 DayPicker 스타일과 직접 의존성의 라이선스는 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)에 기록합니다.
