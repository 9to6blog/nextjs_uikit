# 전체 지원을 위한 개발 기준

목표는 여러 프로젝트에서 UI를 새로 만들 필요가 없는 독립 Next.js 라이브러리입니다. v0.1의 69개 문서 항목은 첫 번째 구현 기준입니다. 아래 확장 항목과 기능 심화까지 완료하기 전에는 주요 UI 라이브러리 전체를 대체한다고 표현하지 않습니다.

## 카탈로그 확장

2026-09-22에 확인한 [Material UI 공식 목록](https://mui.com/material-ui/all-components/)과 [Ant Design 공식 목록](https://ant.design/components/overview/)을 추가 비교 기준으로 사용합니다. 이름이 비슷한 컴포넌트도 상호작용이 다르면 별도 기능으로 추적합니다. 예를 들어 Badge만으로 삭제 가능한 Tag를 지원했다고 간주하지 않습니다.

다음은 **미구현 또는 별도 공개 API가 필요한 항목**입니다.

| 분야              | 추가할 항목                                                                     | 완료 조건의 예                                                        |
| ----------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 선택·입력         | Number Field, Rating, Multi Select, Tags Input, AutoComplete                    | 키보드, 소수점·범위·IME, 다중 선택, 원격 검색 취소, 로딩·빈 결과·오류 |
| 계층·이동         | Cascader, Tree Select, Transfer                                                 | 깊은 계층, 선택 규칙, 비활성 항목, 검색, 선택 결과 전달               |
| 날짜·시간·색상    | Range Picker, Time Picker, Date Time Picker, Color Picker                       | 로케일, 범위 제약, 시간대 계약, 직접 입력, 키보드, 모션 감소          |
| 탐색·진행         | Stepper, Anchor, Bottom Navigation, App Bar, Floating Action Button, Speed Dial | 활성 상태, 오류·완료 상태, URL 연동, 모바일 조작                      |
| 데이터 표시       | Timeline, Descriptions, Statistic, Result, Image Preview, Image List, Masonry   | 반응형, 빈 데이터, 이미지 실패, 확대·축소, 텍스트 대안                |
| 작업 보조         | Tour, Popconfirm, QR Code, Watermark, Affix                                     | 초점 복귀, 스크롤·크기 변화, 중단·재시작, 서버 렌더링                 |
| 레이아웃·유틸리티 | Box, Container, Grid, Stack/Flex/Space, Portal, Media Query, Textarea Autosize  | 기존 CSS와의 공존, SSR 초기값, 크기 변화·언마운트 정리                |
| 앱 구성           | App Shell, Form, Form Array, Form Wizard                                        | 필드 관계, 동기·비동기 검증, 서버 오류, 저장 중 상태, 이탈 처리       |

이 표는 추가 개발 목록이며, 모든 타사 API와의 일대일 호환 계약은 아닙니다. 각 항목은 독립적으로 문서·예제·기능 검증을 갖춘 뒤 공개 카탈로그로 이동합니다. 복합 폼이나 블록 에디터의 서비스·DB·AI 연결은 소비 앱과 별도 계약을 정의합니다.

## 이미 구현한 컴포넌트의 심화

- Data Table: 서버 페이지, 정렬·필터 동기화, 가상화, 셀 편집, 열 고정, 그룹·집계, 대량 행 선택.
- Tree / Sortable: 다중 선택, 체크 전파, 비동기 자식, 가상화, 중첩·컨테이너 간 정렬, 취소와 복구.
- Combobox: 다중 선택, 검색 API, 입력 중 취소, 큰 결과 집합, 사용자 생성 항목.
- Chart: 더 많은 시리즈·상태 예제, 공통 데이터 대안, 로케일·툴팁, 대량 데이터 비용.
- Calendar / Date Picker: 기간·시간 조합과 국제화 예제, 직접 입력 계약.
- Sidebar / Navigation: 중첩 메뉴, 좁은 화면 전환, 사용자별 상태 저장 어댑터.
- 모든 항목: controlled/uncontrolled 계약, ref·이벤트 합성, disabled/loading/error/empty, RTL, 키보드, 포털 중첩, 폼 연결, SSR·hydration.

## 출시 판단

카탈로그의 이름 수로 완료를 결정하지 않습니다. 각 기능에 실제 예제, 타입 계약, 정상·오류·경계 상태 검사, 세 브라우저 동작, 화면 크기·테마·모션 검증을 연결합니다. 핵심 조작은 NVDA/VoiceOver와 실제 터치 기기에서 수동 확인하고, 소비 프로젝트에 설치한 결과로 회귀를 검사합니다.

성능은 무거운 모듈의 사용 경로 분리와 실제 소비 앱의 측정으로 판단합니다. 2코어·2GB Lightsail의 수용량은 UI 패키지의 빌드 성공으로 보장하지 않으며, 블로그에 통합할 때 실제 요청·캐시·DB 부하로 검증합니다.
