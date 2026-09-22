# NINE UI

React와 Next.js를 위한 독립 UI 라이브러리. 조합 가능한 컴포넌트와 자체 디자인 토큰, 모션 규칙을 제공합니다.

`packages/ui`의 `@9to6/ui` 패키지와 `apps/docs`의 Next.js 문서·데모 사이트를 함께 관리합니다. 기존 블로그에 대한 수정이나 배포는 포함하지 않습니다.

**[라이브 문서와 데모](https://9to6blog.github.io/nextjs_uikit/)** · [배포 방법](docs/PUBLISHING.md)

## 블록·차트·캐러셀

- [블록 24종](https://9to6blog.github.io/nextjs_uikit/blocks/): 콘텐츠 6종, 대시보드 6종, 폼과 설정 6종, 마케팅 6종. 검색·분류·북마크·작업 상태·폼 제출 콜백을 실제 조작할 수 있으며 각 페이지에 독립 실행 예제와 소스를 제공합니다.
- [차트 구성 12종](https://9to6blog.github.io/nextjs_uikit/charts/): 선, 영역, 막대, 가로 막대, 누적 막대, 누적 영역, 파이, 도넛, 레이더, 방사형, 산점도, 혼합. 범례와 데이터 표, 모션 감소를 함께 지원합니다.
- [캐러셀 예제 6종](https://9to6blog.github.io/nextjs_uikit/carousels/): 에디토리얼, 후기, 썸네일, 다중 카드, 세로 이동, 자동 재생. 터치·키보드·점 탐색·현재 위치 콜백을 제공합니다.

```tsx
import "@9to6/ui/styles.css";
import "@9to6/ui/blocks.css"; // 블록을 사용할 때만 추가
import { TaskPanel } from "@9to6/ui/blocks/task-panel";
import { ChartView } from "@9to6/ui/chart-view";
import { Carousel } from "@9to6/ui/carousel";
```

블록은 인증·결제·DB·파일 저장을 포함하지 않습니다. 앱의 비동기 함수를 콜백에 연결하며, 성공과 실패는 그 함수의 결과에 따라 표시합니다. 갤러리의 데이터와 후기는 자체 작성한 예시입니다. 칸반 보드는 상태 선택기로 이동하며 드래그 이동 API는 포함하지 않습니다.

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
        <UIProvider theme="system" accent="black" motion="full">
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
- CSS는 `n-` 접두사와 `data-n-ui` 토큰 범위를 사용합니다. Tailwind 설정 없이 패키지의 스타일을 가져와 사용할 수 있습니다.

## React · Vite에서 사용

Next.js는 optional peer입니다. Next.js가 없는 React 앱은 `@9to6/ui/react` 또는 개별 컴포넌트 경로를 사용합니다. 기존 루트 진입점은 Next.js NavLink를 포함하므로 React 앱에서는 `/react`를 사용하세요.

```sh
npm install https://9to6blog.github.io/nextjs_uikit/downloads/9to6-ui-0.1.0.tgz
```

```tsx
import "@9to6/ui/styles.css";
import { UIProvider, Button, NavLink } from "@9to6/ui/react";

export default function App() {
  return (
    <UIProvider>
      <NavLink href="/" active>
        홈
      </NavLink>
      <Button>시작하기</Button>
    </UIProvider>
  );
}
```

React 진입점의 NavLink는 애플리케이션 라우터에서 `active`를 전달합니다. Next.js의 자동 경로 감지·prefetch는 기존 `@9to6/ui/nav-link`가 담당합니다. 검증 명령은 `npm run test:react`이며, React 19.3 + Vite 8.3의 독립 소비 앱에서 Next.js가 설치되지 않은 상태를 확인합니다. React 18은 현재 peer 지원 범위에 포함하지 않습니다.

## 전체 카탈로그 기준

기본 UI 요소부터 데이터 표현과 모션 패턴까지 총 **79개 문서 항목**입니다. 각 항목에 실제 구현, 실행 예제, 사용 코드, 주요 API, 소스 조회가 연결됩니다.

| 범주            | 컴포넌트                                                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 기본 요소       | Button, Button Group, Badge, Card, Alert, Avatar, Aspect Ratio, Empty, Item, Kbd, Marker, Separator, Skeleton, Spinner, Progress, Typography                       |
| 폼              | Input, Field, Label, Textarea, Input Group, Input OTP, Checkbox, Radio Group, Switch, Slider, Select, Native Select, Combobox, Toggle, Toggle Group, Submit Button |
| 탐색            | Accordion, Breadcrumb, Tabs, Collapsible, Navigation Menu, Pagination, Sidebar, Nav Link, Direction                                                                |
| 오버레이        | Dialog, Alert Dialog, Sheet, Drawer, Popover, Tooltip, Hover Card, Dropdown Menu, Context Menu, Menubar, Command, Toast                                            |
| 데이터·레이아웃 | Calendar, Date Picker, Table, Data Table, Chart, Carousel, Scroll Area, Resizable                                                                                  |
| 추가 고급 요소  | File Upload, Tree, Sortable                                                                                                                                        |
| 대화            | Attachment, Bubble, Message, Message Scroller, Questionnaire                                                                                                       |
| 모션·패턴       | Code Block, Code Tabs, Notification List, Pinned List, Todo List, Radial Menu, Shine Card, Multi Step Dialog, Relative Time, Preview Link Card                     |

이 릴리스는 **개발용 v0.1**입니다. 카탈로그는 제공하는 컴포넌트 목록이며, 세부 기능과 검증 범위는 다음 문서에 기록합니다.

- [지원 범위와 제한](docs/SUPPORT.md)
- [전체 지원을 위한 확장 목록과 완료 기준](docs/ROADMAP.md)
- [검증 결과](docs/VALIDATION.md)
- [아키텍처](docs/ARCHITECTURE.md)

## 테마와 모션

- `theme`: `light | dark | system`
- `accent`: `black | blue | violet | teal` (기본: black)
- `density`: `comfortable | compact`
- `motion`: `full | reduced`
- CSS 토큰: `--n-accent`, `--n-surface`, `--n-text`, `--n-border`, `--n-radius`, `--n-height` 등.
- 공통 시간: 200 / 300 / 500 ms. 팝업은 300/25 스프링, 라디오는 200/16 스프링, 탭 콘텐츠는 500 ms blur 전환을 사용합니다. 영상 18개와 이미지 2개의 대응표는 [디자인·모션 기준](docs/REFERENCE-DESIGN.md)에 기록했습니다.
- 운영체제의 모션 감소 설정을 우선합니다. `useReducedMotion`은 CSS 외 JavaScript 모션에도 같은 정책을 전달합니다.
- 패키지 자체는 localStorage, 원격 API, 인증 또는 분석 서비스에 접근하지 않습니다. 문서 앱만 테마 선호를 로컬에 저장합니다.

## 컴포넌트 소스

각 컴포넌트 문서와 패키지의 `src` 폴더에서 원본 TypeScript·CSS를 확인할 수 있습니다. 소스를 직접 수정하려면 관련 로컬 모듈과 패키지 의존성도 함께 가져오세요. `npm run registry:build`는 `/r/` 경로에 소스와 의존성 정보를 담은 JSON을 생성합니다. 일반적인 사용에는 위의 패키지 설치 방법을 권장합니다.

## 검사

```powershell
npm run format:check
npm run lint
npm run build
npm run typecheck
npx playwright install chromium firefox webkit
npm test
npm run test:package
npm run test:react
```

브라우저 테스트는 production 정적 사이트를 사용합니다. 자동화 리포트는 `artifacts/`, `test-results/`, `playwright-report/`에 남으며 Git에는 포함하지 않습니다. GitHub Actions는 수동 실행만 제공합니다.

## 라이선스

자체 코드의 공개 라이선스와 npm 공개 배포는 아직 결정하지 않았습니다. 패키지를 private 상태로 유지합니다. 외부 기반 라이브러리는 해당 라이선스를 따르며, 재배포한 DayPicker 스타일과 직접 의존성의 라이선스는 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)에 기록합니다.
