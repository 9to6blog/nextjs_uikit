import Link from "next/link";
import { catalog } from "@/lib/catalog";
import { Badge } from "@9to6/ui/badge";
export const metadata = { title: "지원 범위와 검증" };
export default function Quality() {
  return (
    <article className="guide-page">
      <div className="doc-breadcrumb">QUALITY & COVERAGE</div>
      <header className="doc-heading">
        <h1>Built to be checked.</h1>
        <p>범위를 숨기지 않고, 결과로 확인하는 라이브러리.</p>
      </header>
      <section className="doc-section">
        <h2>{catalog.length}개 컴포넌트 카탈로그</h2>
        <p>
          2026-09-22에 확인한 Shadcn 공식 목록 64개와 파일 업로드·트리·드래그
          정렬·Next.js 전용 링크·제출 버튼 5개를 구현 대상으로 삼았습니다.
          컴포넌트의 존재와 모든 기능 조합의 검증은 서로 다른 기준입니다.
        </p>
        <p>
          자동화 검증은 저장소의 tests와 실행 결과를 기준으로 합니다. 실제
          스크린리더, 모든 브라우저·기기, 각 기반 라이브러리의 전체 옵션 조합을
          검증했다는 의미는 아닙니다. 자세한 지원 범위와 제한은 README 및 각
          컴포넌트 문서에 기록합니다.
        </p>
        <div className="n-table-scroll">
          <table className="quality-table">
            <thead>
              <tr>
                <th>컴포넌트</th>
                <th>구현</th>
                <th>예제 · 소스</th>
              </tr>
            </thead>
            <tbody>
              {catalog.map((item) => (
                <tr key={item.slug}>
                  <td>
                    <Link href={`/components/${item.slug}/`}>{item.name}</Link>
                  </td>
                  <td>
                    <Badge tone="success">Implemented</Badge>
                  </td>
                  <td>
                    <Link href={`/components/${item.slug}/`}>직접 확인 ↗</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="doc-section">
        <h2>현재 제공하는 범위</h2>
        <ul className="doc-list">
          <li>
            타입 선언, 개별 import 경로, 정적 CSS, 소스 registry, 정적 문서
            사이트.
          </li>
          <li>
            Shadcn과 같은 조합 방식. API가 Shadcn의 모든 버전과 일대일로
            호환되지는 않습니다.
          </li>
          <li>
            일반 테이블의 검색·정렬·페이지·열 표시·행 선택. 서버 데이터 그리드와
            가상화는 별도 확장 범위입니다.
          </li>
          <li>
            파일 선택과 검증 UI. 저장소·인증·실제 파일 전송은 사용하는 앱에서
            연결합니다.
          </li>
          <li>
            메시지와 질문 폼 UI. 모델 호출·스트리밍 프로토콜·AI 서비스는
            포함하지 않습니다.
          </li>
          <li>
            Next.js 16 / React 19.2 이상을 지원 대상으로 합니다. 이전 메이저
            버전은 검증 범위 밖입니다.
          </li>
        </ul>
      </section>
    </article>
  );
}
