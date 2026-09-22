# v0.1 디자인·모션 개정 검증 기록

검증일: **2026-09-22**. 독립 UI 패키지와 production 정적 문서 사이트의 로컬 검사입니다. 기존 블로그·AWS·Cloudflare와 실제 운영 트래픽은 이 검증에 포함하지 않습니다.

## 환경과 빌드

- Windows, Node.js 24.14.1, npm 11.11.0.
- Next.js 16.3.5, React / React DOM 19.3.0, TypeScript 5.9.3.
- Playwright 1.63.0, axe 4.13.0. Chromium 153.0.8010.12, Firefox 155.0, WebKit 26.6.
- 전체 worker 2개, Firefox/WebKit은 각각 최대 1개. 자동 재시도 0회.
- `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run build` 통과.
- `npm audit --omit=dev --audit-level=high`: 알려진 production 의존성 취약점 0건.

문서는 **79개 컴포넌트 + 5개 안내 페이지 = 84개 사용자 페이지**입니다. Next 빌드의 정적 출력은 내부 not-found를 포함한 86개이며, source registry는 helper와 alias를 포함한 83개 항목입니다.

## 전체 브라우저 검사

최종 `npm test` 통합 실행: **244 passed**, 실패·skip·flaky **0건**, 재시도 **0회**, 약 **8.4분**. 실행 시작 UTC: `2026-09-22T04:53:03.482Z`.

| 프로젝트                      | 범위                                          | 검사 수 |
| ----------------------------- | --------------------------------------------- | ------: |
| Chromium desktop, 1440 × 1000 | 전체 카탈로그·상호작용·접근성·반응형          |     134 |
| Chromium tablet, 820 × 1180   | 84개 페이지 가로 넘침, 모션 감소, 테마        |       3 |
| Chromium mobile, 390 × 844    | 84개 페이지 가로 넘침, 모바일 탐색, 모션·테마 |       3 |
| Firefox desktop, 1280 × 720   | 기존 상호작용과 추가 모션 패턴                |      52 |
| WebKit desktop, 1280 × 720    | 기존 상호작용과 추가 모션 패턴                |      52 |
| 합계                          | 저장소의 전체 suite                           |     244 |

79개 카탈로그의 라이트·다크 axe 검사는 Chromium에서 실행합니다. Firefox/WebKit은 상호작용 spec 전체를 실행합니다. 모바일은 Chromium 에뮬레이션이며 iPhone 실기기 Safari 결과가 아닙니다.

추가한 14개 모션 검사 × 3개 브라우저는 SVG 체크·마이너스의 X/Y 중심, 실제 드로잉 전환 중간값, controlled/uncontrolled mixed 상태와 form reset, reduced motion에서 지연 제거, 이동하는 트리 hover 표면, 코드 전체 복사·탭 키보드 이동, 알림 hover/키보드 펼침·접힘, 고정/해제 양방향 포커스, 완료선 드로잉, 원형 메뉴 중심과 키보드 선택·Escape·포커스 복귀, 모달 이전/다음/완료/재진입, 동일 instant의 시간대별 표시, 아이콘 사이드바와 설정 마이그레이션을 포함합니다.

기존 다이얼로그·메뉴·파일 선택·날짜·표·트리·정렬·폼·차트·문서 이동 검사는 유지했습니다. 페이지 오류·console error·실패한 HTTP 응답과 접근성 오류를 수집합니다. axe는 유한 CSS 애니메이션이 종료된 시점에서 검사합니다. 실패 조건을 삭제하거나 retry로 숨기지 않았습니다.

알림의 spring 전환 중 WebKit 자동 스크롤이 hover 영역을 벗어나 이미 접힌 버튼을 누른 테스트 실패가 한 차례 있었습니다. 유한 전환의 실제 종료를 기다리고 펼친 상태를 재확인하도록 검사를 동기화했습니다. 기존 접힘 검증을 유지한 채 Chromium·Firefox·WebKit 각 10회, 총 30회 반복을 통과한 후 위 전체 suite를 실행했습니다.

## 디자인 검토와 수정

원본 영상 18개와 PNG 2개의 프레임·디자인 대응은 [REFERENCE-DESIGN.md](REFERENCE-DESIGN.md)에 기록했습니다. 입력·버튼·체크박스·라디오·OTP·스피너·새 패턴과 열린 팝오버·툴팁·미리보기·원형 메뉴·모달을 캡처해 직접 검토했습니다.

- 기본 검정 테마, 얇은 입력 테두리, 중앙 SVG 체크/마이너스와 선 전환.
- 처음 조정한 보조 회색이 연한 배지 위에서 4.34:1에 머물러 접근성 검사가 실패했습니다. 보조 텍스트를 `#6b6b6b`로 조정하고 검사를 다시 통과했습니다.
- 원형 메뉴가 포인터의 오른쪽 아래에 열리던 것을 중심 기준 배치와 뷰포트 내 위치 제한으로 수정했습니다.
- 다단계 모달은 영상처럼 진한 배경과 blur 없는 overlay를 사용합니다.
- hover로 열린 알림을 접는 버튼의 상태 불일치를 실제 재현해 수정했습니다. 고정 목록의 DOM 이동 후 포커스도 양방향으로 검증했습니다.
- 기존 저장 설정의 옛 blue 기본값은 black으로 마이그레이션하고, 새로 선택한 blue는 버전 2 설정으로 보존합니다.

## 패키지와 소스 설치

`npm run test:package` 통과. 증거 생성 UTC: `2026-09-22T04:52:47.155Z`.

1. 실제 `npm pack` tarball을 독립 Next.js 소비 앱에 설치하고 production 빌드.
2. 공식 `shadcn@4.21.0` CLI로 로컬 registry의 Button/Dialog 소스를 설치해 빌드.
3. 정적 Card/Button 서버 HTML과 모든 emitted client module의 `"use client"` 지시문 유지 확인.
4. 패키지와 소스 설치 각각의 Dialog를 Chromium에서 열고 Escape로 닫음. page error 0건.
5. 이 소비 예제의 JS에서 사용하지 않은 Recharts runtime marker가 없음.

| 배포물                     | 측정값                                                             |
| -------------------------- | ------------------------------------------------------------------ |
| 파일                       | `artifacts/9to6-ui-0.1.0.tgz`                                      |
| 압축 크기                  | 96,487 bytes                                                       |
| 압축 해제 크기             | 474,591 bytes / 362 files                                          |
| SHA-256                    | `b21ba167bff4331ac0eb5f6e30ffec14dccec484160b529349171d6c06cb87d3` |
| 소비 앱 전체 JS chunk 합계 | 623,644 bytes / gzip 192,054 bytes                                 |

JS 수치는 Next.js·React runtime과 소비 예제 chunk를 포함하며 UI 단독 크기나 첫 페이지 전송량이 아닙니다. 추가 모션 런타임 의존성은 없습니다.

## 증거와 남은 범위

로컬 증거: `artifacts/test-results.json`, `playwright-report/index.html`, `artifacts/package-verification.json`, `artifacts/design-review/`, `artifacts/references/`, `artifacts/design-full-tests.log`. 중간 검사 로그도 `artifacts/before-*.log` 등에 보존합니다. 원본 영상과 생성물·설치 fixture는 Git에 포함하지 않습니다.

GitHub Actions는 수동 workflow이며 이 기록은 원격 CI 실행 결과가 아닙니다. axe는 WCAG 인증이나 NVDA/VoiceOver·실제 터치 기기 검증을 대체하지 않습니다. 참고 영상과 모든 픽셀이 동일하다는 보증은 하지 않습니다. 지원 기능과 한계는 [SUPPORT.md](SUPPORT.md), 이후 확장 범위는 [ROADMAP.md](ROADMAP.md)에 기록합니다.
