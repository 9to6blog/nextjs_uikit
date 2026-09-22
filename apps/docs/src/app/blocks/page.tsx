import { BlockGallery } from "@/components/block-gallery";
export const metadata = { title: "Blocks" };
export default function BlocksPage() {
  return (
    <article className="collection-page">
      <div className="doc-breadcrumb">
        Build with NINE <span>/</span> Blocks
      </div>
      <header className="doc-heading">
        <div className="collection-eyebrow">24 COMPOSITIONS · YOUR CONTENT</div>
        <h1>
          작은 조합에서,
          <br />
          완성된 화면으로.
        </h1>
        <p>
          콘텐츠, 대시보드, 폼과 마케팅. 기존 컴포넌트를 조합한 블록을 골라
          데이터와 동작을 연결하세요.
        </p>
      </header>
      <BlockGallery />
    </article>
  );
}
