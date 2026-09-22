# v0.1 로컬 검증 기록

검증일: **2026-09-22**. 이 기록은 독립 UI 패키지와 production 정적 문서 사이트의 로컬 검사입니다. 기존 블로그, AWS, Cloudflare 또는 실제 사용자 트래픽에 대한 운영 검증은 포함하지 않습니다.

## 환경

- Windows, Node.js 24.14.1, npm 11.11.0.
- Next.js 16.3.5, React / React DOM 19.3.0, TypeScript 5.9.3.
- Playwright 1.63.0, axe 4.13.0.
- Playwright 제공 Chromium 153.0.8010.12, Firefox 155.0, WebKit 26.6.
- 전체 worker 2개, Firefox/WebKit은 각각 최대 1개. 실패 재시도는 0회입니다.

## 빌드와 정적 검사

`npm run lint`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev --audit-level=high`를 실행했습니다. 린트·타입·production 빌드가 통과했고, 설치된 production 의존성 감사 결과는 알려진 취약점 **0건**입니다. 이는 미래 취약점이나 전체 보안에 대한 보증이 아닙니다.

문서에는 사용자 페이지 74개가 있습니다: 컴포넌트 69개와 홈·설치·디자인 토큰·모션·검증 안내 5개. Next 빌드 로그의 76개 정적 출력에는 내부 not-found 출력도 포함됩니다. source registry는 공유 구성 요소와 alias를 포함한 71개 항목을 생성합니다.

## 브라우저 검사

최종 통합 실행 결과: **192 passed**, 실패·skip·flaky **0건**, 자동 재시도 **0회**. `npm test` 전체 실행이 약 **6.7분**에 종료되었습니다. 중간 실패 후 수정한 항목을 포함해 전체 suite를 다시 실행한 결과입니다.

| 프로젝트                      | 범위                                          | 검사 수 |
| ----------------------------- | --------------------------------------------- | ------: |
| Chromium desktop, 1440 × 1000 | 전체 카탈로그·상호작용·접근성·반응형          |     110 |
| Chromium tablet, 820 × 1180   | 74개 페이지 가로 넘침, 모션 감소, 테마        |       3 |
| Chromium mobile, 390 × 844    | 74개 페이지 가로 넘침, 모바일 탐색, 모션·테마 |       3 |
| Firefox desktop               | 상호작용·열린 팝업 접근성·테마·문서 이동      |      38 |
| WebKit desktop                | 상호작용·열린 팝업 접근성·테마·문서 이동      |      38 |
| 합계                          | 저장소에 정의된 전체 suite                    |     192 |

모바일 프로필은 Chromium의 에뮬레이션입니다. iPhone 실기기 Safari 검증으로 해석하지 않습니다. Firefox/WebKit의 범위는 상세 상호작용 spec이며, 69개 전체 카탈로그의 테마별 axe 검사는 Chromium에서 실행합니다.

검사에는 다이얼로그 포커스·복귀, 안전한 Alert Dialog 기본 포커스, 키보드 메뉴·탭·선택, 표 검색·정렬·선택·페이지·열 숨김, 트리 탐색, 키보드 정렬과 알림, 파일 선택·형식 거절·삭제, 날짜·기간 선택, 메시지 스크롤 유지, 제출 pending, 실제 차트 경로와 텍스트 대안이 포함됩니다.

카탈로그 검사는 라이트·다크에서 axe의 WCAG 2 A/AA 및 2.1 AA 태그를 실행하고, 페이지 오류·console error·실패한 HTTP 응답을 수집합니다. axe는 색상 전환 등 유한한 CSS 애니메이션이 종료된 상태를 검사합니다. 무한 반복 애니메이션은 종료 대기에서 제외하며, 별도 모션 감소 검사도 수행합니다. 별도 검사는 열린 팝업, 시스템 다크 강조색, 정적 페이지 간 클라이언트 이동과 문서 유지도 확인합니다. 홈의 데스크톱·태블릿·모바일 스크린샷을 직접 검토했습니다.

## 패키지와 소스 설치

`npm run test:package`가 **통과**했습니다. 기존 workspace에 의존하지 않는 새 소비 프로젝트에서 다음을 확인했습니다.

1. 실제 `npm pack` tarball을 새 Next.js 앱에 설치하고 production 빌드.
2. 공식 `shadcn@4.21.0` CLI로 로컬 registry의 Button과 Dialog 소스 설치 후 빌드.
3. 서버 Card/Button의 내용이 정적 HTML에 존재하고, 모든 emitted client module의 `"use client"` 지시문 유지.
4. 패키지와 소스 설치 각각의 Dialog를 Chromium에서 열고 Escape로 닫기. page error 0건.
5. 이 소비 예제의 JS chunk에서 사용하지 않은 Recharts의 runtime marker가 발견되지 않음. 모든 가능한 bundler·import 방식의 비용 검증은 아님.

| 배포물                     | 측정값                                                             |
| -------------------------- | ------------------------------------------------------------------ |
| 파일                       | `artifacts/9to6-ui-0.1.0.tgz`                                      |
| 압축 크기                  | 71,133 bytes                                                       |
| 압축 해제 크기             | 365,971 bytes / 314 files                                          |
| SHA-256                    | `37cb50c2009e29f1d940fa1cb0cba7a77ccdf2005d90f212488c04e7f10b1031` |
| 소비 앱 전체 JS chunk 합계 | 623,585 bytes / gzip 합계 192,040 bytes                            |

JS 수치는 Next.js·React runtime 및 두 소비 예제의 chunk를 포함합니다. UI 라이브러리 단독 크기나 페이지별 최초 다운로드 크기가 아닙니다. Tarball에는 의존성의 `node_modules`가 들어 있지 않으며, 소비 앱 설치 시 의존성을 받습니다.

## 발견한 문제와 수정

- 키보드로 빠르게 Menubar를 전환할 때 이전 메뉴의 포커스 외부 처리가 새 메뉴를 닫던 문제를 같은 menubar 내부 이동 판별로 수정했습니다. 닫히는 표면은 즉시 해제해 다음 메뉴로 포커스를 넘깁니다.
- Context Menu의 Shift+F10 / ContextMenu 키를 직접 처리해 브라우저의 기본 contextmenu 이벤트 생성 여부에 의존하지 않도록 했습니다.
- cmdk의 `data-disabled="false"`를 disabled 스타일로 처리하던 문제, 가로 코드 영역의 키보드 접근, 모바일 hero 넘침, 시스템 다크 강조색을 수정했습니다.
- Windows의 Next 16.3.5 정적 출력에서 prefetch 파일의 실제 경로와 요청 URL이 달랐습니다. 빌드 후 정적 alias를 추가해 일반 정적 서버에서도 실패한 prefetch 없이 이동하도록 했습니다.
- 브라우저 검사는 정적 HTML 표시와 React 이벤트 연결을 구분합니다. lazy demo의 effect에서 준비 상태를 기록한 후 조작하며, 테마별 독립 스캔은 해당 테스트의 저장된 설정을 초기화합니다. 파일 검사는 실제 버튼의 filechooser 이벤트를 통해 진행합니다. 검증 조건을 제거하거나 재시도로 실패를 숨기지 않습니다.

## 증거와 남은 범위

로컬 재현 자료는 `artifacts/test-results.json`, `playwright-report/index.html`, `artifacts/package-verification.json`, `artifacts/screenshots/`입니다. 중간 실패 기록은 `artifacts/before-*.json`, `artifacts/pre-final-browser-failures/` 등에 보존합니다. 생성물과 설치 fixture는 Git에 포함하지 않습니다.

GitHub Actions는 수동 workflow를 준비했으며 원격 실행 결과를 이 로컬 기록으로 대신하지 않습니다. 자동 접근성 스캔은 WCAG 인증이나 NVDA/VoiceOver·실제 터치 기기의 수동 검증을 대체하지 않습니다. 고급 기능의 미구현 범위는 [SUPPORT.md](SUPPORT.md), 추가 개발과 출시 기준은 [ROADMAP.md](ROADMAP.md)에 기록합니다.
