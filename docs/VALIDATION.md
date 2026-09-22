# v0.1 UI 수정 · React · Pages 검증

검증일: **2026-09-22**. 사용자 스크린샷 피드백에 따른 UI 수정과 독립 React 소비, GitHub Pages용 정적 빌드의 검증 기록입니다.

## 0.1.1 병합 검증: 제품 조합과 원격 확장 함께 보존

2026-09-22의 제품 통합 수정 `c32e84c`와 원격 확장 `1ce633f`를 병합한 소스에서 아래 검증을 모두 다시 실행했습니다. 메뉴의 16px 아이콘과 명시적인 trailing 슬롯, Command 컨테이너 포커스, 단일 사이드바 하이라이트, 닫힌 overlay의 즉시 layer 해제를 보존하면서 블록·차트·캐러셀 확장과 compact Combobox 검색 규격도 유지합니다. 실제 충돌은 독립 React 소비자 fixture 한 곳이었으며 양쪽의 UI와 검증 항목을 모두 결합했습니다.

- `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run build`: 모두 통과. 문서의 111개 공개 경로를 production 정적 빌드했습니다.
- `npm test`: **329개 전체 통과**, 실패·건너뜀·flaky·재시도 0건. 시작 UTC `2026-09-22T11:22:33.533Z`, 소요 353.1초. Chromium desktop 189개, tablet 3개, mobile 3개, Firefox 67개, WebKit 67개입니다. 반응형 검사는 1440px·820px·390px에서 전체 문서 경로를 순회합니다.
- `npm run test:react`: 독립 React 19.3.0 + Vite 8.3.0 앱에 실제 패키지를 설치해 타입·production 빌드·기존 컨트롤·TaskPanel·ChartView·Carousel을 검증했습니다. Next.js와 shadcn은 설치되지 않았고 브라우저 오류는 0건입니다. UTC `2026-09-22T11:23:06.997Z`.
- React 소비자에는 Popover/Menu/Sheet/Dialog에서 새 Dialog로 즉시 전환하는 회귀 검사를 포함합니다. 종료 애니메이션 대기 없이 첫 Escape, trigger 포커스 복귀, 닫힌 layer 제거, body 입력 잠금 해제를 확인합니다. 해당 overlay는 진입 모션을 유지하고 닫힐 때 즉시 unmount됩니다.
- `npm run test:package`: 별도 Next.js 소비 앱의 Server Component HTML, 중첩 client 지시문, package/registry Dialog와 포커스 복귀, 블록 CSS와 하위 모듈 설치를 검증했습니다. 사용하지 않는 차트 런타임은 번들에 없고 브라우저 오류는 0건입니다. UTC `2026-09-22T11:24:11.953Z`.
- 검증 tarball `9to6-ui-0.1.1.tgz`: 139,121 bytes, 해제 시 664,344 bytes / 488 files. SHA-256 `8f333d4c9dfaa1c5ef7ee9df5242ec231459db47c32614e22d12c07a1b7a2592`.

증거는 `artifacts/merge-{format,lint,typecheck,build,browser,react,package}.log`, `artifacts/test-results.json`, `artifacts/react-verification.json`, `artifacts/package-verification.json`입니다. GitHub Pages용 basePath 빌드·게시 및 실제 보조기기 검증은 이번 병합 검증에 포함하지 않았습니다. 아래 내용은 병합 전 각 변경의 이력입니다.

## 앞선 블록 24종 · 차트 12종 · 캐러셀 6종 확장

이번 확장은 독립 블록 24개, 실행 가능한 블록 예제 24개, 차트 유형 12개와 캐러셀 예제 6개를 추가했습니다. 문서는 **111개 경로**이며 기존 컴포넌트 79개도 유지합니다. 아래 과거 검증 기록과 구분되는 현재 확장의 결과입니다.

- `npx playwright test --workers=1`: **325개 실행, 322개 통과, 3개 후속 검사 대상 발견**. 시작 UTC `2026-09-22T08:44:30.767Z`, 소요 20.8분. Chromium의 전체 컴포넌트 및 블록·차트 접근성, Chromium·Firefox·WebKit 상호작용과 반응형 검사를 포함합니다.
- 태블릿 820px에서 새 헤더 탐색 항목이 2px 넘치는 것을 간격 조정으로 수정했습니다. Firefox·WebKit 자동 재생 검사는 포커스로 화면이 스크롤되면서 마우스가 캐러셀 위에 머물러 재생이 일시 정지된 상태였습니다. 명시적 재개를 검사할 때 포인터를 캐러셀 밖으로 이동하도록 테스트를 바로잡았습니다. 포커스·마우스 위치·페이지 가시성을 별도로 재현해 확인했습니다.
- 최종 소스를 다시 빌드한 뒤 관련 **6개 검사 모두 통과**: 1440px·820px·390px의 111개 전체 경로 반응형 검사와 Chromium·Firefox·WebKit의 캐러셀 자동 재생·포커스 정지·재개·모션 감소 검사. 건너뜀·재시도 0건. 전체 325개를 최종 수정 후 다시 실행했다고 표시하지 않습니다. 최종 관련 실행 UTC `2026-09-22T09:05:27.709Z`.
- 추가 브라우저 검증: 블록 전체와 차트·캐러셀 갤러리의 라이트/다크 **62개 접근성 검사** 통과, 새 27개 경로의 390px 가로 넘침 없음, 캐러셀 6개 구성의 모바일 화면 캡처. 브라우저 오류 0건.
- 검색·필터·북마크, 보드 상태 이동, 자체 체크박스, 명령 실행, 폼 검증·오류·완료, 프로필 초기화, 알림 저장, 파일 선택·제거, 요금 주기, FAQ 키보드 탐색을 검사했습니다. 예제 콜백은 실제 계정 생성·전송·결제·저장을 하지 않습니다.
- 차트 12종의 도형과 데이터 표, 기간 변경을 검사했습니다. 캐러셀은 썸네일, 다중 슬라이드의 포커스 제외, 세로 방향키, 자동 재생·포커스 정지·명시적 재개·모션 감소를 검사했습니다.
- `npm run test:react`: 독립 React 19.3 + Vite 8.3 앱에서 **Next.js와 shadcn 설치 없이** 기존 컨트롤과 새 TaskPanel·ChartView·Carousel의 타입·빌드·동작 검증 통과. UTC `2026-09-22T08:59:00.201Z`.
- `npm run test:package`: 실제 tarball의 블록 CSS·타입·하위 모듈, 중첩 client 지시문, Next.js Server Component의 정적 블록 HTML, Dialog와 선택적 소스 registry 설치 검증 통과. 사용하지 않는 차트 런타임은 소비 앱 번들에 없음. UTC `2026-09-22T09:02:29.948Z`.
- 포맷·린트·타입·로컬 production 빌드 통과. 기본 경로와 GitHub Pages basePath 빌드는 각각 검증합니다. Pages 게시 전 모든 111개 경로, 패키지 해시, 블록·차트·캐러셀 상호작용과 콘솔을 검사하고 게시 후 같은 검사를 실제 주소에 수행합니다.

초기 확장 검사에서 발견한 링크 버튼 대비·지표 목록 HTML·다중 슬라이드 경계의 포커스 문제를 수정했습니다. 보드 제목의 공백과 Command의 접근 가능한 이름에 맞춰 선택자를 바로잡았으며 시간 제한·허용 오차·재시도 기준을 낮추지 않았습니다. 최초 기록은 `artifacts/expansion-first-tests.log`, 전체 실행은 `artifacts/expansion-full-tests.log`와 `artifacts/expansion-full-results.json`, 최종 관련 실행은 `artifacts/expansion-final-tests.log`와 `artifacts/test-results.json`입니다. 추가 증거: `artifacts/expansion-local.json`, `artifacts/expansion-review/`, `artifacts/react-verification.json`, `artifacts/package-verification.json`.

자동 접근성 검사는 실제 스크린리더·터치 기기의 수동 검증을 대체하지 않습니다. 블록의 저장소·인증·결제와 대용량 데이터 처리는 사용하는 앱에서 연결합니다.

## 이전 알림 내용 · 우클릭 · 검색창 크기 수정

알림 예제에서 레퍼런스의 제목·본문·수치를 제거하고 글 발행·댓글·미리보기 알림으로 교체했습니다. Radial Menu는 일반 좌클릭을 무시하고 우클릭으로 열립니다. 키보드 열기·선택·Escape·포커스 복귀를 유지합니다. Combobox 검색창은 높이 36px, 글자 13px, 좌우 여백 12px이며 포커스 중에도 목록과 같은 표면색을 사용합니다.

- 관련 검사 **25개 통과**, 실패·건너뜀·자동 재시도 0건. Chromium·Firefox·WebKit에서 알림 펼침, 원형 메뉴 좌·우클릭 및 키보드, 검색·선택·포커스, 테마와 관련 접근성을 검사했습니다. 소요 3.2분.
- 처음 브라우저 2개를 병렬 실행했을 때 24개 통과, WebKit 안내 페이지 검사 1개가 시간 초과로 끝났습니다. 같은 검사와 시간 제한을 유지한 채 브라우저를 하나씩 실행해 25개 모두 통과했습니다. 최초 기록은 `artifacts/content-context-parallel-timeout.log`와 `artifacts/content-context-guide-timeout.zip`에 보존했습니다.
- 실제 캡처로 새 알림 내용, 우클릭 메뉴, 라이트 모드의 흰색 검색창과 다크 모드의 표면색을 확인했습니다. 390px 화면과 고대비 모드도 확인했습니다. 브라우저 오류 0건입니다.
- 독립 React 소비 앱의 타입·빌드·주요 상호작용 검사 통과. 증거 UTC `2026-09-22T08:06:39.250Z`.
- 증거: `artifacts/content-context-tests.log`, `artifacts/content-context-local.json`, `artifacts/content-context-react.log`, `artifacts/content-context-review/`.

이번 수정은 위의 관련 검사 범위입니다. 아래 17개 및 259개 기록은 이전 변경의 검증 결과입니다.

## 이전 검색 포커스와 문서 수정 (`a345cf7`)

2026-09-22 후속 피드백으로 검색 입력의 전역 2px 포커스 외곽선이 잘리는 문제를 수정했습니다. Command 입력 전용 포커스 스타일은 1px 회색 구분선과 옅은 배경을 사용합니다. 고대비 모드에는 입력 안쪽의 1px 시스템 포커스 표시를 유지합니다. 설치·지원 문서와 README는 자체 패키지와 API를 설명하도록 정리했습니다.

- 이번 변경의 관련 검사 **17개 통과**, 실패·건너뜀·재시도 0건. Chromium·Firefox·WebKit에서 Combobox·Command의 렌더링, 검색·선택, 키보드 탐색, 팝업 접근성, 안내 페이지의 라이트·다크 접근성을 검사했습니다.
- 라이트·다크의 실제 검색창을 캡처하고 외곽선 제거·1px 구분선, 키보드 선택·포커스 복귀, 고대비 포커스, 전역 검색을 별도로 확인했습니다. 브라우저 오류 0건입니다.
- 독립 React 19.3.0 + Vite 8.3.0 앱에 패키지를 설치해 외부 UI 설치 도구와 Next.js가 설치되지 않은 상태에서 타입·프로덕션 빌드와 주요 상호작용을 확인했습니다. 증거 UTC `2026-09-22T07:06:16.179Z`, 브라우저 오류 0건입니다.
- 린트·타입 검사·로컬 프로덕션 빌드 통과. 증거는 `artifacts/focus-tests.log`, `artifacts/focus-local-verification.json`, `artifacts/focus-react.log`, `artifacts/focus-review/`에 기록합니다.

아래 **259개 전체 검사와 Next.js 소비 앱 기록은 직전 커밋 `328d5d8`의 검증 결과**입니다. 이번 후속 변경에서는 위의 관련 검사를 실행했으며, 전체 259개를 다시 실행한 것으로 표시하지 않습니다.

## 직전 전체 브라우저 검사

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

`npm run test:package` 통과. 증거 UTC `2026-09-22T06:30:50.790Z`. 실제 tarball을 별도 Next.js 앱에 설치해 Server Component HTML, client 지시문, Dialog 열기·Escape·포커스, 소스 registry 설치·빌드를 검증했습니다. 브라우저 오류 0건입니다.

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
