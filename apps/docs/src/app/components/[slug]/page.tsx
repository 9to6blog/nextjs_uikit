import { notFound } from "next/navigation";
import Link from "next/link";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ArrowLeft, ArrowRight, Box, Code2 } from "lucide-react";
import { Badge } from "@9to6/ui/badge";
import { catalog, groupLabels } from "@/lib/catalog";
import { DemoHost } from "@/components/demo-host";
import { CodeBlock } from "@/components/code-block";
export function generateStaticParams() {
  return catalog.map((item) => ({ slug: item.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: catalog.find((item) => item.slug === slug)?.name ?? "Component",
  };
}
export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = catalog.find((item) => item.slug === slug);
  if (!item) notFound();
  const index = catalog.indexOf(item);
  const source = await readFile(
    path.resolve(process.cwd(), `../../packages/ui/src/${item.source}.tsx`),
    "utf8",
  );
  return (
    <article className="component-page">
      <div className="doc-breadcrumb">
        Components <span>/</span> {groupLabels[item.group]}
      </div>
      <header className="doc-heading">
        <div className="doc-title-row">
          <h1>{item.name}</h1>
          <Badge>
            {source.startsWith('"use client"') ? "Client" : "Server compatible"}
          </Badge>
        </div>
        <p>{item.description}</p>
      </header>
      <div className="preview-toolbar">
        <span>
          <Box size={14} /> Preview
        </span>
        <div>
          <Badge tone="accent">Interactive</Badge>
          <span className="preview-toolbar-hint">직접 조작해 보세요</span>
        </div>
      </div>
      <section
        className={`component-preview ${["data-table", "chart", "sidebar", "resizable"].includes(item.slug) ? "wide-preview" : ""}`}
        aria-label={`${item.name} 미리보기`}
      >
        <DemoHost name={item.slug} group={item.group} />
      </section>
      <section className="doc-section">
        <h2>Usage</h2>
        <p>
          개별 경로로 가져오면 필요한 컴포넌트를 명확하게 선택할 수 있습니다.
        </p>
        <CodeBlock
          code={`// app/layout.tsx 에서 한 번 불러오기\nimport "@9to6/ui/styles.css";\n\n// 컴포넌트 경로: @9to6/ui/${item.source}\n${item.usage}`}
        />
      </section>
      <section className="doc-section">
        <h2>API & composition</h2>
        <div className="api-list">
          {item.api.split(", ").map((api) => (
            <code key={api}>{api}</code>
          ))}
        </div>
        <p>
          네이티브 요소와 기반 컴포넌트의 TypeScript 속성을 전달합니다. 정확한
          타입과 기본값은 아래 소스와 패키지의 선언 파일에서 확인할 수 있습니다.
        </p>
        {item.slug === "file-upload" && (
          <p>
            이 컴포넌트는 파일 선택과 클라이언트 검증을 담당합니다. 실제 업로드,
            서버의 파일 검증, 저장소 연동은 사용하는 앱에서 구현합니다.
          </p>
        )}
        {item.slug === "data-table" && (
          <p>
            이 기본 구성은 클라이언트 데이터의 정렬·검색·페이지 나누기를
            지원합니다. 대용량 서버 페이지 처리와 가상화는 이 기본 API에
            포함되어 있지 않습니다.
          </p>
        )}
        {item.slug === "chart" && (
          <p>
            Recharts 기반입니다. NINE UI의 Area, Bar, Line, Pie, Radar,
            RadialBar, Scatter는 모션 감소 설정을 자동으로 따릅니다.
            isAnimationActive=false로 개별 모션을 끌 수도 있습니다. 데이터 표를
            함께 제공하는 것을 권장합니다.
          </p>
        )}
        {item.slug === "submit-button" && (
          <p>
            상위 form의 action 안에서 사용합니다. 여기서는 클라이언트 비동기
            액션으로 상태를 시연합니다. 실제 Server Action 검증과 권한 검사는
            앱의 책임입니다.
          </p>
        )}
      </section>
      <section className="doc-section">
        <h2>Interaction notes</h2>
        <ul className="doc-list">
          <li>
            컨트롤의 접근 가능한 이름을 label 또는 aria-label로 연결하세요.
          </li>
          <li>
            disabled, loading, empty, error 상태를 실제 데이터 흐름과
            연결하세요.
          </li>
          <li>
            공통 모션은 운영체제의 prefers-reduced-motion 설정을 존중합니다.
          </li>
          <li>
            팝업 컴포넌트는 UIProvider의 테마·밀도·강조 색상을 포털에도
            전달합니다.
          </li>
        </ul>
      </section>
      <details className="source-details">
        <summary>
          <Code2 size={16} /> Component source <span>{item.source}.tsx</span>
        </summary>
        <CodeBlock code={source} label={`${item.source}.tsx`} />
      </details>
      <nav className="doc-pagination" aria-label="이전 다음 컴포넌트">
        {index > 0 ? (
          <Link href={`/components/${catalog[index - 1].slug}/`}>
            <ArrowLeft size={14} />
            {catalog[index - 1].name}
          </Link>
        ) : (
          <span />
        )}
        {index < catalog.length - 1 && (
          <Link href={`/components/${catalog[index + 1].slug}/`}>
            {catalog[index + 1].name}
            <ArrowRight size={14} />
          </Link>
        )}
      </nav>
    </article>
  );
}
