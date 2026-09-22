import { notFound } from "next/navigation";
import Link from "next/link";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { blocks, blockGroups } from "@/lib/blocks";
import { BlockDemo } from "@/components/block-demo";
import { CodeBlock } from "@/components/code-block";
export const dynamicParams = false;
export function generateStaticParams() {
  return blocks.map((b) => ({ slug: b.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: blocks.find((b) => b.slug === slug)?.name ?? "Block" };
}
export default async function BlockPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = blocks.find((b) => b.slug === slug);
  if (!item) notFound();
  const [example, source] = await Promise.all([
    readFile(
      path.resolve(process.cwd(), `src/demos/blocks/${slug}.tsx`),
      "utf8",
    ),
    readFile(
      path.resolve(process.cwd(), `../../packages/ui/src/blocks/${slug}.tsx`),
      "utf8",
    ),
  ]);
  const i = blocks.indexOf(item);
  return (
    <article className="component-page block-page">
      <div className="doc-breadcrumb">
        <Link href="/blocks/">Blocks</Link>
        <span>/</span>
        {blockGroups[item.group]}
      </div>
      <header className="doc-heading">
        <h1>{item.name}</h1>
        <p>{item.description}</p>
      </header>
      <div className="preview-toolbar">
        <span>Preview</span>
        <span>반응형 · Light / Dark</span>
      </div>
      <section className="block-preview" aria-label={`${item.name} 미리보기`}>
        <BlockDemo slug={item.slug} />
      </section>
      <section className="doc-section">
        <h2>이 블록 사용하기</h2>
        <p>
          패키지의 독립 경로로 가져옵니다. Next.js와 React 모두 같은 블록을
          사용하며, 데이터 저장과 서버 요청은 앱의 콜백에 연결합니다.
        </p>
        <CodeBlock
          code={
            '// Next.js: app/layout.tsx · React: 앱 진입 파일\nimport "@9to6/ui/styles.css";\nimport "@9to6/ui/blocks.css";'
          }
        />
        <div className="api-list">
          {item.api.split(", ").map((p) => (
            <code key={p}>{p}</code>
          ))}
        </div>
      </section>
      <details className="source-details">
        <summary>실행 가능한 예제 코드</summary>
        <CodeBlock code={example} label={`${slug}-example.tsx`} />
      </details>
      <details className="source-details">
        <summary>블록 컴포넌트 소스</summary>
        <CodeBlock code={source} label={`blocks/${slug}.tsx`} />
      </details>
      <p className="block-source-note">
        예제에 있는 <code>block-demo-*</code> 클래스는 문서 안내용입니다. 블록의
        스타일은 <code>blocks.css</code>에 포함됩니다. 소스를 직접 복사할 때는
        같은 폴더의 shared 모듈도 함께 가져오세요.
      </p>
      <nav className="doc-pagination" aria-label="이전 다음 블록">
        {i > 0 ? (
          <Link href={`/blocks/${blocks[i - 1].slug}/`}>
            {blocks[i - 1].name}
          </Link>
        ) : (
          <Link href="/blocks/">모든 블록</Link>
        )}
        {i < blocks.length - 1 && (
          <Link href={`/blocks/${blocks[i + 1].slug}/`}>
            {blocks[i + 1].name}
          </Link>
        )}
      </nav>
    </article>
  );
}
