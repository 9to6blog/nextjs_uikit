# 2026-09-22 디자인·모션 기준

사용자가 제공한 SnapView 영상 **18개**와 PNG **2개**를 로컬 원본에서 검토했습니다. 영상은 약 33–60 fps, 길이 2.0–9.6초입니다. 원본을 보존하고 타임스탬프별 프레임을 추출해 정지 상태와 전환을 비교했습니다. 개인 영상과 추출물은 저장소에 포함하지 않습니다.

## 공통 디자인

- 기본 `accent="black"`: 라이트 활성색 `#0a0a0a`, 흰색 전경. 다크는 가독성을 위해 밝은 무채색 활성색으로 반전합니다. blue/violet/teal은 선택 가능한 테마로 유지합니다.
- 흰색 표면, 중립 회색 배경, 1px `#e5e5e5` 입력·outline 버튼 테두리. 기본 높이 36px, 모서리 8px, 얕은 그림자. 포커스에는 별도 링이 나타납니다.
- 체크박스 16px, 내부 SVG 14px. 체크와 마이너스의 도형 경계 중심은 모두 viewBox의 `(12,12)`입니다. OS 글꼴 기호를 사용하지 않습니다.
- Radix의 실제 `data-state`로 표시를 제어합니다. controlled/uncontrolled, `indeterminate`에서 체크 전환, form reset 모두 같은 경로를 사용합니다.
- OS `prefers-reduced-motion`과 provider의 `motion="reduced"`가 애니메이션 시간과 지연을 제거합니다. 고정 목록의 Web Animations 전환도 같은 설정을 따릅니다.

## 영상별 대응

파일명 공통 접두사: `SnapView_영역_2026-09-22_`. 아래 숫자는 원본 시간 식별자입니다.

| 원본       | 확인한 동작                               | 대응 컴포넌트 / 변경                                                                               |
| ---------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 124628     | 체크 선택·해제, 배경과 선의 순차 전환     | Checkbox: 200ms 배경, 체크 200ms 지연 후 200ms 드로잉. 마이너스도 SVG 선 전환                      |
| 124645     | 파일 트리에서 행을 따라가는 hover         | Tree: 파일·폴더 SVG, 공유 MovingHighlight 표면                                                     |
| 124659     | 팝오버가 절반 크기에서 확대되고 다시 축소 | Popover: scale .5 ↔ 1, spring 300/25                                                               |
| 124711     | 링크 위 미리보기 등장·퇴장                | Preview Link Card: HoverCard 기반, 600ms 등장 대기, 300ms 닫힘 대기                                |
| 124723     | 라디오 원이 축소·확대되며 선택 변경       | Radio Group: spring 200/16, opacity + scale                                                        |
| 124738     | 사이드바 하위 메뉴와 접힘 전환            | Sidebar: `collapsible="icon"`, 아이콘·레이블, 500ms 너비 전환. 기존 offcanvas 모드 유지            |
| 124823     | 탭 표시 이동, 내용 blur/fade, 높이 변화   | Tabs / AnimatedSize: 표시 spring 200/25, 콘텐츠 500ms blur 4px → 0, 높이 500ms                     |
| 124843     | 검정 툴팁의 확대·축소, 아래 화살표        | Tooltip: spring 300/25, scale .5 ↔ 1, SVG 화살표                                                   |
| 124950     | 메뉴·서브메뉴와 항목 hover                | Dropdown Menu: 200ms opacity/scale .95 ↔ 1, 공유 hover 표면                                        |
| 125033     | 코드 타이핑, 코드 탭과 복사 상태          | Code Block / Code Tabs: 5초 타이핑, 전체 소스 복사, TS/JS/JSON 기본 토큰 색상, 밑줄·blur 전환      |
| 125109     | 겹친 알림 카드의 펼침·접힘                | Notification List: hover 및 접근 가능한 버튼, 위치·크기 전환                                       |
| 125129     | 항목 고정 그룹 이동, 완료선 드로잉        | Pinned List: DOM 정체성과 포커스를 보존한 위치 전환. Todo List: 후속 요청에 따른 450ms 직선 완료선 |
| 125146     | 우클릭 원형 메뉴, 섹터 hover              | Radial Menu: Radix Menu의 포커스·닫힘 동작, 원형 섹터, 키보드 탐색·Escape                          |
| 125441     | 문서 탐색을 따라 이동하는 세로 표시선     | MovingHighlight `variant="line"`, 문서 내비게이션에 적용                                           |
| 125549     | 검정 카드 위를 반복해서 지나가는 빛       | Shine Card: 3초 gradient 이동, reduced motion에서 정지                                             |
| 125607     | 3+3 OTP 슬롯과 포커스 링                  | Input OTP: `separatorAfter`, 얇은 테두리와 중립색 링                                               |
| 125622     | 내비게이션 패널과 hover 전환              | Navigation Menu: 등장·퇴장 방향별 이동, 얇은 테두리                                                |
| 125639     | 여러 단계의 모달 내용과 높이 전환         | Multi Step Dialog: 이전·다음 방향, AnimatedSize, 완료·재진입 초기화                                |
| PNG 125657 | 12개 막대 형태 스피너                     | Spinner: 12개 막대의 1.2초 순차 밝기 전환                                                          |
| PNG 125947 | 시간대별 날짜와 초 단위 시계              | Relative Time: EST/GMT/JST, Intl.DateTimeFormat, 같은 instant, hydration 시 초기 시각 고정         |

## 모션 파라미터의 출처와 구현

영상에 표시된 Animate UI의 [Checkbox](https://animate-ui.com/docs/primitives/radix/checkbox), [Radio Group](https://animate-ui.com/docs/primitives/radix/radio-group), [Popover](https://animate-ui.com/docs/primitives/radix/popover), [Tooltip](https://animate-ui.com/docs/primitives/radix/tooltip), [Tabs](https://animate-ui.com/docs/primitives/radix/tabs) 및 공개 [소스 저장소](https://github.com/imskyleen/animate-ui)를 확인해 전환 시간과 spring 수치를 교차 확인했습니다. 이 저장소의 기존 Radix API 위에 CSS/SVG/Web Animations로 구현하며 추가 모션 런타임 의존성은 없습니다. 스프링은 질량 1의 감쇠 진동 해를 CSS `linear()`로 표본화합니다. 팝업은 600ms, 라디오는 700ms 안에서 미세한 수렴까지 마칩니다.

## 해석과 한계

원본 웹사이트의 브라우저 배율·폰트 환경·소스 버전이 영상에 모두 기록된 것은 아닙니다. 따라서 프레임의 모든 픽셀이 동일하다는 보증이 아니라, 제공된 디자인과 동작을 재현하는 기준입니다. 스프링과 CSS 타이밍이 같은 경우에도 렌더링 환경에 따라 중간 프레임은 달라질 수 있습니다.

내용 텍스트와 문서 사이트 전체 레이아웃은 NINE UI의 예제를 사용합니다. Code Block 색상은 TS/JS/JSON의 문자열·주석·기본 키워드용 경량 토큰 표시이며 완전한 언어 파서가 아닙니다. Preview Link Card는 전달받은 preview 콘텐츠를 보여 주며 URL 스크린샷 수집 서비스를 포함하지 않습니다. Relative Time은 이미지의 이름을 사용하지만 실제 기능은 시간대별 시각 표시입니다. EST는 고정 UTC−5, GMT는 UTC, JST는 UTC+9이며 미국 일광절약시간이 필요하면 `America/New_York`를 전달합니다.

## 후속 디자인 수정

2026-09-22 추가 피드백에 따라 활성·hover 표시는 하나의 이동 표시기로 통합했습니다. Pinned List 예제는 독립적인 작업실 자료 내용과 서로 다른 문서·팔레트·이미지 아이콘을 사용하고, 고정 버튼은 북마크 SVG로 변경했습니다. Todo List는 450ms 직선 완료선입니다. 모든 제어용 화살표·선택·닫기·드래그 아이콘은 SVG로 표시합니다. 캘린더 날짜는 선택 여부와 관계없이 13px, 표의 체크박스는 공통 Checkbox를 사용합니다.

추가 검토에서 Notification List에 남아 있던 레퍼런스의 예제 제목·본문·수치를 확인하고, 글 발행·댓글·미리보기 준비에 관한 작업실 알림으로 교체했습니다. Radial Menu의 마우스 입력은 우클릭으로 열리도록 수정했으며 키보드 열기·선택·닫기와 포커스 복귀를 유지합니다. Combobox 검색창은 높이 36px, 좌우 여백 12px, 글자 13px이며 포커스 중에도 목록과 같은 표면색을 사용합니다.
