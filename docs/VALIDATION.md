# v0.1 UI 수정 · React · Pages 검증

검증일: **2026-09-22**. 사용자 스크린샷 피드백에 따른 UI 수정과 독립 React 소비, GitHub Pages용 정적 빌드의 검증 기록입니다.

## 전체 브라우저 검사

`npm test`: **259 passed**, 실패·건너뜀·flaky **0건**, 재시도 **0회**. 소요 **9.3분**, 시작 UTC `2026-09-22T06:20:13.376Z`.

| 프로젝트         | 화면                 | 검사 수 |
| ---------------- | -------------------- | ------: |
| Chromium desktop | 1440 × 1000          |     139 |
| Chromium tablet  | 820 × 1180           |       3 |
| Chromium mobile  | 390 × 844 에뮬레이션 |       3 |
| Firefox desktop  | 1280 × 720           |      57 |
| WebKit desktop   | 1280 × 720           |      57 |

79개 컴포넌트의 라이트·다크 렌더링·axe 검사는 Chromium에서 실행합니다. Firefox와 WebKit은 상호작용 spec 전체를 실행합니다. 반응형 검사는 79개 컴포넌트와 5개 안내 페이지, 총 84개 문서를 순회합니다.

추가 회귀 검사는 내비게이션·사이드바의 단일 하이라이트와 active 복귀, 카드 버튼 내부 상태·폭 유지, Select SVG와 Combobox 트리거·팝업 폭·화살표 정렬, Calendar·DatePicker 선택 날짜 13px 유지, DataTable 공통 체크박스의 mixed·전체 선택·열 표시를 포함합니다. 기존 고정 목록의 이동·포커스 검사와 Todo 직선 완료선 검사도 유지합니다.

제어용 화살표·체크·닫기·드래그·날짜 아이콘을 SVG로 구현했습니다. 화면 캡처로 테이블, 사이드바 hover, 카드 선택 상태, 새 고정 목록, 직선 완료선, 선택 날짜와 콤보박스 정렬을 직접 확인했습니다.

초기 전체 실행에서는 258개가 통과하고 Data Table의 다크 테마 전환 검사 1개가 대기 시간 초과로 실패했습니다. 추적을 활성화하면 닫힌 열 선택 메뉴의 체크박스 전환이 종료 promise를 처리하지 못하는 현상을 3회 재현했습니다. 메뉴가 열릴 때만 선택 항목을 렌더링하도록 수정한 뒤, 해당 접근성 검사는 3회 연속 통과하고 3개 브라우저의 열 선택 동작도 통과했습니다. 검사 시간 제한이나 접근성 판정은 변경하지 않았으며 이 문서의 전체 검사 결과는 수정 후 재실행입니다.

별도 재실행에서는 Firefox의 제출 버튼 검사에서 눌림 scale의 중간 프레임을 레이아웃 너비 변화로 판정했습니다. 직접 측정한 CSS 너비는 처리 전·중 모두 125.667px이었고, scale 종료 후 화면 너비도 원래 값으로 복원됐습니다. 처리 중 CSS 너비를 추가 확인하고 애니메이션 종료 후 기존 화면 너비의 완전 일치 검사를 수행하도록 보완했습니다. 타임아웃·허용 오차·재시도 횟수는 변경하지 않았습니다.

## 정적 검사와 빌드

- 포맷·린트·타입 검사·로컬 production 빌드 통과.
- Next.js 16.3.5, React 19.3.0, TypeScript 5.9.3, Playwright 1.63.0.
- `main` 소스의 기본 경로 문서 빌드와 `/nextjs_uikit` basePath Pages 빌드를 각각 검증합니다.
- Next.js 빌드의 오류 페이지는 공개 문서 84개에서 제외합니다.

## 실제 패키지와 소비 앱

`npm run test:package` 통과. 증거 UTC `2026-09-22T06:30:50.790Z`. 실제 tarball을 별도 Next.js 앱에 설치해 Server Component HTML, client 지시문, Dialog 열기·Escape·포커스, 공식 shadcn CLI 소스 설치·빌드를 검증했습니다. 브라우저 오류 0건입니다.

`npm run test:react` 통과. 증거 UTC `2026-09-22T06:31:21.603Z`. 작업 공간 밖의 독립 **React 19.3.0 + Vite 8.3.0** 앱에서 Next.js가 설치되지 않았음을 확인하고 타입·프로덕션 빌드·체크박스·콤보박스·다이얼로그·일반 NavLink를 검사했습니다. 작은 트리거에서도 `contentMinWidth`로 넓은 팝업을 사용할 수 있습니다. 브라우저 오류 0건입니다.

React 소비 앱은 `@9to6/ui/react`를 사용합니다. 기존 루트 barrel과 `/nav-link`는 Next.js 어댑터를 유지합니다. `/react`의 NavLink는 애플리케이션 라우터가 `active` 값을 전달합니다. React 18은 지원 대상으로 선언하지 않습니다.

| 패키지    | 값                                                                 |
| --------- | ------------------------------------------------------------------ |
| 파일      | `9to6-ui-0.1.0.tgz`                                                |
| 압축 크기 | 101,153 bytes                                                      |
| 압축 해제 | 498,435 bytes / 374 files                                          |
| SHA-256   | `f9c21b42c1ea8bf5b7365d8ad0a9951458b7ebd361e7943b281f7dca5404bdab` |

## GitHub Pages

로컬 Pages 빌드의 `npm run test:pages`에서 **84개 문서 HTTP 200**, 문서·일반 링크·Next.js 링크의 프로젝트 경로 유지, registry, 다운로드 패키지 해시, 다이얼로그·카드·캘린더·테이블, 390px 화면을 검사했습니다. 브라우저 오류 0건입니다.

공개 주소는 https://9to6blog.github.io/nextjs_uikit/ 입니다. 배포 스크립트는 현재 소스 커밋과 깨끗한 빌드, 최신 로컬 Pages 검증 기록의 일치를 요구합니다. GitHub의 게시 작업 성공과 실제 공개 주소 검증은 로컬 증거 `artifacts/pages-publish.json`, `artifacts/pages-live-verification.json`에 별도로 기록합니다. 이는 원격에서 전체 테스트 suite를 다시 실행했다는 뜻이 아닙니다. 배포 절차는 [PUBLISHING.md](PUBLISHING.md)를 참고하세요.

## 증거와 범위

`artifacts/review-full-tests.log`, `artifacts/test-results.json`, `artifacts/package-verification.json`, `artifacts/react-verification.json`, `artifacts/pages-local-verification.json`, `artifacts/polish-review/`에 증거가 있습니다. 원본 스크린샷·영상, 생성 산출물, 소비 앱 fixture는 `main`에 포함하지 않습니다.

모바일은 에뮬레이션입니다. 실기기·스크린리더·고배율·모든 RTL 조합의 검증이나 WCAG 인증을 의미하지 않습니다. 기존 블로그·AWS·Cloudflare와 실제 운영 트래픽은 이번 검증 범위에 포함하지 않습니다. 기능 범위는 [SUPPORT.md](SUPPORT.md)에 명시합니다.
