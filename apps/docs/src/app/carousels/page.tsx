import { CarouselGallery } from "@/components/carousel-gallery";
export const metadata = { title: "Carousels" };
export default function CarouselsPage() {
  return (
    <article className="collection-page">
      <div className="doc-breadcrumb">
        Build with NINE <span>/</span> Carousels
      </div>
      <header className="doc-heading">
        <div className="collection-eyebrow">6 COMPOSITIONS · ONE CAROUSEL</div>
        <h1>
          콘텐츠의 흐름에
          <br />
          움직임을 더하세요.
        </h1>
        <p>
          한 장의 이야기부터 여러 카드와 세로 목록까지. 조작 방식과 콘텐츠에
          맞게 구성합니다.
        </p>
      </header>
      <CarouselGallery />
    </article>
  );
}
